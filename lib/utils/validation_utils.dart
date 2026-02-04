/// Utility functions for data validation
class ValidationUtils {
  /// Validates if a string is a valid email
  static bool isValidEmail(String email) {
    final emailRegex = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    return emailRegex.hasMatch(email);
  }

  /// Validates if a string is not empty
  static bool isNotEmpty(String? value) {
    return value != null && value.trim().isNotEmpty;
  }

  /// Validates if a password meets minimum requirements
  static bool isValidPassword(String password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 digit
    final passwordRegex = RegExp(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$');
    return passwordRegex.hasMatch(password);
  }

  /// Validates if a string contains only numbers
  static bool isNumeric(String value) {
    return int.tryParse(value) != null;
  }

  /// Validates course data
  static bool isValidCourse({
    required String title,
    required String instructor,
    required int totalLessons,
    required int completedLessons,
    required double rating,
  }) {
    return isNotEmpty(title) &&
        isNotEmpty(instructor) &&
        totalLessons > 0 &&
        completedLessons >= 0 &&
        completedLessons <= totalLessons &&
        rating >= 0.0 &&
        rating <= 5.0;
  }

  /// Validates schedule event data
  static bool isValidScheduleEvent({
    required String title,
    required DateTime startTime,
    required DateTime endTime,
    required String location,
  }) {
    return isNotEmpty(title) &&
        isNotEmpty(location) &&
        startTime.isBefore(endTime);
  }

  /// Validates progress metrics
  static bool isValidProgressMetrics({
    required int totalHours,
    required int goalHours,
    required int coursesCompleted,
    required int coursesInProgress,
    required double averageGrade,
  }) {
    return totalHours >= 0 &&
        goalHours > 0 &&
        coursesCompleted >= 0 &&
        coursesInProgress >= 0 &&
        averageGrade >= 0.0 &&
        averageGrade <= 100.0;
  }

  /// Validates if a URL is valid
  static bool isValidUrl(String url) {
    try {
      final uri = Uri.parse(url);
      // Require a scheme and host for stronger validation
      if (uri.scheme.isEmpty) return false;
      if (uri.hasAuthority && uri.host.isNotEmpty) return true;
      return false;
    } catch (e) {
      return false;
    }
  }

  /// Validates if a phone number has valid format (basic check)
  static bool isValidPhoneNumber(String phone) {
    final phoneRegex = RegExp(r'^\+?1?\d{9,15}$');
    return phoneRegex.hasMatch(phone.replaceAll(RegExp(r'[^\d]'), ''));
  }

  /// Validates list is not empty
  static bool isListNotEmpty<T>(List<T>? list) {
    return list != null && list.isNotEmpty;
  }

  /// Validates value is within range
  static bool isInRange(int value, int min, int max) {
    return value >= min && value <= max;
  }
}
