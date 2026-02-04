import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static const _kDayStreak = 'dayStreak';
  static const _kGoals = 'goals';
  static const _kStudyHours = 'studyHours';

  Future<void> saveDayStreak(int value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_kDayStreak, value);
  }

  Future<int> loadDayStreak() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_kDayStreak) ?? 12;
  }

  Future<void> saveGoals(int value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_kGoals, value);
  }

  Future<int> loadGoals() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_kGoals) ?? 8;
  }

  Future<void> saveStudyHours(int value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_kStudyHours, value);
  }

  Future<int> loadStudyHours() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_kStudyHours) ?? 24;
  }
}
