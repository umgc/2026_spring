import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../widgets/app_scaffold.dart';

class CoursesListScreen extends StatelessWidget {
  const CoursesListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final courses = const [
      (
        'calculus',
        'Advanced Calculus',
        'Chapter 4: Integration Techniques',
        0.68,
      ),
      ('physics', 'Physics', 'Lab + Concepts Review', 0.42),
      ('writing', 'Academic Writing', 'Research & Citations', 0.25),
    ];

    return AppScaffold(
      currentIndex: 3,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            Text('Courses', style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 12),

            for (final c in courses)
              Semantics(
                button: true,
                label: 'Open course ${c.$2}',
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: ListTile(
                    title: Text(c.$2),
                    subtitle: Text(c.$3),
                    trailing: Text('${(c.$4 * 100).round()}%'),
                    onTap: () => context.go('/courses/${c.$1}'),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
