import type { TextStyle, ViewStyle } from "react-native";
import { useColorScheme } from "react-native";

import { colors } from "./colors";
import { useThemePreferences } from "../store/useAppStore";

type Palette = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  info: string;
};

const lightPalette: Palette = {
  background: colors.background,
  surface: colors.surface,
  textPrimary: colors.textPrimary,
  textSecondary: colors.textSecondary,
  border: colors.border,
  accent: colors.primary,
  success: colors.success,
  info: colors.info,
};

const darkPalette: Palette = {
  background: colors.darkBackground,
  surface: colors.darkSurface,
  textPrimary: colors.darkTextPrimary,
  textSecondary: colors.darkTextSecondary,
  border: "#3A3A3A",
  accent: colors.primary,
  success: colors.success,
  info: colors.info,
};

export function useAppTheme() {
  const systemScheme = useColorScheme();
  const { themeMode, highContrast, largeText, leftHandedMode } =
    useThemePreferences();

  const resolvedScheme =
    themeMode === "system" ? (systemScheme ?? "light") : themeMode;
  const isDark = resolvedScheme === "dark";

  const base = isDark ? darkPalette : lightPalette;
  const palette: Palette = highContrast
    ? {
        ...base,
        textSecondary: isDark ? "#FFFFFF" : "#1A1A1A",
        border: isDark ? "#FFFFFF" : "#1A1A1A",
      }
    : base;

  return {
    palette,
    isDark,
    fontScale: largeText ? 1.2 : 1,
    leftHandedMode,
    textAlign: (leftHandedMode ? "right" : "left") as TextStyle["textAlign"],
    rowDirection: (leftHandedMode
      ? "row-reverse"
      : "row") as ViewStyle["flexDirection"],
  };
}
