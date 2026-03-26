#!/usr/bin/env python3
"""
COGNOSCERE BookSummarizer — macOS App Builder
Jalankan script ini untuk membuat/rebuild BookSummarizer.app

Usage: python3 build_app.py
"""

import os
import sys
import struct
import io
import math
import shutil
from pathlib import Path

GREEN = '\033[92m'
BLUE = '\033[94m'
YELLOW = '\033[93m'
RED = '\033[91m'
BOLD = '\033[1m'
RESET = '\033[0m'

def ok(msg): print(f"{GREEN}✓ {msg}{RESET}")
def info(msg): print(f"{BLUE}ℹ {msg}{RESET}")
def warn(msg): print(f"{YELLOW}⚠ {msg}{RESET}")
def err(msg): print(f"{RED}✗ {msg}{RESET}")


INFO_PLIST = """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>BookSummarizer</string>
    <key>CFBundleDisplayName</key>
    <string>COGNOSCERE BookSummarizer</string>
    <key>CFBundleIdentifier</key>
    <string>com.cognoscere.booksummarizer</string>
    <key>CFBundleVersion</key>
    <string>2.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>2.0</string>
    <key>CFBundleExecutable</key>
    <string>launcher</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleSignature</key>
    <string>????</string>
    <key>LSMinimumSystemVersion</key>
    <string>12.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>LSUIElement</key>
    <false/>
</dict>
</plist>"""


LAUNCHER_SCRIPT = r"""#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  COGNOSCERE BookSummarizer — macOS App Launcher (v6)
#  Launches via Terminal.app to avoid .app sandbox restrictions
# ═══════════════════════════════════════════════════════════════

APP_BUNDLE="$(cd "$(dirname "$0")/../.." 2>/dev/null && pwd)"
PROJECT_DIR="$(dirname "$APP_BUNDLE")"

if [ ! -f "$PROJECT_DIR/app.py" ]; then
    osascript -e 'display dialog "app.py tidak ditemukan." with title "BookSummarizer" with icon stop buttons {"OK"}'
    exit 1
fi

# Launch via Terminal.app (no sandbox restrictions)
osascript << ASCRIPT
tell application "Terminal"
    activate
    do script "cd '$PROJECT_DIR' && clear && echo '══════════════════════════════════════════════' && echo '  📚 COGNOSCERE BookSummarizer' && echo '══════════════════════════════════════════════' && echo '' && echo 'Memulai server...' && echo '' && python3 '$PROJECT_DIR/start.py'"
end tell
ASCRIPT
"""


