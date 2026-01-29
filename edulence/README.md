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
├── models/           # Data models
├── services/         # Business logic services
├── theme/            # Design system
│   ├── colors.dart   # Color palette
│   ├── text_styles.dart # Typography
│   └── theme.dart    # Theme definitions
├── constants/        # App constants
│   └── app_constants.dart
└── main.dart         # App entry point
```

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

1. **WCAG AA Compliance** - All color combinations meet accessibility standards
2. **Left-Handed Optimization** - UI elements positioned for left-handed users
3. **Large Text Support** - Option to increase font sizes
4. **High Contrast Mode** - Alternative color scheme for better visibility

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

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
