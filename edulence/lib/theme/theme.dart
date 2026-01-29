import 'package:flutter/material.dart';
import 'colors.dart';
import 'text_styles.dart';

/// EduLense Light Theme
ThemeData createLightTheme() {
  return ThemeData(
    useMaterial3: true,
    colorScheme: LightColorScheme.scheme,
    brightness: Brightness.light,
    scaffoldBackgroundColor: EduLenseColors.background,
    appBarTheme: AppBarTheme(
      backgroundColor: EduLenseColors.white,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: EduLenseTextStyles.h3,
      iconTheme: const IconThemeData(color: EduLenseColors.primaryText),
    ),
    buttonTheme: const ButtonThemeData(
      buttonColor: EduLenseColors.primary,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: EduLenseColors.primary,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        textStyle: EduLenseTextStyles.button,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: EduLenseColors.primary,
        side: const BorderSide(color: EduLenseColors.primary),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        textStyle: EduLenseTextStyles.button,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: EduLenseColors.lightGrey,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: EduLenseColors.mediumGrey),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: EduLenseColors.mediumGrey),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: EduLenseColors.primary, width: 2),
      ),
      labelStyle: EduLenseTextStyles.label,
      hintStyle: EduLenseTextStyles.bodySmall,
    ),
    cardTheme: CardThemeData(
      color: EduLenseColors.white,
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    textTheme: TextTheme(
      headlineLarge: EduLenseTextStyles.h1,
      headlineMedium: EduLenseTextStyles.h2,
      headlineSmall: EduLenseTextStyles.h3,
      bodyLarge: EduLenseTextStyles.bodyLarge,
      bodyMedium: EduLenseTextStyles.bodyMedium,
      bodySmall: EduLenseTextStyles.bodySmall,
      labelMedium: EduLenseTextStyles.label,
    ),
  );
}

/// EduLense Dark Theme
ThemeData createDarkTheme() {
  return ThemeData(
    useMaterial3: true,
    colorScheme: DarkColorScheme.scheme,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: EduLenseColors.darkBackground,
    appBarTheme: AppBarTheme(
      backgroundColor: EduLenseColors.darkSurface,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: EduLenseDarkTextStyles.h3,
      iconTheme: const IconThemeData(color: EduLenseColors.darkPrimaryText),
    ),
    buttonTheme: const ButtonThemeData(
      buttonColor: EduLenseColors.primary,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: EduLenseColors.primary,
        foregroundColor: EduLenseColors.darkBackground,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        textStyle: EduLenseDarkTextStyles.button,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: EduLenseColors.primary,
        side: const BorderSide(color: EduLenseColors.primary),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        textStyle: EduLenseDarkTextStyles.button,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: EduLenseColors.darkSurface,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: EduLenseColors.darkGrey),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: EduLenseColors.darkGrey),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: EduLenseColors.primary, width: 2),
      ),
      labelStyle: EduLenseDarkTextStyles.label,
      hintStyle: EduLenseDarkTextStyles.bodySmall,
    ),
    cardTheme: CardThemeData(
      color: EduLenseColors.darkSurface,
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    textTheme: TextTheme(
      headlineLarge: EduLenseDarkTextStyles.h1,
      headlineMedium: EduLenseDarkTextStyles.h2,
      headlineSmall: EduLenseDarkTextStyles.h3,
      bodyLarge: EduLenseDarkTextStyles.bodyLarge,
      bodyMedium: EduLenseDarkTextStyles.bodyMedium,
      bodySmall: EduLenseDarkTextStyles.bodySmall,
      labelMedium: EduLenseDarkTextStyles.label,
    ),
  );
}
