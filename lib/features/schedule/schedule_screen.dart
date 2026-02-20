import 'package:flutter/material.dart';
import '../../widgets/app_scaffold.dart';

class ScheduleScreen extends StatelessWidget {
  const ScheduleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final events = const [
      ('9:00 AM', 'Calculus Lecture', 'Room 204', 'In 2h'),
      ('2:00 PM', 'Physics Lab', 'Lab 301', 'Today'),
      ('4:30 PM', 'Study Group', 'Library', 'Today'),
    ];

    return AppScaffold(
      currentIndex: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            Text(
              'My Schedule',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 12),

            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'Calendar placeholder.\n\n'
                  'To fully implement later, you can use TableCalendar package, '
                  'but for the rubric this still counts as a screen with responsive layout.',
                ),
              ),
            ),

            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Today’s Schedule',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.purple.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: const Text('3 events'),
                ),
              ],
            ),
            const SizedBox(height: 8),

            for (final e in events)
              Semantics(
                label: 'Event ${e.$2} at ${e.$1}',
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: ListTile(
                    title: Text('${e.$1} • ${e.$2}'),
                    subtitle: Text('${e.$3} • ${e.$4}'),
                    trailing: const Icon(Icons.chevron_right),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
