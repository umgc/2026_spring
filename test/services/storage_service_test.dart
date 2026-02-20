import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:edulense_flutter_new/services/storage_service.dart';

void main() {
  group('StorageService', () {
    late StorageService storageService;

    setUp(() {
      // Setup SharedPreferences mock
      SharedPreferences.setMockInitialValues({});
      storageService = StorageService();
    });

    group('Day Streak', () {
      test('loadDayStreak should return default value when empty', () async {
        final result = await storageService.loadDayStreak();
        expect(result, 12);
      });

      test('saveDayStreak should persist value', () async {
        await storageService.saveDayStreak(15);
        final result = await storageService.loadDayStreak();
        expect(result, 15);
      });

      test('saveDayStreak should handle zero', () async {
        await storageService.saveDayStreak(0);
        final result = await storageService.loadDayStreak();
        expect(result, 0);
      });

      test('saveDayStreak should handle large values', () async {
        await storageService.saveDayStreak(1000);
        final result = await storageService.loadDayStreak();
        expect(result, 1000);
      });

      test('saveDayStreak should overwrite previous value', () async {
        await storageService.saveDayStreak(10);
        await storageService.saveDayStreak(20);
        final result = await storageService.loadDayStreak();
        expect(result, 20);
      });
    });

    group('Goals', () {
      test('loadGoals should return default value when empty', () async {
        final result = await storageService.loadGoals();
        expect(result, 8);
      });

      test('saveGoals should persist value', () async {
        await storageService.saveGoals(10);
        final result = await storageService.loadGoals();
        expect(result, 10);
      });

      test('saveGoals should handle zero', () async {
        await storageService.saveGoals(0);
        final result = await storageService.loadGoals();
        expect(result, 0);
      });

      test('saveGoals should overwrite previous value', () async {
        await storageService.saveGoals(5);
        await storageService.saveGoals(15);
        final result = await storageService.loadGoals();
        expect(result, 15);
      });
    });

    group('Study Hours', () {
      test('loadStudyHours should return default value when empty', () async {
        final result = await storageService.loadStudyHours();
        expect(result, 24);
      });

      test('saveStudyHours should persist value', () async {
        await storageService.saveStudyHours(30);
        final result = await storageService.loadStudyHours();
        expect(result, 30);
      });

      test('saveStudyHours should handle zero', () async {
        await storageService.saveStudyHours(0);
        final result = await storageService.loadStudyHours();
        expect(result, 0);
      });

      test('saveStudyHours should overwrite previous value', () async {
        await storageService.saveStudyHours(10);
        await storageService.saveStudyHours(40);
        final result = await storageService.loadStudyHours();
        expect(result, 40);
      });
    });

    group('Multiple values', () {
      test('should preserve independent values', () async {
        await storageService.saveDayStreak(10);
        await storageService.saveGoals(5);
        await storageService.saveStudyHours(15);

        final streak = await storageService.loadDayStreak();
        final goals = await storageService.loadGoals();
        final hours = await storageService.loadStudyHours();

        expect(streak, 10);
        expect(goals, 5);
        expect(hours, 15);
      });

      test('should handle mixed saves and loads', () async {
        await storageService.saveDayStreak(12);
        final streak = await storageService.loadDayStreak();

        await storageService.saveGoals(8);
        final goals = await storageService.loadGoals();

        expect(streak, 12);
        expect(goals, 8);
      });
    });

    group('Default values', () {
      test('should return consistent defaults', () async {
        final streak = await storageService.loadDayStreak();
        final goals = await storageService.loadGoals();
        final hours = await storageService.loadStudyHours();

        expect(streak, 12);
        expect(goals, 8);
        expect(hours, 24);
      });
    });
  });
}
