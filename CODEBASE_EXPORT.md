# Codebase Export

- Root: `C:\Users\ndera\OneDrive\Pictures\fingerprint-auth`
- Generated: 2026-01-29T20:18:05

## Folder Structure

- ./
  - .gitignore
  - App.tsx
  - CODEBASE_EXPORT.md
  - LICENSE
  - README.md
  - attendance_All_Courses (3).csv
  - export_codebase.py
  - index.html
  - index.tsx
  - metadata.json
  - package.json
  - project_tree.txt
  - tsconfig.json
  - types.ts
  - vite-env.d.ts
  - vite.config.ts
  - components/
    - AccessCard.tsx
    - AttendanceAnalytics.tsx
    - AttendanceCard.tsx
    - AttendanceLog.tsx
    - ConfirmModal.tsx
    - CourseManagement.tsx
    - CourseModal.tsx
    - Dashboard.tsx
    - ExamCard.tsx
    - ExamVerification.tsx
    - FingerprintPortal.tsx
    - GlobalAttendanceListener.tsx
    - LocationModal.tsx
    - Login.tsx
    - ProtectedRoute.tsx
    - ServerStatus.tsx
    - SessionManagement.tsx
    - Spinner.tsx
    - StatusModal.tsx
    - StudentManagement.tsx
    - StudentModal.tsx
    - Toast.tsx
  - context/
    - AuthContext.tsx
  - fingerprint-bridge-server/
    - package.json
    - server.js
    - public/
      - index.html
  - services/
    - firebase.ts
    - geocoding.ts

## File Contents

### `App.tsx`

```tsx
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import FingerprintPortal from "./components/FingerprintPortal";
import ExamVerification from "./components/ExamVerification";

import GlobalAttendanceListener from "./components/GlobalAttendanceListener";

export default function App() {
  return (
    <AuthProvider>
      <GlobalAttendanceListener />
      <HashRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<FingerprintPortal />} />
          <Route path="/verify" element={<ExamVerification />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
```

### `CODEBASE_EXPORT.md`

```markdown

```

### `README.md`

```markdown
# 🔐 Biometric Attendance System with GPS Tracking

> A real-time, GPS-enabled fingerprint attendance system combining ESP32 hardware, React frontend, and Firebase backend for secure, location-verified attendance management.

Link to the project: https://coder-real.github.io/biometric-attendance-system/

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.4.0-orange.svg)](https://firebase.google.com/)

---

## 🎯 Overview

This **Biometric Attendance System** is an IoT solution designed for educational institutions to eliminate proxy attendance and ensure location-verified check-ins. Developed as an undergraduate final year project at the Federal University of Technology, Owerri (FUTO), Nigeria, it was inspired by the need for transparent and tamper-proof attendance systems observed during the 2023 Nigerian elections.

### 🌟 Key Features

- **🔒 Secure Authentication**: Fingerprint-based biometric verification using AS608 sensor
- **📍 GPS Verification**: Real-time location tracking with NEO-6M GPS module
- **🗺️ Smart Geocoding**: Automatic reverse geocoding to human-readable addresses via OpenStreetMap
- **⚡ Real-time Updates**: WebSocket-based live attendance broadcasting
- **📊 Analytics Dashboard**: Comprehensive attendance statistics and reporting
- **🎨 Modern UI**: Glassmorphic design with smooth animations and responsive layout
- **🛰️ GPS Status Monitoring**: Visual satellite count and signal strength indicators

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Hardware["Hardware Layer"]
        ESP32[ESP32 DevKit]
        FP[AS608 Fingerprint Sensor]
        GPS[NEO-6M GPS Module]
        LCD[16x2 I2C LCD Display]
    end
    
    subgraph Backend["Backend Layer"]
        Bridge[Node.js Bridge Server<br/>WebSocket + Express]
    end
    
    subgraph Frontend["Frontend Layer"]
        React[React 19 + TypeScript<br/>Vite Build Tool]
    end
    
    subgraph Services["External Services"]
        Firebase[Firebase Firestore<br/>Real-time Database]
        OSM[OpenStreetMap<br/>Reverse Geocoding]
    end
    
    FP -->|UART| ESP32
    GPS -->|UART| ESP32
    LCD -->|I2C| ESP32
    ESP32 -->|WebSocket| Bridge
    Bridge -->|WebSocket| React
    React -->|REST API| Firebase
    React -->|HTTP API| OSM
    
    style Hardware fill:#4CAF50,color:#fff
    style Backend fill:#2196F3,color:#fff
    style Frontend fill:#FF9800,color:#fff
    style Services fill:#9C27B0,color:#fff
```

### How It Works

1. **Fingerprint Capture** → ESP32 reads fingerprint via AS608 sensor
2. **GPS Acquisition** → NEO-6M module provides real-time coordinates
3. **WebSocket Transmission** → ESP32 sends data to Node.js bridge server
4. **Real-time Broadcast** → Updates pushed to all connected web clients
5. **Database Persistence** → Attendance record saved to Firebase Firestore
6. **Location Resolution** → OpenStreetMap API converts coordinates to human-readable addresses

---

## 🛠️ Technology Stack

### Frontend
- **React** 19.2.0 - UI framework with hooks and context
- **TypeScript** 5.8.2 - Type-safe development
- **Vite** 6.2.0 - Fast build tool and dev server
- **React Router** 7.9.4 - Client-side routing
- **Firebase SDK** 12.4.0 - Database integration

### Backend
- **Node.js** 16+ - Runtime environment
- **Express** 5.2.1 - HTTP server framework
- **WebSocket (ws)** 8.18.3 - Real-time bidirectional communication

### Hardware
- **ESP32 DevKit** - WiFi-enabled microcontroller (240MHz dual-core)
- **AS608 Fingerprint Sensor** - Optical sensor, 500 DPI, UART interface
- **NEO-6M GPS Module** - u-blox GPS with -161 dBm sensitivity
- **16x2 I2C LCD Display** - Status display with HD44780 controller

### Cloud Services
- **Firebase Firestore** - NoSQL real-time database
- **OpenStreetMap Nominatim** - Free reverse geocoding API

---

## 🎓 Project Background

### Problem Statement

Traditional attendance systems in educational institutions face several challenges:
- **Proxy Attendance**: Students signing in for absent peers
- **Location Fraud**: Attendance marked from unauthorized locations
- **Manual Errors**: Human error in record-keeping
- **Lack of Transparency**: No verifiable audit trail

### Solution

This system addresses these challenges through:
1. **Biometric Verification** - Eliminates proxy attendance via fingerprint authentication
2. **GPS Tracking** - Ensures students are physically present at the correct location
3. **Real-time Monitoring** - Provides instant visibility into attendance data
4. **Automated Geocoding** - Converts GPS coordinates to human-readable locations
5. **Immutable Records** - Firebase Firestore ensures tamper-proof data storage

---

## 📄 License

This project is licensed under the **MIT License**.

Copyright (c) 2024 Nder Anthony

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---
```

### `export_codebase.py`

```python
import os
import fnmatch
from datetime import datetime

# ========== SETTINGS ==========
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
OUTPUT_MD = os.path.join(ROOT_DIR, "CODEBASE_EXPORT.md")

# Include only likely "code" / config / docs. Add more if needed.
INCLUDE_EXTENSIONS = {
    ".py", ".js", ".ts", ".tsx", ".jsx",
    ".html", ".css", ".scss",
    ".json", ".yml", ".yaml", ".toml", ".ini", ".cfg",
    ".md", ".txt",
    ".env.example",  # export safe example env files
    ".sql",
    ".sh", ".bat",
    ".c", ".cpp", ".h", ".hpp",
    ".java", ".kt",
    ".go", ".rs",
}

# Folders to skip (large/noisy)
SKIP_DIRS = {
    ".git", ".github",
    "node_modules",
    "__pycache__",
    "dist", "build", ".next", ".nuxt",
    "venv", ".venv", "env",
    ".idea", ".vscode",
    ".pytest_cache",
    "coverage",
}

# Files to skip (secrets/binaries/huge/noisy). You can add more patterns.
SKIP_FILE_PATTERNS = [
    "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", "*.ico",
    "*.mp4", "*.mov", "*.avi", "*.mkv",
    "*.pdf",
    "*.zip", "*.rar", "*.7z",
    "*.exe", "*.dll",
    "*.pyc",
    "*.db", "*.sqlite", "*.sqlite3",
    "*.log",
    ".env", ".env.*",  # IMPORTANT: do not export secrets
    "package-lock.json",  # optional: comment out if you want it included
]

# If a file is huge, skip it (in bytes)
MAX_FILE_SIZE = 600_000  # ~600KB

# ========== HELPERS ==========
def should_skip_dir(dir_name: str) -> bool:
    return dir_name in SKIP_DIRS

def matches_skip_patterns(filename: str) -> bool:
    for pat in SKIP_FILE_PATTERNS:
        if fnmatch.fnmatch(filename, pat):
            return True
    return False

def is_included_file(path: str) -> bool:
    base = os.path.basename(path)

    if matches_skip_patterns(base):
        return False

    # Special case: allow ".env.example"
    if base == ".env.example":
        return True

    _, ext = os.path.splitext(base)
    return ext.lower() in INCLUDE_EXTENSIONS

def safe_read_text(path: str) -> str:
    # Try utf-8, then fallback. If still fails, return a note.
    for enc in ("utf-8", "utf-8-sig", "cp1252", "latin-1"):
        try:
            with open(path, "r", encoding=enc, errors="strict") as f:
                return f.read()
        except Exception:
            pass
    return "[[Could not decode this file as text. Skipped content.]]"

def guess_language_for_fence(filename: str) -> str:
    ext_map = {
        ".py": "python",
        ".js": "javascript",
        ".ts": "typescript",
        ".tsx": "tsx",
        ".jsx": "jsx",
        ".html": "html",
        ".css": "css",
        ".scss": "scss",
        ".json": "json",
        ".yml": "yaml",
        ".yaml": "yaml",
        ".toml": "toml",
        ".ini": "ini",
        ".cfg": "ini",
        ".md": "markdown",
        ".sql": "sql",
        ".sh": "bash",
        ".bat": "bat",
        ".c": "c",
        ".cpp": "cpp",
        ".h": "c",
        ".hpp": "cpp",
        ".java": "java",
        ".kt": "kotlin",
        ".go": "go",
        ".rs": "rust",
        ".txt": "",
    }
    base = os.path.basename(filename)
    if base == ".env.example":
        return "dotenv"
    _, ext = os.path.splitext(base)
    return ext_map.get(ext.lower(), "")

def build_tree(root: str) -> str:
    lines = []
    for current_root, dirs, files in os.walk(root):
        # prune dirs
        dirs[:] = [d for d in dirs if not should_skip_dir(d)]

        rel_root = os.path.relpath(current_root, root)
        indent_level = 0 if rel_root == "." else rel_root.count(os.sep) + 1
        indent = "  " * indent_level

        folder_name = "." if rel_root == "." else os.path.basename(current_root)
        lines.append(f"{indent}- {folder_name}/")

        # files
        for f in sorted(files):
            if matches_skip_patterns(f):
                continue
            lines.append(f"{indent}  - {f}")
    return "\n".join(lines)

def main():
    exported_files = []
    skipped_large = []
    skipped_nonincluded = []

    with open(OUTPUT_MD, "w", encoding="utf-8") as out:
        out.write(f"# Codebase Export\n\n")
        out.write(f"- Root: `{ROOT_DIR}`\n")
        out.write(f"- Generated: {datetime.now().isoformat(timespec='seconds')}\n\n")

        out.write("## Folder Structure\n\n")
        out.write(build_tree(ROOT_DIR) + "\n\n")

        out.write("## File Contents\n\n")

        for current_root, dirs, files in os.walk(ROOT_DIR):
            dirs[:] = [d for d in dirs if not should_skip_dir(d)]

            for f in sorted(files):
                full_path = os.path.join(current_root, f)
                rel_path = os.path.relpath(full_path, ROOT_DIR)

                if matches_skip_patterns(f):
                    skipped_nonincluded.append(rel_path)
                    continue

                if not is_included_file(full_path):
                    skipped_nonincluded.append(rel_path)
                    continue

                try:
                    size = os.path.getsize(full_path)
                except Exception:
                    size = 0

                if size > MAX_FILE_SIZE:
                    skipped_large.append(rel_path)
                    continue

                content = safe_read_text(full_path)
                lang = guess_language_for_fence(f)

                out.write(f"### `{rel_path}`\n\n")
                out.write(f"```{lang}\n")
                out.write(content.rstrip() + "\n")
                out.write("```\n\n")

                exported_files.append(rel_path)

        out.write("## Export Summary\n\n")
        out.write(f"- Exported files: **{len(exported_files)}**\n")
        out.write(f"- Skipped (non-included / ignored patterns): **{len(skipped_nonincluded)}**\n")
        out.write(f"- Skipped (too large > {MAX_FILE_SIZE} bytes): **{len(skipped_large)}**\n\n")

        if skipped_large:
            out.write("### Skipped Large Files\n\n")
            for p in skipped_large:
                out.write(f"- `{p}`\n")
            out.write("\n")

        # We don't list every skipped file if it's huge, but keep it available.
        if skipped_nonincluded:
            out.write("### Skipped Non-Included / Ignored Files (first 200)\n\n")
            for p in skipped_nonincluded[:200]:
                out.write(f"- `{p}`\n")
            if len(skipped_nonincluded) > 200:
                out.write(f"\n...and {len(skipped_nonincluded) - 200} more.\n")

    print(f"✅ Export complete: {OUTPUT_MD}")

if __name__ == "__main__":
    main()
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Attendance System</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="importmap">
      {
        "imports": {
          "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
          "react-router-dom": "https://aistudiocdn.com/react-router-dom@^7.9.4",
          "react/": "https://aistudiocdn.com/react@^19.2.0/",
          "react": "https://aistudiocdn.com/react@^19.2.0",
          "firebase": "https://aistudiocdn.com/firebase@^12.4.0",
          "firebase/": "https://aistudiocdn.com/firebase@^12.4.0/"
        }
      }
    </script>
    <style>
      body {
        font-family: "Inter", sans-serif;
      }
    </style>
  </head>
  <body class="bg-gray-900 text-gray-100">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
```

### `index.tsx`

```tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `metadata.json`

```json

{
  "name": "Firebase Admin Auth",
  "description": "A React application demonstrating Firebase email/password authentication for an admin dashboard. It includes protected routes, login persistence with onAuthStateChanged, and user data fetching from Firestore using the modular v9 SDK."
}
```

### `package.json`

```json
{
  "name": "biometric-attendance-system",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "homepage": "https://coder-real.github.io/biometric-attendance-system",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "firebase": "^12.4.0",
    "lucide-react": "^0.559.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.4",
    "ws": "^8.18.3"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/ws": "^8.18.1",
    "@vitejs/plugin-react": "^5.0.0",
    "gh-pages": "^6.3.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "types": [
      "node"
    ],
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

### `types.ts`

```typescript
import type { User } from "firebase/auth";
import type { Timestamp } from "firebase/firestore";

