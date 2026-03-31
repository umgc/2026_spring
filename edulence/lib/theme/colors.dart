import 'package:flutter/material.dart';

/// EduLense Color Palette
/// WCAG AA Compliant Design System
class EduLenseColors {
  // Primary Colors (Brand)
  static const Color primary = Color(0xFF0F766E);
  static const Color secondary = Color(0xFF1D4ED8);

  // Semantic Colors
  static const Color success = Color(0xFF15803D);
  static const Color warning = Color(0xFFB45309);
  static const Color error = Color(0xFFB91C1C);
  static const Color info = Color(0xFF1D4ED8);

  // Accent & Background
  static const Color accent = Color(0xFF115E59);
  static const Color background = Color(0xFFF4F1E8);

  // Text Colors (Light Mode)
  static const Color primaryText = Color(0xFF18222F);
  static const Color secondaryText = Color(0xFF5F6973);
  static const Color tertiaryText = Color(0xFF7A838C);
  static const Color disabledText = Color(
    0xFFCCCCCC,
  ); // 3.15:1 (large text only)

  // Neutral Colors
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  static const Color lightGrey = Color(0xFFFBF8F1);
  static const Color mediumGrey = Color(0xFFD9D1C4);
  static const Color darkGrey = Color(0xFF6B7280);

  // Dark Mode Colors
  static const Color darkBackground = Color(0xFF0F1720);
  static const Color darkSurface = Color(0xFF152332);
  static const Color darkPrimaryText = Color(0xFFECF3F8);
  static const Color darkSecondaryText = Color(0xFFA9B8C5);
  static const Color darkTertiaryText = Color(0xFF8CA0B3);
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
