/// Represents learning progress metrics
class ProgressMetrics {
  final int totalHoursLearned;
  final int goalHours;
  final int coursesCompleted;
  final int coursesInProgress;
  final double averageGrade;
  final int currentStreak;
  final int longestStreak;

  const ProgressMetrics({
    required this.totalHoursLearned,
    required this.goalHours,
    required this.coursesCompleted,
    required this.coursesInProgress,
    required this.averageGrade,
    required this.currentStreak,
    required this.longestStreak,
  });

  /// Returns progress toward goal as percentage (0-100)
  int get progressTowardGoal {
    if (goalHours == 0) return 0;
    return ((totalHoursLearned / goalHours) * 100).round().clamp(0, 100);
  }

  /// Returns whether the goal is achieved
  bool get isGoalAchieved => totalHoursLearned >= goalHours;

  /// Returns total courses (completed + in progress)
  int get totalCourses => coursesCompleted + coursesInProgress;

  /// Returns course completion rate as percentage
  double get completionRate {
    if (totalCourses == 0) return 0;
    return (coursesCompleted / totalCourses) * 100;
  }

  /// Returns hours remaining to reach goal
  int get hoursRemainingToGoal {
    final remaining = goalHours - totalHoursLearned;
    return remaining > 0 ? remaining : 0;
  }

  /// Returns letter grade based on average
  String get letterGrade {
    if (averageGrade >= 90) return 'A';
    if (averageGrade >= 80) return 'B';
    if (averageGrade >= 70) return 'C';
    if (averageGrade >= 60) return 'D';
    return 'F';
  }

  ProgressMetrics copyWith({
    int? totalHoursLearned,
    int? goalHours,
    int? coursesCompleted,
    int? coursesInProgress,
    double? averageGrade,
    int? currentStreak,
    int? longestStreak,
  }) {
    return ProgressMetrics(
      totalHoursLearned: totalHoursLearned ?? this.totalHoursLearned,
      goalHours: goalHours ?? this.goalHours,
      coursesCompleted: coursesCompleted ?? this.coursesCompleted,
      coursesInProgress: coursesInProgress ?? this.coursesInProgress,
      averageGrade: averageGrade ?? this.averageGrade,
      currentStreak: currentStreak ?? this.currentStreak,
      longestStreak: longestStreak ?? this.longestStreak,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is ProgressMetrics &&
        other.totalHoursLearned == totalHoursLearned &&
        other.goalHours == goalHours &&
        other.coursesCompleted == coursesCompleted &&
        other.coursesInProgress == coursesInProgress &&
        other.averageGrade == averageGrade &&
        other.currentStreak == currentStreak &&
        other.longestStreak == longestStreak;
  }

  @override
  int get hashCode {
    return totalHoursLearned.hashCode ^
        goalHours.hashCode ^
        coursesCompleted.hashCode ^
        coursesInProgress.hashCode ^
        averageGrade.hashCode ^
        currentStreak.hashCode ^
        longestStreak.hashCode;
  }

  @override
  String toString() =>
      'ProgressMetrics($totalHoursLearned/$goalHours hours, $completionRate% courses complete)';
}
