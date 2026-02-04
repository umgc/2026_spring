import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter/models/progress_metrics.dart';

void main() {
  group('ProgressMetrics Model', () {
    late ProgressMetrics metrics;

    setUp(() {
      metrics = ProgressMetrics(
        totalHoursLearned: 45,
        goalHours: 100,
        coursesCompleted: 3,
        coursesInProgress: 2,
        averageGrade: 87.5,
        currentStreak: 15,
        longestStreak: 32,
      );
    });

    test('creates metrics with correct properties', () {
      expect(metrics.totalHoursLearned, 45);
      expect(metrics.goalHours, 100);
      expect(metrics.coursesCompleted, 3);
      expect(metrics.coursesInProgress, 2);
      expect(metrics.averageGrade, 87.5);
      expect(metrics.currentStreak, 15);
      expect(metrics.longestStreak, 32);
    });

    test('calculates progress toward goal correctly', () {
      expect(metrics.progressTowardGoal, 45);
    });

    test('returns 0 when goal is 0', () {
      final noGoal = metrics.copyWith(goalHours: 0);
      expect(noGoal.progressTowardGoal, 0);
    });

    test('clamps progress at 100%', () {
      final exceeded = metrics.copyWith(totalHoursLearned: 150);
      expect(exceeded.progressTowardGoal, 100);
    });

    test('isGoalAchieved returns true when hours >= goal', () {
      final achieved = metrics.copyWith(totalHoursLearned: 100);
      expect(achieved.isGoalAchieved, true);
    });

    test('isGoalAchieved returns false when hours < goal', () {
      expect(metrics.isGoalAchieved, false);
    });

    test('calculates total courses correctly', () {
      expect(metrics.totalCourses, 5);
    });

    test('calculates completion rate correctly', () {
      expect(metrics.completionRate, 60.0); // 3 out of 5
    });

    test('handles zero total courses', () {
      final noCourses = metrics.copyWith(
        coursesCompleted: 0,
        coursesInProgress: 0,
      );
      expect(noCourses.completionRate, 0.0);
    });

    test('calculates hours remaining correctly', () {
      expect(metrics.hoursRemainingToGoal, 55);
    });

    test('returns 0 hours remaining when goal is achieved', () {
      final achieved = metrics.copyWith(totalHoursLearned: 100);
      expect(achieved.hoursRemainingToGoal, 0);
    });

    test('returns 0 when exceeding goal', () {
      final exceeded = metrics.copyWith(totalHoursLearned: 150);
      expect(exceeded.hoursRemainingToGoal, 0);
    });

    test('assigns letter grade A for 90+ average', () {
      final aGrade = metrics.copyWith(averageGrade: 90.0);
      expect(aGrade.letterGrade, 'A');
    });

    test('assigns letter grade B for 80-89 average', () {
      final bGrade = metrics.copyWith(averageGrade: 85.0);
      expect(bGrade.letterGrade, 'B');
    });

    test('assigns letter grade C for 70-79 average', () {
      final cGrade = metrics.copyWith(averageGrade: 75.0);
      expect(cGrade.letterGrade, 'C');
    });

    test('assigns letter grade D for 60-69 average', () {
      final dGrade = metrics.copyWith(averageGrade: 65.0);
      expect(dGrade.letterGrade, 'D');
    });

    test('assigns letter grade F for below 60 average', () {
      final fGrade = metrics.copyWith(averageGrade: 50.0);
      expect(fGrade.letterGrade, 'F');
    });

    test('copyWith creates new instance with updated values', () {
      final updated = metrics.copyWith(
        totalHoursLearned: 60,
        currentStreak: 20,
      );
      expect(updated.totalHoursLearned, 60);
      expect(updated.currentStreak, 20);
      expect(updated.coursesCompleted, metrics.coursesCompleted);
    });

    test('copyWith preserves unchanged values', () {
      final updated = metrics.copyWith(averageGrade: 90.0);
      expect(updated.goalHours, metrics.goalHours);
      expect(updated.coursesInProgress, metrics.coursesInProgress);
    });

    test('equality comparison works correctly', () {
      final metrics2 = ProgressMetrics(
        totalHoursLearned: 45,
        goalHours: 100,
        coursesCompleted: 3,
        coursesInProgress: 2,
        averageGrade: 87.5,
        currentStreak: 15,
        longestStreak: 32,
      );
      expect(metrics, equals(metrics2));
    });

    test('inequality comparison works correctly', () {
      final different = metrics.copyWith(currentStreak: 10);
      expect(metrics, isNot(equals(different)));
    });

    test('hash codes are equal for equal objects', () {
      final metrics2 = metrics.copyWith();
      expect(metrics.hashCode, equals(metrics2.hashCode));
    });

    test('toString provides meaningful output', () {
      final metricsString = metrics.toString();
      expect(metricsString, contains('45/100 hours'));
      expect(metricsString, contains('60'));
    });

    test('handles perfect scores', () {
      final perfect = metrics.copyWith(averageGrade: 100.0);
      expect(perfect.letterGrade, 'A');
    });

    test('handles zero scores', () {
      final zero = metrics.copyWith(averageGrade: 0.0);
      expect(zero.letterGrade, 'F');
    });

    test('handles edge case with single course', () {
      final single = metrics.copyWith(
        coursesCompleted: 1,
        coursesInProgress: 0,
      );
      expect(single.totalCourses, 1);
      expect(single.completionRate, 100.0);
    });

    test('completion rate calculation with many courses', () {
      final many = metrics.copyWith(
        coursesCompleted: 8,
        coursesInProgress: 2,
      );
      expect(many.completionRate, 80.0); // 8 out of 10
    });

    test('supports large hour values', () {
      final extensive = metrics.copyWith(totalHoursLearned: 1000);
      expect(extensive.progressTowardGoal, 100);
    });

    test('tracks improvement with streak updates', () {
      final improved = metrics.copyWith(
        currentStreak: 25,
        longestStreak: 40,
      );
      expect(improved.currentStreak, 25);
      expect(improved.longestStreak, 40);
    });
  });
}
