import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";

import { AuthEntryScreen } from "../screens/AuthEntryScreen";
import { ExploreScreen } from "../screens/ExploreScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useAppStore } from "../store/useAppStore";
import { useAppTheme } from "../theme/useAppTheme";

type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  Settings: undefined;
};

type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function MainTabs(): React.JSX.Element {
  const { palette } = useAppTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
        },
        tabBarActiveTintColor: palette.accent,
        tabBarInactiveTintColor: palette.textSecondary,
        tabBarHideOnKeyboard: Platform.OS === "android",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName: keyof typeof MaterialIcons.glyphMap =
            route.name === "Home"
              ? "home"
              : route.name === "Explore"
                ? "search"
                : "person";

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarAccessibilityLabel: `${route.name} tab`,
        tabBarAccessibilityHint: `Switch to ${route.name} screen`,
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Explore" component={ExploreScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function AppNavigator(): React.JSX.Element {
  const { palette } = useAppTheme();
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <RootStack.Navigator
      initialRouteName={currentUser ? "MainTabs" : "Auth"}
      screenOptions={{
        headerStyle: { backgroundColor: palette.surface },
        headerTintColor: palette.textPrimary,
        animation: Platform.OS === "ios" ? "default" : "fade_from_bottom",
      }}
    >
      {!currentUser ? (
        <RootStack.Screen
          name="Auth"
          component={AuthEntryScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <RootStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerLargeTitle: Platform.OS === "ios",
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
}
