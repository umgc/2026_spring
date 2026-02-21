import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { useAppTheme } from "./src/theme/useAppTheme";

export default function App(): React.JSX.Element {
  const { isDark, palette } = useAppTheme();

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: palette.background,
          card: palette.surface,
          text: palette.textPrimary,
          border: palette.border,
          primary: palette.accent,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: palette.background,
          card: palette.surface,
          text: palette.textPrimary,
          border: palette.border,
          primary: palette.accent,
        },
      };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
