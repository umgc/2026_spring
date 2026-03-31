import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SurfaceCard({ children, style }: Props): React.JSX.Element {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: palette.border,
          backgroundColor: palette.surface,
          shadowColor: palette.shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 4,
  },
});
