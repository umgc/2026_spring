import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../widgets/app_scaffold.dart';

class CourseDetailScreen extends StatelessWidget {
  final String courseId;

  const CourseDetailScreen({super.key, required this.courseId});

  @override
  Widget build(BuildContext context) {
    final title = switch (courseId) {
      'calculus' => 'Advanced Calculus',
      'physics' => 'Physics',
      'writing' => 'Academic Writing',
      _ => 'Course',
    };

    final lessons = const [
      ('lesson1', 'Introduction to Integration', '15 min', true),
      ('lesson2', 'U-Substitution Method', '22 min', true),
      ('lesson3', 'Integration by Parts', '18 min', false),
    ];

    return AppScaffold(
      currentIndex: 3,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            Row(
              children: [
                Semantics(
                  button: true,
                  label: 'Back',
                  child: IconButton(
                    onPressed: () => context.pop(),
                    icon: const Icon(Icons.arrow_back),
                  ),
                ),
                Expanded(
                  child: Text(
                    title,
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Text(
                      'Master advanced techniques and their applications.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: const [
                        _Stat(label: 'Lessons', value: '24'),
                        _Stat(label: 'Duration', value: '6.5h'),
                        _Stat(label: 'Complete', value: '68%'),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),
            Text('Lessons', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),

            for (final l in lessons)
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: ListTile(
                  leading: Icon(
                    l.$4 ? Icons.check_circle : Icons.play_circle_outline,
                  ),
                  title: Text(l.$2),
                  subtitle: Text(l.$3),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: l.$4
                          ? Colors.green.withOpacity(0.2)
                          : Colors.white10,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(l.$4 ? 'Done' : 'Start'),
                  ),
                  onTap: () => context.go('/lesson/$courseId/${l.$1}'),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  final String label;
  final String value;

  const _Stat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(value, style: Theme.of(context).textTheme.titleLarge),
        Text(label, style: Theme.of(context).textTheme.bodySmall),
      ],
    );
  }
}
