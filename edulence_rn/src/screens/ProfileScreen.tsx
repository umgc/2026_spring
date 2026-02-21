import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "../components/ScreenHeader";
import { appConstants } from "../constants/appConstants";
import { useAuthActions, useAuthState } from "../store/useAppStore";
import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type RootTabsParamList = {
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
};

type Props = BottomTabScreenProps<RootTabsParamList, "Profile">;

const stats = [
  { label: "Courses Enrolled", value: "4" },
  { label: "Assignments Done", value: "17" },
  { label: "Average Score", value: "92%" },
];

export function ProfileScreen({ navigation }: Props): React.JSX.Element {
  const { palette, fontScale, textAlign } = useAppTheme();
  const { currentUser } = useAuthState();
  const { signOut } = useAuthActions();

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <ScreenHeader
        title="Profile"
        onPressSettings={() =>
          navigation.getParent()?.navigate("Settings" as never)
        }
      />

      <View
        style={[
          styles.profileCard,
          { borderColor: palette.border, backgroundColor: palette.surface },
        ]}
      >
        <Text
          style={[
            styles.name,
            { color: palette.textPrimary, fontSize: 20 * fontScale, textAlign },
          ]}
        >
          {currentUser?.name ?? "Guest"}
        </Text>
        <Text
          style={[
            styles.email,
            {
              color: palette.textSecondary,
              fontSize: 14 * fontScale,
              textAlign,
            },
          ]}
        >
          {currentUser?.email ?? "Not signed in"}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            accessible
            accessibilityRole="text"
            accessibilityLabel={`${stat.label}: ${stat.value}`}
            style={[
              styles.statCard,
              { borderColor: palette.border, backgroundColor: palette.surface },
            ]}
          >
            <Text
              style={[
                styles.statValue,
                { color: palette.textPrimary, fontSize: 18 * fontScale },
              ]}
            >
              {stat.value}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: palette.textSecondary, fontSize: 12 * fontScale },
              ]}
            >
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <Text
        style={[
          styles.appMeta,
          { color: palette.textSecondary, fontSize: 12 * fontScale, textAlign },
        ]}
      >
        {appConstants.name} v{appConstants.version}
      </Text>

      <Pressable
        accessible
        accessibilityRole="button"
        accessibilityLabel="Sign out"
        accessibilityHint="Signs out and returns to auth screen"
        onPress={signOut}
        style={[styles.signOutButton, { borderColor: palette.accent }]}
      >
        <Text
          style={[
            styles.signOutText,
            { color: palette.accent, fontSize: 15 * fontScale },
          ]}
        >
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    paddingTop: 56,
    gap: spacing.md,
  },
  profileCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.xs,
  },
  name: {
    fontWeight: "700",
  },
  email: {},
  statsGrid: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontWeight: "700",
  },
  statLabel: {
    marginTop: spacing.xs,
    textAlign: "center",
  },
  appMeta: {
    marginTop: spacing.sm,
  },
  signOutButton: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  signOutText: {
    fontWeight: "700",
  },
});
