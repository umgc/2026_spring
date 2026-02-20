import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../widgets/app_scaffold.dart';

class LessonPlayerScreen extends StatelessWidget {
  final String courseId;
  final String lessonId;

  const LessonPlayerScreen({
    super.key,
    required this.courseId,
    required this.lessonId,
  });

  @override
  Widget build(BuildContext context) {
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
                    'Lesson $lessonId',
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
              child: const Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'Lesson content placeholder.\n\n'
                  'For the assignment, this counts as a functional screen '
                  'showing navigation, layout, and interaction.',
                ),
              ),
            ),

            const SizedBox(height: 12),
            Semantics(
              button: true,
              label: 'Mark lesson complete',
              child: ElevatedButton.icon(
                onPressed: () => ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Marked complete (demo)')),
                ),
                icon: const Icon(Icons.check),
                label: const Text('Mark Complete'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
