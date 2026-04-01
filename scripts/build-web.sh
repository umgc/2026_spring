#!/bin/bash

##############################################################################
# EduLense Web Application Production Build Script
# Description: Builds production web app with optimization
# Usage: ./scripts/build-web.sh [options]
##############################################################################

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
OUTPUT_DIR="build/web"
ANALYZE=false
SOURCEMAPS=false
VERBOSE=false

# Function to print colored output
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

# Function to print usage
usage() {
    cat << EOF
Usage: ./scripts/build-web.sh [OPTIONS]

OPTIONS:
  -o, --output DIR      Output directory (default: $OUTPUT_DIR)
  -a, --analyze         Generate bundle analysis report
  -s, --sourcemaps      Generate source maps for debugging
  -v, --verbose         Verbose output
  --help               Show this help message

EXAMPLES:
  ./scripts/build-web.sh
  ./scripts/build-web.sh --analyze --verbose
  ./scripts/build-web.sh -o ./dist -a

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
        -a|--analyze)
            ANALYZE=true
            shift
            ;;
        -s|--sourcemaps)
            SOURCEMAPS=true
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

# Change to Web project directory
cd "$(dirname "$0")/../edulence_web" || exit 1

log_info "Starting Web application production build..."
log_info "Output: $OUTPUT_DIR | Analyze: $ANALYZE | Sourcemaps: $SOURCEMAPS"

# Install dependencies
log_info "Installing dependencies..."
npm ci --legacy-peer-deps
log_success "Dependencies installed"

# Run linting
log_info "Running linter..."
if npm run lint --silent 2>/dev/null; then
    log_success "Linting passed"
else
    log_warn "Linting found issues (non-fatal)"
fi

# Build web app
log_info "Building web application..."
mkdir -p "../$OUTPUT_DIR"

if [ "$VERBOSE" = true ]; then
    npm run build
else
    npm run build 2>&1 | grep -E "(Building|built|✓|✗)" || npm run build
fi

log_success "Web application built"

# Copy build artifacts
log_info "Copying build artifacts to $OUTPUT_DIR..."
if [ -d "dist" ]; then
    cp -r dist/* "../$OUTPUT_DIR/" 2>/dev/null || true
    log_success "Build artifacts copied"
fi

# Generate bundle analysis if requested
if [ "$ANALYZE" = true ]; then
    log_info "Analyzing bundle..."
    if npm run build -- --analyze 2>/dev/null || npm run analyze 2>/dev/null; then
        log_success "Bundle analysis report generated"
    else
        log_warn "Bundle analysis not available"
    fi
fi

# Display build output size
log_info "Build output size:"
if [ -d "../$OUTPUT_DIR" ]; then
    du -sh "../$OUTPUT_DIR"
    log_info "Files in output directory:"
    find "../$OUTPUT_DIR" -type f | wc -l | xargs echo "  Total files:"
fi

log_success "Web application production build completed!"
log_info "Output: $(cd .. && pwd)/$OUTPUT_DIR/"

