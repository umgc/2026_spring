import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter_new/state/app_state.dart';
import 'package:edulense_flutter_new/state/app_state_notifier.dart';
import 'package:edulense_flutter_new/services/storage_service.dart';

class FakeStorageService implements StorageService {
  final _data = <String, int>{};

  @override
  Future<void> saveDayStreak(int value) async {
    _data['dayStreak'] = value;
  }

  @override
  Future<int> loadDayStreak() async {
    return _data['dayStreak'] ?? 12;
  }

  @override
  Future<void> saveGoals(int value) async {
    _data['goals'] = value;
  }

  @override
  Future<int> loadGoals() async {
    return _data['goals'] ?? 8;
  }

  @override
  Future<void> saveStudyHours(int value) async {
    _data['studyHours'] = value;
  }

  @override
  Future<int> loadStudyHours() async {
    return _data['studyHours'] ?? 24;
  }
}

void main() {
  group('AppStateNotifier', () {
    late FakeStorageService fakeStorageService;
    late AppStateNotifier appStateNotifier;

    setUp(() {
      fakeStorageService = FakeStorageService();
      appStateNotifier = AppStateNotifier(fakeStorageService);
    });

    test('should initialize with default values', () {
      expect(appStateNotifier.state.dayStreak, 12);
      expect(appStateNotifier.state.goalsCompleted, 8);
      expect(appStateNotifier.state.studyHoursThisWeek, 24);
    });

    test('loadFromStorage should update state with values from storage', () async {
      await fakeStorageService.saveDayStreak(20);
      await fakeStorageService.saveGoals(15);
      await fakeStorageService.saveStudyHours(30);

      await appStateNotifier.loadFromStorage();

      expect(appStateNotifier.state.dayStreak, 20);
      expect(appStateNotifier.state.goalsCompleted, 15);
      expect(appStateNotifier.state.studyHoursThisWeek, 30);
    });

    test('incrementStreak should increase dayStreak by 1', () async {
      await appStateNotifier.incrementStreak();

      expect(appStateNotifier.state.dayStreak, 13);
    });

    test('incrementStreak should persist value to storage', () async {
      await appStateNotifier.incrementStreak();

      final savedValue = await fakeStorageService.loadDayStreak();
      expect(savedValue, 13);
    });

    test('incrementStreak multiple times should accumulate', () async {
      await appStateNotifier.incrementStreak();
      await appStateNotifier.incrementStreak();
      await appStateNotifier.incrementStreak();

      expect(appStateNotifier.state.dayStreak, 15);
      final savedValue = await fakeStorageService.loadDayStreak();
      expect(savedValue, 15);
    });

    test('setGoals should update goalsCompleted', () async {
      await appStateNotifier.setGoals(20);

      expect(appStateNotifier.state.goalsCompleted, 20);
    });

    test('setGoals should persist value to storage', () async {
      await appStateNotifier.setGoals(10);

      final savedValue = await fakeStorageService.loadGoals();
      expect(savedValue, 10);
    });

    test('setGoals with zero should be allowed', () async {
      await appStateNotifier.setGoals(0);

      expect(appStateNotifier.state.goalsCompleted, 0);
      final savedValue = await fakeStorageService.loadGoals();
      expect(savedValue, 0);
    });

    test('dayStreak and goals should update independently', () async {
      await appStateNotifier.incrementStreak();
      await appStateNotifier.setGoals(10);

      expect(appStateNotifier.state.dayStreak, 13);
      expect(appStateNotifier.state.goalsCompleted, 10);
      expect(appStateNotifier.state.studyHoursThisWeek, 24);
    });

    test('storage should persist across operations', () async {
      await appStateNotifier.incrementStreak();
      await appStateNotifier.setGoals(5);

      final savedStreak = await fakeStorageService.loadDayStreak();
      final savedGoals = await fakeStorageService.loadGoals();

      expect(savedStreak, 13);
      expect(savedGoals, 5);
    });

    test('loading from storage should override current state', () async {
      await appStateNotifier.incrementStreak(); // Change state to 13
      expect(appStateNotifier.state.dayStreak, 13);

      // Save different value to storage
      await fakeStorageService.saveDayStreak(25);

      // Load from storage should update state
      await appStateNotifier.loadFromStorage();

      expect(appStateNotifier.state.dayStreak, 25);
    });
  });
}
