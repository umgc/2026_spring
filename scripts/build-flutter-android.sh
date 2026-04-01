#!/bin/bash

##############################################################################
# EduLense Flutter Android APK Production Build Script
# Description: Builds production Android APK with code signing and optimization
# Usage: ./scripts/build-flutter-android.sh [options]
##############################################################################

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
SIGN_APK=true
CLEAN_BUILD=false
OUTPUT_DIR="build/flutter-apk"
MIN_ANDROID_API=21
BUILD_TYPE="release"

# Function to print colored output
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

# Function to print usage
usage() {
    cat << EOF
Usage: ./scripts/build-flutter-android.sh [OPTIONS]

OPTIONS:
  -c, --clean           Perform clean build (flutter clean before build)
  -n, --no-sign         Build without code signing
  -o, --output DIR      Output directory (default: $OUTPUT_DIR)
  --help               Show this help message

EXAMPLES:
  ./scripts/build-flutter-android.sh
  ./scripts/build-flutter-android.sh --clean --no-sign
  ./scripts/build-flutter-android.sh -o ./dist -c

EOF
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--clean)
            CLEAN_BUILD=true
            shift
            ;;
        -n|--no-sign)
            SIGN_APK=false
            shift
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
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

# Change to Flutter project directory
cd "$(dirname "$0")/../edulence" || exit 1

log_info "Starting Flutter Android APK production build..."
log_info "Clean build: $CLEAN_BUILD | Code signing: $SIGN_APK"

# Clean if requested
if [ "$CLEAN_BUILD" = true ]; then
    log_info "Cleaning Flutter project..."
    flutter clean
    log_success "Flutter project cleaned"
fi

# Get dependencies
log_info "Getting Flutter dependencies..."
flutter pub get
log_success "Dependencies fetched"

# Build APK
log_info "Building Android APK..."
mkdir -p "../$OUTPUT_DIR"

if [ "$SIGN_APK" = true ]; then
    flutter build apk \
        --release \
        --target-platform android-arm64,android-arm \
        --split-per-abi \
        --no-shrink \
        --obfuscate \
        --split-debug-info=build/flutter-debug \
        -v
else
    flutter build apk \
        --release \
        --target-platform android-arm64,android-arm \
        --split-per-abi \
        --no-sign \
        -v
fi

# Copy built APKs to output directory
log_info "Copying APK files to $OUTPUT_DIR..."
if [ -d "build/app/outputs/flutter-apk" ]; then
    cp build/app/outputs/flutter-apk/*.apk "../$OUTPUT_DIR/" 2>/dev/null || true
    log_success "APK files copied to ../$OUTPUT_DIR/"
elif [ -d "build/app/outputs/apk/release" ]; then
    cp build/app/outputs/apk/release/*.apk "../$OUTPUT_DIR/" 2>/dev/null || true
    log_success "APK files copied to ../$OUTPUT_DIR/"
fi

# Display build artefacts
log_info "Build artifacts:"
ls -lh "../$OUTPUT_DIR/"*.apk 2>/dev/null || log_warn "No APK files found"

log_success "Flutter Android APK production build completed!"
log_info "Output: $(cd .. && pwd)/$OUTPUT_DIR/"

