import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";

import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type Props = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
};

export const ActionCard = React.memo(function ActionCard({
  label,
  icon,
  onPress,
}: Props): React.JSX.Element {
  const { palette, fontScale, textAlign } = useAppTheme();

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={`Opens ${label}`}
      onPress={onPress}
      android_ripple={{ color: "rgba(0,0,0,0.08)", borderless: false }}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: pressed ? palette.borderStrong : palette.border,
          backgroundColor: pressed ? palette.surfaceMuted : palette.surface,
          opacity: pressed && Platform.OS === "ios" ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          shadowColor: palette.shadow,
        },
      ]}
    >
      <MaterialIcons name={icon} size={36} color={palette.accent} />
      <Text
        style={[
          styles.label,
          {
            color: palette.textPrimary,
            fontSize: 14 * fontScale,
            textAlign,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    gap: spacing.sm,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
  },
});
