import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter/utils/validation_utils.dart';

void main() {
  group('ValidationUtils', () {
    group('isValidEmail', () {
      test('returns true for valid emails', () {
        expect(ValidationUtils.isValidEmail('test@example.com'), true);
        expect(ValidationUtils.isValidEmail('user.name@domain.co.uk'), true);
        expect(ValidationUtils.isValidEmail('john+tag@example.com'), true);
      });

      test('returns false for invalid emails', () {
        expect(ValidationUtils.isValidEmail('invalid'), false);
        expect(ValidationUtils.isValidEmail('invalid@'), false);
        expect(ValidationUtils.isValidEmail('@example.com'), false);
        expect(ValidationUtils.isValidEmail('invalid@domain'), false);
      });

      test('returns false for empty email', () {
        expect(ValidationUtils.isValidEmail(''), false);
      });
    });

    group('isNotEmpty', () {
      test('returns true for non-empty strings', () {
        expect(ValidationUtils.isNotEmpty('test'), true);
        expect(ValidationUtils.isNotEmpty('  test  '), true);
      });

      test('returns false for empty strings', () {
        expect(ValidationUtils.isNotEmpty(''), false);
        expect(ValidationUtils.isNotEmpty('   '), false);
      });

      test('returns false for null', () {
        expect(ValidationUtils.isNotEmpty(null), false);
      });
    });

    group('isValidPassword', () {
      test('returns true for valid passwords', () {
        expect(ValidationUtils.isValidPassword('Test1234'), true);
        expect(ValidationUtils.isValidPassword('MyPassword123'), true);
        expect(ValidationUtils.isValidPassword('P@ssw0rd'), true);
      });

      test('returns false for passwords without uppercase', () {
        expect(ValidationUtils.isValidPassword('test1234'), false);
      });

      test('returns false for passwords without lowercase', () {
        expect(ValidationUtils.isValidPassword('TEST1234'), false);
      });

      test('returns false for passwords without digit', () {
        expect(ValidationUtils.isValidPassword('TestPassword'), false);
      });

      test('returns false for passwords shorter than 8 characters', () {
        expect(ValidationUtils.isValidPassword('Test123'), false);
      });
    });

    group('isNumeric', () {
      test('returns true for numeric strings', () {
        expect(ValidationUtils.isNumeric('123'), true);
        expect(ValidationUtils.isNumeric('0'), true);
        expect(ValidationUtils.isNumeric('999999'), true);
      });

      test('returns false for non-numeric strings', () {
        expect(ValidationUtils.isNumeric('12.3'), false);
        expect(ValidationUtils.isNumeric('abc'), false);
        expect(ValidationUtils.isNumeric('12a'), false);
      });

      test('returns false for empty string', () {
        expect(ValidationUtils.isNumeric(''), false);
      });
    });

    group('isValidCourse', () {
      test('returns true for valid course data', () {
        expect(
          ValidationUtils.isValidCourse(
            title: 'Flutter 101',
            instructor: 'John Doe',
            totalLessons: 20,
            completedLessons: 10,
            rating: 4.5,
          ),
          true,
        );
      });

      test('returns false for empty title', () {
        expect(
          ValidationUtils.isValidCourse(
            title: '',
            instructor: 'John Doe',
            totalLessons: 20,
            completedLessons: 10,
            rating: 4.5,
          ),
          false,
        );
      });

      test('returns false for invalid lesson count', () {
        expect(
          ValidationUtils.isValidCourse(
            title: 'Course',
            instructor: 'John Doe',
            totalLessons: 20,
            completedLessons: 25,
            rating: 4.5,
          ),
          false,
        );
      });

      test('returns false for invalid rating', () {
        expect(
          ValidationUtils.isValidCourse(
            title: 'Course',
            instructor: 'John Doe',
            totalLessons: 20,
            completedLessons: 10,
            rating: 6.0,
          ),
          false,
        );
      });

      test('returns false for zero total lessons', () {
        expect(
          ValidationUtils.isValidCourse(
            title: 'Course',
            instructor: 'John Doe',
            totalLessons: 0,
            completedLessons: 0,
            rating: 4.5,
          ),
          false,
        );
      });
    });

    group('isValidScheduleEvent', () {
      test('returns true for valid event data', () {
        final startTime = DateTime.now();
        final endTime = startTime.add(const Duration(hours: 1));
        expect(
          ValidationUtils.isValidScheduleEvent(
            title: 'Lecture',
            startTime: startTime,
            endTime: endTime,
            location: 'Room 101',
          ),
          true,
        );
      });

      test('returns false when start is after end', () {
        final startTime = DateTime.now();
        final endTime = startTime.subtract(const Duration(hours: 1));
        expect(
          ValidationUtils.isValidScheduleEvent(
            title: 'Lecture',
            startTime: startTime,
            endTime: endTime,
            location: 'Room 101',
          ),
          false,
        );
      });

      test('returns false for empty title', () {
        final startTime = DateTime.now();
        final endTime = startTime.add(const Duration(hours: 1));
        expect(
          ValidationUtils.isValidScheduleEvent(
            title: '',
            startTime: startTime,
            endTime: endTime,
            location: 'Room 101',
          ),
          false,
        );
      });

      test('returns false for empty location', () {
        final startTime = DateTime.now();
        final endTime = startTime.add(const Duration(hours: 1));
        expect(
          ValidationUtils.isValidScheduleEvent(
            title: 'Lecture',
            startTime: startTime,
            endTime: endTime,
            location: '',
          ),
          false,
        );
      });
    });

    group('isValidProgressMetrics', () {
      test('returns true for valid metrics', () {
        expect(
          ValidationUtils.isValidProgressMetrics(
            totalHours: 50,
            goalHours: 100,
            coursesCompleted: 3,
            coursesInProgress: 2,
            averageGrade: 85.0,
          ),
          true,
        );
      });

      test('returns false for negative hours', () {
        expect(
          ValidationUtils.isValidProgressMetrics(
            totalHours: -10,
            goalHours: 100,
            coursesCompleted: 3,
            coursesInProgress: 2,
            averageGrade: 85.0,
          ),
          false,
        );
      });

      test('returns false for zero goal hours', () {
        expect(
          ValidationUtils.isValidProgressMetrics(
            totalHours: 50,
            goalHours: 0,
            coursesCompleted: 3,
            coursesInProgress: 2,
            averageGrade: 85.0,
          ),
          false,
        );
      });

      test('returns false for invalid grade', () {
        expect(
          ValidationUtils.isValidProgressMetrics(
            totalHours: 50,
            goalHours: 100,
            coursesCompleted: 3,
            coursesInProgress: 2,
            averageGrade: 150.0,
          ),
          false,
        );
      });
    });

    group('isValidUrl', () {
      test('returns true for valid URLs', () {
        expect(ValidationUtils.isValidUrl('https://example.com'), true);
        expect(ValidationUtils.isValidUrl('http://example.com'), true);
        expect(ValidationUtils.isValidUrl('ftp://example.com'), true);
      });

      test('returns false for invalid URLs', () {
        expect(ValidationUtils.isValidUrl('not a url'), false);
        expect(ValidationUtils.isValidUrl('example'), false);
      });
    });

    group('isValidPhoneNumber', () {
      test('returns true for valid phone numbers', () {
        expect(ValidationUtils.isValidPhoneNumber('1234567890'), true);
        expect(ValidationUtils.isValidPhoneNumber('+11234567890'), true);
        expect(ValidationUtils.isValidPhoneNumber('123-456-7890'), true);
      });

      test('returns false for invalid phone numbers', () {
        expect(ValidationUtils.isValidPhoneNumber('123'), false);
        expect(ValidationUtils.isValidPhoneNumber('abc'), false);
      });
    });

    group('isListNotEmpty', () {
      test('returns true for non-empty lists', () {
        expect(ValidationUtils.isListNotEmpty([1, 2, 3]), true);
        expect(ValidationUtils.isListNotEmpty(['a']), true);
      });

      test('returns false for empty lists', () {
        expect(ValidationUtils.isListNotEmpty([]), false);
      });

      test('returns false for null', () {
        expect(ValidationUtils.isListNotEmpty(null), false);
      });
    });

    group('isInRange', () {
      test('returns true for values in range', () {
        expect(ValidationUtils.isInRange(50, 0, 100), true);
        expect(ValidationUtils.isInRange(0, 0, 100), true);
        expect(ValidationUtils.isInRange(100, 0, 100), true);
      });

      test('returns false for values outside range', () {
        expect(ValidationUtils.isInRange(150, 0, 100), false);
        expect(ValidationUtils.isInRange(-10, 0, 100), false);
      });
    });
  });
}