export interface AdminData {
  name: string;
  role: string;
  email: string;
}

export interface AuthContextType {
  currentUser: User | null;
  adminData: AdminData | null;
  loading: boolean;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  department: string;
  level: string;
  fingerprintTemplate: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  level: string;
}

export interface CourseStudent {
  id: string;
  courseId: string;
  studentId: string;
}

export interface Session {
  id: string;
  courseId: string;
  startTime: Timestamp;
  endTime: Timestamp | null;
  active: boolean;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  sessionId: string;
  joinTime: Timestamp;
  verified: boolean;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  signOutTime?: Timestamp | null;
}

export interface AttendanceRecord extends Attendance {
  studentName: string;
  courseName: string;
}

export interface StudentAnalytics {
  studentDocId: string;
  studentId: string;
  studentName: string;
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
  latitude?: number; // new
  longitude?: number; // new
}
export interface AccessCardData {
  name: string;
  studentId: string;
  department: string;
  courseName: string;
  attendancePercentage: number;
  status?: "entry" | "exit";
}

export interface BridgeStatus {
  esp32Connected: boolean;
  webClients: number;
  uptime: number;
  timestamp: string;
  esp32Status?: {
    wifi: boolean;
    fingerprint: boolean;
    gps: boolean;
    gpsFixed: boolean;
    satellites: number;
    ip: string;
  };
}
```

### `vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### `vite.config.ts`

```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      base: '/biometric-attendance-system/',
    };
});
```

### `components\AccessCard.tsx`

