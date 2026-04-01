# EduLense Build Quick Reference

## One-Liners

```bash
# Build everything
./scripts/build-all.sh

# Build everything in parallel (faster)
./scripts/build-all.sh --parallel --clean

# Build specific platforms
./scripts/build-flutter-android.sh                    # Flutter APK
./scripts/build-react-native-android.sh               # React Native APK
./scripts/build-electron.sh mac                       # macOS app
./scripts/build-electron.sh win                       # Windows app
./scripts/build-electron.sh linux                     # Linux app
./scripts/build-web.sh                                # Web app

# Build with extras
./scripts/build-all.sh --verbose                      # Show detailed output
./scripts/build-all.sh --clean                        # Fresh build from scratch
./scripts/build-web.sh --analyze                      # Generate bundle analysis
./scripts/build-electron.sh current --publish         # Build & publish to GitHub
```

## Build Outputs

| Platform | Output Location | File Type | Size Estimate |
|----------|-----------------|-----------|---------------|
| Flutter | `build/flutter-apk/` | `.apk` | 50-100 MB |
| React Native | Cloud (EAS) | `.aab` | N/A |
| Electron (macOS) | `build/electron/` | `.dmg` | 150-250 MB |
| Electron (Windows) | `build/electron/` | `.exe` | 120-200 MB |
| Electron (Linux) | `build/electron/` | `.AppImage` | 100-180 MB |
| Web | `build/web/` | `.js/.css` | 300-500 KB |

## Prerequisites Checklist

### macOS
- [ ] Flutter SDK: `flutter --version`
- [ ] Android SDK: `$ANDROID_SDK_ROOT` set
- [ ] Java JDK: `java -version` (11+)
- [ ] Node.js: `node --version` (18+)
- [ ] EAS CLI: `eas --version`

### Linux/Windows
- [ ] Flutter SDK: `flutter --version`
- [ ] Android SDK: `$ANDROID_SDK_ROOT` set
- [ ] Java JDK: `java -version` (11+)
- [ ] Node.js: `node --version` (18+)
- [ ] EAS CLI: `eas --version`
- [ ] Build tools installed

## Environment Setup

```bash
# Set up paths for build tools
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/bin:$PATH
export JAVA_HOME=$(/usr/libexec/java_home -v 11)

# EAS authentication
eas login

# GitHub publishing (optional)
export GH_TOKEN="your_token"
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Android SDK not found" | `export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk` |
| "eas-cli not found" | `npm install -g eas-cli` |
| "Out of memory" | `NODE_OPTIONS="--max-old-space-size=4096" ./build.sh` |
| "Permission denied" | `chmod +x scripts/*.sh` |
| "Build failed" | Check `build/logs/` directory |

## Build Profiles

### Flutter
- **Flavor**: `production`
- **Target Platforms**: ARM64, ARM
- **Optimization**: Code obfuscation enabled

### React Native (Expo)
- **Profile**: `production-android`
- **Distribution**: Internal
- **Cloud Build**: via EAS

### Electron
- **Targets**: macOS (.dmg), Windows (NSIS), Linux (AppImage)
- **Auto-update**: Enabled via electron-updater
- **Publishing**: GitHub releases

## Performance Tips

- Use `--parallel` for faster multi-platform builds
- `--clean` on first build or if dependencies change
- Build on same OS as target (macOS → macOS app, etc.)
- Monitor logs in `build/logs/` if builds slow

## File Sizes After Build

After successful build, check sizes:
```bash
# Flutter APKs
ls -lh build/flutter-apk/*.apk

# Electron
du -sh build/electron/

# Web
du -sh build/web/

# All outputs
du -sh build/production-release-*/
```

## Common Workflow

```bash
# 1. First-time setup
npm install -g eas-cli
eas login
flutter pub get
cd edulence_rn && npm install && cd ..
cd edulence_desktop && npm install && cd ..
cd edulence_web && npm install && cd ..

# 2. Before committing
npm test      # Run tests
npm run lint  # Check code quality

# 3. Release build
./scripts/build-all.sh --clean --parallel

# 4. Verify outputs
ls -lh build/production-release-*/
```

## Getting Help

1. Check build logs: `build/logs/`
2. Review [PRODUCTION_BUILD_GUIDE.md](./PRODUCTION_BUILD_GUIDE.md)
3. See platform-specific docs:
   - Flutter: https://flutter.dev/docs/deployment
   - Expo: https://docs.expo.dev/build-reference/
   - Electron: https://www.electron.build/
   - Vite: https://vitejs.dev/

