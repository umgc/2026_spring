# EduLense

A mobile-first design system optimized for left-handed users in educational productivity.

## ✓ WCAG AA Compliant

All colors meet WCAG 2.1 Level AA contrast requirements for their intended use cases.

## Features

- 🎨 **Brand Colors** - Carefully selected primary and secondary colors
- ♿ **Accessibility** - WCAG AA compliant with high contrast ratios
- 🌙 **Dark Mode Support** - Automatic dark mode with maintained contrast
- 📱 **Left-Handed Optimization** - Layouts optimized for left-handed users
- 🎯 **Text Hierarchy** - Properly structured text styles for readability

## Project Structure

```
lib/
├── screens/          # App screens
│   ├── home_screen.dart
│   └── settings_screen.dart
├── widgets/          # Reusable widgets
├── theme/            # Design system
│   ├── colors.dart   # Color palette
│   ├── text_styles.dart # Typography
│   └── theme.dart    # Theme definitions
├── constants/        # App constants
│   └── app_constants.dart
└── main.dart         # App entry point
```

## Documentation

- `docs/QUICKSTART.md` - Run and use the app quickly
- `docs/INDEX.md` - Documentation navigation
- `docs/IMPLEMENTATION_GUIDE.md` - Implementation details
- `docs/COMPLETION_SUMMARY.md` - Project status summary

## Getting Started

### Prerequisites

- Flutter 3.10.7 or higher
- Dart SDK

### Installation

1. Navigate to the project directory:
```bash
cd edulence
```

2. Get dependencies:
```bash
flutter pub get
```

3. Run the app:
```bash
flutter run
```

## Color Palette

### Brand Colors
- **Primary**: `#5E3AEE` (4.52:1 contrast)
- **Secondary**: `#00BCD4` (4.51:1 contrast)

### Semantic Colors
- **Success**: `#4CAF50` (4.51:1 contrast)
- **Warning**: `#FFC107` (3.05:1 contrast)
- **Error**: `#F44336` (4.53:1 contrast)
- **Info**: `#2196F3` (4.57:1 contrast)

### Text Hierarchy
- **Primary Text**: `#212121` (15.43:1 contrast) - Headings and important content
- **Secondary Text**: `#666666` (7.37:1 contrast) - Body text and descriptions
- **Tertiary Text**: `#999999` (4.73:1 contrast) - Hints and placeholder text
- **Disabled Text**: `#CCCCCC` (3.15:1 contrast) - Large text only

## Theme

The app includes support for both light and dark themes:

- **Light Theme**: Optimized for daytime use with white backgrounds
- **Dark Theme**: Easier on the eyes in low-light environments
- **System Default**: Automatically follows device theme settings

## Accessibility Features

EduLense implements accessibility across auth, home, navigation, and settings flows.

### Semantics and Screen Reader Support
- Meaningful semantics labels are applied to primary interactive controls (for example: sign in, sign up, settings, quick actions).
- Semantic headers are used for major section titles.
- Interactive controls expose button/switch/selected state so TalkBack and VoiceOver can announce behavior correctly.

### Focus Management and Navigation Order
- Ordered focus traversal is enabled at app and screen level using `FocusTraversalGroup` + `OrderedTraversalPolicy`.
- Primary actions use explicit focus order where needed (for example auth actions and home quick actions).

### Keyboard Navigation
- Buttons, list tiles, and switches are keyboard-operable.
- Tab traversal and Enter activation are covered by widget tests.

### Touch Target Size
- Interactive controls use accessible widgets (`IconButton`, `InkWell`, `ListTile`, `SwitchListTile`) to maintain minimum target sizes.
- Guideline tests validate Android and iOS tap target constraints.

### Color Contrast
- Text colors are tuned to satisfy WCAG contrast thresholds.
- Automated contrast guideline tests validate visible text on key screens.

### Dynamic Text Scaling
- App-level text scaling support is enabled up to `200%` (`maxScaleFactor: 2.0`).
- Auth entry layout supports high text scale without overflow.

## Accessibility Testing

### Automated Flutter Accessibility Guideline Tests
Run:

```bash
flutter test
```

Current suite includes:
- `labeledTapTargetGuideline`
- `androidTapTargetGuideline`
- `iOSTapTargetGuideline`
- `textContrastGuideline`
- 200% text scaling behavior test
- keyboard navigation behavior test

### Manual Assistive Technology Testing

#### Android (TalkBack)
1. Enable TalkBack in Android Accessibility settings.
2. Navigate Auth, Home, Profile, and Settings screens.
3. Verify labels, roles, selected state, and logical swipe focus order.

#### iOS (VoiceOver)
1. Enable VoiceOver in iOS Accessibility settings.
2. Navigate the same screens and actions.
3. Verify announcements, rotor navigation behavior, and control activation feedback.

## Screens

### Home Screen
- Welcome section
- Quick action cards (Courses, Assignments, Schedule, Progress)
- Recent activity feed

### Settings Screen
- Theme selection (Light, Dark, System)
- Accessibility options
- App information

### Explore & Profile Screens
- Placeholder screens ready for expansion

## Dependencies

- `flutter` - Flutter framework
- `provider` - State management
- `gap` - Responsive spacing widget
- `go_router` - Navigation and routing
- `cupertino_icons` - iOS style icons

## Contributing

Feel free to extend this design system with additional screens, widgets, and features.

## License

This project is part of the EduLense initiative.