```tsx
import React, { useRef } from "react";
import type { AccessCardData } from "../types";

interface AccessCardProps {
  data: AccessCardData;
  onClose: () => void;
}

export default function AccessCard({ data, onClose }: AccessCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
      // Keep existing download logic for now
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        ref={cardRef}
        className="relative w-full max-w-md transform transition-all duration-500 ease-out animate-slide-up"
      >
        {/* Card Container */ }
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Top Security Header */}
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                        data.status === 'exit' ? 'bg-orange-500' : 'bg-green-500' 
                    }`}></div>
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                        {data.status === 'exit' ? 'SIGNED OUT' : 'BIOMETRIC VERIFIED'}
                    </span>
                </div>
                <div className="flex items-center space-x-1">
                     <span className="text-[10px] text-gray-400 font-mono">{new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-50 rounded-full"></div>

                <div className="relative z-10 text-center">
                    <div className={`inline-block p-1 rounded-full bg-gradient-to-br mb-4 shadow-lg ${
                        data.status === 'exit' ? 'from-orange-500 to-red-600' : 'from-blue-500 to-indigo-600'
                    }`}>
                         <div className="bg-white p-3 rounded-full">
                            <svg className={`w-10 h-10 ${data.status === 'exit' ? 'text-orange-600' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {data.status === 'exit' ? (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                )}
                            </svg>
                         </div>
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{data.name}</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1 uppercase tracking-wide">ID: {data.studentId}</p>

                    <div className="my-6 border-t border-gray-100"></div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div>
                             <p className="text-xs text-gray-400 uppercase font-semibold">Department</p>
                             <p className="text-sm font-bold text-gray-800">{data.department}</p>
                        </div>
                        <div>
                             <p className="text-xs text-gray-400 uppercase font-semibold">Course</p>
                             <p className="text-sm font-bold text-gray-800 truncate">{data.courseName}</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-end mb-2">
                             <span className="text-sm font-medium text-gray-600">Attendance Rate</span>
                             <span className={`text-2xl font-bold ${data.status === 'exit' ? 'text-orange-600' : 'text-indigo-600'}`}>
                                 {data.attendancePercentage}%
                             </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full transition-all duration-1000 ${
                                    data.status === 'exit' ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                                }`}
                                style={{ width: `${data.attendancePercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Close Button Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors"
                >
                    Close Verification
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
```

### `components\AttendanceAnalytics.tsx`

```tsx
import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import {
  Course,
  Student,
  Session,
  Attendance,
  StudentAnalytics,
} from "../types";
import Spinner from "./Spinner";
import LocationModal from "./LocationModal";

export default function AttendanceAnalytics() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Map<string, Student>>(new Map());
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesSnap, studentsSnap, sessionsSnap, attendanceSnap] =
          await Promise.all([
            getDocs(collection(db, "courses")),
            getDocs(collection(db, "students")),
            getDocs(collection(db, "sessions")),
            getDocs(collection(db, "attendance")),
          ]);

        const coursesData = coursesSnap.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Course)
        );
        const studentsMap = new Map<string, Student>(
          studentsSnap.docs.map((doc) => [
            doc.id,
            { id: doc.id, ...doc.data() } as Student,
          ])
        );
        const sessionsData = sessionsSnap.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Session)
        );
        const attendanceData = attendanceSnap.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Attendance)
        );

        setCourses(coursesData);
        setStudents(studentsMap);
        setSessions(sessionsData);
        setAttendanceRecords(attendanceData);

        if (coursesData.length > 0) {
          setSelectedCourseId(coursesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const analyticsData = useMemo<StudentAnalytics[]>(() => {
    if (!selectedCourseId || students.size === 0) return [];

    const selectedCourse = courses.find((c) => c.id === selectedCourseId);
    if (!selectedCourse) return [];

    const totalClasses = sessions.filter(
      (s) => s.courseId === selectedCourseId
    ).length;

    // Dynamically find enrolled students by matching department and level
    // FIX: Explicitly type the 'student' parameter to resolve type inference issues.
    const enrolledStudents = Array.from(students.values()).filter(
      (student: Student) =>
        student.department === selectedCourse.department &&
        student.level === selectedCourse.level
    );

    if (enrolledStudents.length === 0) return [];

    // FIX: Explicitly type the 'student' parameter to resolve type inference issues.
    return enrolledStudents.map((student: Student) => {
      const studentAttendanceRecords = attendanceRecords.filter(
        (ar) => ar.studentId === student.id && ar.courseId === selectedCourseId
      );

      const attendedClasses = studentAttendanceRecords.length;
      const attendancePercentage =
        totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;

      // Get latest GPS coordinates from attendance records if available
      let latitude: number | undefined = undefined;
      let longitude: number | undefined = undefined;
      if (studentAttendanceRecords.length > 0) {
        const latestRecord =
          studentAttendanceRecords[studentAttendanceRecords.length - 1];
        latitude = latestRecord.latitude;
        longitude = latestRecord.longitude;
      }

      return {
        studentDocId: student.id,
        studentId: student.studentId,
        studentName: student.name,
        totalClasses,
        attendedClasses,
        attendancePercentage: Math.round(attendancePercentage),
        latitude,
        longitude,
      };
    });
  }, [selectedCourseId, courses, students, sessions, attendanceRecords]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance Analytics
        </h1>
        {courses.length > 0 && (
          <div>
            <label htmlFor="course-select" className="sr-only">
              Select a course
            </label>
            <select
              id="course-select"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="block w-full md:w-auto pl-3 pr-10 py-2 text-base bg-white border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.code})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Classes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Classes Attended
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Attendance %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coordinates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Map
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyticsData.length > 0 ? (
              analyticsData.map((data) => (
                <tr key={data.studentDocId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.totalClasses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.attendedClasses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${data.attendancePercentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 font-medium w-12 text-right">
                        {data.attendancePercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.latitude && data.longitude ? (
                        <span className="font-mono text-xs">
                            {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}
                        </span>
                    ) : (
                        <span className="text-gray-400">No Data</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.latitude && data.longitude ? (
                        <button 
                            onClick={() => setSelectedLocation({lat: data.latitude!, lon: data.longitude!})}
                            className="text-blue-600 hover:text-blue-900 flex items-center text-xs font-medium"
                        >
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                           View Map
                        </button>
                    ) : (
                        <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {courses.length === 0
                    ? "No courses found."
                    : "No analytics to display. Ensure students are enrolled and sessions have been conducted."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <LocationModal 
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        latitude={selectedLocation?.lat}
        longitude={selectedLocation?.lon}
      />
    </div>
  );
}
```

### `components\AttendanceCard.tsx`

```tsx
import React, { useRef } from "react";
import type { AccessCardData } from "../types";

interface AttendanceCardProps {
  data: AccessCardData;
  onClose: () => void;
}

export default function AttendanceCard({ data, onClose }: AttendanceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isExit = data.status === 'exit';
  const isEntry = data.status === 'entry' || !data.status; // Default to entry if no status

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        ref={cardRef}
        className="relative w-full max-w-md transform transition-all duration-500 ease-out animate-slide-up"
      >
        {/* Card Container */ }
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Top Security Header */}
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                        isExit ? 'bg-orange-500' : 'bg-green-500' 
                    }`}></div>
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                        ATTENDANCE LOG
                    </span>
                </div>
                <div className="flex items-center space-x-1">
                     <span className="text-[10px] text-gray-400 font-mono">{new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-50 rounded-full"></div>

                <div className="relative z-10 text-center">
                    <div className={`inline-block p-1 rounded-full bg-gradient-to-br mb-4 shadow-lg ${
                        isExit ? 'from-orange-500 to-red-600' : 'from-blue-500 to-indigo-600'
                    }`}>
                         <div className="bg-white p-3 rounded-full">
                            <svg className={`w-10 h-10 ${isExit ? 'text-orange-600' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isExit ? (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                )}
                            </svg>
                         </div>
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{data.name}</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1 uppercase tracking-wide">ID: {data.studentId}</p>

                    <div className="my-6 border-t border-gray-100"></div>

                    <div className="space-y-4">
                        <div className={`p-4 rounded-xl border ${
                            isExit ? 'bg-orange-50 border-orange-100 text-orange-800' : 'bg-blue-50 border-blue-100 text-blue-800'
                        }`}>
                            <p className="font-medium text-lg">
                                {isExit ? "Just signed out of" : "Just signed in to"}
                            </p>
                            <p className="font-bold text-xl mt-1">{data.courseName}</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Close Button Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
```

### `components\AttendanceLog.tsx`

```tsx
import React, { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { AttendanceRecord, Attendance, Student, Course } from '../types';
import Spinner from './Spinner';
import LocationModal from './LocationModal';
import { Download, CheckCircle, XCircle, Trash2, Filter } from 'lucide-react';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';
import { deleteDoc, doc, writeBatch } from 'firebase/firestore';

export default function AttendanceLog() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Map<string, Student>>(new Map());
  const [courses, setCourses] = useState<Map<string, Course>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('all'); // 'all' or courseId
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [deletingLogId, setDeletingLogId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
        try {
            const studentsSnapshot = await getDocs(collection(db, "students"));
            const studentsMap = new Map<string, Student>(studentsSnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() } as Student]));
            setStudents(studentsMap);

            const coursesSnapshot = await getDocs(collection(db, "courses"));
            const coursesMap = new Map<string, Course>(coursesSnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() } as Course]));
            setCourses(coursesMap);
        } catch (error) {
            console.error("Error fetching students and courses:", error);
        }
    };

    fetchStudentsAndCourses();

    const q = query(collection(db, "attendance"), orderBy("joinTime", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const attendanceData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Attendance));
        setAttendance(attendanceData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching attendance:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const exportToCSV = () => {
    const dataToExport = selectedCourse === 'all' ? enrichedAttendance : filteredAttendance;
    const courseName = selectedCourse === 'all' ? 'All_Courses' : courses.get(selectedCourse)?.name?.replace(/\s+/g, '_') || 'Unknown';
    
    const headers = ["Student Name", "Course Name", "Join Time", "Sign Out Time", "Status", "Latitude", "Longitude", "Location"];
    const rows = dataToExport.map(record => [
        record.studentName,
        record.courseName,
        record.joinTime.toDate().toLocaleString(),
        record.signOutTime ? record.signOutTime.toDate().toLocaleString() : "-",
        record.signOutTime ? "Signed Out" : "Signed In",
        record.latitude || "",
        record.longitude || "",
        record.locationName || ""
    ]);

    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `attendance_${courseName}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const enrichedAttendance = useMemo<AttendanceRecord[]>(() => {
    return attendance.map(att => ({
        ...att,
        studentName: students.get(att.studentId)?.name || 'Unknown Student',
        courseName: courses.get(att.courseId)?.name || 'Unknown Course',
    }));
  }, [attendance, students, courses]);

  const filteredAttendance = useMemo<AttendanceRecord[]>(() => {
    if (selectedCourse === 'all') {
      return enrichedAttendance;
    }
    return enrichedAttendance.filter(att => att.courseId === selectedCourse);
  }, [enrichedAttendance, selectedCourse]);

  const handleClearHistory = () => {
    if (attendance.length === 0) return;

    setConfirmModal({
        isOpen: true,
        title: 'Clear All History',
        message: `Are you sure you want to delete ALL ${attendance.length} attendance records?\n\nThis action CANNOT be undone.`,
        onConfirm: async () => {
            setConfirmModal({ ...confirmModal, isOpen: false });
            setLoading(true);

            try {
                // Determine which records to delete (filtered or all? User asked for "all csv logs", likely implies all visible or all globally)
                // Let's stick to "All logs currently loaded" (which is global attendance based on the query)
                // If filtering is applied, we should probably ask if they delete ALL or just Filtered.
                // For simplicity/safety, let's delete ALL records found in the `attendance` state.
                
                const batchSize = 500;
                const recordsToDelete = attendance; // All records
                
                for (let i = 0; i < recordsToDelete.length; i += batchSize) {
                    const batch = writeBatch(db);
                    const chunk = recordsToDelete.slice(i, i + batchSize);
                    
                    chunk.forEach(record => {
                        const ref = doc(db, "attendance", record.id);
                        batch.delete(ref);
                    });
                    
                    await batch.commit();
                }

                setToast({
                    type: 'success',
                    message: 'All attendance history cleared successfully.'
                });
            } catch (error) {
                console.error("Error clearing history:", error);
                setToast({
                    type: 'error',
                    message: 'Failed to clear history.'
                });
            } finally {
                setLoading(false);
            }
        }
    });
  };

  const handleDeleteLog = (record: AttendanceRecord) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Attendance Record',
      message: `Are you sure you want to delete this attendance record?\n\n` +
        `Student: ${record.studentName}\n` +
        `Course: ${record.courseName}\n` +
        `Time: ${record.joinTime.toDate().toLocaleString()}\n\n` +
        `This action cannot be undone!`,
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        setDeletingLogId(record.id);
        
        try {
          await deleteDoc(doc(db, "attendance", record.id));
          setToast({
            type: 'success',
            message: 'Attendance record deleted successfully!'
          });
        } catch (error) {
          console.error("Error deleting attendance:", error);
          setToast({
            type: 'error',
            message: 'Failed to delete attendance record.'
          });
        } finally {
          setDeletingLogId(null);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Live Attendance Log</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredAttendance.length} {filteredAttendance.length === 1 ? 'record' : 'records'}
            {selectedCourse !== 'all' && ` for ${courses.get(selectedCourse)?.name}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
            <Filter size={16} className="text-gray-500" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-transparent border-none text-sm text-gray-900 focus:ring-0 focus:outline-none cursor-pointer"
            >
              <option value="all">All Courses</option>
              {Array.from(courses.values()).map((course: Course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <button 
              onClick={exportToCSV}
              disabled={filteredAttendance.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
              <Download size={18} />
              Export CSV
          </button>
          
          <button 
              onClick={handleClearHistory}
              disabled={loading || attendance.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
              <Trash2 size={18} />
              Clear History
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinates</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Map</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttendance.length > 0 ? filteredAttendance.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.joinTime.toDate().toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        {/* Sign In Indicator */}
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                            !record.signOutTime 
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-400 border border-gray-200"
                        }`}>
                            <div className={`w-2 h-2 rounded-full ${!record.signOutTime ? "bg-green-500" : "bg-gray-400"}`} />
                            IN
                        </div>

                        {/* Sign Out Indicator */}
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                            record.signOutTime 
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-gray-100 text-gray-400 border border-gray-200"
                        }`}>
                            <div className={`w-2 h-2 rounded-full ${record.signOutTime ? "bg-red-500" : "bg-gray-400"}`} />
                            OUT
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.latitude && record.longitude ? (
                        <span className="font-mono text-xs">
                            {record.latitude.toFixed(6)}, {record.longitude.toFixed(6)}
                        </span>
                    ) : (
                        <span className="text-gray-400">No Data</span>
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.latitude && record.longitude ? (
                        <button 
                            onClick={() => setSelectedLocation({ lat: record.latitude!, lon: record.longitude! })}
                            className="text-blue-600 hover:text-blue-900 flex items-center text-xs font-medium"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            View Map
                        </button>
                    ) : (
                        <span className="text-gray-400">—</span>
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDeleteLog(record)}
                    disabled={deletingLogId === record.id}
                    className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                    title="Delete record"
                  >
                    <Trash2 size={16} />
                    {deletingLogId === record.id && <span className="text-xs">Deleting...</span>}
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">No attendance records yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <LocationModal 
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        latitude={selectedLocation?.lat}
        longitude={selectedLocation?.lon}
      />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        variant="danger"
        confirmText="Delete"
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />
    </div>
  );
}
```

### `components\ConfirmModal.tsx`

```tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const variants = {
    danger: {
      icon: 'bg-red-100',
      iconColor: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      icon: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700'
    },
    info: {
      icon: 'bg-blue-100',
      iconColor: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const style = variants[variant];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full"
        style={{
          animation: 'scaleIn 0.2s ease-out'
        }}
      >
        <style>{`
          @keyframes scaleIn {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`${style.icon} p-3 rounded-full flex-shrink-0`}>
              <AlertTriangle className={`w-6 h-6 ${style.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{message}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${style.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### `components\CourseManagement.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, query, where, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Course } from '../types';
import CourseModal from './CourseModal';
import Spinner from './Spinner';

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "courses"), (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Course));
      setCourses(coursesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching courses:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (courseData: Omit<Course, 'id'>) => {
    try {
      // 1. Add the new course and get its ID
      const courseRef = await addDoc(collection(db, 'courses'), courseData);
      const newCourseId = courseRef.id;

      // 2. Find all students matching the department and level
      const studentsQuery = query(
        collection(db, "students"),
        where("department", "==", courseData.department),
        where("level", "==", courseData.level)
      );
      const querySnapshot = await getDocs(studentsQuery);

      // 3. Create a batch write to enroll all matching students
      if (!querySnapshot.empty) {
        const batch = writeBatch(db);
        querySnapshot.forEach((studentDoc) => {
          const courseStudentRef = doc(collection(db, "courseStudents")); // Create a new doc ref
          batch.set(courseStudentRef, {
            courseId: newCourseId,
            studentId: studentDoc.id,
          });
        });
        await batch.commit(); // Commit the batch
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Error saving course and enrolling students:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Courses</h1>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
        >
          Add Course
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length > 0 ? courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.level}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CourseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
```

### `components\CourseModal.tsx`

```tsx
import React, { useState, FormEvent } from "react";
import { Course } from "../types";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: Omit<Course, "id">) => void;
}

const departments = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Cyber Security",
  "Electrical Electronics",
];
const levels = ["100", "200", "300", "400", "500"];

export default function CourseModal({
  isOpen,
  onClose,
  onSubmit,
}: CourseModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [level, setLevel] = useState(levels[0]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !code || !department || !level) {
      setError("All fields are required.");
      return;
    }
    onSubmit({ name, code, department, level });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Course Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-white"
            >
              Course Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-white"
            >
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-indigo-500 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-white"
            >
              Level
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-indigo-500 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### `components\Dashboard.tsx`

```tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import StudentManagement from "./StudentManagement";
import CourseManagement from "./CourseManagement";
import SessionManagement from "./SessionManagement";
import AttendanceLog from "./AttendanceLog";
import AttendanceAnalytics from "./AttendanceAnalytics";
import ServerStatus from "./ServerStatus";


const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (p: any) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    id: "studentManagement",
    label: "Students",
    icon: (p: any) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6m-6-1a6 6 0 00-5.176-5.97M12 12a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
    ),
  },
  {
    id: "courseManagement",
    label: "Courses",
    icon: (p: any) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v11.494m-9-5.747h18"
        />
      </svg>
    ),
  },
  {
    id: "sessionManagement",
    label: "Sessions",
    icon: (p: any) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "attendanceLog",
    label: "Attendance Log",
    icon: (p: any) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: "attendanceAnalytics",
    label: "Analytics",
    icon: (p: any) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
  },
];

export default function Dashboard() {
  const { adminData, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  if (loading || !adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }

  const renderContent = () => {
    const components: { [key: string]: React.ReactNode } = {
      studentManagement: <StudentManagement />,
      courseManagement: <CourseManagement />,
      sessionManagement: <SessionManagement />,
      attendanceLog: <AttendanceLog />,
      attendanceAnalytics: <AttendanceAnalytics />,
      dashboard: (
        <div className="bg-white shadow-xl rounded-lg p-8 text-gray-800">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <ServerStatus />

          <p className="text-lg text-gray-500">
            Welcome back, {adminData.name}.
          </p>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-lg text-gray-800">{adminData.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-lg text-gray-800">
                  {adminData.email}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-lg text-gray-800">{adminData.role}</dd>
              </div>
            </dl>
          </div>
        </div>
      ),
    };
    return components[activeTab] || components.dashboard;
  };

  const getTabClass = (tabId: string) =>
    `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
      activeTab === tabId
        ? "bg-blue-600 text-white font-semibold"
        : "text-gray-400 hover:bg-gray-700 hover:text-white"
    }`;

  const SidebarContent = () => (
    <>
      <div>
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.789-2.75 9.566l-2.75-2.75a2.25 2.25 0 01-3.182 0l-2.75 2.75A18.003 18.003 0 0112 11z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-3.517 1.009-6.789 2.75-9.566l2.75 2.75a2.25 2.25 0 013.182 0l2.75-2.75A18.003 18.003 0 0112 11z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={getTabClass(item.id)}
            >
              {item.icon({ className: "w-6 h-6 flex-shrink-0" })}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center space-x-3 px-2 mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-blue-400 font-bold">
            {adminData.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-white truncate">
              {adminData.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{adminData.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen md:flex">
      {/* Mobile Sidebar & Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 flex flex-col justify-between transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center bg-white p-4 shadow-md sticky top-0 z-20">
          <h1 className="text-lg font-semibold text-gray-800">
            {navItems.find((item) => item.id === activeTab)?.label ||
              "Dashboard"}
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
```

### `components\ExamCard.tsx`

```tsx
import React, { useRef } from "react";
import type { AccessCardData } from "../types";

interface ExamCardProps {
  data: AccessCardData;
  onClose: () => void;
}

export default function ExamCard({ data, onClose }: ExamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isExit = data.status === 'exit';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        ref={cardRef}
        className="relative w-full max-w-md transform transition-all duration-500 ease-out animate-slide-up"
      >
        {/* Card Container */ }
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Top Security Header */}
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                        isExit ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                        {isExit ? "SESSION ENDED" : "EXAM VERIFIED"}
                    </span>
                </div>
                <div className="flex items-center space-x-1">
                     <span className="text-[10px] text-gray-400 font-mono">{new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-50 rounded-full"></div>

                <div className="relative z-10 text-center">
                    <div className={`inline-block p-1 rounded-full bg-gradient-to-br mb-4 shadow-lg ${
                        isExit ? 'from-orange-500 to-red-600' : 'from-indigo-500 to-purple-600'
                    }`}>
                         <div className="bg-white p-3 rounded-full">
                            <svg className={`w-10 h-10 ${isExit ? 'text-orange-600' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                         </div>
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{data.name}</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1 uppercase tracking-wide">ID: {data.studentId}</p>

                    <div className="my-6 border-t border-gray-100"></div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div>
                             <p className="text-xs text-gray-400 uppercase font-semibold">Department</p>
                             <p className="text-sm font-bold text-gray-800">{data.department}</p>
                        </div>
                        <div>
                             <p className="text-xs text-gray-400 uppercase font-semibold">Course</p>
                             <p className="text-sm font-bold text-gray-800 truncate">{data.courseName}</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-end mb-2">
                             <span className="text-sm font-medium text-gray-600">Avg. Attendance</span>
                             <span className={`text-2xl font-bold ${isExit ? 'text-orange-600' : 'text-indigo-600'}`}>
                                 {data.attendancePercentage}%
                             </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full transition-all duration-1000 ${
                                    isExit ? 'bg-orange-500' : 'bg-indigo-600'
                                }`}
                                style={{ width: `${data.attendancePercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Close Button Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors"
                >
                    Close Verification
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
```

### `components\ExamVerification.tsx`

```tsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Course, Student, AccessCardData } from "../types";
import ExamCard from "./ExamCard";
import { CheckCircle, XCircle, Fingerprint, Loader } from "lucide-react";

type ScanState = "idle" | "scanning" | "success" | "error";

export default function ExamVerification() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Click button to begin verification"
  );
  const [verifiedData, setVerifiedData] = useState<AccessCardData | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000"); // Using port 5000 based on FingerprintPortal
    let isMounted = true;

    ws.current.onopen = () => {
      if (isMounted) console.log("Verification portal connected to bridge.");
    };
    ws.current.onerror = () => {
      if (isMounted) {
        setScanState("error");
        setStatusMessage("Bridge connection failed.");
      }
    };
    ws.current.onmessage = (event) => {
      if (!isMounted) return;
      
      let messageStr = event.data.toString();
      let status = "", data: any = "";
      
      try {
        const jsonData = JSON.parse(messageStr);
        if (jsonData.type === "VERIFY_RESPONSE") {
             if (jsonData.success) {
                 handleSuccessfulVerification(jsonData.id.toString());
                 return; 
             } else {
                 status = "ERROR";
                 data = "No match found";
             }
        } else if (jsonData.type === "SIGNED_OUT") {
             setScanState("success");
             setStatusMessage(`${jsonData.studentName}: Signed Out`);
             setVerifiedData({
                name: jsonData.studentName,
                studentId: jsonData.studentId,
                department: jsonData.department,
                courseName: jsonData.courseName,
                attendancePercentage: jsonData.attendancePercentage,
                status: 'exit'
             });
             return;
        } else if (jsonData.type === "ESP32_STATUS") {
            // Ignore status updates here for now
            return;
        } else {
             status = jsonData.type || "UNKNOWN";
             data = jsonData.data || "";
        }
      } catch (e) {
        const parts = messageStr.split(":", 2);
        status = parts[0];
        data = parts[1];
      }

      if (status === "SUCCESS") handleSuccessfulVerification(data);
      else if (status === "STATUS") setStatusMessage(data);
      else if (status !== "ATTENDANCE") {
        setScanState("error");
        setStatusMessage(typeof data === 'string' ? data : "Verification failed");
      }
    };

    return () => {
      isMounted = false;
      if (ws.current?.readyState === WebSocket.OPEN) ws.current.close();
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (scanState === "error") {
      timer = setTimeout(() => {
        setScanState("idle");
        setStatusMessage("Click button to begin verification");
        setVerifiedData(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [scanState]);

  const handleSuccessfulVerification = async (fingerprintId: string) => {
    try {
      // 1. Find student by fingerprint
      const studentQuery = query(
        collection(db, "students"),
        where("fingerprintTemplate", "==", fingerprintId)
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (studentSnapshot.empty) {
        setScanState("error");
        setStatusMessage(
          "Fingerprint not recognized. Please contact the exam officer."
        );
        return;
      }
      const studentDoc = studentSnapshot.docs[0];
      const studentData = {
        id: studentDoc.id,
        ...studentDoc.data(),
      } as Student;

      // 2. Find an active session for the student's course
      const activeSessionsQuery = query(
        collection(db, "sessions"),
        where("active", "==", true)
      );
      const activeSessionsSnapshot = await getDocs(activeSessionsQuery);
      if (activeSessionsSnapshot.empty) {
        setScanState("error");
        setStatusMessage("No active exam session found.");
        return;
      }

      const coursesSnap = await getDocs(collection(db, "courses"));
      const coursesMap = new Map<string, Omit<Course, "id">>(
        coursesSnap.docs.map((doc) => [
          doc.id,
          doc.data() as Omit<Course, "id">,
        ])
      );

      let matchedSessionDoc = null;
      let matchedCourseData: (Omit<Course, "id"> & { id: string }) | null =
        null;
      for (const sessionDoc of activeSessionsSnapshot.docs) {
        const sessionData = sessionDoc.data();
        const courseData = coursesMap.get(sessionData.courseId);
        if (
          courseData &&
          courseData.department === studentData.department &&
          courseData.level === studentData.level
        ) {
          matchedSessionDoc = sessionDoc;
          matchedCourseData = { id: sessionData.courseId, ...courseData };
          break;
        }
      }

      if (!matchedSessionDoc || !matchedCourseData) {
        setScanState("error");
        setStatusMessage(`No active exam for your department/level.`);
        return;
      }
      const courseId = matchedCourseData.id;

      // 3. Calculate attendance percentage
      const allSessionsSnap = await getDocs(
        query(collection(db, "sessions"), where("courseId", "==", courseId))
      );
      const totalClasses = allSessionsSnap.docs.length;

      const attendanceSnap = await getDocs(
        query(
          collection(db, "attendance"),
          where("studentId", "==", studentData.id),
          where("courseId", "==", courseId)
        )
      );
      const attendedClasses = attendanceSnap.docs.length;

      const attendancePercentage =
        totalClasses > 0
          ? Math.round((attendedClasses / totalClasses) * 100)
          : 0;

      // 4. Check attendance threshold
      if (attendancePercentage < 70) {
        setScanState("error");
        setStatusMessage(
          `Access Denied: Minimum 70% attendance required. Yours is ${attendancePercentage}%.`
        );
        return;
      }

      // 5. Grant Access
      setScanState("success");
      setStatusMessage("Verified");
      setVerifiedData({
        name: studentData.name,
        studentId: studentData.studentId,
        department: studentData.department,
        courseName: `${matchedCourseData.name} (${matchedCourseData.code})`,
        attendancePercentage: attendancePercentage,
      });

    } catch (error) {
      console.error("Verification Error:", error);
      setScanState("error");
      setStatusMessage("An unexpected server error occurred.");
    }
  };

  const handleStartVerification = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      setScanState("error");
      setStatusMessage("Bridge not connected. Please refresh.");
      return;
    }
    setScanState("scanning");
    setStatusMessage("Place your finger on the scanner...");
    ws.current.send("VERIFY_FINGERPRINT");
  };

  const handleCloseCard = () => {
    setVerifiedData(null);
    setScanState("idle");
    setStatusMessage("Click button to begin verification");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      
      {verifiedData && <ExamCard data={verifiedData} onClose={handleCloseCard} />}

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <h1 className="text-3xl font-semibold text-gray-300 mb-2">
            Exam Verification
          </h1>
          <p className="text-gray-500">
            Verify eligibility for exam entry
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800 rounded-3xl shadow-lg p-8">
          {/* Icon Container */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Animated glow effect */}
              <div
                className={`absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-500 ${
                  scanState === "scanning"
                    ? "bg-blue-500 scale-150"
                    : scanState === "success"
                    ? "bg-green-500 scale-150"
                    : scanState === "error"
                    ? "bg-red-500 scale-150"
                    : "bg-transparent"
                }`}
              />

              {/* Icon circle */}
              <div
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  scanState === "scanning"
                    ? "bg-blue-50 border-2 border-blue-500"
                    : scanState === "success"
                    ? "bg-green-50 border-2 border-green-500"
                    : scanState === "error"
                    ? "bg-red-50 border-2 border-red-500"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {scanState === "scanning" && (
                  <Loader className="w-12 h-12 text-blue-600 animate-spin" />
                )}
                {scanState === "success" && (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                )}
                {scanState === "error" && (
                  <XCircle className="w-12 h-12 text-red-600" />
                )}
                {scanState === "idle" && (
                  <Fingerprint className="w-12 h-12 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center mb-8">
            <p
              className={`text-lg font-semibold transition-all duration-300 ${
                scanState === "scanning"
                  ? "text-blue-600"
                  : scanState === "success"
                  ? "text-green-600"
                  : scanState === "error"
                  ? "text-red-600"
                  : "text-gray-300"
              }`}
            >
              {statusMessage}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartVerification}
            disabled={scanState === "scanning"}
            className={`w-full py-4 rounded-xl font-medium text-base transition-all duration-200 ${
              scanState === "scanning"
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-md hover:shadow-lg"
            }`}
          >
            {scanState === "scanning"
              ? "Verifying..."
              : "Start Verification"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Secured by Dern Technology
          </p>
        </div>
      </div>
    </div>
  );
}
```

### `components\FingerprintPortal.tsx`

```tsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Course, AccessCardData } from "../types";
import AttendanceCard from "./AttendanceCard";
import StatusModal from "./StatusModal";
import { CheckCircle, XCircle, Fingerprint, Loader, Satellite, Wifi } from "lucide-react";

export default function FingerprintPortal() {
  const [scanState, setScanState] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("Initializing...");
  const [gpsStatus, setGpsStatus] = useState<"searching" | "ready" | "offline">("offline");
  const [cardData, setCardData] = useState<AccessCardData | null>(null);
  
  // New state for Error/Status Modal
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'info', title: '', message: '' });

  const ws = useRef<WebSocket | null>(null);
  const hasNotifiedReady = useRef(false);

  useEffect(() => {
    // Connect to the bridge server
    ws.current = new WebSocket("ws://localhost:5000");
    let isMounted = true;

    ws.current.onopen = () => {
      if (isMounted) {
          console.log("Portal connected to bridge.");
          setStatusMessage("Syncing Satellite Data...");
          setGpsStatus("searching");
      }
    };

    ws.current.onmessage = (event) => {
      if (!isMounted) return;

      let messageStr = event.data.toString();
      let status = "", data: any = "";
      
      try {
        const jsonData = JSON.parse(messageStr);
        
        // Handle GPS/Status Updates
        if (jsonData.type === "ESP32_STATUS") {
             const d = jsonData.data;
             const hasFix = d.gpsFixed === true && d.satellites > 0;
             if (hasFix) {
                 if (gpsStatus !== "ready") {
                     setGpsStatus("ready");
                     setStatusMessage("Ready to authenticate");
                     if (!hasNotifiedReady.current) {
                         hasNotifiedReady.current = true;
                     }
                 }
             } else {
                 if (gpsStatus !== "searching") {
                     setGpsStatus("searching");
                     setStatusMessage("Syncing Satellite Data...");
                 }
             }
             return;
        }

        if (jsonData.type === "ATTENDANCE") {
            setScanState("success");
            setStatusMessage("Signed In");
            setCardData({
                name: jsonData.studentName || jsonData.data?.studentName || "Student",
                studentId: jsonData.studentId || jsonData.data?.studentId || "N/A",
                department: jsonData.department || jsonData.data?.department || "N/A",
                courseName: jsonData.courseName || jsonData.data?.courseName || "Course",
                attendancePercentage: jsonData.attendancePercentage || jsonData.data?.attendancePercentage || 0,
                status: 'entry'
            });
            return;
        } else if (jsonData.type === "DUPLICATE_ATTENDANCE") {
            setStatusModal({
                isOpen: true,
                type: 'warning',
                title: 'Already Marked',
                message: `${jsonData.studentName}: Attendance has already been taken for this session.`
            });
            setScanState("idle");
            return;
        } else if (jsonData.type === "SIGNED_OUT") {
            setScanState("success");
            setStatusMessage(`${jsonData.studentName}: Signed Out`);
            setCardData({
                name: jsonData.studentName,
                studentId: jsonData.studentId,
                department: jsonData.department,
                courseName: jsonData.courseName,
                attendancePercentage: jsonData.attendancePercentage,
                status: 'exit'
            });
            return;
        } else if (jsonData.type === "SESSION_COMPLETED") {
             setStatusModal({
                 isOpen: true,
                 type: 'info',
                 title: 'Session Closed',
                 message: `${jsonData.studentName}: You have already signed out of this session.`
             });
             setScanState("idle");
             return;
        } else if (jsonData.type === "NO_ACTIVE_SESSION") {
             setStatusModal({
                 isOpen: true,
                 type: 'error',
                 title: 'No Session',
                 message: `${jsonData.studentName}: There are no active sessions available right now.`
             });
             setScanState("idle");
             return;
        } else if (jsonData.type === "NO_MATCHING_SESSION") {
             setStatusModal({
                 isOpen: true,
                 type: 'error',
                 title: 'Wrong Session',
                 message: `${jsonData.studentName}: No active session matches your Department (${jsonData.department}) and Level.`
             });
             setScanState("idle");
             return;
        } else if (jsonData.type === "ENROLL_RESPONSE") {
            status = jsonData.success ? "SUCCESS" : "ERROR";
            data = jsonData.error || jsonData.id || "Enrollment failed";
        } else if (jsonData.type === "VERIFY_RESPONSE") {
             if (jsonData.success) {
                 setScanState("success");
                 setStatusMessage("Fingerprint verified, processing...");
                 return; 
             } else {
                 setStatusModal({
                     isOpen: true,
                     type: 'error',
                     title: 'Not Recognized',
                     message: 'Fingerprint did not match any student record.'
                 });
                 setScanState("error");
                 setStatusMessage("Fingerprint not recognized");
                 return;
             }
        } else {
             status = jsonData.type || "UNKNOWN";
        }
      } catch (e) {
        const parts = messageStr.split(":", 2);
        status = parts[0];
        data = parts[1];
      }

      if (status === "SUCCESS") {
        // Legacy handling if needed
      } else if (status === "STATUS") {
        if (gpsStatus === "ready" && typeof data === 'string' && data.length < 50) {
            setStatusMessage(data);
        }
      }
    };

    ws.current.onerror = async () => {
      if (isMounted) {
        setScanState("error");
        setGpsStatus("offline");
        setStatusMessage("Bridge Offline");
      }
    };

    return () => {
      isMounted = false;
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []); // Only run once on mount

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    // Reset state after success or error (short delay)
    if (scanState === "error" || scanState === "success") {
      timer = setTimeout(() => {
        if (!cardData && !statusModal.isOpen) {
            setScanState("idle");
            setStatusMessage(gpsStatus === "ready" ? "Ready to authenticate" : "Syncing Satellite Data...");
        }
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [scanState, cardData, statusModal.isOpen, gpsStatus]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (cardData) {
      timer = setTimeout(() => {
        setCardData(null);
        setScanState("idle");
        setStatusMessage(gpsStatus === "ready" ? "Ready to authenticate" : "Syncing Satellite Data...");
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [cardData, gpsStatus]);

  const handleStartVerification = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      setStatusModal({
          isOpen: true,
          type: 'error',
          title: 'Connection Error',
          message: 'The system is not connected to the bridge server.'
      });
      return;
    }
    
    if (gpsStatus !== "ready") {
        setStatusModal({
            isOpen: true,
            type: 'warning',
            title: 'GPS Offline',
            message: 'Waiting for satellite synchronization. Please wait for GPS Lock.'
        });
        return;
    }

    setScanState("scanning");
    setStatusMessage("Place your finger");
    ws.current.send("VERIFY_FINGERPRINT");
  };

  const handleCloseCard = () => {
    setCardData(null);
    setScanState("idle");
    setStatusMessage(gpsStatus === "ready" ? "Ready to authenticate" : "Syncing Satellite Data...");
  };

  return (
    <div className="min-h-screen  bg-black-800  flex flex-col items-center justify-center p-6">
      
      {cardData && <AttendanceCard data={cardData} onClose={handleCloseCard} />}
      
      <StatusModal 
        isOpen={statusModal.isOpen} 
        onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
      />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-4 right-0 flex gap-2">
               {/* GPS Status Badge */}
               <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-md ${
                   gpsStatus === "ready" ? "bg-green-500/20 text-green-300 border border-green-400/30 shadow-lg shadow-green-500/20" : 
                   gpsStatus === "searching" ? "bg-blue-500/20 text-blue-300 border border-blue-400/30 animate-pulse" : 
                   "bg-gray-500/20 text-gray-400 border border-gray-400/20"
               }`}>
                   <Satellite className={`w-3.5 h-3.5 ${
                       gpsStatus === "ready" ? "" : gpsStatus === "searching" ? "animate-spin" : ""
                   }`} />
                   <span>{gpsStatus === "ready" ? "GPS LOCKED" : gpsStatus === "searching" ? "ACQUIRING..." : "OFFLINE"}</span>
               </div>
          </div>
          <h1 className="text-3xl font-semibold text-gray-300 mb-2">
            Biometric Login
          </h1>
          <p className="text-gray-500">
            Authenticate using your fingerprint
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800  rounded-3xl shadow-lg p-8">
          {/* Icon Container */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Animated glow effect */}
              <div
                className={`absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-500 ${
                  scanState === "scanning"
                    ? "bg-blue-500 scale-150"
                    : scanState === "success"
                    ? "bg-green-500 scale-150"
                    : scanState === "error"
                    ? "bg-red-500 scale-150"
                    : "bg-transparent"
                }`}
              />
              {/* Icon circle */}
              <div
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  scanState === "scanning"
                    ? "bg-blue-50 border-2 border-blue-500"
                    : scanState === "success"
                    ? "bg-green-50 border-2 border-green-500"
                    : scanState === "error"
                    ? "bg-red-50 border-2 border-red-500"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {scanState === "scanning" && (
                  <Loader className="w-12 h-12 text-blue-600 animate-spin" />
                )}
                {scanState === "success" && (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                )}
                {scanState === "error" && (
                  <XCircle className="w-12 h-12 text-red-600" />
                )}
                {scanState === "idle" && (
                  <Fingerprint className="w-12 h-12 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center mb-8">
            <p
              className={`text-lg font-semibold transition-all duration-300 ${
                scanState === "scanning"
                  ? "text-blue-600"
                  : scanState === "success"
                  ? "text-green-600"
                  : scanState === "error"
                  ? "text-red-600"
                  : gpsStatus === "searching"
                  ? "text-blue-400"
                  : "text-gray-300"
              }`}
            >
              {statusMessage}
            </p>
            {gpsStatus === "searching" && (
              <p className="text-xs text-gray-500 mt-2 animate-pulse">Waiting for satellite lock...</p>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartVerification}
            disabled={scanState === "scanning" || gpsStatus !== "ready"}
            className={`w-full py-4 rounded-xl font-medium text-base transition-all duration-200 ${
              scanState === "scanning" || gpsStatus !== "ready"
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg"
            }`}
          >
            {scanState === "scanning"
              ? "Scanning..."
              : gpsStatus !== "ready"
              ? "Waiting for GPS..."
              : "Start Authentication"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Secured by Dern Technology
          </p>
        </div>
      </div>
    </div>
  );
}
```

### `components\GlobalAttendanceListener.tsx`

```tsx
import React, { useEffect, useRef } from "react";
import { db } from "../services/firebase";
import { reverseGeocode } from "../services/geocoding";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { Attendance } from "../types";

// Global Lock Set (outside component to survive remounts)
const globalPendingAttendance = new Set<string>();

export default function GlobalAttendanceListener() {
  const ws = useRef<WebSocket | null>(null);
  const lastKnownGPS = useRef<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  // Data Caches
  const [coursesCache, setCoursesCache] = React.useState<Map<string, any>>(new Map());
  const [activeSessionsCache, setActiveSessionsCache] = React.useState<any[]>([]);
  const coursesRef = useRef(new Map());
  const sessionsRef = useRef<any[]>([]);

  // Track last processed verification to prevent duplicates
  const lastProcessedVerification = useRef<{
    id: string | null;
    timestamp: number;
  }>({ id: null, timestamp: 0 });

  // Sync refs with state for use in async functions
  useEffect(() => {
      coursesRef.current = coursesCache;
  }, [coursesCache]);

  useEffect(() => {
      sessionsRef.current = activeSessionsCache;
  }, [activeSessionsCache]);

  // DATA SUBSCRIPTIONS
  useEffect(() => {
      // Cache Courses
      const unsubCourses = onSnapshot(collection(db, "courses"), (snapshot) => {
          const map = new Map();
          snapshot.docs.forEach(doc => map.set(doc.id, { id: doc.id, ...doc.data() }));
          setCoursesCache(map);
          console.log(`📦 Cached ${snapshot.size} courses`);
      });

      // Cache Active Sessions
      const qSessions = query(collection(db, "sessions"), where("active", "==", true));
      const unsubSessions = onSnapshot(qSessions, (snapshot) => {
          const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setActiveSessionsCache(sessions);
          console.log(`📦 Cached ${snapshot.size} active sessions`);
      });

      return () => {
          unsubCourses();
          unsubSessions();
      };
  }, []);

  useEffect(() => {
    // Connect to the bridge server
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("Global Listener connected to bridge.");
    };

    ws.current.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === "ESP32_STATUS") {
           // Cache the latest GPS coordinates
           if (message.data && message.data.type === "STATUS") {
               if (message.data.lat && message.data.lon) {
                   lastKnownGPS.current = {
                       latitude: message.data.lat,
                       longitude: message.data.lon
                   };
               }
           }
        } else if (message.type === "VERIFY_RESPONSE" && message.success) {
           // Handle fingerprint verification
           const verificationId = message.id?.toString();
           const now = Date.now();
           const timeSinceLastProcess = now - lastProcessedVerification.current.timestamp;
           
           const isDuplicate = 
             lastProcessedVerification.current.id === verificationId && 
             timeSinceLastProcess < 5000;
           
           if (!isDuplicate) {
             lastProcessedVerification.current = {
               id: verificationId,
               timestamp: now
             };
             
             const lat = message.latitude || message.lat || lastKnownGPS.current.latitude;
             const lon = message.longitude || message.lon || lastKnownGPS.current.longitude;

             await handleAttendance({
               id: message.id,
               latitude: lat,
               longitude: lon 
             });
           } else {
             console.log(`⚠️ Skipping duplicate verification for ID ${verificationId}`);
           }
        }
      } catch (e) {
        // Ignore non-JSON
      }
    };

    ws.current.onclose = () => {
      // Reconnect handled by user refresh or simple timeout
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const handleAttendance = async (data: any) => {
    const { id: fingerprintId, latitude: payloadLat, longitude: payloadLon } = data;
    const latitude = payloadLat || lastKnownGPS.current.latitude;
    const longitude = payloadLon || lastKnownGPS.current.longitude;

    // 1. Find student (Try to optimize this later if needed, for now query is necessary)
      const studentsRef = collection(db, "students");
      const q = query(
        studentsRef,
        where("fingerprintTemplate", "==", fingerprintId.toString())
      );
      // This is the only critical network read now
      const studentSnapshot = await getDocs(q);

      if (studentSnapshot.empty) {
        console.warn(`⚠️ Unknown fingerprint ID: ${fingerprintId}`);
        return;
      }

      const studentDoc = studentSnapshot.docs[0];
      const studentData = studentDoc.data();
      const studentId = studentDoc.id;

      // 2. Find matching active session from CACHE (Instant)
      // Use refs to access latest data without dependency execution
      const activeSessions = sessionsRef.current;
      const coursesMap = coursesRef.current;

      if (activeSessions.length === 0) {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({
            type: "NO_ACTIVE_SESSION",
            studentName: studentData.name,
            message: "No active sessions available"
          }));
        }
        return;
      }

      let matchedSession = null;
      let matchedCourseId = null;

      for (const sData of activeSessions) {
          const cData = coursesMap.get(sData.courseId);
          if (cData && cData.department === studentData.department && cData.level === studentData.level) {
              matchedSession = sData;
              matchedCourseId = sData.courseId;
              break;
          }
      }

      if (!matchedSession) {
           if (ws.current && ws.current.readyState === WebSocket.OPEN) {
             ws.current.send(JSON.stringify({
               type: "NO_MATCHING_SESSION",
               studentName: studentData.name,
               department: studentData.department,
               level: studentData.level,
               message: "No active session for your department and level"
             }));
           }
           return;
      }

      const sessionId = matchedSession.id;
      const courseId = matchedCourseId;

      // 4. Memory Lock to prevent race conditions
      const lockKey = `${studentId}-${sessionId}`;
      if (globalPendingAttendance.has(lockKey)) {
           console.warn(`🔒 Blocked duplicate processing for ${studentData.name} (Global Locked)`);
           // Optional: Send feedback if needed
           if (ws.current && ws.current.readyState === WebSocket.OPEN) {
             ws.current.send(JSON.stringify({
               type: "DUPLICATE_ATTENDANCE",
               studentName: studentData.name,
               message: "Processing previous request..."
             }));
           }
           return;
      }
      globalPendingAttendance.add(lockKey);

      try {
      // 3. Mark attendance
      // Check for EXISTING status (Network Read 2 - Necessary for Toggle)
      const attendanceRef = collection(db, "attendance");
      const attendanceQuery = query(
        attendanceRef,
        where("studentId", "==", studentId),
        where("sessionId", "==", sessionId)
      );
      const existingAttendance = await getDocs(attendanceQuery);

      // --- CRITICAL PATH OPTIMIZATION ---
      // Decide IN or OUT and broadast UI IMMEDIATELY
      // Do not wait for Geocoding or DB Write

      if (!existingAttendance.empty) {
        const attendanceDoc = existingAttendance.docs[0];
        const attendanceData = attendanceDoc.data();

        if (attendanceData.signOutTime) {
             if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({
                    type: "SESSION_COMPLETED",
                    studentName: studentData.name,
                    message: "Session already completed"
                }));
             }
             return;
        }

        // --- OPTIMISTIC UI BROADCAST: SIGN OUT ---
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: "SIGNED_OUT",
                studentName: studentData.name,
                studentId: studentData.studentId,
                department: studentData.department,
                courseName: coursesMap.get(courseId)?.name || "Unknown Course",
                attendancePercentage: 0, 
                message: "Signed Out Successfully"
            }));
        }

        // Background Write: Sign Out
        console.log(`ℹ️ Signing out ${studentData.name} (Background)`);
        updateDoc(attendanceDoc.ref, {
            signOutTime: Timestamp.now()
        })
        .then(() => globalPendingAttendance.delete(lockKey))
        .catch(err => {
            console.error("❌ SignOut Write Failed:", err);
            globalPendingAttendance.delete(lockKey);
        });
        
        return;
      }

      // --- OPTIMISTIC UI BROADCAST: SIGN IN ---
      // Calculate weak percentage or just verify
      const courseName = coursesMap.get(courseId)?.name || "Unknown Course";
      
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({
              type: "ATTENDANCE",
              studentName: studentData.name,
              studentId: studentData.studentId,
              department: studentData.department,
              courseName: courseName,
              attendancePercentage: 0, // Placeholder to be fast
              message: "Signed In Successfully"
          }));
      }

      // Background Write: Sign In
      // This happens AFTER UI is already entered
      (async () => {
          const locationName = latitude && longitude 
            ? await reverseGeocode(latitude, longitude)
            : 'No GPS';

          await addDoc(attendanceRef, {
            studentId,
            courseId,
            sessionId,
            joinTime: Timestamp.now(),
            verified: true,
            verificationMethod: "fingerprint",
            latitude: latitude || null,
            longitude: longitude || null,
            locationName: locationName,
          });

          console.log(`✅ Attendance Logged: ${studentData.name} | 📍 ${locationName}`);
      })()
      .then(() => globalPendingAttendance.delete(lockKey))
      .catch(err => {
          console.error("❌ Attendance Write Failed:", err);
          globalPendingAttendance.delete(lockKey);
      });


    } catch (error) {
      console.error("❌ Attendance error:", error);
      globalPendingAttendance.delete(lockKey);
    }
  };

  return null;
}
```

### `components\LocationModal.tsx`

```tsx
import React from "react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: number | undefined;
  longitude: number | undefined;
  title?: string;
}

export default function LocationModal({
  isOpen,
  onClose,
  latitude,
  longitude,
  title = "Attendance Location",
}: LocationModalProps) {
  if (!isOpen || latitude === undefined || longitude === undefined) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-fade-in-scale">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="p-0 h-96 bg-gray-100 relative">
          <iframe
            title="Location Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="p-4 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
          <span>
            Lat: {latitude.toFixed(6)}, Lon: {longitude.toFixed(6)}
          </span>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
```

### `components\Login.tsx`

```tsx
import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Incorrect email or password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        default:
          setError("Failed to log in. Please check your credentials.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### `components\ProtectedRoute.tsx`

```tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // ✅ v6 uses <Navigate /> instead of <Redirect />
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
```

### `components\ServerStatus.tsx`

```tsx
import React, { useState, useEffect, useRef } from "react";
import { BridgeStatus } from "../types";

export default function ServerStatus() {
  const [status, setStatus] = useState<BridgeStatus>({
    esp32Connected: false,
    webClients: 0,
    uptime: 0,
    timestamp: "",
  });
  const [isBridgeOnline, setIsBridgeOnline] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket("ws://localhost:5000");

      ws.current.onopen = () => {
        setIsBridgeOnline(true);
      };

      ws.current.onclose = () => {
        setIsBridgeOnline(false);
        // Try to reconnect after 3 seconds
        setTimeout(connect, 3000);
      };

      ws.current.onerror = () => {
        setIsBridgeOnline(false);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === "ESP32_CONNECTION") {
            setStatus((prev) => ({
              ...prev,
              esp32Connected: message.connected,
            }));
          } else if (message.type === "ESP32_STATUS") {
            setStatus((prev) => ({
              ...prev,
              esp32Connected: true,
              esp32Status: message.data,
            }));
          }
        } catch (e) {
          console.error("Failed to parse status message", e);
        }
      };
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">System Status</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Bridge Server Status */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Connection Server</span>
          <div className="flex items-center mt-1">
            <span
              className={`w-3 h-3 rounded-full mr-2 ${
                isBridgeOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span className={`font-medium ${isBridgeOnline ? "text-green-700" : "text-red-700"}`}>
              {isBridgeOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* ESP32 Connection Status */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">ESP32 Device</span>
          <div className="flex items-center mt-1">
             <span 
                 className={`w-3 h-3 rounded-full mr-2 ${
                     status.esp32Connected ? "bg-green-500" : "bg-gray-400"
                 }`}
             ></span>
             <span className="font-medium text-gray-800">
                 {status.esp32Connected ? "Connected" : "Disconnected"}
             </span>
          </div>
        </div>

        {/* New: Granular Module Status */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Modules</span>
          <div className="flex flex-col mt-1 space-y-1">
             <div className="flex items-center text-sm">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                    status.esp32Status?.fingerprint ? "bg-green-500" : "bg-red-400"
                }`}></span>
                <span className="text-gray-600">Fingerprint</span>
             </div>
             <div className="flex items-center text-sm">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                    status.esp32Status?.gps ? "bg-green-500" : "bg-red-400"
                }`}></span>
                <span className="text-gray-600">GPS {status.esp32Status?.gpsFixed ? "(Fixed)" : ""}</span>
             </div>
          </div>
        </div>

        {/* GPS Satellites */}
         <div className="flex flex-col">
           <span className="text-xs text-gray-500 uppercase">Satellites</span>
           <span className="text-lg font-bold text-gray-800">
             {status.esp32Status?.satellites || 0}
           </span>
         </div>
      </div>
    </div>
  );
}
```

### `components\SessionManagement.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, onSnapshot, getDocs, doc, addDoc, updateDoc, query, where, Timestamp } from 'firebase/firestore';
import { Course, Session } from '../types';
import Spinner from './Spinner';

export default function SessionManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            const coursesSnapshot = await getDocs(collection(db, "courses"));
            const coursesData = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
            setCourses(coursesData);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const unsubscribeSessions = onSnapshot(collection(db, "sessions"), (snapshot) => {
        const sessionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session));
        setSessions(sessionsData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching sessions:", error);
        setLoading(false);
    });

    fetchCourses();
    return () => unsubscribeSessions();
  }, []);
  
  const handleToggleSession = async (courseId: string) => {
    const activeSessionQuery = query(collection(db, "sessions"), where("courseId", "==", courseId), where("active", "==", true));
    const activeSessionSnapshot = await getDocs(activeSessionQuery);

    if (activeSessionSnapshot.empty) {
        // No active session, so start one
        await addDoc(collection(db, "sessions"), {
            courseId: courseId,
            startTime: Timestamp.now(),
            endTime: null,
            active: true
        });
    } else {
        // Active session exists, so end it
        const sessionDoc = activeSessionSnapshot.docs[0];
        await updateDoc(doc(db, "sessions", sessionDoc.id), {
            endTime: Timestamp.now(),
            active: false
        });
    }
  };

  const getCourseName = (courseId: string) => {
    return courses.find(c => c.id === courseId)?.name || 'Unknown Course';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Manage Class Sessions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length > 0 ? courses.map((course) => {
                const isActive = sessions.some(s => s.courseId === course.id && s.active);
                return (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name} ({course.code})</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleToggleSession(course.id)} 
                        className={`px-4 py-2 text-white font-medium rounded-md ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                        {isActive ? 'End Session' : 'Start Session'}
                      </button>
                    </td>
                  </tr>
                )
            }) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No courses found. Add courses first.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### `components\Spinner.tsx`

```tsx

import React from 'react';

export default function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
```

### `components\StatusModal.tsx`

```tsx
import React from 'react';
import { XCircle, AlertTriangle, Info } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export default function StatusModal({ isOpen, onClose, type, title, message }: StatusModalProps) {
  if (!isOpen) return null;

  const bgColors = {
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50'
  };

  const textColors = {
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  };

  const borderColors = {
    error: 'border-red-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200'
  };

  const Icon = {
    error: XCircle,
    warning: AlertTriangle,
    info: Info
  }[type];

  // Auto-close after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`relative w-full max-w-sm transform transition-all duration-300 animate-scale-in bg-white rounded-2xl shadow-2xl overflow-hidden border ${borderColors[type]}`}>
        <div className={`p-6 text-center ${bgColors[type]}`}>
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full bg-white shadow-sm ${textColors[type]}`}>
              <Icon size={48} strokeWidth={1.5} />
            </div>
          </div>
          
          <h3 className={`text-xl font-bold mb-2 ${textColors[type]}`}>
            {title}
          </h3>
          
          <p className="text-gray-600 font-medium">
            {message}
          </p>
        </div>

        <div className="bg-white p-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              type === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' :
              type === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
              'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
```

### `components\StudentManagement.tsx`

```tsx
import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { Student } from "../types";
import StudentModal from "./StudentModal";
import Spinner from "./Spinner";
import Toast from "./Toast";
import ConfirmModal from "./ConfirmModal";

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(
    null
  );
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [deleteAllProgress, setDeleteAllProgress] = useState({ current: 0, total: 0 });
  const [isClearingFingerprints, setIsClearingFingerprints] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', variant: 'warning', onConfirm: () => {} });

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "students"),
      (snapshot) => {
        const studentsData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Student)
        );
        setStudents(studentsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleOpenModal = (student: Student | null = null) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleFormSubmit = async (studentData: Omit<Student, "id">) => {
    try {
      if (editingStudent) {
        const studentDoc = doc(db, "students", editingStudent.id);
        await updateDoc(studentDoc, studentData);
      } else {
        await addDoc(collection(db, "students"), studentData);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    const studentToDelete = students.find((s) => s.id === id);
    if (!studentToDelete) {
      console.error("Student not found for deletion.");
      return;
    }

    // Case 1: No fingerprint registered, just delete from DB
    if (!studentToDelete.fingerprintTemplate) {
      setConfirmModal({
        isOpen: true,
        title: 'Delete Student',
        message: 'This student has no fingerprint registered. Are you sure you want to delete them from the database?',
        variant: 'danger',
        onConfirm: async () => {
          setConfirmModal({ ...confirmModal, isOpen: false });
          try {
            setDeletingStudentId(id);
            await deleteDoc(doc(db, "students", id));
            setToast({ type: 'success', message: 'Student deleted successfully!' });
          } catch (error) {
            console.error("Error deleting student from Firestore:", error);
            setToast({ type: 'error', message: 'Error deleting student from database.' });
          } finally {
            setDeletingStudentId(null);
          }
        }
      });
      return;
    }

    // Case 2: Fingerprint exists, confirm deletion from module and DB
    setConfirmModal({
      isOpen: true,
      title: 'Delete Student',
      message: 'Are you sure you want to delete this student? This will also remove their fingerprint from the scanner module.',
      variant: 'danger',
      onConfirm: () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
      setDeletingStudentId(id);

      const ws = new WebSocket("ws://localhost:5000");

      ws.onopen = () => {
        console.log("Connected to fingerprint bridge for deletion.");
        ws.send(`DELETE_FINGERPRINT:${studentToDelete.fingerprintTemplate}`);
      };

      ws.onmessage = async (event) => {
        try {
          const response = JSON.parse(event.data);
          
          if (response.type === "DELETE_RESPONSE") {
             if (response.success) {
                try {
                  await deleteDoc(doc(db, "students", id));
                  setToast({ type: 'success', message: 'Student and fingerprint deleted successfully!' });
                } catch (error) {
                  console.error("Firestore delete error:", error);
                  setToast({ type: 'error', message: 'Fingerprint deleted, but database cleanup failed.' });
                }
             } else {
               setToast({ type: 'error', message: `Failed to delete fingerprint: ${response.error || "Unknown error"}` });
             }
             ws.close();
          }
        } catch (e) {
          console.log("Ignored non-JSON message during delete");
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        setToast({
          type: 'error',
          message: 'Could not connect to the fingerprint bridge. Please ensure it is running.'
        });
        setDeletingStudentId(null);
        if (
          ws.readyState === WebSocket.OPEN ||
          ws.readyState === WebSocket.CONNECTING
        ) {
          ws.close();
        }
      };

      ws.onclose = () => {
        console.log("Disconnected from fingerprint bridge.");
        setDeletingStudentId(null);
      };
    }
    });
  };

  const handleDeleteAll = async () => {
    if (students.length === 0) {
      setToast({ type: 'info', message: 'No students to delete.' });
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Delete All Students',
      message: `Are you sure you want to delete ALL ${students.length} students? This will:\n\n` +
        `1. Delete all fingerprint templates from the scanner module\n` +
        `2. Remove all students from the database\n\n` +
        `This action CANNOT be undone!`,
      variant: 'danger',
      onConfirm: () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        performBulkDelete();
      }
    });
  };

  const performBulkDelete = async () => {

    setIsDeletingAll(true);
    setDeleteAllProgress({ current: 0, total: students.length });

    const ws = new WebSocket("ws://localhost:5000");
    let currentIndex = 0;
    const studentsToDelete = [...students];
    const deletionResults: { success: number; failed: number } = { success: 0, failed: 0 };

    ws.onopen = () => {
      console.log("Connected to bridge for bulk deletion.");
      processNextStudent();
    };

    const processNextStudent = async () => {
      if (currentIndex >= studentsToDelete.length) {
        // All done
        ws.close();
        setIsDeletingAll(false);
        setToast({
          type: deletionResults.failed === 0 ? 'success' : 'info',
          message: `Deletion complete! ✅ ${deletionResults.success} deleted, ❌ ${deletionResults.failed} failed`
        });
        return;
      }

      const student = studentsToDelete[currentIndex];
      setDeleteAllProgress({ current: currentIndex + 1, total: studentsToDelete.length });

      // If no fingerprint, just delete from DB
      if (!student.fingerprintTemplate) {
        try {
          await deleteDoc(doc(db, "students", student.id));
          deletionResults.success++;
          console.log(`✅ Deleted student (no fingerprint): ${student.name}`);
        } catch (error) {
          console.error(`❌ Failed to delete ${student.name}:`, error);
          deletionResults.failed++;
        }
        currentIndex++;
        processNextStudent();
        return;
      }

      // Has fingerprint - send delete command to hardware
      console.log(`Deleting fingerprint ${student.fingerprintTemplate} for ${student.name}...`);
      ws.send(`DELETE_FINGERPRINT:${student.fingerprintTemplate}`);
    };

    ws.onmessage = async (event) => {
      try {
        const response = JSON.parse(event.data);
        
        if (response.type === "DELETE_RESPONSE") {
          const student = studentsToDelete[currentIndex];
          
          if (response.success) {
            // Delete from database after hardware confirms
            try {
              await deleteDoc(doc(db, "students", student.id));
              deletionResults.success++;
              console.log(`✅ Deleted: ${student.name}`);
            } catch (error) {
              console.error(`❌ Hardware deleted but DB failed for ${student.name}:`, error);
              deletionResults.failed++;
            }
          } else {
            console.error(`❌ Hardware delete failed for ${student.name}`);
            deletionResults.failed++;
          }
          
          currentIndex++;
          // Process next immediately for faster deletion
          processNextStudent();
        }
      } catch (e) {
        console.log("Non-JSON message during bulk delete");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error during bulk delete:", error);
      setToast({
        type: 'error',
        message: `Connection error after deleting ${deletionResults.success} students. Please check the bridge.`
      });
      setIsDeletingAll(false);
      ws.close();
    };

    ws.onclose = () => {
      console.log("Bulk deletion connection closed.");
      setIsDeletingAll(false);
    };
  };

  const handleClearAllFingerprints = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear All Fingerprints',
      message: 'Are you sure you want to clear ALL fingerprints from the sensor module?\n\n' +
        'This will:\n' +
        '1. Erase all fingerprint templates from the hardware\n' +
        '2. Students will need to re-enroll their fingerprints\n\n' +
        'This action CANNOT be undone!',
      variant: 'danger',
      onConfirm: () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        performClearAllFingerprints();
      }
    });
  };

  const performClearAllFingerprints = () => {
    setIsClearingFingerprints(true);

    const ws = new WebSocket("ws://localhost:5000");
    let responseReceived = false;

    ws.onopen = () => {
      console.log("Connected to bridge for clearing fingerprints.");
      ws.send("CLEAR_ALL_FINGERPRINTS");
    };

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        
        if (response.type === "CLEAR_ALL_RESPONSE") {
          responseReceived = true;
          
          if (response.success) {
            setToast({
              type: 'success',
              message: 'All fingerprints cleared from sensor module!'
            });
            console.log("✅ All fingerprints cleared from hardware");
          } else {
            setToast({
              type: 'error',
              message: `Failed to clear fingerprints: ${response.error || 'Unknown error'}`
            });
            console.error("❌ Clear all failed:", response.error);
          }
          
          ws.close();
          setIsClearingFingerprints(false);
        }
      } catch (e) {
        console.log("Non-JSON message:", event.data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setToast({
        type: 'error',
        message: 'Could not connect to fingerprint bridge. Please ensure it is running.'
      });
      setIsClearingFingerprints(false);
      ws.close();
    };

    ws.onclose = () => {
      if (!responseReceived) {
        setToast({
          type: 'error',
          message: 'Connection closed before receiving response.'
        });
        setIsClearingFingerprints(false);
      }
      console.log("Clear all fingerprints connection closed.");
    };

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!responseReceived && ws.readyState === WebSocket.OPEN) {
        ws.close();
        setToast({
          type: 'error',
          message: 'Operation timed out. Please try again.'
        });
        setIsClearingFingerprints(false);
      }
    }, 10000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
        <div className="flex gap-3">
          <button
            onClick={handleClearAllFingerprints}
            disabled={isClearingFingerprints}
            className="px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            {isClearingFingerprints ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Clearing...
              </>
            ) : (
              "Clear All Fingerprints"
            )}
          </button>
          <button
            onClick={handleDeleteAll}
            disabled={isDeletingAll || students.length === 0}
            className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            {isDeletingAll ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting {deleteAllProgress.current}/{deleteAllProgress.total}
              </>
            ) : (
              "Delete All Students"
            )}
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Level
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                    <button
                      onClick={() => handleOpenModal(student)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      disabled={deletingStudentId === student.id}
                      className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-wait"
                    >
                      {deletingStudentId === student.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <StudentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          studentData={editingStudent}
        />
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
        confirmText="Delete"
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />
    </div>
  );
}
```

### `components\StudentModal.tsx`

```tsx
import React, { useState, useEffect, FormEvent, useRef } from "react";
import { Student } from "../types";

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: Omit<Student, "id">) => void;
  studentData: Student | null;
}

const departments = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Cyber Security",
  "Electrical Electronics",
];
const levels = ["100", "200", "300", "400", "500"];

type FingerprintStatus = "idle" | "capturing" | "success" | "error";

export default function StudentModal({
  isOpen,
  onClose,
  onSubmit,
  studentData,
}: StudentModalProps) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [level, setLevel] = useState(levels[0]);

  // State for the new fingerprint capture flow
  const [fingerprintTemplate, setFingerprintTemplate] = useState("");
  const [fingerprintStatus, setFingerprintStatus] =
    useState<FingerprintStatus>("idle");
  const [fingerprintMessage, setFingerprintMessage] = useState("Not Captured");

  const [error, setError] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (studentData) {
      setName(studentData.name);
      setStudentId(studentData.studentId || "");
      setDepartment(studentData.department);
      setLevel(studentData.level);

      if (studentData.fingerprintTemplate) {
        setFingerprintTemplate(studentData.fingerprintTemplate);
        setFingerprintStatus("success");
        setFingerprintMessage(`Template captured`);
      } else {
        setFingerprintTemplate("");
        setFingerprintStatus("idle");
        setFingerprintMessage("Not Captured");
      }
    } else {
      // Reset form for new student
      setName("");
      setStudentId("");
      setDepartment(departments[0]);
      setLevel(levels[0]);
      setFingerprintTemplate("");
      setFingerprintStatus("idle");
      setFingerprintMessage("Not Captured");
    }
    setError("");
  }, [studentData, isOpen]);

  // WebSocket connection logic
  useEffect(() => {
    if (isOpen) {
      ws.current = new WebSocket("ws://localhost:5000");
      let isMounted = true;

      ws.current.onopen = () => {
        if (isMounted) {
          console.log("Successfully connected to fingerprint bridge.");
          setFingerprintStatus("idle");
          setFingerprintMessage("Ready to capture");
        }
      };

      // Section 5: Process real-time messages from the server
        ws.current.onmessage = (event) => {
          if (isMounted) {
            try {
              const response = JSON.parse(event.data);
              
              if (response.type === "ENROLL_RESPONSE") {
                if (response.success) {
                  setFingerprintTemplate(response.id.toString());
                  setFingerprintStatus("success");
                  setFingerprintMessage(`Template captured successfully! (ID: ${response.id})`);
                } else {
                  setFingerprintStatus("error");
                  setFingerprintMessage(response.error || "Capture failed.");
                }
              } else if (response.type === "ESP32_STATUS") {
                // Just status updates, don't interfere with capture flow unless erroneous
              }
            } catch (e) {
              // Fallback or ignore non-JSON
              console.log("Non-JSON message:", event.data);
            }
          }
        };

      ws.current.onerror = (error) => {
        if (isMounted) {
          console.error("WebSocket Error:", error);
          setFingerprintStatus("error");
          setFingerprintMessage("Bridge connection failed.");
        }
      };

      ws.current.onclose = () => {
        if (isMounted) {
          console.log("Disconnected from fingerprint bridge.");
          // Only update message if the status wasn't a final one
          if (
            fingerprintStatus !== "success" &&
            fingerprintStatus !== "error"
          ) {
            setFingerprintStatus("idle");
            setFingerprintMessage("Bridge disconnected.");
          }
        }
      };

      return () => {
        isMounted = false;
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.close();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCaptureFingerprint = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      setFingerprintStatus("error");
      setFingerprintMessage("Bridge not connected. Re-open form.");
      return;
    }

    setFingerprintStatus("capturing");
    setFingerprintMessage("Sending capture command...");
    ws.current.send("CAPTURE_FINGERPRINT");
  };

  const getStatusIndicatorClasses = () => {
    switch (fingerprintStatus) {
      case "success":
        return "bg-green-100 text-green-800";
      case "capturing":
        return "bg-blue-100 text-blue-800 animate-pulse";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !studentId || !department || !level) {
      setError("All fields except fingerprint are required.");
      return;
    }
    if (!fingerprintTemplate || fingerprintStatus !== "success") {
      setError("A fingerprint must be successfully captured.");
      return;
    }
    onSubmit({ name, studentId, department, level, fingerprintTemplate });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {studentData ? "Edit Student" : "Add Student"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Level
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* New Fingerprint Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fingerprint
            </label>
            <div className="mt-1 flex items-center space-x-4 p-2 border border-gray-300 rounded-md">
              <button
                type="button"
                onClick={handleCaptureFingerprint}
                disabled={fingerprintStatus === "capturing"}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-wait"
              >
                {fingerprintStatus === "capturing" ? "Capturing..." : "Capture"}
              </button>
              <div className="flex-1 text-center">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-300 ${getStatusIndicatorClasses()}`}
                >
                  {fingerprintMessage}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={fingerprintStatus !== "success"}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### `components\Toast.tsx`

```tsx
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="w-5 h-5 text-red-500" />
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <AlertCircle className="w-5 h-5 text-blue-500" />
    }
  };

  const style = styles[type];

  return (
    <div 
      className="fixed top-4 right-4 z-50"
      style={{
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <div className={`${style.bg} ${style.border} border rounded-lg shadow-lg p-4 pr-12 max-w-md min-w-[300px]`}>
        <div className="flex items-start gap-3">
          {style.icon}
          <p className={`${style.text} text-sm font-medium flex-1`}>{message}</p>
          <button
            onClick={onClose}
            className={`${style.text} hover:opacity-70 transition-opacity absolute top-3 right-3`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

### `context\AuthContext.tsx`

```tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import type { AuthContextType, AdminData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const adminDocRef = doc(db, 'admins', user.uid);
          const adminDocSnap = await getDoc(adminDocRef);
          
          if (adminDocSnap.exists()) {
            setAdminData(adminDocSnap.data() as AdminData);
          } else {
            // No specific admin data, create a default from user object
            setAdminData({
                name: user.displayName || 'Admin',
                role: 'Administrator',
                email: user.email || 'No email'
            });
          }
        } catch (error) {
          console.error("Failed to fetch admin data:", error);
          setAdminData(null);
        }
      } else {
        setAdminData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    adminData,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

### `fingerprint-bridge-server\package.json`

```json
{
  "name": "fingerprint-bridge-server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@drivetech/node-nmea": "^2.0.1",
    "cors": "^2.8.5",
    "express": "^5.2.1",
    "multicast-dns": "^7.2.5",
    "serialport": "^13.0.0",
    "serve-static": "^2.2.1",
    "ws": "^8.18.3"
  }
}
```

### `fingerprint-bridge-server\server.js`

```javascript
import { WebSocketServer, WebSocket } from "ws";
import multicastdns from "multicast-dns";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- CONFIGURATION ---
const WS_PORT = 5000;
const HTTP_PORT = 3100;
const ESP32_MDNS_NAME = "esp32-attendance";
const ESP32_PORT = 8080;
const FALLBACK_IP = "192.168.137.77";
// --- END CONFIGURATION ---

// Express app for dashboard
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });
console.log(`WebSocket server started on port ${WS_PORT}...`);
console.log(`HTTP dashboard available at http://localhost:${HTTP_PORT}`);
console.log(`Searching for ESP32 via mDNS (${ESP32_MDNS_NAME}.local)...\n`);

// Track connected clients
const clients = {
  esp32: null,
  webClients: new Set(),
};

let esp32Client = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 999;
let discoveredESP32IP = null;

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
  wifi: false,
  ssid: "",
  rssi: 0,
  ip: "",
  fingerprint: false,
  gps: false,
  gpsFixed: false,
  satellites: 0,
  buffered: 0,
  discoveryMethod: "none",
};

// ===== mDNS DISCOVERY =====
let mdns = null;

function startMDNSDiscovery() {
  try {
    console.log("🔍 Starting mDNS discovery for ESP32...");

    mdns = multicastdns();

    const queryESP32 = () => {
      mdns.query({
        questions: [
          {
            name: `${ESP32_MDNS_NAME}.local`,
            type: "A",
          },
        ],
      });
    };

    queryESP32();
    const queryInterval = setInterval(queryESP32, 5000);

    mdns.on("response", (response) => {
      response.answers.forEach((answer) => {
        if (answer.name === `${ESP32_MDNS_NAME}.local` && answer.type === "A") {
          const ip = answer.data;

          if (ip && ip !== discoveredESP32IP) {
            discoveredESP32IP = ip;
            console.log(`✓ ESP32 discovered via mDNS!`);
            console.log(`  Hostname: ${ESP32_MDNS_NAME}.local`);
            console.log(`  IP Address: ${ip}\n`);

            if (!esp32Client || esp32Client.readyState !== WebSocket.OPEN) {
              console.log("Connecting to discovered ESP32...\n");
              connectToESP32();
            }
          }
        }
      });
    });

    mdns.on("error", (error) => {
      console.error("mDNS error:", error.message);
      console.log("Falling back to manual IP...\n");
    });

    process.on("exit", () => {
      if (queryInterval) clearInterval(queryInterval);
      if (mdns) mdns.destroy();
    });
  } catch (error) {
    console.error("Failed to start mDNS discovery:", error.message);
    console.log("Will use fallback IP address\n");
  }
}

// ===== ESP32 CONNECTION =====
function connectToESP32() {
  if (esp32Client && esp32Client.readyState === WebSocket.OPEN) {
    console.log("Already connected to ESP32");
    return;
  }

  const targetIP = discoveredESP32IP || FALLBACK_IP;
  const connectionMethod = discoveredESP32IP ? "mDNS discovery" : "fallback IP";

  console.log(
    `Attempting to connect to ESP32 at ws://${targetIP}:${ESP32_PORT}...`
  );
  console.log(`Connection method: ${connectionMethod}`);

  try {
    esp32Client = new WebSocket(`ws://${targetIP}:${ESP32_PORT}`);

    esp32Client.on("open", () => {
      reconnectAttempts = 0;
      console.log("✓ Connected to ESP32!");
      console.log(`Using IP: ${targetIP} (via ${connectionMethod})`);
      console.log("Requesting initial status...\n");

      esp32Status.connected = true;
      esp32Status.ip = targetIP;
      esp32Status.discoveryMethod = connectionMethod;

      esp32Client.send("GET_STATUS");

      broadcastToWebClients({
        type: "ESP32_CONNECTION",
        connected: true,
        ip: targetIP,
        discoveryMethod: connectionMethod,
      });
    });

    esp32Client.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        handleESP32Message(message);
      } catch (e) {
        console.log("Non-JSON message from ESP32:", data.toString());
      }
    });

    esp32Client.on("close", () => {
      console.log("⚠ ESP32 connection closed");
      esp32Client = null;
      esp32Status.connected = false;

      broadcastToWebClients({
        type: "ESP32_CONNECTION",
        connected: false,
      });

      scheduleReconnect();
    });

    esp32Client.on("error", (error) => {
      console.error("ESP32 connection error:", error.message);
      esp32Client = null;
      esp32Status.connected = false;
      scheduleReconnect();
    });
  } catch (error) {
    console.error("Failed to connect to ESP32:", error.message);
    scheduleReconnect();
  }
}

function scheduleReconnect() {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    const delay = Math.min(5000 * reconnectAttempts, 30000);
    console.log(
      `Will retry connection in ${
        delay / 1000
      } seconds... (Attempt ${reconnectAttempts})`
    );

    setTimeout(() => {
      connectToESP32();
    }, delay);
  }
}

// Handle messages from ESP32
function handleESP32Message(data) {
  if (data.type === "STATUS") {
    console.log("\n=== ESP32 STATUS UPDATE ===");
    console.log(`WiFi: ${data.wifi ? "✓" : "✗"}`);
    if (data.ssid) console.log(`SSID: ${data.ssid}`);
    if (data.rssi) console.log(`Signal: ${data.rssi} dBm`);
    console.log(`Fingerprint: ${data.fingerprint ? "✓" : "✗"}`);
    console.log(`GPS Module: ${data.gps ? "✓" : "✗"}`);
    console.log(`GPS Fixed: ${data.gpsFixed ? "✓" : "✗"}`);
    console.log(`Satellites: ${data.satellites}`);
    console.log(`Buffered Records: ${data.buffered || 0}`);
    console.log(`IP Address: ${data.ip}`);
    console.log("===========================\n");

    // Update status object
    esp32Status = {
      ...esp32Status,
      wifi: data.wifi,
      ssid: data.ssid || "",
      rssi: data.rssi || 0,
      fingerprint: data.fingerprint,
      gps: data.gps,
      gpsFixed: data.gpsFixed,
      satellites: data.satellites || 0,
      buffered: data.buffered || 0,
    };

    broadcastToWebClients({
      type: "ESP32_STATUS",
      data: data,
    });

    if (data.lat && data.lon && (data.lat !== 0 || data.lon !== 0)) {
      const oldLat = lastKnownGPS.lat;
      const oldLon = lastKnownGPS.lon;

      lastKnownGPS = {
        lat: data.lat,
        lon: data.lon,
        alt: data.alt || 0,
        gpsFixed: data.gpsFixed || false,
      };

      if (oldLat !== data.lat || oldLon !== data.lon) {
        console.log("📍 GPS Coordinates Updated:");
        console.log(`   Old: ${oldLat}, ${oldLon}`);
        console.log(`   New: ${data.lat}, ${data.lon}`);
      }
    }
  }

  if (data.type === "ATTENDANCE" || data.type === "ATTENDANCE_BUFFERED") {
    const isBuffered = data.type === "ATTENDANCE_BUFFERED";
    console.log(`\n=== ${isBuffered ? "BUFFERED " : ""}ATTENDANCE LOGGED ===`);
    console.log(`Template ID: ${data.id}`);
    console.log(`Latitude: ${data.lat}`);
    console.log(`Longitude: ${data.lon}`);
    console.log(`Altitude: ${data.alt}m`);
    console.log(`GPS Fixed: ${data.gpsFixed ? "✓" : "✗"}`);
    if (isBuffered) console.log(`Buffered At: ${data.bufferedAt}`);
    console.log("========================\n");

    broadcastToWebClients({
      type: isBuffered ? "ATTENDANCE_BUFFERED" : "ATTENDANCE",
      data: {
        id: data.id,
        latitude: data.lat,
        longitude: data.lon,
        altitude: data.alt,
        gpsFixed: data.gpsFixed,
        gpsAvailable: data.gpsAvailable,
        satellites: data.sats,
        bufferedAt: data.bufferedAt,
        timestamp: new Date().toISOString(),
      },
    });

    if (data.lat && data.lon && (data.lat !== 0 || data.lon !== 0)) {
      lastKnownGPS = {
        lat: data.lat,
        lon: data.lon,
        alt: data.alt,
        gpsFixed: data.gpsFixed,
      };
    }
  }

  if (data.type === "ENROLL_RESPONSE") {
    console.log(
      `Enrollment ${data.success ? "SUCCESS" : "FAILED"}${
        data.id ? ` - ID: ${data.id}` : ""
      }${data.error ? ` - Error: ${data.error}` : ""}`
    );
    broadcastToWebClients(data);
  }

  if (data.type === "DELETE_RESPONSE") {
    console.log(
      `Delete ${data.success ? "SUCCESS" : "FAILED"} - ID: ${data.id}`
    );
    broadcastToWebClients(data);
  }

  if (data.type === "VERIFY_RESPONSE") {
    console.log(
      `Verify ${data.success ? "SUCCESS" : "FAILED"}${
        data.id ? ` - ID: ${data.id}` : ""
      }`
    );

    let finalPayload = { ...data };

    const hasValidIncomingGPS =
      data.lat !== undefined &&
      data.lon !== undefined &&
      (data.lat !== 0 || data.lon !== 0);

    if (hasValidIncomingGPS) {
      lastKnownGPS = {
        lat: data.lat,
        lon: data.lon,
        alt: data.alt || 0,
        gpsFixed: data.gpsFixed || false,
      };
    } else {
      if (lastKnownGPS.lat && lastKnownGPS.lon) {
        finalPayload = {
          ...finalPayload,
          ...lastKnownGPS,
        };
      }
    }

    broadcastToWebClients(finalPayload);
  }

  if (data.type === "CLEAR_ALL_RESPONSE") {
    console.log(
      `Clear All ${data.success ? "SUCCESS" : "FAILED"}${
        data.error ? ` - Error: ${data.error}` : ""
      }`
    );
    broadcastToWebClients(data);
  }

  if (data.type === "WIFI_RESET") {
    console.log("ESP32 is resetting WiFi and restarting...");
    esp32Status.connected = false;
    broadcastToWebClients(data);
  }

  if (data.type === "WIFI_INFO") {
    console.log("\n=== ESP32 WIFI INFO ===");
    console.log(`SSID: ${data.ssid}`);
    console.log(`RSSI: ${data.rssi} dBm`);
    console.log(`IP: ${data.ip}`);
    console.log(`Buffered: ${data.buffered || 0}`);
    console.log("=======================\n");
    broadcastToWebClients(data);
  }
}

function sendToESP32(command) {
  if (!esp32Client || esp32Client.readyState !== WebSocket.OPEN) {
    console.log("⚠ Cannot send command: ESP32 not connected");
    return false;
  }

  esp32Client.send(command);
  return true;
}

// WebSocket server for web clients
wss.on("connection", (ws, req) => {
  const clientIP = req.socket.remoteAddress;
  console.log(`Web client connected from ${clientIP}`);
  clients.webClients.add(ws);
  console.log(`Total web clients: ${clients.webClients.size}`);

  ws.send(
    JSON.stringify({
      type: "ESP32_CONNECTION",
      connected: esp32Client && esp32Client.readyState === WebSocket.OPEN,
      ip: discoveredESP32IP || FALLBACK_IP,
      discoveryMethod: discoveredESP32IP ? "mDNS" : "fallback",
    })
  );

  if (esp32Client && esp32Client.readyState === WebSocket.OPEN) {
    sendToESP32("GET_STATUS");

    if (lastKnownGPS.lat) {
      ws.send(
        JSON.stringify({
          type: "ESP32_STATUS",
          data: {
            type: "STATUS",
            ...lastKnownGPS,
          },
        })
      );
    }
  }

  ws.on("message", (msg) => {
    const messageString = msg.toString();
    handleWebClientCommand(messageString);
  });

  ws.on("close", () => {
    clients.webClients.delete(ws);
    console.log(
      `Web client disconnected (Remaining: ${clients.webClients.size})`
    );
  });

  ws.on("error", (error) => {
    console.error(`Web client error:`, error.message);
  });
});

function handleWebClientCommand(message) {
  try {
    if (message.trim().startsWith("{")) {
      const jsonMsg = JSON.parse(message);
      if (
        jsonMsg.type === "ATTENDANCE" ||
        jsonMsg.type === "SIGNED_OUT" ||
        jsonMsg.type === "SESSION_COMPLETED" ||
        jsonMsg.type === "NO_ACTIVE_SESSION" ||
        jsonMsg.type === "NO_MATCHING_SESSION"
      ) {
        console.log(
          `Broadcasting ${jsonMsg.type}${
            jsonMsg.studentName ? ` for ${jsonMsg.studentName}` : ""
          }`
        );
        broadcastToWebClients(jsonMsg);
        return;
      }
    }
  } catch (e) {
    // Not JSON, continue
  }

  let command = "";

  if (message.startsWith("DELETE_FINGERPRINT:")) {
    const templateId = message.split(":")[1];
    command = `DELETE_FINGERPRINT:${templateId}`;
    console.log(`Sending delete command for ID ${templateId} to ESP32`);
  } else if (message === "CAPTURE_FINGERPRINT") {
    command = "CAPTURE_FINGERPRINT";
    console.log("Sending enrollment command to ESP32");
  } else if (message === "VERIFY_FINGERPRINT") {
    command = "VERIFY_FINGERPRINT";
    console.log("Sending verify command to ESP32");
  } else if (message === "GET_STATUS") {
    command = "GET_STATUS";
    console.log("Requesting status from ESP32");
  } else if (message === "CLEAR_ALL_FINGERPRINTS") {
    command = "CLEAR_ALL_FINGERPRINTS";
    console.log("Sending clear all fingerprints command to ESP32");
  } else if (message === "RESET_WIFI") {
    command = "RESET_WIFI";
    console.log("Sending WiFi reset command to ESP32");
  } else if (message === "GET_WIFI_INFO") {
    command = "GET_WIFI_INFO";
    console.log("Requesting WiFi info from ESP32");
  } else if (message === "SYNC_BUFFER") {
    command = "SYNC_BUFFER";
    console.log("Requesting buffer sync from ESP32");
  } else {
    console.log(`Unknown command: ${message}`);
    return;
  }

  if (command) {
    const sent = sendToESP32(command);
    if (!sent) {
      broadcastToWebClients({
        type: "ERROR",
        message: "ESP32 not connected",
      });
    }
  }
}

function broadcastToWebClients(data) {
  const message = JSON.stringify(data);
  clients.webClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// ===== HTTP API ENDPOINTS =====
app.get("/api/status", (req, res) => {
  res.json(esp32Status);
});

app.post("/api/reset-wifi", (req, res) => {
  const sent = sendToESP32("RESET_WIFI");
  if (sent) {
    res.json({ success: true, message: "WiFi reset command sent" });
  } else {
    res.status(503).json({ success: false, message: "ESP32 not connected" });
  }
});

app.post("/api/sync-buffer", (req, res) => {
  const sent = sendToESP32("SYNC_BUFFER");
  if (sent) {
    res.json({ success: true, message: "Buffer sync command sent" });
  } else {
    res.status(503).json({ success: false, message: "ESP32 not connected" });
  }
});

app.get("/api/wifi-info", (req, res) => {
  const sent = sendToESP32("GET_WIFI_INFO");
  if (sent) {
    res.json({ success: true, message: "WiFi info requested" });
  } else {
    res.status(503).json({ success: false, message: "ESP32 not connected" });
  }
});

// Start HTTP server
app.listen(HTTP_PORT, () => {
  console.log(`\n🌐 Dashboard available at: http://localhost:${HTTP_PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET  /api/status - Get ESP32 status`);
  console.log(`   POST /api/reset-wifi - Reset WiFi settings`);
  console.log(`   POST /api/sync-buffer - Sync buffered attendance`);
  console.log(`   GET  /api/wifi-info - Get WiFi information\n`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down server...");

  if (esp32Client) {
    esp32Client.close();
  }

  if (mdns) {
    mdns.destroy();
  }

  wss.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

// ===== STARTUP =====
console.log("Server is ready.");
console.log("Starting mDNS discovery and ESP32 connection...\n");

startMDNSDiscovery();

setTimeout(() => {
  if (!esp32Client || esp32Client.readyState !== WebSocket.OPEN) {
    console.log("mDNS discovery taking time, trying fallback IP...\n");
    connectToESP32();
  }
}, 3000);

setInterval(() => {
  if (esp32Client && esp32Client.readyState === WebSocket.OPEN) {
    sendToESP32("GET_STATUS");
  } else if (!esp32Client || esp32Client.readyState === WebSocket.CLOSED) {
    if (reconnectAttempts === 0) {
      connectToESP32();
    }
  }
}, 30000);
```

### `fingerprint-bridge-server\public\index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESP32 Attendance - WiFi Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            opacity: 0.9;
            font-size: 1.1em;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .card-title {
            font-size: 1.3em;
            font-weight: 600;
            color: #333;
        }

        .status-badge {
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
        }

        .status-online {
            background: #10b981;
            color: white;
        }

        .status-offline {
            background: #ef4444;
            color: white;
        }

        .status-warning {
            background: #f59e0b;
            color: white;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            color: #666;
            font-weight: 500;
        }

        .info-value {
            color: #333;
            font-weight: 600;
        }

        .btn {
            width: 100%;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-danger {
            background: #ef4444;
            color: white;
        }

        .btn-danger:hover {
            background: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
        }

        .btn-success {
            background: #10b981;
            color: white;
        }

        .btn-success:hover {
            background: #059669;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
        }

        .signal-strength {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .signal-bars {
            display: flex;
            gap: 3px;
            align-items: flex-end;
            height: 20px;
        }

        .signal-bar {
            width: 4px;
            background: #ddd;
            border-radius: 2px;
        }

        .signal-bar.active {
            background: #10b981;
        }

        .signal-bar:nth-child(1) { height: 6px; }
        .signal-bar:nth-child(2) { height: 10px; }
        .signal-bar:nth-child(3) { height: 14px; }
        .signal-bar:nth-child(4) { height: 18px; }

        .log-container {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            max-height: 400px;
            overflow-y: auto;
        }

        .log-entry {
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 6px;
            font-size: 0.9em;
            background: #f9fafb;
            border-left: 3px solid #667eea;
        }

        .log-entry.success {
            border-left-color: #10b981;
            background: #f0fdf4;
        }

        .log-entry.error {
            border-left-color: #ef4444;
            background: #fef2f2;
        }

        .log-entry.warning {
            border-left-color: #f59e0b;
            background: #fffbeb;
        }

        .log-time {
            color: #666;
            font-size: 0.85em;
            margin-right: 10px;
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }

        .pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .metric {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            color: white;
            margin: 10px 0;
        }

        .metric-value {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .metric-label {
            opacity: 0.9;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 ESP32 Attendance System</h1>
            <p>WiFi Management & System Monitor</p>
        </div>

        <div class="grid">
            <!-- Connection Status Card -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">📡 Connection Status</div>
                    <span class="status-badge" id="connection-badge">Connecting...</span>
                </div>
                <div class="info-row">
                    <span class="info-label">ESP32 IP</span>
                    <span class="info-value" id="esp32-ip">---.---.---.---</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Discovery Method</span>
                    <span class="info-value" id="discovery-method">Unknown</span>
                </div>
                <div class="info-row">
                    <span class="info-label">WebSocket</span>
                    <span class="info-value pulse" id="websocket-status">Connecting...</span>
                </div>
            </div>

            <!-- WiFi Info Card -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">📶 WiFi Information</div>
                    <span class="status-badge status-offline" id="wifi-badge">Offline</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Network Name</span>
                    <span class="info-value" id="wifi-ssid">Not Connected</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Signal Strength</span>
                    <div class="signal-strength">
                        <div class="signal-bars" id="signal-bars">
                            <div class="signal-bar"></div>
                            <div class="signal-bar"></div>
                            <div class="signal-bar"></div>
                            <div class="signal-bar"></div>
                        </div>
                        <span class="info-value" id="wifi-rssi">-- dBm</span>
                    </div>
                </div>
                <button class="btn btn-danger" id="reset-wifi-btn" disabled>
                    🔄 Reset WiFi Settings
                </button>
            </div>

            <!-- Sensors Status Card -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">🔧 Sensors Status</div>
                </div>
                <div class="info-row">
                    <span class="info-label">Fingerprint Sensor</span>
                    <span class="info-value" id="fingerprint-status">⏳ Checking...</span>
                </div>
                <div class="info-row">
                    <span class="info-label">GPS Module</span>
                    <span class="info-value" id="gps-status">⏳ Checking...</span>
                </div>
                <div class="info-row">
                    <span class="info-label">GPS Fix</span>
                    <span class="info-value" id="gps-fix">❌ No Fix</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Satellites</span>
                    <span class="info-value" id="satellites">0</span>
                </div>
            </div>
        </div>

        <!-- Offline Buffer Card -->
        <div class="card">
            <div class="card-header">
                <div class="card-title">💾 Offline Attendance Buffer</div>
                <span class="status-badge status-warning" id="buffer-badge">0 Records</span>
            </div>
            <div class="metric">
                <div class="metric-value" id="buffer-count">0</div>
                <div class="metric-label">Pending Attendance Records</div>
            </div>
            <button class="btn btn-success" id="sync-buffer-btn" disabled>
                ⬆️ Sync Buffered Records Now
            </button>
            <p style="text-align: center; margin-top: 10px; color: #666; font-size: 0.9em;">
                Records are automatically synced when connection is restored
            </p>
        </div>

        <!-- Activity Log -->
        <div class="log-container">
            <h2 class="card-title" style="margin-bottom: 15px;">📋 Activity Log</h2>
            <div id="activity-log"></div>
        </div>
    </div>

    <script>
        const ws = new WebSocket('ws://localhost:5000');
        const log = document.getElementById('activity-log');

        function addLog(message, type = 'info') {
            const entry = document.createElement('div');
            entry.className = `log-entry ${type}`;
            const time = new Date().toLocaleTimeString();
            entry.innerHTML = `<span class="log-time">${time}</span>${message}`;
            log.insertBefore(entry, log.firstChild);
            
            // Keep only last 50 entries
            while (log.children.length > 50) {
                log.removeChild(log.lastChild);
            }
        }

        function updateSignalBars(rssi) {
            const bars = document.querySelectorAll('.signal-bar');
            let activeBars = 0;
            
            if (rssi >= -50) activeBars = 4;
            else if (rssi >= -60) activeBars = 3;
            else if (rssi >= -70) activeBars = 2;
            else if (rssi >= -80) activeBars = 1;
            
            bars.forEach((bar, index) => {
                if (index < activeBars) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        }

        ws.onopen = () => {
            addLog('✅ Connected to server', 'success');
            document.getElementById('websocket-status').textContent = '✅ Connected';
            document.getElementById('websocket-status').classList.remove('pulse');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'ESP32_CONNECTION') {
                const badge = document.getElementById('connection-badge');
                const resetBtn = document.getElementById('reset-wifi-btn');
                const syncBtn = document.getElementById('sync-buffer-btn');
                
                if (data.connected) {
                    badge.textContent = '🟢 Online';
                    badge.className = 'status-badge status-online';
                    document.getElementById('esp32-ip').textContent = data.ip;
                    document.getElementById('discovery-method').textContent = data.discoveryMethod;
                    resetBtn.disabled = false;
                    syncBtn.disabled = false;
                    addLog(`✅ ESP32 connected via ${data.discoveryMethod}`, 'success');
                } else {
                    badge.textContent = '🔴 Offline';
                    badge.className = 'status-badge status-offline';
                    resetBtn.disabled = true;
                    syncBtn.disabled = true;
                    addLog('❌ ESP32 disconnected', 'error');
                }
            }
            
            if (data.type === 'ESP32_STATUS') {
                const status = data.data;
                
                // WiFi status
                const wifiBadge = document.getElementById('wifi-badge');
                if (status.wifi) {
                    wifiBadge.textContent = '🟢 Connected';
                    wifiBadge.className = 'status-badge status-online';
                    document.getElementById('wifi-ssid').textContent = status.ssid || 'Unknown';
                    document.getElementById('wifi-rssi').textContent = `${status.rssi} dBm`;
                    updateSignalBars(status.rssi);
                } else {
                    wifiBadge.textContent = '🔴 Offline';
                    wifiBadge.className = 'status-badge status-offline';
                }
                
                // Fingerprint
                document.getElementById('fingerprint-status').textContent = status.fingerprint ? '✅ Available' : '❌ Not Detected';
                
                // GPS
                document.getElementById('gps-status').textContent = status.gps ? '✅ Available' : '❌ Not Detected';
                document.getElementById('gps-fix').textContent = status.gpsFixed ? '✅ Fixed' : '❌ No Fix';
                document.getElementById('satellites').textContent = status.satellites || 0;
                
                // Buffer
                const buffered = status.buffered || 0;
                document.getElementById('buffer-count').textContent = buffered;
                const bufferBadge = document.getElementById('buffer-badge');
                bufferBadge.textContent = `${buffered} Records`;
                if (buffered > 0) {
                    bufferBadge.className = 'status-badge status-warning';
                } else {
                    bufferBadge.className = 'status-badge status-online';
                }
            }
            
            if (data.type === 'ATTENDANCE') {
                addLog(`📋 Attendance logged: ID ${data.data.id} at ${data.data.latitude.toFixed(6)}, ${data.data.longitude.toFixed(6)}`, 'success');
            }
            
            if (data.type === 'ATTENDANCE_BUFFERED') {
                addLog(`⬆️ Synced buffered attendance: ID ${data.data.id}`, 'success');
            }
            
            if (data.type === 'WIFI_RESET') {
                addLog('🔄 WiFi reset command sent - ESP32 will restart', 'warning');
            }
        };

        ws.onerror = (error) => {
            addLog('❌ WebSocket error occurred', 'error');
        };

        ws.onclose = () => {
            addLog('⚠️ Disconnected from server', 'warning');
            document.getElementById('websocket-status').textContent = '❌ Disconnected';
        };

        // Button handlers
        document.getElementById('reset-wifi-btn').addEventListener('click', async () => {
            if (confirm('Are you sure you want to reset WiFi settings? ESP32 will restart and create a setup hotspot.')) {
                try {
                    const response = await fetch('/api/reset-wifi', { method: 'POST' });
                    const data = await response.json();
                    if (data.success) {
                        addLog('🔄 WiFi reset initiated', 'warning');
                    }
                } catch (error) {
                    addLog('❌ Failed to reset WiFi', 'error');
                }
            }
        });

        document.getElementById('sync-buffer-btn').addEventListener('click', async () => {
            try {
                const response = await fetch('/api/sync-buffer', { method: 'POST' });
                const data = await response.json();
                if (data.success) {
                    addLog('⬆️ Buffer sync requested', 'success');
                }
            } catch (error) {
                addLog('❌ Failed to sync buffer', 'error');
            }
        });

        // Initial log
        addLog('🚀 Dashboard loaded - Waiting for connection...', 'info');
    </script>
</body>
</html>
```

### `services\firebase.ts`

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// export default app;

// const firebaseConfig = {
//   apiKey: "AIzaSyD5230yNYk6WneHum7z-HJH5mnqto_t1AM",
//   authDomain: "biometric-attendace-a4bfe.firebaseapp.com",
//   projectId: "biometric-attendace-a4bfe",
//   storageBucket: "biometric-attendace-a4bfe.firebasestorage.app",
//   messagingSenderId: "17500864277",
//   appId: "1:17500864277:web:fa2e70843ff97d152bf31c",
//   measurementId: "G-6Y38QMXG0V",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// export default app;
```

### `services\geocoding.ts`

```typescript
// Reverse geocoding utility using OpenStreetMap Nominatim API
// Free, no API key required

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'BiometricAttendanceSystem/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();
    
    // Extract meaningful location from response
    const address = data.address || {};
    
    // Priority: building > amenity > road > suburb > city
    const location = 
      address.building ||
      address.amenity ||
      address.road ||
      address.suburb ||
      address.city ||
      address.town ||
      address.village ||
      'Unknown Location';
    
    // Add city/state for context if available
    const context = address.city || address.state || '';
    
    return context ? `${location}, ${context}` : location;
    
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    // Return coordinates as fallback
    return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  }
}
```

## Export Summary

- Exported files: **40**
- Skipped (non-included / ignored patterns): **7**
- Skipped (too large > 600000 bytes): **1**

### Skipped Large Files

- `project_tree.txt`

### Skipped Non-Included / Ignored Files (first 200)

- `.env`
- `.env.example`
- `.gitignore`
- `LICENSE`
- `attendance_All_Courses (3).csv`
- `package-lock.json`
- `fingerprint-bridge-server\package-lock.json`
