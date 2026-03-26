#!/usr/bin/env python3
"""
COGNOSCERE BookSummarizer — macOS Auto-Launcher
Handles dependency installation, environment setup, and app startup.
Designed for macOS — klik dua kali start.command untuk menjalankan.
"""

import os
import sys
import subprocess
import time
import webbrowser
import socket
from pathlib import Path

# ANSI Colors for Terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
BOLD = '\033[1m'
RESET = '\033[0m'


def print_banner():
    print(f"\n{BLUE}{BOLD}{'═' * 55}{RESET}")
    print(f"{BLUE}{BOLD}  📚 COGNOSCERE BookSummarizer{RESET}")
    print(f"{BLUE}{BOLD}{'═' * 55}{RESET}\n")


def ok(msg):
    print(f"{GREEN}✓ {msg}{RESET}")


def err(msg):
    print(f"{RED}✗ {msg}{RESET}")


def info(msg):
    print(f"{BLUE}ℹ {msg}{RESET}")


def warn(msg):
    print(f"{YELLOW}⚠ {msg}{RESET}")


def check_python():
    """Pastikan Python 3.8+"""
    v = sys.version_info
    if v < (3, 8):
        err(f"Python 3.8+ diperlukan (kamu punya {v.major}.{v.minor})")
        print(f"\n{YELLOW}Download Python terbaru:{RESET}")
        print("  https://python.org/downloads/macos/")
        sys.exit(1)
    ok(f"Python {v.major}.{v.minor}.{v.micro}")


def check_port(port):
    """Cek apakah port tersedia"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('127.0.0.1', port))
            return True
    except OSError:
        return False


def find_port(start=5000, attempts=10):
    """Cari port yang tersedia"""
    for p in range(start, start + attempts):
        if check_port(p):
            return p
    return None


def install_deps():
    """Install dependencies yang belum ada"""
    info("Mengecek dependencies...")

    packages = {
        'flask': 'flask',
        'httpx': 'httpx',
        'pdfplumber': 'pdfplumber',
        'pypdf': 'pypdf',
        'docx': 'python-docx',
    }

    missing = []
    for module, pkg in packages.items():
        try:
            __import__(module)
            ok(f"{pkg}")
        except ImportError:
            warn(f"{pkg} belum terinstall")
            missing.append(pkg)

    if missing:
        info("Menginstall dependencies...")
        req_file = Path(__file__).parent / 'requirements.txt'

        if req_file.exists():
            try:
                subprocess.check_call(
                    [sys.executable, '-m', 'pip', 'install', '-r', str(req_file)],
                    stdout=subprocess.DEVNULL if not os.environ.get('VERBOSE') else None,
                    stderr=subprocess.STDOUT
                )
                ok("Semua dependencies terinstall")
            except subprocess.CalledProcessError:
                err("Gagal install dependencies")
                info("Coba jalankan manual di Terminal:")
                print(f"  pip3 install -r {req_file}")
                sys.exit(1)
        else:
            # Fallback: install individually
            for pkg in missing:
                try:
                    subprocess.check_call(
                        [sys.executable, '-m', 'pip', 'install', pkg],
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.STDOUT
                    )
                    ok(f"Installed {pkg}")
                except subprocess.CalledProcessError:
                    err(f"Gagal install {pkg}")
    else:
        ok("Semua dependencies sudah terinstall")


def setup_env():
    """Siapkan file .env"""
    project = Path(__file__).parent
    env_file = project / '.env'
    env_example = project / '.env.example'

    if env_file.exists():
        ok("File .env ditemukan")
        return

    if env_example.exists():
        import shutil
        shutil.copy(env_example, env_file)
        ok("File .env dibuat dari template")
        warn("Jangan lupa isi API key di halaman Settings!")
    else:
        warn("File .env belum ada — buat di halaman Settings nanti")


def setup_output():
    """Buat folder output"""
    output = Path(__file__).parent / 'output'
    output.mkdir(exist_ok=True)
    ok(f"Folder output siap")


def open_browser_delayed(port):
    """Buka browser setelah Flask siap"""
    subprocess.Popen(
        [sys.executable, '-c',
         f'import time, webbrowser; time.sleep(2); webbrowser.open("http://localhost:{port}")'],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )


def start_app(port):
    """Jalankan Flask"""
    project = Path(__file__).parent
    app_file = project / 'app.py'

    if not app_file.exists():
        err("app.py tidak ditemukan!")
        sys.exit(1)

    os.environ['FLASK_PORT'] = str(port)
    os.environ['FLASK_ENV'] = 'production'

    sys.path.insert(0, str(project))

    try:
        from app import app
        print(f"\n{GREEN}{BOLD}{'═' * 55}{RESET}")
        print(f"{GREEN}{BOLD}  ✓ Aplikasi berjalan di http://localhost:{port}{RESET}")
        print(f"{GREEN}{BOLD}{'═' * 55}{RESET}")
        print(f"\n{YELLOW}Tekan Ctrl+C untuk menghentikan server{RESET}\n")

        app.run(host='127.0.0.1', port=port, debug=False, use_reloader=False)

    except ImportError as e:
        err(f"Gagal import app: {e}")
        info("Mencoba jalankan langsung...")
        try:
            subprocess.run([sys.executable, str(app_file)], check=True)
        except Exception as e2:
            err(f"Gagal: {e2}")
            sys.exit(1)


def main():
    try:
        print_banner()

        # 1. Python version
        check_python()

        # 2. Dependencies
        install_deps()

        # 3. Environment
        setup_env()

        # 4. Output folder
        setup_output()

        # 5. Port
        info("Mencari port yang tersedia...")
        port = find_port()
        if port is None:
            err("Tidak ada port tersedia (5000-5009)")
            sys.exit(1)

        if port != 5000:
            warn(f"Port 5000 sedang dipakai, menggunakan port {port}")
        else:
            ok(f"Port {port} tersedia")

        # 6. Open browser
        open_browser_delayed(port)

        # 7. Start Flask
        ok("Setup selesai!")
        start_app(port)

    except KeyboardInterrupt:
        print(f"\n{YELLOW}Aplikasi dihentikan{RESET}")
        sys.exit(0)
    except Exception as e:
        err(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
