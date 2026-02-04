import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AchievementsScreen extends StatelessWidget {
  const AchievementsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final achievements = const [
      ('Week Warrior', Icons.emoji_events_outlined),
      ('Perfect Score', Icons.star_outline),
      ('Hot Streak', Icons.local_fire_department_outlined),
      ('Goal Crusher', Icons.track_changes_outlined),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Achievements'),
        leading: Semantics(
          button: true,
          label: 'Back',
          child: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => context.pop(),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          for (final a in achievements)
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: ListTile(leading: Icon(a.$2), title: Text(a.$1)),
            ),
        ],
      ),
    );
  }
}
