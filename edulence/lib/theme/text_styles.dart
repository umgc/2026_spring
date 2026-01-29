import 'package:flutter/material.dart';
import 'colors.dart';

/// EduLense Text Styles
/// Implements proper text hierarchy for readability
class EduLenseTextStyles {
  // Headings
  static const TextStyle h1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: EduLenseColors.primaryText,
    height: 1.2,
  );

  static const TextStyle h2 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: EduLenseColors.primaryText,
    height: 1.3,
  );

  static const TextStyle h3 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    color: EduLenseColors.primaryText,
    height: 1.3,
  );

  // Body Text - Primary (15.43:1 contrast)
  static const TextStyle bodyLarge = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w500,
    color: EduLenseColors.primaryText,
    height: 1.5,
  );

  // Body Text - Secondary (7.37:1 contrast)
  static const TextStyle bodyMedium = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    color: EduLenseColors.secondaryText,
    height: 1.5,
  );

  // Small Text - Tertiary (4.73:1 contrast)
  static const TextStyle bodySmall = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    color: EduLenseColors.tertiaryText,
    height: 1.5,
  );

  // Button Text
  static const TextStyle button = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: EduLenseColors.white,
    height: 1.2,
    letterSpacing: 0.5,
  );

  // Label Text
  static const TextStyle label = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: EduLenseColors.secondaryText,
    letterSpacing: 0.4,
  );
}

/// Dark Mode Text Styles
class EduLenseDarkTextStyles {
  static const TextStyle h1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: EduLenseColors.darkPrimaryText,
    height: 1.2,
  );

  static const TextStyle h2 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: EduLenseColors.darkPrimaryText,
    height: 1.3,
  );

  static const TextStyle h3 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    color: EduLenseColors.darkPrimaryText,
    height: 1.3,
  );

  static const TextStyle bodyLarge = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w500,
    color: EduLenseColors.darkPrimaryText,
    height: 1.5,
  );

  static const TextStyle bodyMedium = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    color: EduLenseColors.darkSecondaryText,
    height: 1.5,
  );

  static const TextStyle bodySmall = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    color: EduLenseColors.darkTertiaryText,
    height: 1.5,
  );

  static const TextStyle button = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: EduLenseColors.darkBackground,
    height: 1.2,
    letterSpacing: 0.5,
  );

  static const TextStyle label = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: EduLenseColors.darkSecondaryText,
    letterSpacing: 0.4,
  );
}
