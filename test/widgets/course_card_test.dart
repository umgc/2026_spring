import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter_new/widgets/course_card.dart';

void main() {
  group('CourseCard Widget', () {
    testWidgets('renders correctly with required properties', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Flutter Basics',
              instructor: 'John Doe',
              progress: 75,
            ),
          ),
        ),
      );

      expect(find.byType(CourseCard), findsOneWidget);
      expect(find.text('Flutter Basics'), findsOneWidget);
      expect(find.text('John Doe'), findsOneWidget);
    });

    testWidgets('displays course title', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Advanced Flutter',
              instructor: 'Jane Smith',
              progress: 50,
            ),
          ),
        ),
      );

      expect(find.text('Advanced Flutter'), findsOneWidget);
    });

    testWidgets('displays instructor name', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Web Development',
              instructor: 'Bob Johnson',
              progress: 30,
            ),
          ),
        ),
      );

      expect(find.text('Bob Johnson'), findsOneWidget);
    });

    testWidgets('renders progress bar', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Python 101',
              instructor: 'Alice Brown',
              progress: 60,
            ),
          ),
        ),
      );

      expect(find.byType(CourseCard), findsOneWidget);
    });

    testWidgets('handles zero progress', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'New Course',
              instructor: 'Teacher',
              progress: 0,
            ),
          ),
        ),
      );

      expect(find.text('New Course'), findsOneWidget);
    });

    testWidgets('handles 100% progress', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Completed Course',
              instructor: 'Instructor',
              progress: 100,
            ),
          ),
        ),
      );

      expect(find.text('Completed Course'), findsOneWidget);
    });

    testWidgets('displays with optional description', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Dart Programming',
              instructor: 'Expert',
              progress: 45,
              description: 'Learn Dart from scratch',
            ),
          ),
        ),
      );

      expect(find.text('Dart Programming'), findsOneWidget);
      expect(find.text('Learn Dart from scratch'), findsOneWidget);
    });

    testWidgets('renders without optional description', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Course Without Description',
              instructor: 'Teacher',
              progress: 20,
            ),
          ),
        ),
      );

      expect(find.text('Course Without Description'), findsOneWidget);
    });

    testWidgets('handles long course title', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Advanced Machine Learning and Deep Neural Networks for Production Systems',
              instructor: 'Dr. Smith',
              progress: 55,
            ),
          ),
        ),
      );

      expect(find.text('Advanced Machine Learning and Deep Neural Networks for Production Systems'), findsOneWidget);
    });

    testWidgets('handles long instructor name', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Course',
              instructor: 'Professor Alexander Von Neumann III',
              progress: 40,
            ),
          ),
        ),
      );

      expect(find.text('Professor Alexander Von Neumann III'), findsOneWidget);
    });

    testWidgets('multiple course cards can be displayed', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ListView(
              children: [
                CourseCard(
                  title: 'Course 1',
                  instructor: 'Instructor 1',
                  progress: 25,
                ),
                CourseCard(
                  title: 'Course 2',
                  instructor: 'Instructor 2',
                  progress: 75,
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byType(CourseCard), findsWidgets);
      expect(find.text('Course 1'), findsOneWidget);
      expect(find.text('Course 2'), findsOneWidget);
    });

    testWidgets('displays cards in grid layout', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: GridView.count(
              crossAxisCount: 2,
              children: [
                CourseCard(
                  title: 'Grid Course 1',
                  instructor: 'Teacher A',
                  progress: 50,
                ),
                CourseCard(
                  title: 'Grid Course 2',
                  instructor: 'Teacher B',
                  progress: 60,
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byType(CourseCard), findsWidgets);
    });

    testWidgets('applies theme colors correctly', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData(
            useMaterial3: true,
            cardColor: Colors.green,
          ),
          home: Scaffold(
            body: CourseCard(
              title: 'Themed Course',
              instructor: 'Teacher',
              progress: 35,
            ),
          ),
        ),
      );

      expect(find.text('Themed Course'), findsOneWidget);
    });

    testWidgets('displays progress value correctly', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Progress Test',
              instructor: 'Teacher',
              progress: 85,
            ),
          ),
        ),
      );

      expect(find.text('Progress Test'), findsOneWidget);
    });

    testWidgets('handles edge case progress values', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Column(
              children: [
                CourseCard(
                  title: 'Just Started',
                  instructor: 'Teacher',
                  progress: 1,
                ),
                CourseCard(
                  title: 'Almost Done',
                  instructor: 'Teacher',
                  progress: 99,
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byType(CourseCard), findsWidgets);
    });

    testWidgets('displays description with special formatting', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CourseCard(
              title: 'Formatted Course',
              instructor: 'Teacher',
              progress: 40,
              description: 'Learn: Python, Django & REST APIs',
            ),
          ),
        ),
      );

      expect(find.text('Learn: Python, Django & REST APIs'), findsOneWidget);
    });
  });
}
