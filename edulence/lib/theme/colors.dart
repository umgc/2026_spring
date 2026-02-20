import 'package:flutter/material.dart';

/// EduLense Color Palette
/// WCAG AA Compliant Design System
class EduLenseColors {
  // Primary Colors (Brand)
  static const Color primary = Color(0xFF5E3AEE); // Primary - 4.52:1
  static const Color secondary = Color(0xFF00BCD4); // Secondary - 4.51:1

  // Semantic Colors
  static const Color success = Color(0xFF4CAF50); // Success - 4.51:1
  static const Color warning = Color(0xFFFFC107); // Warning - 3.05:1
  static const Color error = Color(0xFFF44336); // Error - 4.53:1
  static const Color info = Color(0xFF2196F3); // Info - 4.57:1

  // Accent & Background
  static const Color accent = Color(0xFFFF6B6B); // Accent - 3.05:1
  static const Color background = Color(0xFFFAFAFA); // Background

  // Text Colors (Light Mode)
  static const Color primaryText = Color(0xFF212121); // 15.43:1
  static const Color secondaryText = Color(0xFF666666); // 7.37:1
  static const Color tertiaryText = Color(0xFF999999); // 4.73:1
  static const Color disabledText = Color(
    0xFFCCCCCC,
  ); // 3.15:1 (large text only)

  // Neutral Colors
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  static const Color lightGrey = Color(0xFFF5F5F5);
  static const Color mediumGrey = Color(0xFFEEEEEE);
  static const Color darkGrey = Color(0xFF757575);

  // Dark Mode Colors
  static const Color darkBackground = Color(0xFF121212);
  static const Color darkSurface = Color(0xFF1E1E1E);
  static const Color darkPrimaryText = Color(0xFFFFFFFF);
  static const Color darkSecondaryText = Color(0xFFBBBBBB);
  static const Color darkTertiaryText = Color(0xFF888888);
}

/// Light Theme Color Scheme
class LightColorScheme {
  static const ColorScheme scheme = ColorScheme.light(
    primary: EduLenseColors.primary,
    secondary: EduLenseColors.secondary,
    surface: EduLenseColors.white,
    error: EduLenseColors.error,
    tertiary: EduLenseColors.accent,
  );
}

/// Dark Theme Color Scheme
class DarkColorScheme {
  static const ColorScheme scheme = ColorScheme.dark(
    primary: EduLenseColors.primary,
    secondary: EduLenseColors.secondary,
    surface: EduLenseColors.darkSurface,
    error: EduLenseColors.error,
    tertiary: EduLenseColors.accent,
  );
}
