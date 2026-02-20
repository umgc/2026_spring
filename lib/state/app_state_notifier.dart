import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/storage_service.dart';
import 'app_state.dart';

final storageProvider = Provider<StorageService>((ref) => StorageService());

final appStateProvider = StateNotifierProvider<AppStateNotifier, AppState>((
  ref,
) {
  final storage = ref.read(storageProvider);
  return AppStateNotifier(storage)..loadFromStorage();
});

class AppStateNotifier extends StateNotifier<AppState> {
  final StorageService _storage;

  AppStateNotifier(this._storage)
    : super(
        const AppState(
          dayStreak: 12,
          goalsCompleted: 8,
          studyHoursThisWeek: 24,
        ),
      );

  Future<void> loadFromStorage() async {
    final streak = await _storage.loadDayStreak();
    final goals = await _storage.loadGoals();
    final hours = await _storage.loadStudyHours();
    state = state.copyWith(
      dayStreak: streak,
      goalsCompleted: goals,
      studyHoursThisWeek: hours,
    );
  }

  Future<void> incrementStreak() async {
    final next = state.dayStreak + 1;
    state = state.copyWith(dayStreak: next);
    await _storage.saveDayStreak(next);
  }

  Future<void> setGoals(int value) async {
    state = state.copyWith(goalsCompleted: value);
    await _storage.saveGoals(value);
  }
}
