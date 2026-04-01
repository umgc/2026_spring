#!/bin/bash

##############################################################################
# EduLense React Native Android APK Production Build Script
# Description: Builds production Android APK using EAS CLI
# Usage: ./scripts/build-react-native-android.sh [options]
##############################################################################

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
OUTPUT_DIR="build/react-native-apk"
PROFILE="production-android"
WAIT_FOR_BUILD=true
VERBOSE=false

# Function to print colored output
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

# Function to print usage
usage() {
    cat << EOF
Usage: ./scripts/build-react-native-android.sh [OPTIONS]

OPTIONS:
  -o, --output DIR      Output directory (default: $OUTPUT_DIR)
  -p, --profile PROFILE EAS build profile (default: $PROFILE)
  -n, --no-wait         Don't wait for build completion
  -v, --verbose         Verbose output
  --help               Show this help message

EXAMPLES:
  ./scripts/build-react-native-android.sh
  ./scripts/build-react-native-android.sh --no-wait
  ./scripts/build-react-native-android.sh -o ./dist -v

PREREQUISITES:
  - EAS CLI installed (npm install -g eas-cli)
  - Logged in to EAS (eas login)
  - eas.json configured with production-android profile

EOF
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -p|--profile)
            PROFILE="$2"
            shift 2
            ;;
        -n|--no-wait)
            WAIT_FOR_BUILD=false
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

# Change to React Native project directory
cd "$(dirname "$0")/../edulence_rn" || exit 1

# Check prerequisites
log_info "Checking prerequisites..."

if ! command -v eas &> /dev/null; then
    log_error "EAS CLI not found. Please install it with: npm install -g eas-cli"
    exit 1
fi

if [ ! -f "eas.json" ]; then
    log_error "eas.json not found in $(pwd)"
    exit 1
fi

log_info "Verifying EAS authentication..."
if ! eas whoami &>/dev/null; then
    log_warn "Not authenticated with EAS. Please run 'eas login' first."
    exit 1
fi

log_success "Prerequisites verified"

# Install dependencies
log_info "Installing dependencies..."
npm ci --legacy-peer-deps
log_success "Dependencies installed"

# Build APK
log_info "Starting React Native Android APK production build..."
log_info "Profile: $PROFILE | Wait for build: $WAIT_FOR_BUILD"

BUILD_CMD="eas build --platform android --profile $PROFILE"

if [ "$VERBOSE" = true ]; then
    BUILD_CMD="$BUILD_CMD --verbose"
fi

if [ "$WAIT_FOR_BUILD" = false ]; then
    BUILD_CMD="$BUILD_CMD --no-wait"
fi

$BUILD_CMD

# Create output directory and fetch build artifacts if build completed
if [ "$WAIT_FOR_BUILD" = true ]; then
    log_info "Fetching build artifacts..."
    mkdir -p "../$OUTPUT_DIR"
    
    # Note: EAS build artifacts are typically downloaded from the EAS dashboard
    # or via `eas build:list` and `eas build:download`
    log_info "Build artifacts available via EAS dashboard or:"
    log_info "  eas build:list --platform android"
    log_info "  eas build:download --id <BUILD_ID>"
    
    log_success "React Native Android APK production build completed!"
else
    log_warn "Build started in background. Use 'eas build:list' to check status."
fi

log_info "Output directory: $(cd .. && pwd)/$OUTPUT_DIR/"

