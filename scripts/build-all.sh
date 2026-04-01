#!/bin/bash

##############################################################################
# EduLense Production Build Orchestration Script
# Description: Orchestrates production builds for all platforms
# Usage: ./scripts/build-all.sh [options]
##############################################################################

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default values
BUILD_FLUTTER=true
BUILD_REACT_NATIVE=true
BUILD_ELECTRON=true
BUILD_WEB=false
CLEAN_BUILD=false
VERBOSE=false
PARALLEL=false
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_DIR="build/logs"
FINAL_OUTPUT_DIR="build/production-release-$TIMESTAMP"

# Function to print colored output
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_header() { echo -e "\n${CYAN}═══════════════════════════════════════${NC}"; echo -e "${CYAN}$1${NC}"; echo -e "${CYAN}═══════════════════════════════════════${NC}\n"; }

# Function to print usage
usage() {
    cat << EOF
Usage: ./scripts/build-all.sh [OPTIONS]

OPTIONS:
  -f, --flutter         Build Flutter Android APK (default: enabled)
  -r, --react-native    Build React Native Android APK (default: enabled)
  -e, --electron        Build Electron Desktop (default: enabled)
  -w, --web             Build Web (default: disabled)
  -c, --clean           Clean build (removes build cache)
  -p, --parallel        Run builds in parallel (may require more resources)
  -v, --verbose         Verbose output
  -o, --output DIR      Output directory (default: $FINAL_OUTPUT_DIR)
  --skip-flutter        Skip Flutter build
  --skip-react-native   Skip React Native build
  --skip-electron       Skip Electron build
  --help               Show this help message

EXAMPLES:
  ./scripts/build-all.sh
  ./scripts/build-all.sh --clean --verbose
  ./scripts/build-all.sh --flutter --electron --parallel
  ./scripts/build-all.sh --web --skip-react-native

EOF
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -f|--flutter)
            BUILD_FLUTTER=true
            shift
            ;;
        -r|--react-native)
            BUILD_REACT_NATIVE=true
            shift
            ;;
        -e|--electron)
            BUILD_ELECTRON=true
            shift
            ;;
        -w|--web)
            BUILD_WEB=true
            shift
            ;;
        --skip-flutter)
            BUILD_FLUTTER=false
            shift
            ;;
        --skip-react-native)
            BUILD_REACT_NATIVE=false
            shift
            ;;
        --skip-electron)
            BUILD_ELECTRON=false
            shift
            ;;
        -c|--clean)
            CLEAN_BUILD=true
            shift
            ;;
        -p|--parallel)
            PARALLEL=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -o|--output)
            FINAL_OUTPUT_DIR="$2"
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

# Create directories
mkdir -p "$LOG_DIR"
mkdir -p "$FINAL_OUTPUT_DIR"

# Determine script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

log_header "EduLense Production Build Orchestration"
log_info "Timestamp: $TIMESTAMP"
log_info "Output: $FINAL_OUTPUT_DIR"
log_info "Parallel: $PARALLEL | Clean: $CLEAN_BUILD | Verbose: $VERBOSE"
log_info "Flutter: $BUILD_FLUTTER | React Native: $BUILD_REACT_NATIVE | Electron: $BUILD_ELECTRON | Web: $BUILD_WEB"

# Track build results
declare -A BUILD_RESULTS
BUILD_SUCCESS_COUNT=0
BUILD_FAILURE_COUNT=0

# Function to run a build
run_build() {
    local build_name=$1
    local script=$2
    local args=$3
    local log_file="$LOG_DIR/${build_name}_${TIMESTAMP}.log"
    
    log_header "Building $build_name"
    
    if [ ! -f "$script" ]; then
        log_error "Build script not found: $script"
        BUILD_RESULTS[$build_name]="FAILED (script not found)"
        ((BUILD_FAILURE_COUNT++))
        return 1
    fi
    
    chmod +x "$script"
    
    # Run the build script
    if [ "$VERBOSE" = true ]; then
        if bash "$script" $args 2>&1 | tee "$log_file"; then
            BUILD_RESULTS[$build_name]="SUCCESS"
            ((BUILD_SUCCESS_COUNT++))
            log_success "$build_name completed successfully"
            return 0
        else
            BUILD_RESULTS[$build_name]="FAILED"
            ((BUILD_FAILURE_COUNT++))
            log_error "$build_name failed (see $log_file)"
            return 1
        fi
    else
        if bash "$script" $args > "$log_file" 2>&1; then
            BUILD_RESULTS[$build_name]="SUCCESS"
            ((BUILD_SUCCESS_COUNT++))
            log_success "$build_name completed successfully"
            return 0
        else
            BUILD_RESULTS[$build_name]="FAILED"
            ((BUILD_FAILURE_COUNT++))
            log_error "$build_name failed (see $log_file)"
            cat "$log_file" | tail -20
            return 1
        fi
    fi
}

