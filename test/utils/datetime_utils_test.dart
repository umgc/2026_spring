import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter_new/utils/datetime_utils.dart';

void main() {
  group('DateTimeUtils', () {
    late DateTime now;
    late DateTime today;
    late DateTime tomorrow;
    late DateTime yesterday;

    setUp(() {
      now = DateTime.now();
      today = DateTime(now.year, now.month, now.day);
      tomorrow = today.add(const Duration(days: 1));
      yesterday = today.subtract(const Duration(days: 1));
    });

    group('isToday', () {
      test('returns true for today', () {
        expect(DateTimeUtils.isToday(today), true);
      });

      test('returns false for tomorrow', () {
        expect(DateTimeUtils.isToday(tomorrow), false);
      });

      test('returns false for yesterday', () {
        expect(DateTimeUtils.isToday(yesterday), false);
      });

      test('handles time differences on same day', () {
        final morning = DateTime(now.year, now.month, now.day, 8);
        final evening = DateTime(now.year, now.month, now.day, 20);
        expect(DateTimeUtils.isToday(morning), true);
        expect(DateTimeUtils.isToday(evening), true);
      });
    });

    group('isTomorrow', () {
      test('returns true for tomorrow', () {
        expect(DateTimeUtils.isTomorrow(tomorrow), true);
      });

      test('returns false for today', () {
        expect(DateTimeUtils.isTomorrow(today), false);
      });

      test('returns false for yesterday', () {
        expect(DateTimeUtils.isTomorrow(yesterday), false);
      });
    });

    group('isYesterday', () {
      test('returns true for yesterday', () {
        expect(DateTimeUtils.isYesterday(yesterday), true);
      });

      test('returns false for today', () {
        expect(DateTimeUtils.isYesterday(today), false);
      });

      test('returns false for tomorrow', () {
        expect(DateTimeUtils.isYesterday(tomorrow), false);
      });
    });

    group('daysBetween', () {
      test('calculates days correctly', () {
        expect(DateTimeUtils.daysBetween(today, tomorrow), 1);
        expect(DateTimeUtils.daysBetween(yesterday, today), 1);
        expect(
          DateTimeUtils.daysBetween(today, today.add(const Duration(days: 7))),
          7,
        );
      });

      test('handles same date', () {
        expect(DateTimeUtils.daysBetween(today, today), 0);
      });

      test('returns negative for past dates', () {
        expect(DateTimeUtils.daysBetween(tomorrow, today), -1);
      });
    });

    group('daysSince', () {
      test('returns 0 for today', () {
        expect(DateTimeUtils.daysSince(today), 0);
      });

      test('returns positive for past dates', () {
        expect(DateTimeUtils.daysSince(yesterday) >= 0, true);
      });

      test('returns negative for future dates', () {
        expect(DateTimeUtils.daysSince(tomorrow) < 0, true);
      });
    });

    group('formatDate', () {
      test('formats date correctly', () {
        final date = DateTime(2026, 1, 15);
        expect(DateTimeUtils.formatDate(date), 'Jan 15, 2026');
      });

      test('handles all months', () {
        final dates = [
          (DateTime(2026, 1, 1), 'Jan 1, 2026'),
          (DateTime(2026, 6, 15), 'Jun 15, 2026'),
          (DateTime(2026, 12, 31), 'Dec 31, 2026'),
        ];
        for (final (date, expected) in dates) {
          expect(DateTimeUtils.formatDate(date), expected);
        }
      });
    });

    group('formatTime', () {
      test('formats AM times correctly', () {
        final morning = DateTime(2026, 1, 15, 8, 30);
        expect(DateTimeUtils.formatTime(morning), '8:30 AM');
      });

      test('formats PM times correctly', () {
        final afternoon = DateTime(2026, 1, 15, 14, 30);
        expect(DateTimeUtils.formatTime(afternoon), '2:30 PM');
      });

      test('handles midnight', () {
        final midnight = DateTime(2026, 1, 15, 0, 0);
        expect(DateTimeUtils.formatTime(midnight), '12:00 AM');
      });

      test('handles noon', () {
        final noon = DateTime(2026, 1, 15, 12, 0);
        expect(DateTimeUtils.formatTime(noon), '12:00 PM');
      });

      test('pads minutes with zero', () {
        final time = DateTime(2026, 1, 15, 9, 5);
        expect(DateTimeUtils.formatTime(time), '9:05 AM');
      });
    });

    group('getFriendlyDate', () {
      test('returns Today for today', () {
        expect(DateTimeUtils.getFriendlyDate(today), 'Today');
      });

      test('returns Tomorrow for tomorrow', () {
        expect(DateTimeUtils.getFriendlyDate(tomorrow), 'Tomorrow');
      });

      test('returns Yesterday for yesterday', () {
        expect(DateTimeUtils.getFriendlyDate(yesterday), 'Yesterday');
      });

      test('returns formatted date for older dates', () {
        final oldDate = today.subtract(const Duration(days: 30));
        final result = DateTimeUtils.getFriendlyDate(oldDate);
        expect(result.contains(','), true); // Contains date format
      });
    });

    group('isSameDay', () {
      test('returns true for same day', () {
        final morning = DateTime(now.year, now.month, now.day, 8);
        final evening = DateTime(now.year, now.month, now.day, 20);
        expect(DateTimeUtils.isSameDay(morning, evening), true);
      });

      test('returns false for different days', () {
        expect(DateTimeUtils.isSameDay(today, tomorrow), false);
      });
    });

    group('startOfDay', () {
      test('returns start of day', () {
        final date = DateTime(2026, 1, 15, 14, 30);
        final start = DateTimeUtils.startOfDay(date);
        expect(start.hour, 0);
        expect(start.minute, 0);
        expect(start.second, 0);
        expect(start.day, 15);
      });
    });

    group('endOfDay', () {
      test('returns end of day', () {
        final date = DateTime(2026, 1, 15, 14, 30);
        final end = DateTimeUtils.endOfDay(date);
        expect(end.hour, 23);
        expect(end.minute, 59);
        expect(end.second, 59);
        expect(end.day, 15);
      });
    });

    group('startOfWeek', () {
      test('returns Monday for any date in the week', () {
        final wednesday = DateTime(2026, 1, 14); // Wednesday
        final start = DateTimeUtils.startOfWeek(wednesday);
        expect(start.weekday, 1); // Monday
      });
    });

    group('endOfWeek', () {
      test('returns Sunday for any date in the week', () {
        final wednesday = DateTime(2026, 1, 14); // Wednesday
        final end = DateTimeUtils.endOfWeek(wednesday);
        expect(end.weekday, 7); // Sunday
      });
    });

    group('isCurrentWeek', () {
      test('returns true for dates in current week', () {
        expect(DateTimeUtils.isCurrentWeek(today), true);
      });

      test('returns false for dates outside current week', () {
        final farFuture = today.add(const Duration(days: 60));
        expect(DateTimeUtils.isCurrentWeek(farFuture), false);
      });
    });

    group('getDayOfWeek', () {
      test('returns correct day names', () {
        final monday = DateTime(2026, 1, 12); // Monday
        final wednesday = DateTime(2026, 1, 14); // Wednesday
        final friday = DateTime(2026, 1, 16); // Friday

        expect(DateTimeUtils.getDayOfWeek(monday), 'Monday');
        expect(DateTimeUtils.getDayOfWeek(wednesday), 'Wednesday');
        expect(DateTimeUtils.getDayOfWeek(friday), 'Friday');
      });

      test('handles all days of the week', () {
        final days = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ];
        for (var i = 0; i < days.length; i++) {
          final date = DateTime(2026, 1, 12 + i);
          expect(DateTimeUtils.getDayOfWeek(date), days[i]);
        }
      });
    });
  });
}
