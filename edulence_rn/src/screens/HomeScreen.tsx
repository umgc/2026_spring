import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { ActionCard } from "../components/ActionCard";
import { ScreenHeader } from "../components/ScreenHeader";
import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";
import { isTabletLayout } from "../utils/layout";
import { sanitizeDisplayText } from "../utils/security";

type RootTabsParamList = {
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
};

type Props = BottomTabScreenProps<RootTabsParamList, "Home">;

const quickActions = [
  { label: "My Courses", icon: "menu-book" as const },
  { label: "Assignments", icon: "assignment" as const },
  { label: "Schedule", icon: "calendar-today" as const },
  { label: "Progress", icon: "bar-chart" as const },
];

const activities = [
  "Flutter Basics - Lesson 3: Completed 2 hours ago",
  "Assignment: State Management - Due in 2 days",
  "Quiz: Dart Fundamentals - Score 92/100",
];

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const { width } = useWindowDimensions();
  const isTablet = isTabletLayout(width);
  const { palette, fontScale, textAlign } = useAppTheme();
  const openSettings = useCallback(
    () => navigation.getParent()?.navigate("Settings" as never),
    [navigation],
  );
  const renderActivityItem = useCallback(
    ({ item }: { item: string }) => (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={sanitizeDisplayText(item)}
        style={[
          styles.activityCard,
          { borderColor: palette.border, backgroundColor: palette.surface },
        ]}
      >
        <Text
          style={[
            styles.activityText,
            {
              color: palette.textPrimary,
              fontSize: 14 * fontScale,
              textAlign,
            },
          ]}
        >
          {item}
        </Text>
      </View>
    ),
    [
      fontScale,
      palette.border,
      palette.surface,
      palette.textPrimary,
      textAlign,
    ],
  );

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <ScreenHeader title="EduLense" onPressSettings={openSettings} />

      <Text
        style={[
          styles.sectionTitle,
          { color: palette.textPrimary, fontSize: 20 * fontScale, textAlign },
        ]}
      >
        Quick Actions
      </Text>
      <View style={[styles.actionsGrid, isTablet && styles.actionsGridTablet]}>
        {quickActions.map((action) => (
          <ActionCard
            key={action.label}
            label={action.label}
            icon={action.icon}
            onPress={() => {}}
          />
        ))}
      </View>

      <Text
        style={[
          styles.sectionTitle,
          { color: palette.textPrimary, fontSize: 20 * fontScale, textAlign },
        ]}
      >
        Recent Activity
      </Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.activityList}
        renderItem={renderActivityItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  actionsGridTablet: {
    justifyContent: "space-between",
  },
  activityList: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  activityCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  activityText: {
    lineHeight: 20,
  },
});
