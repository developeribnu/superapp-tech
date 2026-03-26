#!/bin/bash

# ═══════════════════════════════════════════════════════════
#  COGNOSCERE BookSummarizer — macOS Launcher
#  Klik dua kali untuk menjalankan aplikasi
# ═══════════════════════════════════════════════════════════

cd "$(dirname "$0")"

clear

# Colors
BLUE='\033[94m'
GREEN='\033[92m'
YELLOW='\033[93m'
RED='\033[91m'
BOLD='\033[1m'
RESET='\033[0m'

echo ""
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════${RESET}"
echo -e "${BLUE}${BOLD}  📚 COGNOSCERE BookSummarizer                    ${RESET}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════${RESET}"
echo ""

# Check Python 3
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    PY_VERSION=$(python3 --version 2>&1)
    echo -e "${GREEN}✓ ${PY_VERSION} terdeteksi${RESET}"
else
    echo -e "${RED}✗ Python 3 tidak ditemukan!${RESET}"
    echo ""
    echo -e "${YELLOW}Cara install Python di macOS:${RESET}"
    echo ""
    echo -e "  ${BOLD}Option 1 — Homebrew (disarankan):${RESET}"
    echo "    brew install python3"
    echo ""
    echo -e "  ${BOLD}Option 2 — Download langsung:${RESET}"
    echo "    Buka https://python.org/downloads"
    echo "    Download dan install Python 3.8+"
    echo ""

    # Try to open Python download page
    echo -e "${BLUE}Membuka halaman download Python...${RESET}"
    open "https://python.org/downloads/macos/" 2>/dev/null

    echo ""
    read -p "Tekan Enter untuk menutup..."
    exit 1
fi

echo -e "${BLUE}ℹ Memulai aplikasi...${RESET}"
echo ""

# Run the Python launcher
$PYTHON_CMD start.py

# If start.py exits with error
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}═══════════════════════════════════════════════════${RESET}"
    echo -e "${RED}  Terjadi error saat menjalankan aplikasi${RESET}"
    echo -e "${RED}═══════════════════════════════════════════════════${RESET}"
    echo ""
    echo -e "${YELLOW}Coba langkah berikut:${RESET}"
    echo "  1. Pastikan Python 3.8+ sudah terinstall"
    echo "  2. Buka Terminal, masuk ke folder ini:"
    echo "     cd \"$(pwd)\""
    echo "  3. Jalankan: python3 start.py"
    echo ""
    read -p "Tekan Enter untuk menutup..."
fi
