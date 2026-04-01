import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type ThemeMode = "light" | "dark" | "system";

type ModeContent = {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

type Props = {
  mode: ThemeMode;
  selected: boolean;
  platformHint: string;
  onPress: () => void;
};

function getModeContent(mode: ThemeMode): ModeContent {
  switch (mode) {
    case "light":
      return {
        title: "Light Mode",
        subtitle: "Optimized for daytime use with bright surfaces",
        icon: "light-mode",
      };
    case "dark":
      return {
        title: "Dark Mode",
        subtitle: "Easier on the eyes in low-light environments",
        icon: "dark-mode",
      };
    case "system":
    default:
      return {
        title: "System Default",
        subtitle: "Follow device theme settings",
        icon: "brightness-auto",
      };
  }
}

export function ThemeModeOptionRow({
  mode,
  selected,
  platformHint,
  onPress,
}: Props): React.JSX.Element {
  const { palette, fontScale, textAlign } = useAppTheme();
  const content = getModeContent(mode);

  return (
    <Pressable
      accessible
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${content.title}. ${content.subtitle}`}
      accessibilityHint={`${platformHint}. Double tap to select ${content.title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: selected
            ? palette.surfaceMuted
            : pressed
              ? palette.backgroundSoft
              : "transparent",
          borderColor: selected ? palette.borderStrong : palette.border,
          opacity: pressed && Platform.OS === "ios" ? 0.94 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
      hitSlop={8}
    >
      <View
        style={[
          styles.leading,
          {
            backgroundColor: selected ? `${palette.accent}20` : "transparent",
            borderColor: palette.border,
          },
        ]}
      >
        <MaterialIcons
          name={content.icon}
          size={24}
          color={selected ? palette.accent : palette.textSecondary}
        />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              color: palette.textPrimary,
              fontSize: 15 * fontScale,
              textAlign,
            },
          ]}
        >
          {content.title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: palette.textSecondary,
              fontSize: 13 * fontScale,
              textAlign,
            },
          ]}
        >
          {content.subtitle}
        </Text>
      </View>

      <MaterialIcons
        name={selected ? "check-circle" : "radio-button-unchecked"}
        size={24}
        color={selected ? palette.accent : palette.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  leading: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: "600",
  },
  subtitle: {
    lineHeight: 18,
  },
});
