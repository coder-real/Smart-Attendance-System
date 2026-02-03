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