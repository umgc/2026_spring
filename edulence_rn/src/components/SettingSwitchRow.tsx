import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

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
      style={styles.row}
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
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  title: {
    fontWeight: "600",
  },
});
