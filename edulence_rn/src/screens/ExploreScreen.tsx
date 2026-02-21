import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SectionTitle } from "../components/SectionTitle";
import { SurfaceCard } from "../components/SurfaceCard";
import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

type ExploreItem = {
  id: string;
  title: string;
  category: string;
  description: string;
};

const exploreItems: ExploreItem[] = [
  {
    id: "1",
    title: "Introduction to Flutter",
    category: "Mobile Development",
    description: "Build responsive apps with Dart and Flutter widgets.",
  },
  {
    id: "2",
    title: "React Native Fundamentals",
    category: "Mobile Development",
    description: "Cross-platform fundamentals using React Native and Expo.",
  },
  {
    id: "3",
    title: "Data Structures Essentials",
    category: "Computer Science",
    description: "Core structures with practical interview-style examples.",
  },
  {
    id: "4",
    title: "UX Accessibility Basics",
    category: "Design",
    description: "Build inclusive interfaces for all users.",
  },
];

export function ExploreScreen(): React.JSX.Element {
  const { palette, fontScale, textAlign } = useAppTheme();
  const [query, setQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return exploreItems;
    }

    return exploreItems.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized),
    );
  }, [query]);

  const selectedCourse =
    filtered.find((item) => item.id === selectedCourseId) ?? null;
  const onSelectCourse = useCallback((id: string) => {
    setSelectedCourseId(id);
  }, []);
  const renderCourseItem = useCallback(
    ({ item }: { item: ExploreItem }) => {
      const isSelected = item.id === selectedCourseId;

      return (
        <Pressable
          accessible
          accessibilityRole="button"
          accessibilityLabel={`${item.title}. ${item.category}`}
          accessibilityHint="Opens course details"
          onPress={() => {
            onSelectCourse(item.id);
          }}
          style={[
            styles.card,
            {
              borderColor: isSelected ? palette.accent : palette.border,
              backgroundColor: palette.surface,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: palette.textPrimary,
                fontSize: 16 * fontScale,
                textAlign,
              },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.cardCategory,
              {
                color: palette.accent,
                fontSize: 13 * fontScale,
                textAlign,
              },
            ]}
          >
            {item.category}
          </Text>
          <Text
            style={[
              styles.cardDescription,
              {
                color: palette.textSecondary,
                fontSize: 13 * fontScale,
                textAlign,
              },
            ]}
          >
            {item.description}
          </Text>
        </Pressable>
      );
    },
    [
      selectedCourseId,
      onSelectCourse,
      palette.accent,
      palette.border,
      palette.surface,
      palette.textPrimary,
      palette.textSecondary,
      fontScale,
      textAlign,
    ],
  );

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <SectionTitle title="Explore" style={styles.title} />

      <TextInput
        accessible
        accessibilityLabel="Search courses"
        accessibilityHint="Search available courses and categories"
        value={query}
        onChangeText={setQuery}
        placeholder="Search courses"
        placeholderTextColor={palette.textSecondary}
        style={[
          styles.searchInput,
          {
            borderColor: palette.border,
            color: palette.textPrimary,
            fontSize: 15 * fontScale,
            textAlign,
          },
        ]}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              {
                color: palette.textSecondary,
                fontSize: 14 * fontScale,
                textAlign,
              },
            ]}
          >
            No results found.
          </Text>
        }
        renderItem={renderCourseItem}
      />

      {selectedCourse ? (
        <SurfaceCard
          style={[
            styles.detailCard,
            { borderColor: palette.border, backgroundColor: palette.surface },
          ]}
        >
          <Text
            accessibilityRole="summary"
            accessibilityLabel={`Selected course ${selectedCourse.title}`}
            style={[
              styles.detailTitle,
              {
                color: palette.textPrimary,
                fontSize: 15 * fontScale,
                textAlign,
              },
            ]}
          >
            Selected: {selectedCourse.title}
          </Text>
          <Text
            style={[
              styles.detailBody,
              {
                color: palette.textSecondary,
                fontSize: 13 * fontScale,
                textAlign,
              },
            ]}
          >
            {selectedCourse.description}
          </Text>
        </SurfaceCard>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    marginBottom: spacing.md,
  },
  searchInput: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
  },
  listContent: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    minHeight: 44,
    gap: spacing.xs,
  },
  cardTitle: {
    fontWeight: "700",
  },
  cardCategory: {
    fontWeight: "600",
  },
  cardDescription: {
    lineHeight: 20,
  },
  detailCard: {
    borderWidth: 1,
  },
  detailTitle: {
    fontWeight: "700",
  },
  detailBody: {
    lineHeight: 18,
  },
  emptyText: {
    marginTop: spacing.lg,
  },
});
