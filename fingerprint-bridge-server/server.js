import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- CONFIGURATION ---
const PORT = process.env.PORT || 5000;
// --- END CONFIGURATION ---

// Express app for dashboard
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// Create HTTP server (shared by Express and WebSocket)
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocketServer({ server });

console.log(`Starting Cloud Bridge Server...`);

// Track connected clients
const clients = {
  esp32: null,
  webClients: new Set(),
};

// Store last known GPS coordinates
let lastKnownGPS = {
  lat: null,
  lon: null,
  alt: null,
  gpsFixed: false,
};

// Store ESP32 status
let esp32Status = {
  connected: false,
  wifi: false, // Will be true if connected
  ssid: "Cloud Connected",
  rssi: 0,
  ip: "-",
  fingerprint: false,
  gps: false,
  gpsFixed: false,
  satellites: 0,
  buffered: 0,
  discoveryMethod: "Cloud Relay",
};

// ===== WEBSOCKET HANDLING =====
wss.on("connection", (ws, req) => {
  const clientIP = req.socket.remoteAddress;
  const url = req.url; // e.g., "/esp32" or "/"

  console.log(`New connection from ${clientIP} at ${url}`);

  // Identify Client Type
  if (url && url.includes("/esp32")) {
    handleESP32Connection(ws);
  } else {
    handleWebClientConnection(ws);
  }
});

function handleESP32Connection(ws) {
  if (clients.esp32) {
    console.log("⚠️ A second ESP32 tried to connect. Closing old connection.");
    try {
      clients.esp32.close();
    } catch (e) {}
  }

  clients.esp32 = ws;
  esp32Status.connected = true;
  esp32Status.ip = "Cloud Connected";

  console.log("✅ ESP32 Device Connected!");

  // Notify web clients
  broadcastToWebClients({
    type: "ESP32_CONNECTION",
    connected: true,
    ip: "Cloud Relay",
    discoveryMethod: "Cloud",
  });

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data.toString());
      handleESP32Message(message);
    } catch (e) {
      console.log("Non-JSON message from ESP32:", data.toString());
    }
  });

  ws.on("close", () => {
    console.log("⚠ ESP32 Disconnected");
    clients.esp32 = null;
    esp32Status.connected = false;

    broadcastToWebClients({
      type: "ESP32_CONNECTION",
      connected: false,
    });
  });

  ws.on("error", (err) => {
    console.error("ESP32 Socket Error:", err.message);
  });
}

function handleWebClientConnection(ws) {
  clients.webClients.add(ws);
  console.log(`Web Client Connected (Total: ${clients.webClients.size})`);

  // Send immediate status
  ws.send(
    JSON.stringify({
      type: "ESP32_CONNECTION",
      connected: !!clients.esp32,
      ip: "Cloud Relay",
      discoveryMethod: "Cloud",
    }),
  );

  if (lastKnownGPS.lat) {
    ws.send(
      JSON.stringify({
        type: "ESP32_STATUS",
        data: { type: "STATUS", ...lastKnownGPS },
      }),
    );
  }

  // If we have cached status, send it
  if (clients.esp32) {
    ws.send(
      JSON.stringify({
        type: "ESP32_STATUS",
        data: esp32Status, // Send last known status object
      }),
    );
    // Ask ESP32 for fresh update
    sendToESP32("GET_STATUS");
  }

  ws.on("message", (msg) => {
    handleWebClientCommand(msg.toString());
  });

  ws.on("close", () => {
    clients.webClients.delete(ws);
    console.log(
      `Web Client Disconnected (Remaining: ${clients.webClients.size})`,
    );
  });
}

// Handle messages from ESP32
function handleESP32Message(data) {
  // Pass through everything to web clients (dashboard)
  // But also update local state

  if (data.type === "STATUS") {
    console.log(
      `[ESP32 STATUS] GPS:${data.gpsFixed ? "Fix" : "NoFix"} Sats:${data.satellites}`,
    );

    esp32Status = { ...esp32Status, ...data, connected: true };

    if (data.lat && data.lon && (data.lat !== 0 || data.lon !== 0)) {
      lastKnownGPS = {
        lat: data.lat,
        lon: data.lon,
        alt: data.alt || 0,
        gpsFixed: data.gpsFixed || false,
      };
    }

    broadcastToWebClients({
      type: "ESP32_STATUS",
      data: data,
    });
  } else if (
    data.type === "ATTENDANCE" ||
    data.type === "ATTENDANCE_BUFFERED"
  ) {
    console.log(`[ATTENDANCE] ID: ${data.id}`);
    broadcastToWebClients(data); // Frontend listens for "ATTENDANCE"
  } else {
    // Forward generic responses (ENROLL_RESPONSE, etc.)
    broadcastToWebClients(data);
  }
}

// Handle commands from Web Frontend
function handleWebClientCommand(message) {
  try {
    // If it's JSON, it might be a simulation or specific command
    // For now, most commands are strings
    if (message.startsWith("{")) {
      const json = JSON.parse(message);
      // Forward simulation events back to others? Or just log?
      // Current frontend sends some JSON events to broadcast to itself/others?
      // Let's allow broadcasting specific types if needed
      if (
        [
          "ATTENDANCE",
          "SIGNED_OUT",
          "SESSION_COMPLETED",
          "NO_ACTIVE_SESSION",
          "NO_MATCHING_SESSION",
        ].includes(json.type)
      ) {
        broadcastToWebClients(json);
        return;
      }
    }
  } catch (e) {}

  // Forward commands to ESP32
  console.log(`Command from Web: ${message}`);

  // Clean up simple string commands if needed, or pass through
  // The ESP32 expects raw strings like "CAPTURE_FINGERPRINT" or "GET_STATUS"
  // or "DELETE_FINGERPRINT:123"

  if (clients.esp32) {
    sendToESP32(message);
  } else {
    console.log("Cannot forward: ESP32 not connected");
  }
}

function sendToESP32(command) {
  if (clients.esp32 && clients.esp32.readyState === WebSocket.OPEN) {
    clients.esp32.send(command);
    return true;
  }
  return false;
}

function broadcastToWebClients(data) {
  const msg = JSON.stringify(data);
  clients.webClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

// ===== HTTP API API (Optional) =====
app.get("/api/status", (req, res) => {
  res.json(esp32Status);
});

// Start Server
server.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`   WS Endpoint for ESP32: ws://<host>/esp32`);
  console.log(`   WS Endpoint for Web:   ws://<host>/\n`);
});
