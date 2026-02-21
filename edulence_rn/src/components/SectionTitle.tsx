import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

import { useAppTheme } from "../theme/useAppTheme";

type Props = {
  title: string;
  style?: StyleProp<TextStyle>;
};

export function SectionTitle({ title, style }: Props): React.JSX.Element {
  const { palette, fontScale, textAlign } = useAppTheme();

  return (
    <Text
      accessibilityRole="header"
      style={[
        styles.title,
        { color: palette.textPrimary, fontSize: 22 * fontScale, textAlign },
        style,
      ]}
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
  },
});
