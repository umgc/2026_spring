import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../state/app_state_notifier.dart';
import '../../widgets/app_scaffold.dart';
import '../../widgets/stat_card.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appState = ref.watch(appStateProvider);

    // Responsive: simple breakpoints
    final width = MediaQuery.of(context).size.width;
    final isTablet = width >= 700;

    return AppScaffold(
      currentIndex: 4,
      child: Padding(
        padding: EdgeInsets.all(isTablet ? 24 : 16),
        child: ListView(
          children: [
            Row(
              children: [
                const CircleAvatar(child: Text('A')),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'Welcome back, Alex!',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Semantics(
                  button: true,
                  label: 'Notifications',
                  child: IconButton(
                    onPressed: () => context.go('/notifications'),
                    icon: const Icon(Icons.notifications_none),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              'Ready to continue your learning journey?',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 16),

            GridView.count(
              crossAxisCount: isTablet ? 3 : 3,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: isTablet ? 1.4 : 0.9,
              children: [
                StatCard(
                  value: '${appState.dayStreak}',
                  label: 'Day\nStreak',
                  icon: Icons.local_fire_department,
                  onTap: () {
                    ref.read(appStateProvider.notifier).incrementStreak();
                  },
                ),
                StatCard(
                  value: '${appState.goalsCompleted}/10',
                  label: 'Goals',
                  icon: Icons.check_circle_outline,
                  onTap: () {
                    // quick demo update
                    ref
                        .read(appStateProvider.notifier)
                        .setGoals((appState.goalsCompleted + 1).clamp(0, 10));
                  },
                ),
                StatCard(
                  value: '${appState.studyHoursThisWeek}h',
                  label: 'This\nWeek',
                  icon: Icons.access_time,
                ),
              ],
            ),

            const SizedBox(height: 18),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Continue Learning',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                TextButton(
                  onPressed: () => context.go('/courses'),
                  child: const Text('See All'),
                ),
              ],
            ),

            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Theme.of(context).cardColor,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Advanced Calculus',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Chapter 4: Integration Techniques',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Progress'),
                      Text(
                        '68%',
                        style: Theme.of(context).textTheme.titleSmall,
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const LinearProgressIndicator(value: 0.68),
                  const SizedBox(height: 12),
                  Semantics(
                    button: true,
                    label: 'Resume Learning Advanced Calculus',
                    child: SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => context.go('/lesson/calculus/lesson1'),
                        child: const Text('Resume Learning'),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
