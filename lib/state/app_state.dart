class AppState {
  final int dayStreak;
  final int goalsCompleted;
  final int studyHoursThisWeek;

  const AppState({
    required this.dayStreak,
    required this.goalsCompleted,
    required this.studyHoursThisWeek,
  });

  AppState copyWith({
    int? dayStreak,
    int? goalsCompleted,
    int? studyHoursThisWeek,
  }) {
    return AppState(
      dayStreak: dayStreak ?? this.dayStreak,
      goalsCompleted: goalsCompleted ?? this.goalsCompleted,
      studyHoursThisWeek: studyHoursThisWeek ?? this.studyHoursThisWeek,
    );
  }
}
