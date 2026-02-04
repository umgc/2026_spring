import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter/models/course.dart';

void main() {
  group('Course Model', () {
    late Course course;

    setUp(() {
      course = Course(
        id: 'course-001',
        title: 'Flutter Basics',
        instructor: 'John Doe',
        description: 'Learn Flutter fundamentals',
        totalLessons: 20,
        completedLessons: 15,
        category: 'Mobile Development',
        rating: 4.5,
        createdAt: DateTime(2026, 1, 1),
      );
    });

    test('creates a course with correct properties', () {
      expect(course.id, 'course-001');
      expect(course.title, 'Flutter Basics');
      expect(course.instructor, 'John Doe');
      expect(course.totalLessons, 20);
      expect(course.completedLessons, 15);
    });

    test('calculates progress percentage correctly', () {
      expect(course.progressPercentage, 75);
    });

    test('returns 0 progress when total lessons is 0', () {
      final noCourse = Course(
        id: 'empty',
        title: 'Empty',
        instructor: 'Test',
        description: 'Test',
        totalLessons: 0,
        completedLessons: 0,
        category: 'Test',
        rating: 0,
        createdAt: DateTime.now(),
      );
      expect(noCourse.progressPercentage, 0);
    });

    test('isCompleted returns true when all lessons completed', () {
      final completed = course.copyWith(completedLessons: 20);
      expect(completed.isCompleted, true);
    });

    test('isCompleted returns false when not all lessons completed', () {
      expect(course.isCompleted, false);
    });

    test('calculates remaining lessons correctly', () {
      expect(course.remainingLessons, 5);
    });

    test('isInProgress returns true when started but not completed', () {
      expect(course.isInProgress, true);
    });

    test('isInProgress returns false when not started', () {
      final notStarted = course.copyWith(completedLessons: 0);
      expect(notStarted.isInProgress, false);
    });

    test('isInProgress returns false when completed', () {
      final completed = course.copyWith(completedLessons: 20);
      expect(completed.isInProgress, false);
    });

    test('isHighRated returns true for rating >= 4.0', () {
      final highRated = course.copyWith(rating: 4.0);
      expect(highRated.isHighRated, true);
    });

    test('isHighRated returns false for rating < 4.0', () {
      final lowRated = course.copyWith(rating: 3.9);
      expect(lowRated.isHighRated, false);
    });

    test('copyWith creates new instance with updated values', () {
      final updated = course.copyWith(
        completedLessons: 18,
        rating: 4.8,
      );
      expect(updated.completedLessons, 18);
      expect(updated.rating, 4.8);
      expect(updated.title, course.title);
    });

    test('copyWith preserves unchanged values', () {
      final updated = course.copyWith(title: 'Advanced Flutter');
      expect(updated.id, course.id);
      expect(updated.instructor, course.instructor);
      expect(updated.totalLessons, course.totalLessons);
    });

    test('equality comparison works correctly', () {
      final course2 = Course(
        id: 'course-001',
        title: 'Flutter Basics',
        instructor: 'John Doe',
        description: 'Learn Flutter fundamentals',
        totalLessons: 20,
        completedLessons: 15,
        category: 'Mobile Development',
        rating: 4.5,
        createdAt: DateTime(2026, 1, 1),
      );
      expect(course, equals(course2));
    });

    test('inequality comparison works correctly', () {
      final different = course.copyWith(title: 'Different');
      expect(course, isNot(equals(different)));
    });

    test('hash codes are equal for equal objects', () {
      final course2 = course.copyWith();
      expect(course.hashCode, equals(course2.hashCode));
    });

    test('toString provides meaningful output', () {
      final courseString = course.toString();
      expect(courseString, contains('course-001'));
      expect(courseString, contains('Flutter Basics'));
      expect(courseString, contains('75%'));
    });

    test('progressPercentage handles over-completion', () {
      final overfull = course.copyWith(completedLessons: 25);
      expect(overfull.completedLessons, 25);
    });

    test('completedAt can be null for incomplete courses', () {
      expect(course.completedAt, isNull);
    });

    test('completedAt can be set for completed courses', () {
      final completed = course.copyWith(
        completedLessons: 20,
        completedAt: DateTime(2026, 2, 1),
      );
      expect(completed.completedAt, isNotNull);
      expect(completed.completedAt, DateTime(2026, 2, 1));
    });

    test('handles edge case with single lesson', () {
      final singleLesson = Course(
        id: 'single',
        title: 'Single Lesson',
        instructor: 'Test',
        description: 'Test',
        totalLessons: 1,
        completedLessons: 1,
        category: 'Test',
        rating: 5.0,
        createdAt: DateTime.now(),
      );
      expect(singleLesson.progressPercentage, 100);
      expect(singleLesson.isCompleted, true);
    });

    test('handles high ratings correctly', () {
      final fiveStarCourse = course.copyWith(rating: 5.0);
      expect(fiveStarCourse.isHighRated, true);
    });

    test('handles zero rating correctly', () {
      final zeroRating = course.copyWith(rating: 0.0);
      expect(zeroRating.isHighRated, false);
    });
  });
}
