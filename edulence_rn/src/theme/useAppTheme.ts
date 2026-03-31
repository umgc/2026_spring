import type { TextStyle, ViewStyle } from "react-native";
import { useColorScheme } from "react-native";

import { colors } from "./colors";
import { useThemePreferences } from "../store/useAppStore";

type Palette = {
  background: string;
  backgroundSoft: string;
  surface: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  borderStrong: string;
  accent: string;
  accentStrong: string;
  success: string;
  info: string;
  shadow: string;
};

const lightPalette: Palette = {
  background: colors.background,
  backgroundSoft: colors.backgroundSoft,
  surface: colors.surface,
  surfaceMuted: colors.surfaceMuted,
  textPrimary: colors.textPrimary,
  textSecondary: colors.textSecondary,
  border: colors.border,
  borderStrong: colors.borderStrong,
  accent: colors.primary,
  accentStrong: colors.primaryStrong,
  success: colors.success,
  info: colors.info,
  shadow: "rgba(36, 48, 63, 0.12)",
};

const darkPalette: Palette = {
  background: colors.darkBackground,
  backgroundSoft: colors.darkSurfaceMuted,
  surface: colors.darkSurface,
  surfaceMuted: colors.darkSurfaceMuted,
  textPrimary: colors.darkTextPrimary,
  textSecondary: colors.darkTextSecondary,
  border: colors.darkBorder,
  borderStrong: "#48627B",
  accent: colors.primary,
  accentStrong: "#72EADF",
  success: colors.success,
  info: colors.info,
  shadow: "rgba(0, 0, 0, 0.28)",
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
        borderStrong: isDark ? "#FFFFFF" : "#1A1A1A",
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
