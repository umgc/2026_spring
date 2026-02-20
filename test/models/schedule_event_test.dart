import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter_new/models/schedule_event.dart';

void main() {
  group('ScheduleEvent Model', () {
    late ScheduleEvent event;
    late DateTime now;

    setUp(() {
      now = DateTime.now();
      // Use a fixed daytime base on the next day to ensure events are in the future
      final base = DateTime(now.year, now.month, now.day + 1, 9, 0);
      event = ScheduleEvent(
        id: 'event-001',
        title: 'Flutter Lecture',
        description: 'Introduction to Flutter',
        startTime: base.add(const Duration(hours: 2)),
        endTime: base.add(const Duration(hours: 3)),
        location: 'Room 101',
        eventType: 'lesson',
        isCompleted: false,
        courseId: 'course-001',
      );
    });

    test('creates a schedule event with correct properties', () {
      expect(event.id, 'event-001');
      expect(event.title, 'Flutter Lecture');
      expect(event.location, 'Room 101');
      expect(event.eventType, 'lesson');
    });

    test('calculates duration in minutes correctly', () {
      expect(event.durationMinutes, 60);
    });

    test('handles different duration times', () {
      final twoHourEvent = event.copyWith(
        endTime: event.startTime.add(const Duration(hours: 2)),
      );
      expect(twoHourEvent.durationMinutes, 120);
    });

    test('handles 30-minute events', () {
      final shortEvent = event.copyWith(
        endTime: event.startTime.add(const Duration(minutes: 30)),
      );
      expect(shortEvent.durationMinutes, 30);
    });

    test('isHappening returns true when event is currently occurring', () {
      final ongoingEvent = ScheduleEvent(
        id: 'ongoing',
        title: 'Ongoing',
        description: 'Current event',
        startTime: now.subtract(const Duration(minutes: 30)),
        endTime: now.add(const Duration(minutes: 30)),
        location: 'Room',
        eventType: 'lesson',
        isCompleted: false,
        courseId: 'course-001',
      );
      expect(ongoingEvent.isHappening, true);
    });

    test('isHappening returns false when event is in future', () {
      expect(event.isHappening, false);
    });

    test('isHappening returns false when event is in past', () {
      final pastEvent = event.copyWith(
        startTime: now.subtract(const Duration(hours: 3)),
        endTime: now.subtract(const Duration(hours: 2)),
      );
      expect(pastEvent.isHappening, false);
    });

    test('isUpcoming returns true for future events', () {
      expect(event.isUpcoming, true);
    });

    test('isUpcoming returns false for past events', () {
      final pastEvent = event.copyWith(
        startTime: now.subtract(const Duration(hours: 3)),
        endTime: now.subtract(const Duration(hours: 2)),
      );
      expect(pastEvent.isUpcoming, false);
    });

    test('isPast returns true for past events', () {
      final pastEvent = event.copyWith(
        startTime: now.subtract(const Duration(hours: 3)),
        endTime: now.subtract(const Duration(hours: 2)),
      );
      expect(pastEvent.isPast, true);
    });

    test('isPast returns false for future events', () {
      expect(event.isPast, false);
    });

    test('minutesUntilStart calculates correctly', () {
      final twoHoursFromNow = event.copyWith(
        startTime: now.add(const Duration(hours: 2)),
        endTime: now.add(const Duration(hours: 3)),
      );
      final minutesUntil = twoHoursFromNow.minutesUntilStart;
      expect(minutesUntil >= 119 && minutesUntil <= 121, true);
    });

    test('minutesUntilStart is negative for past events', () {
      final pastEvent = event.copyWith(
        startTime: now.subtract(const Duration(hours: 1)),
        endTime: now.subtract(const Duration(minutes: 30)),
      );
      expect(pastEvent.minutesUntilStart < 0, true);
    });

    test('copyWith creates new instance with updated values', () {
      final updated = event.copyWith(
        title: 'Advanced Flutter',
        isCompleted: true,
      );
      expect(updated.title, 'Advanced Flutter');
      expect(updated.isCompleted, true);
      expect(updated.location, event.location);
    });

    test('copyWith preserves unchanged values', () {
      final updated = event.copyWith(eventType: 'assignment');
      expect(updated.id, event.id);
      expect(updated.description, event.description);
      expect(updated.courseId, event.courseId);
    });

    test('equality comparison works correctly', () {
      final event2 = ScheduleEvent(
        id: 'event-001',
        title: 'Flutter Lecture',
        description: 'Introduction to Flutter',
        startTime: event.startTime,
        endTime: event.endTime,
        location: 'Room 101',
        eventType: 'lesson',
        isCompleted: false,
        courseId: 'course-001',
      );
      expect(event, equals(event2));
    });

    test('inequality comparison works correctly', () {
      final different = event.copyWith(title: 'Different Title');
      expect(event, isNot(equals(different)));
    });

    test('hash codes are equal for equal objects', () {
      final event2 = event.copyWith();
      expect(event.hashCode, equals(event2.hashCode));
    });

    test('toString provides meaningful output', () {
      final eventString = event.toString();
      expect(eventString, contains('event-001'));
      expect(eventString, contains('Flutter Lecture'));
      expect(eventString, contains('60 minutes'));
    });

    test('supports different event types', () {
      final assignment = event.copyWith(eventType: 'assignment');
      final quiz = event.copyWith(eventType: 'quiz');
      final discussion = event.copyWith(eventType: 'discussion');

      expect(assignment.eventType, 'assignment');
      expect(quiz.eventType, 'quiz');
      expect(discussion.eventType, 'discussion');
    });

    test('handles completion status correctly', () {
      final completed = event.copyWith(isCompleted: true);
      expect(completed.isCompleted, true);
      expect(event.isCompleted, false);
    });

    test('handles various durations correctly', () {
      final durations = [15, 30, 45, 60, 90, 120, 240];
      for (final duration in durations) {
        final testEvent = event.copyWith(
          endTime: event.startTime.add(Duration(minutes: duration)),
        );
        expect(testEvent.durationMinutes, duration);
      }
    });

    test('maintains event type validity', () {
      final validTypes = ['lesson', 'assignment', 'quiz', 'discussion'];
      for (final type in validTypes) {
        final testEvent = event.copyWith(eventType: type);
        expect(testEvent.eventType, type);
      }
    });

    test('handles same-day events', () {
      expect(event.startTime.day, event.endTime.day);
    });

    test('course association is preserved', () {
      expect(event.courseId, 'course-001');
      final updated = event.copyWith(courseId: 'course-002');
      expect(updated.courseId, 'course-002');
    });
  });
}
