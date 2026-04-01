#!/bin/bash

##############################################################################
# EduLense Electron Desktop Production Build Script
# Description: Builds production desktop apps (macOS, Windows, Linux)
# Usage: ./scripts/build-electron.sh [platform] [options]
##############################################################################

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
PLATFORMS=()
OUTPUT_DIR="build/electron"
PUBLISH=false
VERBOSE=false

# Detect current platform if not specified
CURRENT_PLATFORM=$(uname -s)
case "$CURRENT_PLATFORM" in
    Darwin)
        CURRENT_PLATFORM="mac"
        ;;
    Linux)
        CURRENT_PLATFORM="linux"
        ;;
    *)
        CURRENT_PLATFORM="win"
        ;;
esac

# Function to print colored output
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

# Function to print usage
usage() {
    cat << EOF
Usage: ./scripts/build-electron.sh [PLATFORM] [OPTIONS]

PLATFORMS:
  mac                   Build for macOS (Intel & Apple Silicon)
  win                   Build for Windows (NSIS installer)
  linux                 Build for Linux (AppImage)
  all                   Build for all platforms (current: $CURRENT_PLATFORM)
  current               Build for current platform ($CURRENT_PLATFORM)

OPTIONS:
  -o, --output DIR      Output directory (default: $OUTPUT_DIR)
  -p, --publish         Publish to GitHub releases
  -v, --verbose         Verbose output
  --help               Show this help message

EXAMPLES:
  ./scripts/build-electron.sh current
  ./scripts/build-electron.sh mac --verbose
  ./scripts/build-electron.sh all
  ./scripts/build-electron.sh win --publish

EOF
    exit 0
}

# Parse arguments
PLATFORM="${1:-current}"

case "$PLATFORM" in
    mac|win|linux)
        PLATFORMS=("$PLATFORM")
        shift || true
        ;;
    all)
        PLATFORMS=("mac" "win" "linux")
        shift || true
        ;;
    current)
        PLATFORMS=("$CURRENT_PLATFORM")
        shift || true
        ;;
    --help|-h)
        usage
        ;;
    *)
        log_error "Unknown platform: $PLATFORM"
        usage
        ;;
esac

# Parse remaining options
while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -p|--publish)
            PUBLISH=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        --help)
            usage
            ;;
        *)
            log_error "Unknown option: $1"
            usage
            ;;
    esac
done

# Change to Desktop project directory
cd "$(dirname "$0")/../edulence_desktop" || exit 1

log_info "Starting Electron desktop production build..."
log_info "Platforms: ${PLATFORMS[*]} | Output: $OUTPUT_DIR"

# Check prerequisites
log_info "Checking prerequisites..."
if ! command -v npm &> /dev/null; then
    log_error "npm not found. Please install Node.js"
    exit 1
fi

if ! command -v electron-builder &> /dev/null && ! npx electron-builder --version &>/dev/null; then
    log_warn "electron-builder not found. Installing..."
    npm install -D electron-builder
fi

# Install dependencies
log_info "Installing dependencies..."
npm ci --legacy-peer-deps
log_success "Dependencies installed"

# Clean previous builds
log_info "Cleaning previous builds..."
rm -rf dist/ out/
log_success "Build directory cleaned"

# Build renderer (React frontend)
log_info "Building Electron renderer (React)..."
npm run build
log_success "Renderer built"

# Build Electron for each platform
for platform in "${PLATFORMS[@]}"; do
    log_info "Building for $platform..."
    
    BUILD_CMD="npm run dist"
    
    if [ "$platform" != "$CURRENT_PLATFORM" ] && [ "$platform" != "current" ]; then
        # Cross-platform build - may require additional setup
        log_warn "Cross-platform build for $platform may require additional tools"
    fi
    
    if [ "$PUBLISH" = true ]; then
        BUILD_CMD="$BUILD_CMD -- --publish always"
    fi
    
    if [ "$VERBOSE" = true ]; then
        $BUILD_CMD
    else
        $BUILD_CMD 2>&1 | grep -E "(Building|Packaged|out/)" || true
    fi
    
    log_success "$platform build completed"
done

# Copy built artifacts to output directory
log_info "Copying build artifacts to $OUTPUT_DIR..."
mkdir -p "../$OUTPUT_DIR"

if [ -d "out" ]; then
    cp -r out/* "../$OUTPUT_DIR/" 2>/dev/null || true
fi

# Display build artifacts
log_info "Build artifacts:"
if [ -d "../$OUTPUT_DIR" ]; then
    find "../$OUTPUT_DIR" -type f \( -name "*.dmg" -o -name "*.exe" -o -name "*.AppImage" -o -name "*.zip" -o -name "*.tar.gz" \) -exec ls -lh {} \;
else
    log_warn "No build artifacts found"
fi

log_success "Electron desktop production build completed!"
log_info "Output: $(cd .. && pwd)/$OUTPUT_DIR/"

