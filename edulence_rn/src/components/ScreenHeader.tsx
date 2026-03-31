import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type Props = {
  title: string;
  onPressSettings: () => void;
};

export const ScreenHeader = React.memo(function ScreenHeader({
  title,
  onPressSettings,
}: Props): React.JSX.Element {
  const { palette, fontScale, rowDirection, textAlign } = useAppTheme();

  return (
    <View style={[styles.row, { flexDirection: rowDirection }]}>
      <Text
        accessibilityRole="header"
        style={[
          styles.title,
          { color: palette.textPrimary, fontSize: 28 * fontScale, textAlign },
        ]}
      >
        {title}
      </Text>
      <Pressable
        accessible
        accessibilityRole="button"
        accessibilityLabel="Open settings"
        accessibilityHint="Navigates to settings screen"
        onPress={onPressSettings}
        android_ripple={{ color: "rgba(0,0,0,0.08)", borderless: true }}
        style={({ pressed }) => [
          styles.iconButton,
          {
            backgroundColor: pressed ? palette.surfaceMuted : palette.surface,
            borderColor: pressed ? palette.borderStrong : palette.border,
            opacity: pressed && Platform.OS === "ios" ? 0.75 : 1,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          },
        ]}
      >
        <MaterialIcons name="settings" size={24} color={palette.textPrimary} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: "700",
  },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
