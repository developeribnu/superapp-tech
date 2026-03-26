#!/usr/bin/env python3
"""
COGNOSCERE BookSummarizer — macOS First-time Setup
Handles virtual environment creation, dependency installation, and initial configuration.
"""

import os
import sys
import subprocess
import venv
import shutil
from pathlib import Path

# Colors
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
BOLD = '\033[1m'
RESET = '\033[0m'


def ok(msg):
    print(f"{GREEN}✓ {msg}{RESET}")


def err(msg):
    print(f"{RED}✗ {msg}{RESET}")


def info(msg):
    print(f"{BLUE}ℹ {msg}{RESET}")


def warn(msg):
    print(f"{YELLOW}⚠ {msg}{RESET}")


def ask(question):
    while True:
        resp = input(f"\n{YELLOW}{question} (y/n): {RESET}").strip().lower()
        if resp in ('y', 'yes'):
            return True
        elif resp in ('n', 'no'):
            return False


def main():
    try:
        print(f"\n{BLUE}{BOLD}{'═' * 55}{RESET}")
        print(f"{BLUE}{BOLD}  📚 COGNOSCERE BookSummarizer — Setup{RESET}")
        print(f"{BLUE}{BOLD}{'═' * 55}{RESET}\n")

        project = Path(__file__).parent

        # 1. Python version
        v = sys.version_info
        if v < (3, 8):
            err(f"Python 3.8+ diperlukan (kamu punya {v.major}.{v.minor})")
            print(f"\n  Download di: https://python.org/downloads/macos/")
            sys.exit(1)
        ok(f"Python {v.major}.{v.minor}.{v.micro}")

        # 2. Virtual environment (opsional)
        venv_dir = None
        if ask("Buat virtual environment (disarankan)?"):
            venv_path = project / 'venv'
            if venv_path.exists():
                warn(f"Virtual environment sudah ada di {venv_path}")
                if ask("Buat ulang?"):
                    shutil.rmtree(venv_path)
                else:
                    venv_dir = venv_path
                    info("Menggunakan venv yang sudah ada")

            if venv_dir is None:
                info("Membuat virtual environment...")
                try:
                    venv.create(venv_path, with_pip=True)
                    ok("Virtual environment dibuat")
                    venv_dir = venv_path
                except Exception as e:
                    err(f"Gagal: {e}")
                    warn("Melanjutkan tanpa virtual environment")

        # 3. Install dependencies
        info("Menginstall dependencies...")
        req_file = project / 'requirements.txt'

        if venv_dir:
            pip_cmd = str(venv_dir / 'bin' / 'pip')
        else:
            pip_cmd = f"{sys.executable} -m pip"

        try:
            if venv_dir:
                subprocess.check_call([pip_cmd, 'install', '--upgrade', 'pip'])
                subprocess.check_call([pip_cmd, 'install', '-r', str(req_file)])
            else:
                subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
                subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', str(req_file)])
            ok("Dependencies terinstall")
        except subprocess.CalledProcessError:
            err("Gagal install dependencies")
            info(f"Coba manual: pip3 install -r {req_file}")

        # 4. Environment file
        env_file = project / '.env'
        env_example = project / '.env.example'

        if env_file.exists():
            ok("File .env sudah ada")
        elif env_example.exists():
            shutil.copy(env_example, env_file)
            ok("File .env dibuat dari template")
        else:
            warn("Tidak ada file .env.example")

        # 5. Output directory
        (project / 'output').mkdir(exist_ok=True)
        ok("Folder output siap")

        # 6. Make start.command executable
        start_cmd = project / 'start.command'
        if start_cmd.exists():
            os.chmod(start_cmd, 0o755)
            ok("start.command sudah executable")

        # Done!
        print(f"\n{GREEN}{BOLD}{'═' * 55}{RESET}")
        print(f"{GREEN}{BOLD}  ✓ Setup Selesai!{RESET}")
        print(f"{GREEN}{BOLD}{'═' * 55}{RESET}")

        print(f"\n{BOLD}Cara menjalankan:{RESET}")
        print(f"  Klik dua kali {BOLD}start.command{RESET} di Finder")
        print(f"  Browser akan terbuka otomatis ke http://localhost:5000")

        if venv_dir:
            print(f"\n{BOLD}Virtual environment:{RESET}")
            print(f"  Aktivasi: source venv/bin/activate")

        print(f"\n{BOLD}Langkah selanjutnya di browser:{RESET}")
        print("  1. Masukkan API Key Kimi di halaman Settings")
        print("  2. Pilih folder ebook PDF")
        print("  3. Mulai proses rangkuman!")
        print("")

    except KeyboardInterrupt:
        print(f"\n{YELLOW}Setup dibatalkan{RESET}")
        sys.exit(0)
    except Exception as e:
        err(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
