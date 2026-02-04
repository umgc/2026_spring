import 'package:go_router/go_router.dart';
import '../features/dashboard/dashboard_screen.dart';
import '../features/courses/courses_list_screen.dart';
import '../features/courses/course_detail_screen.dart';
import '../features/courses/lesson_player_screen.dart';
import '../features/schedule/schedule_screen.dart';
import '../features/progress/progress_screen.dart';
import '../features/profile/profile_screen.dart';
import '../features/profile/achievements_screen.dart';
import '../features/profile/settings_screen.dart';
import '../features/profile/notifications_screen.dart';

final appRouter = GoRouter(
  initialLocation: '/home',
  routes: [
    GoRoute(path: '/home', builder: (_, __) => const DashboardScreen()),
    GoRoute(path: '/courses', builder: (_, __) => const CoursesListScreen()),
    GoRoute(
      path: '/courses/:id',
      builder: (_, state) =>
          CourseDetailScreen(courseId: state.pathParameters['id']!),
    ),
    GoRoute(
      path: '/lesson/:courseId/:lessonId',
      builder: (_, state) => LessonPlayerScreen(
        courseId: state.pathParameters['courseId']!,
        lessonId: state.pathParameters['lessonId']!,
      ),
    ),
    GoRoute(path: '/schedule', builder: (_, __) => const ScheduleScreen()),
    GoRoute(path: '/progress', builder: (_, __) => const ProgressScreen()),
    GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
    GoRoute(
      path: '/achievements',
      builder: (_, __) => const AchievementsScreen(),
    ),
    GoRoute(path: '/settings', builder: (_, __) => const SettingsScreen()),
    GoRoute(
      path: '/notifications',
      builder: (_, __) => const NotificationsScreen(),
    ),
  ],
);
