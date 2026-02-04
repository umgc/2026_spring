/// Utility functions for date and time operations
class DateTimeUtils {
  /// Checks if a date is today
  static bool isToday(DateTime date) {
    final now = DateTime.now();
    return date.year == now.year && date.month == now.month && date.day == now.day;
  }

  /// Checks if a date is tomorrow
  static bool isTomorrow(DateTime date) {
    final tomorrow = DateTime.now().add(const Duration(days: 1));
    return date.year == tomorrow.year && date.month == tomorrow.month && date.day == tomorrow.day;
  }

  /// Checks if a date is yesterday
  static bool isYesterday(DateTime date) {
    final yesterday = DateTime.now().subtract(const Duration(days: 1));
    return date.year == yesterday.year && date.month == yesterday.month && date.day == yesterday.day;
  }

  /// Returns the number of days between two dates
  static int daysBetween(DateTime from, DateTime to) {
    final fromDate = DateTime(from.year, from.month, from.day);
    final toDate = DateTime(to.year, to.month, to.day);
    return toDate.difference(fromDate).inDays;
  }

  /// Returns the number of days since a date
  static int daysSince(DateTime date) {
    return daysBetween(date, DateTime.now());
  }

  /// Returns formatted date string (e.g., "Jan 15, 2026")
  static String formatDate(DateTime date) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return '${months[date.month - 1]} ${date.day}, ${date.year}';
  }

  /// Returns formatted time string (e.g., "2:30 PM")
  static String formatTime(DateTime dateTime) {
    var hour12 = dateTime.hour % 12;
    if (hour12 == 0) hour12 = 12;
    final period = dateTime.hour >= 12 ? 'PM' : 'AM';
    final minute = dateTime.minute.toString().padLeft(2, '0');
    return '$hour12:$minute $period';
  }

  /// Returns a friendly date description
  static String getFriendlyDate(DateTime date) {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    
    final daysAgo = daysSince(date);
    if (daysAgo > 0 && daysAgo <= 7) return '$daysAgo days ago';
    
    return formatDate(date);
  }

  /// Checks if two dates are on the same day
  static bool isSameDay(DateTime date1, DateTime date2) {
    return date1.year == date2.year && date1.month == date2.month && date1.day == date2.day;
  }

  /// Returns the start of the day (00:00:00)
  static DateTime startOfDay(DateTime date) {
    return DateTime(date.year, date.month, date.day);
  }

  /// Returns the end of the day (23:59:59)
  static DateTime endOfDay(DateTime date) {
    return DateTime(date.year, date.month, date.day, 23, 59, 59);
  }

  /// Returns the start of the week (Monday)
  static DateTime startOfWeek(DateTime date) {
    final dayOfWeek = date.weekday; // 1 = Monday, 7 = Sunday
    return date.subtract(Duration(days: dayOfWeek - 1));
  }

  /// Returns the end of the week (Sunday)
  static DateTime endOfWeek(DateTime date) {
    final dayOfWeek = date.weekday;
    return date.add(Duration(days: 7 - dayOfWeek));
  }

  /// Checks if a date is within the current week
  static bool isCurrentWeek(DateTime date) {
    final now = DateTime.now();
    final weekStart = startOfWeek(now);
    final weekEnd = endOfWeek(now);
    return date.isAfter(weekStart) && date.isBefore(weekEnd);
  }

  /// Returns the day of week as string
  static String getDayOfWeek(DateTime date) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[date.weekday - 1];
  }
}