# Build Flutter
if [ "$BUILD_FLUTTER" = true ]; then
    if [ "$PARALLEL" = true ]; then
        run_build "Flutter Android APK" "$SCRIPT_DIR/build-flutter-android.sh" "-o ../build/flutter-apk" &
    else
        run_build "Flutter Android APK" "$SCRIPT_DIR/build-flutter-android.sh" "-o ../build/flutter-apk"
    fi
fi

# Build React Native
if [ "$BUILD_REACT_NATIVE" = true ]; then
    if [ "$PARALLEL" = true ]; then
        run_build "React Native Android APK" "$SCRIPT_DIR/build-react-native-android.sh" "-o ../build/react-native-apk" &
    else
        run_build "React Native Android APK" "$SCRIPT_DIR/build-react-native-android.sh" "-o ../build/react-native-apk"
    fi
fi

# Build Electron
if [ "$BUILD_ELECTRON" = true ]; then
    if [ "$PARALLEL" = true ]; then
        run_build "Electron Desktop" "$SCRIPT_DIR/build-electron.sh" "current -o ../build/electron" &
    else
        run_build "Electron Desktop" "$SCRIPT_DIR/build-electron.sh" "current -o ../build/electron"
    fi
fi

# Build Web
if [ "$BUILD_WEB" = true ]; then
    if [ "$PARALLEL" = true ]; then
        run_build "Web Application" "$SCRIPT_DIR/build-web.sh" "-o ../build/web" &
    else
        run_build "Web Application" "$SCRIPT_DIR/build-web.sh" "-o ../build/web"
    fi
fi

# Wait for all parallel builds if enabled
if [ "$PARALLEL" = true ]; then
    log_info "Waiting for all builds to complete..."
    wait
fi

# Consolidate artifacts
log_header "Consolidating Build Artifacts"

if [ -d "build/flutter-apk" ]; then
    log_info "Copying Flutter Android APK..."
    mkdir -p "$FINAL_OUTPUT_DIR/mobile/flutter"
    cp build/flutter-apk/*.apk "$FINAL_OUTPUT_DIR/mobile/flutter/" 2>/dev/null || true
fi

if [ -d "build/react-native-apk" ]; then
    log_info "Copying React Native Android APK..."
    mkdir -p "$FINAL_OUTPUT_DIR/mobile/react-native"
    cp build/react-native-apk/*.apk "$FINAL_OUTPUT_DIR/mobile/react-native/" 2>/dev/null || true
fi

if [ -d "build/electron" ]; then
    log_info "Copying Electron Desktop builds..."
    mkdir -p "$FINAL_OUTPUT_DIR/desktop"
    cp -r build/electron/* "$FINAL_OUTPUT_DIR/desktop/" 2>/dev/null || true
fi

if [ -d "build/web" ]; then
    log_info "Copying Web build..."
    mkdir -p "$FINAL_OUTPUT_DIR/web"
    cp -r build/web/* "$FINAL_OUTPUT_DIR/web/" 2>/dev/null || true
fi

# Generate build report
log_header "Build Summary"
log_info "Successful builds: $BUILD_SUCCESS_COUNT"
log_info "Failed builds: $BUILD_FAILURE_COUNT"

for build_name in "${!BUILD_RESULTS[@]}"; do
    result=${BUILD_RESULTS[$build_name]}
    if [[ "$result" == "SUCCESS" ]]; then
        log_success "$build_name: $result"
    else
        log_error "$build_name: $result"
    fi
done

# Create build manifest
log_info "Creating build manifest..."
cat > "$FINAL_OUTPUT_DIR/BUILD_MANIFEST.json" << EOF
{
  "timestamp": "$TIMESTAMP",
  "builds": {
$(for build_name in "${!BUILD_RESULTS[@]}"; do echo "    \"$build_name\": \"${BUILD_RESULTS[$build_name]}\","; done | sed '$ s/,$//')
  },
  "summary": {
    "successful": $BUILD_SUCCESS_COUNT,
    "failed": $BUILD_FAILURE_COUNT
  },
  "output_directory": "$FINAL_OUTPUT_DIR",
  "log_directory": "$LOG_DIR"
}
EOF

log_success "Manifest created: $FINAL_OUTPUT_DIR/BUILD_MANIFEST.json"

# Final summary
echo ""
log_header "Build Complete"
log_info "All production builds completed"
log_info "Output directory: $FINAL_OUTPUT_DIR"
log_info "Logs: $LOG_DIR"

if [ "$BUILD_FAILURE_COUNT" -eq 0 ]; then
    log_success "All builds completed successfully!"
    exit 0
else
    log_error "Some builds failed. Check logs for details."
    exit 1
fi

