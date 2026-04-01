# EduLense Production Build Guide

This guide covers building EduLense for production across all platforms: Android (Flutter & React Native), Desktop (Electron), and Web.

## Table of Contents

- [Quick Start](#quick-start)
- [Build System Overview](#build-system-overview)
- [Platform-Specific Builds](#platform-specific-builds)
- [Dependencies & Prerequisites](#dependencies--prerequisites)
- [Build Configuration](#build-configuration)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Build Everything

```bash
# Build all production artifacts
./scripts/build-all.sh

# Build with clean build cache
./scripts/build-all.sh --clean

# Verbose output for debugging
./scripts/build-all.sh --verbose

# Parallel builds (faster but requires more resources)
./scripts/build-all.sh --parallel
```

### Build Specific Platforms

```bash
# Flutter Android APK only
./scripts/build-flutter-android.sh

# React Native Android APK only
./scripts/build-react-native-android.sh

# Electron Desktop (current platform)
./scripts/build-electron.sh current

# Web only
./scripts/build-web.sh
```

All build artifacts are placed in:
- Flutter APKs: `build/flutter-apk/`
- React Native APKs: `build/react-native-apk/`
- Electron builds: `build/electron/`
- Web builds: `build/web/`
- Consolidated release: `build/production-release-TIMESTAMP/`

---

## Build System Overview

### Architecture

```
EduLense/
├── edulence/                 # Flutter Mobile App
├── edulence_rn/              # React Native Mobile App (Expo)
├── edulence_desktop/         # Electron Desktop App
├── edulence_web/             # Web App (React + Vite)
└── scripts/                  # Build Orchestration Scripts
    ├── build-all.sh          # Main orchestration
    ├── build-flutter-android.sh
    ├── build-react-native-android.sh
    ├── build-electron.sh
    └── build-web.sh
```

### Build Scripts

| Script | Purpose | Input | Output |
|--------|---------|-------|--------|
| `build-all.sh` | Orchestrate all builds | Platform options | Consolidated release artifacts |
| `build-flutter-android.sh` | Flutter Android APK | Build options | `.apk` files |
| `build-react-native-android.sh` | RN Android (Expo) | EAS profiles | `.apk` files (via EAS) |
| `build-electron.sh` | Electron multiplatform | Platform selection | `.dmg`, `.exe`, `.AppImage` |
| `build-web.sh` | Web app | Build options | Static HTML/JS/CSS |

---

## Platform-Specific Builds

### 1. Flutter Android APK

**Prerequisites:**
- Flutter SDK installed
- Android SDK with API level 21+
- Java Development Kit (JDK) 11+
- Gradle

**Build:**

```bash
# Standard production build
./scripts/build-flutter-android.sh

# Clean build with debug symbols
./scripts/build-flutter-android.sh --clean

# Without code signing (testing only)
./scripts/build-flutter-android.sh --no-sign

# Custom output directory
./scripts/build-flutter-android.sh --output ./my-builds
```

**Configuration:**
- **Flavor**: `production` (default)
- **Target Platforms**: ARM64, ARM (split APKs)
- **Optimization**: Code obfuscation enabled
- **Debug Info**: Removed and stored separately

**Output Files:**
```
build/flutter-apk/
├── app-arm64-v8a-release.apk
├── app-armeabi-v7a-release.apk
└── app-universal-release.apk
```

**Signing:**
- Automatic if keystore configured
- See [Flutter Signing Documentation](https://flutter.dev/docs/deployment/android#signing-the-app)

---

### 2. React Native Android APK (Expo)

**Prerequisites:**
- Node.js 18+
- npm or yarn
- EAS CLI: `npm install -g eas-cli`
- EAS account: `eas login`
- `eas.json` configured with `production-android` profile

**Build:**

```bash
# Build and wait for completion
./scripts/build-react-native-android.sh

# Start build but don't wait
./scripts/build-react-native-android.sh --no-wait

# Verbose output
./scripts/build-react-native-android.sh --verbose

# Custom output directory
./scripts/build-react-native-android.sh --output ./my-builds
```

**Configuration:**
- **Build Profile**: `production-android`
- **Distribution**: Internal (configured in `eas.json`)
- **Build Type**: App Bundle (AAB)

**EAS Build Output:**
- Builds run on EAS cloud servers
- Download from: `eas build:list --platform android`
- Command: `eas build:download --id <BUILD_ID>`

**Profiles in eas.json:**
```json
{
  "build": {
    "production-android": {
      "extends": "production",
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

### 3. Electron Desktop

**Prerequisites:**
- Node.js 18+
- npm or yarn
- For macOS builds on macOS: Xcode Command Line Tools
- For Windows builds on Windows: Windows build tools
- For Linux builds on Linux: Build essentials

**Build:**

```bash
# Build for current platform
./scripts/build-electron.sh current

# Build for specific platform
./scripts/build-electron.sh mac
./scripts/build-electron.sh win
./scripts/build-electron.sh linux

# Build for all platforms (cross-platform)
./scripts/build-electron.sh all

# With publishing (requires GitHub token)
./scripts/build-electron.sh current --publish

# Verbose output
./scripts/build-electron.sh current --verbose
```

**Build Process:**
1. Install dependencies
2. Build React renderer (Vite)
3. Package Electron app with electron-builder

**Output Files:**
```
build/electron/
├── EduLense Desktop-1.0.0.dmg          # macOS
├── EduLense-Desktop-Setup-1.0.0.exe    # Windows  
├── EduLense-Desktop-1.0.0.AppImage     # Linux
└── [other build artifacts]
```

**Configuration (in `edulence_desktop/package.json`):**
```json
{
  "build": {
    "appId": "com.edulense.desktop",
    "productName": "EduLense Desktop",
    "mac": {
      "category": "public.app-category.education"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    },
    "publish": {
      "provider": "github",
      "owner": "umgc",
      "repo": "2026_spring"
    }
  }
}
```

**Cross-Platform Building:**
- Native builds work best on their respective platforms
- Cross-platform builds available but may require additional tools
- GitHub publish requires: `GH_TOKEN` environment variable

---

### 4. Web Application

**Prerequisites:**
- Node.js 18+
- npm or yarn

**Build:**

```bash
# Standard web build
./scripts/build-web.sh

# Custom output directory
./scripts/build-web.sh --output ./dist

# With bundle analysis
./scripts/build-web.sh --analyze

# With source maps
./scripts/build-web.sh --sourcemaps

# Verbose output
./scripts/build-web.sh --verbose
```

**Build Process:**
1. Install dependencies
2. Run linter
3. Build with Vite (optimized)
4. Generate bundle analysis if requested

**Output:**
```
build/web/
├── index.html
├── assets/
│   ├── *.js
│   ├── *.css
│   └── *.woff2
└── [static assets]
```

---

## Dependencies & Prerequisites

### System Requirements

| Platform | Required | Version |
|----------|----------|---------|
| **Flutter** | Flutter SDK | 3.10.7+ |
| | Android SDK | API 21+ |
| | Java JDK | 11+ |
| **React Native** | Node.js | 18+ |
| | EAS CLI | 16+ |
| **Electron** | Node.js | 18+ |
| | Electron | 37+ |
| **Web** | Node.js | 18+ |
| | npm/yarn | 9+/4+ |

### Installation

**macOS:**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm
brew install node

# Install Flutter
brew install flutter

# Install Android SDK (via Android Studio)
brew install android-studio

# Install Xcode Command Line Tools
xcode-select --install

# Install EAS CLI
npm install -g eas-cli
```

**Linux (Ubuntu/Debian):**
```bash
# Update package manager
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Flutter
git clone https://github.com/flutter/flutter.git ~/flutter
export PATH="$PATH:$HOME/flutter/bin"

# Install Android SDK and build tools
sudo apt install -y openjdk-11-jdk android-sdk

# Install build essentials
sudo apt install -y build-essential

# Install EAS CLI
npm install -g eas-cli
```

**Windows (PowerShell):**
```powershell
# Install Chocolatey (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js
choco install nodejs -y

# Install Flutter
choco install flutter -y

# Install Android Studio
choco install android-studio -y

# Install EAS CLI
npm install -g eas-cli

# Install Visual Studio Build Tools (for Windows builds)
choco install visualstudio2019buildtools -y
```

---

## Build Configuration

### Environment Variables

Set these before running builds:

```bash
# React Native / EAS
export EXPO_TOKEN="your_eas_token"
export ANDROID_HOME="$HOME/Library/Android/sdk"

# Electron publishing
export GH_TOKEN="your_github_token"

# Build options
export VITE_APP_VERSION="1.0.0"
export VITE_APP_ENV="production"
```

### Code Signing

#### Flutter Android
Place keystore at: `edulence/android/app/key.jks`

Configure in `edulence/android/key.properties`:
```properties
storeFile=key.jks
storePassword=your_store_password
keyAlias=your_key_alias
keyPassword=your_key_password
```

#### Electron on macOS
Requires Apple Developer ID and certificate. Configure in `edulence_desktop/build.js`:
```javascript
"mac": {
  "identity": "Your Developer Identity",
  "certificateFile": "path/to/cert.p12",
  "certificatePassword": "cert_password"
}
```

---

## Troubleshooting

### Common Issues

**Flutter Build Fails: "Android SDK not found"**
```bash
# Solution: Point to Android SDK
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$ANDROID_SDK_ROOT/bin:$PATH
```

**React Native: "eas-cli not found"**
```bash
# Solution: Install EAS CLI globally
npm install -g eas-cli
eas login
```

**Electron Build: "Cannot find module"**
```bash
# Solution: Clean and reinstall
cd edulence_desktop
rm -rf node_modules package-lock.json
npm install
```

**Web Build: "Out of memory"**
```bash
# Solution: Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Checking Build Artifacts

```bash
# ListView all build outputs
ls -lh build/production-release-*/

# Check APK file sizes
du -sh build/flutter-apk/* build/react-native-apk/*

# Inspect Electron build
ls -la build/electron/

# Check web build size
du -sh build/web/
```

### Verbose Logging

All scripts support verbose output:
```bash
./scripts/build-all.sh --verbose
./scripts/build-flutter-android.sh -v
# Logs also saved to: build/logs/
```

### Reset Build State

```bash
# clean all build artifacts
rm -rf build/

# Clean Flutter
cd edulence && flutter clean && cd ..

# Clean React Native  
cd edulence_rn && rm -rf node_modules .expo && npm install && cd ..

# Clean Electron
cd edulence_desktop && rm -rf dist out node_modules && npm install && cd ..

# Clean Web
cd edulence_web && rm -rf dist node_modules && npm install && cd ..
```

---

## Build Verification

After building, verify, artifacts:

```bash
# Check Flutter APKs
file build/flutter-apk/*.apk

# Check React Native APKs
ls -lh build/react-native-apk/

# Check Electron artifacts
ls build/electron/*.{dmg,exe,AppImage}

# Check web build
head build/web/index.html
```

---

## Performance Optimization

### Parallel Builds

For faster builds across multiple projects (requires more system resources):
```bash
./scripts/build-all.sh --parallel
```

### Caching

Builds use dependency caching:
- Flutter: `.dart_tool/`
- Node projects: `node_modules/`
- To disable cache, use `--clean` flag

### Build Time Benchmarks

Typical build times on M1 macOS:
- Flutter Android APK: 3-5 minutes
- React Native (EAS): 5-10 minutes
- Electron (current platform): 2-3 minutes
- Web: 30-45 seconds

---

## Release Checklist

Before production release:

- [ ] All tests passing: `npm test`
- [ ] Linting passed: `npm run lint`
- [ ] Version numbers updated
- [ ] Build artifacts verified (file sizes, checksums)
- [ ] Code signing certificates valid
- [ ] Environment variables configured
- [ ] Release notes prepared
- [ ] Firebase/backend services ready
- [ ] Analytics configured
- [ ] Crash reporting enabled

---

## Support & Debugging

For issues, check:
1. Build logs in `build/logs/`
2. Platform-specific docs (links below)
3. Project README files in each directory

### Platform Documentation
- [Flutter Build Documentation](https://flutter.dev/docs/deployment)
- [Expo/EAS Build Docs](https://docs.expo.dev/build/setup/)
- [Electron Builder Docs](https://www.electron.build/)
- [Vite Build Docs](https://vitejs.dev/guide/build.html)

