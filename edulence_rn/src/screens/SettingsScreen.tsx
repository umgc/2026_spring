import React, { useCallback, useMemo } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { InfoChip } from "../components/InfoChip";
import { SectionTitle } from "../components/SectionTitle";
import { SettingSwitchRow } from "../components/SettingSwitchRow";
import { SurfaceCard } from "../components/SurfaceCard";
import { ThemeModeOptionRow } from "../components/ThemeModeOptionRow";
import { appConstants } from "../constants/appConstants";
import { useAccessibilityAnnouncement } from "../hooks/useAccessibilityAnnouncement";
import { useThemeActions, useThemePreferences } from "../store/useAppStore";
import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type ThemeMode = "light" | "dark" | "system";

type AccessibilityOption = {
  label: string;
  hint: string;
  value: boolean;
  onToggle: (value: boolean) => void;
};

const themeModes: ThemeMode[] = ["light", "dark", "system"];

export function SettingsScreen(): React.JSX.Element {
  const { themeMode, leftHandedMode, largeText, highContrast } =
    useThemePreferences();
  const { setThemeMode, setLeftHandedMode, setLargeText, setHighContrast } =
    useThemeActions();
  const { announce } = useAccessibilityAnnouncement();
  const { palette, fontScale, textAlign } = useAppTheme();

  const platformHint =
    Platform.OS === "ios"
      ? "Optimized for VoiceOver"
      : "Optimized for TalkBack";

  const onToggleLeftHanded = useCallback(
    (value: boolean) => {
      setLeftHandedMode(value);
      announce(`Left-handed mode ${value ? "enabled" : "disabled"}`);
    },
    [announce, setLeftHandedMode],
  );

  const onToggleLargeText = useCallback(
    (value: boolean) => {
      setLargeText(value);
      announce(`Large text ${value ? "enabled" : "disabled"}`);
    },
    [announce, setLargeText],
  );

  const onToggleHighContrast = useCallback(
    (value: boolean) => {
      setHighContrast(value);
      announce(`High contrast ${value ? "enabled" : "disabled"}`);
    },
    [announce, setHighContrast],
  );

  const onSelectTheme = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
      announce(`Theme changed to ${mode}`);
    },
    [announce, setThemeMode],
  );

  const accessibilityOptions: AccessibilityOption[] = useMemo(
    () => [
      {
        label: "Left-Handed Mode",
        hint: "Moves key controls to left-optimized positions",
        value: leftHandedMode,
        onToggle: onToggleLeftHanded,
      },
      {
        label: "Large Text",
        hint: "Increases text size for improved readability",
        value: largeText,
        onToggle: onToggleLargeText,
      },
      {
        label: "High Contrast",
        hint: "Enables stronger contrast for readability",
        value: highContrast,
        onToggle: onToggleHighContrast,
      },
    ],
    [
      highContrast,
      largeText,
      leftHandedMode,
      onToggleHighContrast,
      onToggleLargeText,
      onToggleLeftHanded,
    ],
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
    >
      <SectionTitle title="Appearance" />
      <SurfaceCard>
        {themeModes.map((mode) => (
          <ThemeModeOptionRow
            key={mode}
            mode={mode}
            selected={themeMode === mode}
            platformHint={platformHint}
            onPress={() => {
              onSelectTheme(mode);
            }}
          />
        ))}
      </SurfaceCard>

      <SectionTitle title="Accessibility" />
      <SurfaceCard>
        {accessibilityOptions.map((option) => (
          <SettingSwitchRow
            key={option.label}
            label={option.label}
            hint={option.hint}
            value={option.value}
            onValueChange={option.onToggle}
          />
        ))}
      </SurfaceCard>

      <SectionTitle title="About" />
      <SurfaceCard>
        <Text
          style={[
            styles.aboutTitle,
            { color: palette.textPrimary, fontSize: 18 * fontScale, textAlign },
          ]}
        >
          {appConstants.name}
        </Text>
        <Text
          style={[
            styles.aboutBody,
            {
              color: palette.textSecondary,
              fontSize: 14 * fontScale,
              textAlign,
            },
          ]}
        >
          Version {appConstants.version}
        </Text>
        <Text
          style={[
            styles.aboutBody,
            {
              color: palette.textSecondary,
              fontSize: 14 * fontScale,
              textAlign,
            },
          ]}
        >
          {appConstants.description}
        </Text>
        <View style={styles.chipRow}>
          <InfoChip label="WCAG AA" color={palette.success} />
          <InfoChip label="Accessible" color={palette.info} />
          <InfoChip label="Left-Friendly" color={palette.accent} />
        </View>
      </SurfaceCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  aboutTitle: {
    fontWeight: "700",
  },
  aboutBody: {
    lineHeight: 20,
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
});
