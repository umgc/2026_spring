import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { spacing } from "../theme/spacing";

type Props = {
  label: string;
  color: string;
};

export const InfoChip = React.memo(function InfoChip({
  label,
  color,
}: Props): React.JSX.Element {
  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[styles.chip, { borderColor: color }]}
    >
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
