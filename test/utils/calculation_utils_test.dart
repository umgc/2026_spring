import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter/utils/calculation_utils.dart';

void main() {
  group('CalculationUtils', () {
    group('calculatePercentage', () {
      test('calculates percentage correctly', () {
        expect(CalculationUtils.calculatePercentage(25, 100), 25);
        expect(CalculationUtils.calculatePercentage(50, 100), 50);
        expect(CalculationUtils.calculatePercentage(75, 100), 75);
      });

      test('returns 0 when total is 0', () {
        expect(CalculationUtils.calculatePercentage(10, 0), 0);
      });

      test('clamps percentage at 100', () {
        expect(CalculationUtils.calculatePercentage(150, 100), 100);
      });

      test('rounds correctly', () {
        expect(CalculationUtils.calculatePercentage(33, 100), 33);
        expect(CalculationUtils.calculatePercentage(1, 3), 33);
      });

      test('handles fractional results', () {
        expect(CalculationUtils.calculatePercentage(2, 3), 67);
      });
    });

    group('calculateProgress', () {
      test('returns value between 0 and 1', () {
        final progress = CalculationUtils.calculateProgress(50, 100);
        expect(progress, equals(0.5));
      });

      test('returns 0 for incomplete', () {
        expect(CalculationUtils.calculateProgress(0, 100), 0.0);
      });

      test('returns 1 for complete', () {
        expect(CalculationUtils.calculateProgress(100, 100), 1.0);
      });

      test('returns 0 when total is 0', () {
        expect(CalculationUtils.calculateProgress(10, 0), 0.0);
      });

      test('clamps at 1.0', () {
        expect(CalculationUtils.calculateProgress(150, 100), 1.0);
      });
    });

    group('calculateAverage', () {
      test('calculates average correctly', () {
        expect(CalculationUtils.calculateAverage([10, 20, 30]), 20.0);
      });

      test('returns 0 for empty list', () {
        expect(CalculationUtils.calculateAverage([]), 0.0);
      });

      test('handles single value', () {
        expect(CalculationUtils.calculateAverage([50]), 50.0);
      });

      test('handles large values', () {
        expect(CalculationUtils.calculateAverage([100, 200, 300]), 200.0);
      });

      test('handles fractional results', () {
        expect(CalculationUtils.calculateAverage([1, 2, 3]), 2.0);
      });
    });

    group('calculateAverageGrade', () {
      test('calculates average grade correctly', () {
        expect(CalculationUtils.calculateAverageGrade([85.0, 90.0, 95.0]), 90.0);
      });

      test('returns 0 for empty list', () {
        expect(CalculationUtils.calculateAverageGrade([]), 0.0);
      });

      test('handles single grade', () {
        expect(CalculationUtils.calculateAverageGrade([87.5]), 87.5);
      });

      test('handles decimal grades', () {
        expect(CalculationUtils.calculateAverageGrade([85.5, 90.5, 95.5]), 90.5);
      });

      test('handles perfect grades', () {
        expect(CalculationUtils.calculateAverageGrade([100.0, 100.0, 100.0]), 100.0);
      });
    });

    group('calculateEstimatedDaysToComplete', () {
      test('calculates days correctly', () {
        expect(CalculationUtils.calculateEstimatedDaysToComplete(100, 10), 10);
      });

      test('rounds up for partial days', () {
        expect(CalculationUtils.calculateEstimatedDaysToComplete(25, 10), 3);
      });

      test('returns 0 when daily goal is 0', () {
        expect(CalculationUtils.calculateEstimatedDaysToComplete(100, 0), 0);
      });

      test('returns 1 when remaining fits in one day', () {
        expect(CalculationUtils.calculateEstimatedDaysToComplete(5, 10), 1);
      });

      test('handles large numbers', () {
        expect(CalculationUtils.calculateEstimatedDaysToComplete(10000, 100), 100);
      });
    });

    group('calculateTotalStudyHours', () {
      test('converts minutes to hours correctly', () {
        expect(CalculationUtils.calculateTotalStudyHours([60, 60, 60]), 3);
      });

      test('ignores partial hours', () {
        expect(CalculationUtils.calculateTotalStudyHours([90, 90, 90]), 4);
      });

      test('returns 0 for empty list', () {
        expect(CalculationUtils.calculateTotalStudyHours([]), 0);
      });

      test('handles single session', () {
        expect(CalculationUtils.calculateTotalStudyHours([120]), 2);
      });

      test('handles various durations', () {
        expect(CalculationUtils.calculateTotalStudyHours([30, 45, 60, 90]), 4);
      });
    });

    group('formatDuration', () {
      test('formats hours correctly', () {
        expect(CalculationUtils.formatDuration(120), '2h');
      });

      test('formats minutes correctly', () {
        expect(CalculationUtils.formatDuration(30), '30m');
      });

      test('formats hours and minutes', () {
        expect(CalculationUtils.formatDuration(90), '1h 30m');
      });

      test('handles single minute', () {
        expect(CalculationUtils.formatDuration(1), '1m');
      });

      test('handles single hour', () {
        expect(CalculationUtils.formatDuration(60), '1h');
      });

      test('handles zero', () {
        expect(CalculationUtils.formatDuration(0), '0m');
      });

      test('formats large durations', () {
        expect(CalculationUtils.formatDuration(180), '3h');
      });
    });

    group('calculateGradePoint', () {
      test('returns 4.0 for 90+', () {
        expect(CalculationUtils.calculateGradePoint(90), 4.0);
        expect(CalculationUtils.calculateGradePoint(100), 4.0);
      });

      test('returns 3.0 for 80-89', () {
        expect(CalculationUtils.calculateGradePoint(80), 3.0);
        expect(CalculationUtils.calculateGradePoint(85), 3.0);
      });

      test('returns 2.0 for 70-79', () {
        expect(CalculationUtils.calculateGradePoint(70), 2.0);
        expect(CalculationUtils.calculateGradePoint(75), 2.0);
      });

      test('returns 1.0 for 60-69', () {
        expect(CalculationUtils.calculateGradePoint(60), 1.0);
        expect(CalculationUtils.calculateGradePoint(65), 1.0);
      });

      test('returns 0.0 for below 60', () {
        expect(CalculationUtils.calculateGradePoint(59), 0.0);
        expect(CalculationUtils.calculateGradePoint(0), 0.0);
      });
    });

    group('determineDifficultyLevel', () {
      test('returns Easy for 90+', () {
        expect(CalculationUtils.determineDifficultyLevel(90), 'Easy');
        expect(CalculationUtils.determineDifficultyLevel(100), 'Easy');
      });

      test('returns Medium for 70-89', () {
        expect(CalculationUtils.determineDifficultyLevel(70), 'Medium');
        expect(CalculationUtils.determineDifficultyLevel(85), 'Medium');
      });

      test('returns Hard for below 70', () {
        expect(CalculationUtils.determineDifficultyLevel(69), 'Hard');
        expect(CalculationUtils.determineDifficultyLevel(0), 'Hard');
      });
    });

    group('calculateCumulativeGPA', () {
      test('calculates GPA correctly', () {
        expect(CalculationUtils.calculateCumulativeGPA([4.0, 3.0, 3.5]), 3.5);
      });

      test('returns 0 for empty list', () {
        expect(CalculationUtils.calculateCumulativeGPA([]), 0.0);
      });

      test('handles perfect GPA', () {
        expect(CalculationUtils.calculateCumulativeGPA([4.0, 4.0, 4.0]), 4.0);
      });

      test('rounds to 2 decimal places', () {
        final gpa = CalculationUtils.calculateCumulativeGPA([3.3, 3.3, 3.3]);
        expect(gpa.toStringAsFixed(2), '3.30');
      });
    });

    group('isWithinRange', () {
      test('returns true for values in range', () {
        expect(CalculationUtils.isWithinRange(50, 0, 100), true);
      });

      test('returns true for boundary values', () {
        expect(CalculationUtils.isWithinRange(0, 0, 100), true);
        expect(CalculationUtils.isWithinRange(100, 0, 100), true);
      });

      test('returns false for values outside range', () {
        expect(CalculationUtils.isWithinRange(150, 0, 100), false);
        expect(CalculationUtils.isWithinRange(-10, 0, 100), false);
      });
    });

    group('calculateImprovement', () {
      test('calculates improvement percentage correctly', () {
        expect(CalculationUtils.calculateImprovement(50, 60), 20.0);
      });

      test('returns 0 when old value is 0', () {
        expect(CalculationUtils.calculateImprovement(0, 50), 0.0);
      });

      test('handles negative improvement', () {
        expect(CalculationUtils.calculateImprovement(100, 80), -20.0);
      });

      test('handles no change', () {
        expect(CalculationUtils.calculateImprovement(50, 50), 0.0);
      });

      test('calculates large improvements', () {
        expect(CalculationUtils.calculateImprovement(10, 50), 400.0);
      });
    });
  });
}
