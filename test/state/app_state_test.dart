import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter/state/app_state.dart';

void main() {
  group('AppState', () {
    test('should create AppState with correct initial values', () {
      const appState = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      expect(appState.dayStreak, 5);
      expect(appState.goalsCompleted, 3);
      expect(appState.studyHoursThisWeek, 10);
    });

    test('copyWith should return new instance with updated values', () {
      const appState = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      final updatedState = appState.copyWith(dayStreak: 10);

      expect(updatedState.dayStreak, 10);
      expect(updatedState.goalsCompleted, 3);
      expect(updatedState.studyHoursThisWeek, 10);
    });

    test('copyWith should preserve unchanged values', () {
      const appState = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      final updatedState = appState.copyWith(goalsCompleted: 5);

      expect(updatedState.dayStreak, 5);
      expect(updatedState.goalsCompleted, 5);
      expect(updatedState.studyHoursThisWeek, 10);
    });

    test('copyWith should update multiple values at once', () {
      const appState = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      final updatedState = appState.copyWith(
        dayStreak: 15,
        goalsCompleted: 8,
        studyHoursThisWeek: 25,
      );

      expect(updatedState.dayStreak, 15);
      expect(updatedState.goalsCompleted, 8);
      expect(updatedState.studyHoursThisWeek, 25);
    });

    test('copyWith should return equal instances when values are the same', () {
      const appState = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      final copiedState = appState.copyWith();

      expect(copiedState.dayStreak, appState.dayStreak);
      expect(copiedState.goalsCompleted, appState.goalsCompleted);
      expect(copiedState.studyHoursThisWeek, appState.studyHoursThisWeek);
    });

    test('should support equality comparison', () {
      const state1 = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      const state2 = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      expect(state1 == state2, true);
    });

    test('should return false for inequality', () {
      const state1 = AppState(
        dayStreak: 5,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      const state2 = AppState(
        dayStreak: 6,
        goalsCompleted: 3,
        studyHoursThisWeek: 10,
      );

      expect(state1 == state2, false);
    });
  });
}
