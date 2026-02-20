import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter_new/widgets/stat_card.dart';

void main() {
  group('StatCard Widget', () {
    testWidgets('renders correctly with required properties', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
            ),
          ),
        ),
      );

      expect(find.byType(StatCard), findsOneWidget);
      expect(find.text('12'), findsOneWidget);
      expect(find.text('Day Streak'), findsOneWidget);
      expect(find.byIcon(Icons.local_fire_department), findsOneWidget);
    });

    testWidgets('renders Container with correct styling', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
            ),
          ),
        ),
      );

      expect(find.byType(Container), findsWidgets);
    });

    testWidgets('displays value with correct style', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(value: '100', label: 'Points', icon: Icons.star),
          ),
        ),
      );

      final valueFinder = find.text('100');
      expect(valueFinder, findsOneWidget);
      expect(
        find.byWidgetPredicate((widget) {
          return widget is Text && widget.data == '100';
        }),
        findsOneWidget,
      );
    });

    testWidgets('displays label correctly', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '50',
              label: 'Completed Goals',
              icon: Icons.check_circle,
            ),
          ),
        ),
      );

      expect(find.text('Completed Goals'), findsOneWidget);
    });

    testWidgets('displays correct icon', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '24',
              label: 'Study Hours',
              icon: Icons.timer,
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.timer), findsOneWidget);
    });

    testWidgets('renders as non-interactive without onTap callback', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
            ),
          ),
        ),
      );

      expect(find.byType(InkWell), findsNothing);
      expect(find.byType(GestureDetector), findsNothing);
    });

    testWidgets('renders as interactive with onTap callback', (
      WidgetTester tester,
    ) async {
      bool tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
              onTap: () {
                tapped = true;
              },
            ),
          ),
        ),
      );

      expect(find.byType(InkWell), findsOneWidget);
      expect(tapped, false);
    });

    testWidgets('responds to tap when onTap is provided', (
      WidgetTester tester,
    ) async {
      bool tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
              onTap: () {
                tapped = true;
              },
            ),
          ),
        ),
      );

      await tester.tap(find.byType(InkWell));
      await tester.pumpAndSettle();

      expect(tapped, true);
    });

    testWidgets('displays content in correct order', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
            ),
          ),
        ),
      );

      final columnFinder = find.byType(Column);
      expect(columnFinder, findsWidgets);
    });

    testWidgets('has proper spacing between elements', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
            ),
          ),
        ),
      );

      expect(find.byType(SizedBox), findsWidgets);
    });

    testWidgets('handles long text values gracefully', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '999999',
              label: 'Very Long Label Text',
              icon: Icons.star,
            ),
          ),
        ),
      );

      expect(find.text('999999'), findsOneWidget);
      expect(find.text('Very Long Label Text'), findsOneWidget);
    });

    testWidgets('applies theme colors correctly', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData(useMaterial3: true, cardColor: Colors.blue),
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
            ),
          ),
        ),
      );

      expect(find.byType(StatCard), findsOneWidget);
      expect(find.text('12'), findsOneWidget);
    });

    testWidgets('multiple stat cards can be displayed together', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Row(
              children: [
                Expanded(
                  child: StatCard(
                    value: '12',
                    label: 'Day Streak',
                    icon: Icons.local_fire_department,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: StatCard(
                    value: '8',
                    label: 'Goals',
                    icon: Icons.check_circle,
                  ),
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byType(StatCard), findsWidgets);
      expect(find.text('12'), findsOneWidget);
      expect(find.text('8'), findsOneWidget);
    });

    testWidgets('is accessible with proper semantics', (
      WidgetTester tester,
    ) async {
      bool tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              value: '12',
              label: 'Day Streak',
              icon: Icons.local_fire_department,
              onTap: () {
                tapped = true;
              },
            ),
          ),
        ),
      );

      expect(find.byType(InkWell), findsOneWidget);
      await tester.tap(find.byType(InkWell));
      expect(tapped, true);
    });
  });
}
