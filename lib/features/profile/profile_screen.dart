import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../widgets/app_scaffold.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      currentIndex: 0,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Profile',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                Semantics(
                  button: true,
                  label: 'Settings',
                  child: IconButton(
                    onPressed: () => context.go('/settings'),
                    icon: const Icon(Icons.settings_outlined),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Padding(
                padding: EdgeInsets.all(16),
                child: Row(
                  children: [
                    CircleAvatar(radius: 26, child: Text('A')),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Alex Johnson',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text('alex.johnson@university.edu'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 12),
            Row(
              children: const [
                Expanded(
                  child: _SmallStat(label: 'Courses', value: '6'),
                ),
                SizedBox(width: 12),
                Expanded(
                  child: _SmallStat(label: 'Lessons Done', value: '142'),
                ),
                SizedBox(width: 12),
                Expanded(
                  child: _SmallStat(label: 'Achievements', value: '24'),
                ),
              ],
            ),

            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Achievements',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                TextButton(
                  onPressed: () => context.go('/achievements'),
                  child: const Text('View All'),
                ),
              ],
            ),

            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: const [
                _Badge(
                  label: 'Week Warrior',
                  icon: Icons.emoji_events_outlined,
                ),
                _Badge(label: 'Perfect Score', icon: Icons.star_outline),
                _Badge(
                  label: 'Hot Streak',
                  icon: Icons.local_fire_department_outlined,
                ),
                _Badge(
                  label: 'Goal Crusher',
                  icon: Icons.track_changes_outlined,
                ),
              ],
            ),

            const SizedBox(height: 16),
            Text('Settings', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),

            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  Semantics(
                    button: true,
                    label: 'Notifications',
                    child: ListTile(
                      leading: const Icon(Icons.notifications_none),
                      title: const Text('Notifications'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () => context.go('/notifications'),
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

class _SmallStat extends StatelessWidget {
  final String label;
  final String value;

  const _SmallStat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Text(value, style: Theme.of(context).textTheme.headlineSmall),
            Text(label, style: Theme.of(context).textTheme.bodySmall),
          ],
        ),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  final String label;
  final IconData icon;

  const _Badge({required this.label, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: label,
      child: Chip(avatar: Icon(icon, size: 18), label: Text(label)),
    );
  }
}
