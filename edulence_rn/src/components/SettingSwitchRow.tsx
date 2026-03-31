import React from "react";
import { Platform, Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type Props = {
  label: string;
  hint: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SettingSwitchRow({
  label,
  hint,
  value,
  onValueChange,
}: Props): React.JSX.Element {
  const { palette, fontScale, textAlign } = useAppTheme();

  return (
    <Pressable
      accessible
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: pressed ? palette.backgroundSoft : "transparent",
          borderColor: value ? palette.borderStrong : palette.border,
          opacity: pressed && Platform.OS === "ios" ? 0.94 : 1,
        },
      ]}
      hitSlop={4}
    >
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
        {label}
      </Text>
      <View
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      >
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: palette.border,
            true: `${palette.accent}88`,
          }}
          thumbColor={value ? palette.accent : undefined}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  title: {
    fontWeight: "600",
  },
});