def create_icon(resources_dir):
    """Create app icon using Pillow if available, or a minimal icon"""
    try:
        from PIL import Image, ImageDraw, ImageFont

        size = 512
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Rounded rectangle background
        corner_radius = 90
        for y in range(size):
            ratio = y / size
            r = int(30 + ratio * 10)
            g = int(20 + ratio * 15)
            b = int(80 + ratio * 60)
            for x in range(size):
                in_rect = True
                if x < corner_radius and y < corner_radius:
                    if (x - corner_radius)**2 + (y - corner_radius)**2 > corner_radius**2:
                        in_rect = False
                elif x > size - corner_radius and y < corner_radius:
                    if (x - (size - corner_radius))**2 + (y - corner_radius)**2 > corner_radius**2:
                        in_rect = False
                elif x < corner_radius and y > size - corner_radius:
                    if (x - corner_radius)**2 + (y - (size - corner_radius))**2 > corner_radius**2:
                        in_rect = False
                elif x > size - corner_radius and y > size - corner_radius:
                    if (x - (size - corner_radius))**2 + (y - (size - corner_radius))**2 > corner_radius**2:
                        in_rect = False
                if in_rect:
                    img.putpixel((x, y), (r, g, b, 255))

        # Book
        bx, by, bw, bh = 120, 100, 272, 312
        draw.rounded_rectangle([bx+8, by+8, bx+bw+8, by+bh+8], radius=12, fill=(10, 10, 30, 150))
        draw.rounded_rectangle([bx, by, bx+bw, by+bh], radius=12, fill=(240, 240, 255, 255))
        draw.rectangle([bx, by+10, bx+30, by+bh-10], fill=(99, 102, 241, 255))

        colors = [(80, 80, 120), (100, 100, 140), (90, 90, 130)]
        for i, ly in enumerate(range(by+50, by+bh-60, 35)):
            w = bw - 80 - (i % 3) * 30
            draw.rounded_rectangle([bx+50, ly, bx+50+w, ly+10], radius=5, fill=(*colors[i%3], 180))

        # AI sparkle
        cx, cy = 350, 360
        for rad in range(60, 0, -2):
            alpha = int(40 * (1 - rad / 60))
            draw.ellipse([cx-rad, cy-rad, cx+rad, cy+rad], fill=(139, 92, 246, alpha))

        pts = []
        for i in range(8):
            angle = i * math.pi / 4
            r_o = 35 if i % 2 == 0 else 15
            pts.append((cx + r_o * math.cos(angle), cy + r_o * math.sin(angle)))
        draw.polygon(pts, fill=(167, 139, 250, 255))
        draw.ellipse([cx-8, cy-8, cx+8, cy+8], fill=(255, 255, 255, 255))

        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
        except:
            font = ImageFont.load_default()
        draw.text((210, 430), "C", fill=(167, 139, 250, 255), font=font, anchor="mm")

        # Save
        png_path = os.path.join(resources_dir, 'AppIcon.png')
        img.save(png_path, 'PNG')

        # Convert to ICNS
        icns_path = os.path.join(resources_dir, 'AppIcon.icns')
        sizes_map = {16: b'icp4', 32: b'icp5', 64: b'icp6', 128: b'ic07', 256: b'ic08', 512: b'ic09'}
        entries = b''
        for s, code in sizes_map.items():
            resized = img.resize((s, s), Image.LANCZOS)
            buf = io.BytesIO()
            resized.save(buf, format='PNG')
            d = buf.getvalue()
            entries += code + struct.pack('>I', len(d) + 8) + d

        with open(icns_path, 'wb') as f:
            f.write(b'icns' + struct.pack('>I', len(entries) + 8) + entries)

        ok(f"Icon dibuat (Pillow): {icns_path}")
        return True

    except ImportError:
        warn("Pillow tidak tersedia — icon default akan digunakan")
        return False


def build():
    """Build the macOS .app bundle"""
    print(f"\n{BLUE}{BOLD}{'═' * 55}{RESET}")
    print(f"{BLUE}{BOLD}  📦 Building BookSummarizer.app{RESET}")
    print(f"{BLUE}{BOLD}{'═' * 55}{RESET}\n")

    project = Path(__file__).parent
    app_dir = project / 'BookSummarizer.app'

    # Create structure (overwrite if exists)
    contents = app_dir / 'Contents'
    macos = contents / 'MacOS'
    resources = contents / 'Resources'

    macos.mkdir(parents=True, exist_ok=True)
    resources.mkdir(parents=True, exist_ok=True)
    ok("Struktur .app siap")

    # Write Info.plist
    (contents / 'Info.plist').write_text(INFO_PLIST)
    ok("Info.plist ditulis")

    # Write launcher
    launcher = macos / 'launcher'
    launcher.write_text(LAUNCHER_SCRIPT)
    os.chmod(launcher, 0o755)
    ok("Launcher executable ditulis")

    # Create icon
    create_icon(str(resources))

    # Done
    print(f"\n{GREEN}{BOLD}{'═' * 55}{RESET}")
    print(f"{GREEN}{BOLD}  ✓ BookSummarizer.app berhasil dibuat!{RESET}")
    print(f"{GREEN}{BOLD}{'═' * 55}{RESET}")
    print(f"\n  Lokasi: {app_dir}")
    print(f"  Klik dua kali di Finder untuk menjalankan.\n")


if __name__ == '__main__':
    build()
