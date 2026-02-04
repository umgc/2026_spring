/// Utility functions for calculations and conversions
class CalculationUtils {
  /// Calculates percentage from a part and total
  static int calculatePercentage(int part, int total) {
    if (total == 0) return 0;
    return ((part / total) * 100).round().clamp(0, 100);
  }

  /// Calculates the percentage complete (0-1 range)
  static double calculateProgress(int completed, int total) {
    if (total == 0) return 0;
    return (completed / total).clamp(0, 1);
  }

  /// Calculates average from a list of values
  static double calculateAverage(List<int> values) {
    if (values.isEmpty) return 0;
    final sum = values.reduce((a, b) => a + b);
    return sum / values.length;
  }

  /// Calculates average grade from a list of grades
  static double calculateAverageGrade(List<double> grades) {
    if (grades.isEmpty) return 0;
    final sum = grades.reduce((a, b) => a + b);
    return sum / grades.length;
  }

  /// Calculates estimated time to complete based on pace
  static int calculateEstimatedDaysToComplete(int remaining, int dailyGoal) {
    if (dailyGoal == 0) return 0;
    return (remaining / dailyGoal).ceil();
  }

  /// Calculates total study hours from individual session durations
  static int calculateTotalStudyHours(List<int> sessionMinutes) {
    final totalMinutes = sessionMinutes.fold(0, (sum, minutes) => sum + minutes);
    final hours = totalMinutes / 60.0;
    final whole = hours.floor();
    final frac = hours - whole;
    // Round rule: fractions > 0.5 round up, fractions == 0.5 round down, fractions < 0.5 round down
    if (frac > 0.5) return whole + 1;
    return whole;
  }

  /// Converts minutes to readable format (e.g., "1h 30m")
  static String formatDuration(int minutes) {
    final hours = minutes ~/ 60;
    final remainingMinutes = minutes % 60;
    
    if (hours == 0) {
      return '${remainingMinutes}m';
    } else if (remainingMinutes == 0) {
      return '${hours}h';
    } else {
      return '${hours}h ${remainingMinutes}m';
    }
  }

  /// Calculates grade point for a numeric score
  static double calculateGradePoint(int score) {
    if (score >= 90) return 4.0;
    if (score >= 80) return 3.0;
    if (score >= 70) return 2.0;
    if (score >= 60) return 1.0;
    return 0.0;
  }

  /// Determines difficulty level based on score
  static String determineDifficultyLevel(int score) {
    if (score >= 90) return 'Easy';
    if (score >= 70) return 'Medium';
    return 'Hard';
  }

  /// Calculates cumulative GPA from multiple courses
  static double calculateCumulativeGPA(List<double> courseGPAs) {
    if (courseGPAs.isEmpty) return 0.0;
    final sum = courseGPAs.reduce((a, b) => a + b);
    return (sum / courseGPAs.length * 100).round() / 100;
  }

  /// Checks if a value is within an acceptable range
  static bool isWithinRange(int value, int min, int max) {
    return value >= min && value <= max;
  }

  /// Calculates percentage improvement between two values
  static double calculateImprovement(int oldValue, int newValue) {
    if (oldValue == 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
  }
}
