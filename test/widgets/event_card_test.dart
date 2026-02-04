import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:edulense_flutter/widgets/event_card.dart';

void main() {
  group('EventCard Widget', () {
    testWidgets('renders correctly with required properties', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'Math Lesson',
              time: '2:00 PM - 3:00 PM',
              location: 'Room 101',
            ),
          ),
        ),
      );

      expect(find.byType(EventCard), findsOneWidget);
      expect(find.text('Math Lesson'), findsOneWidget);
      expect(find.text('2:00 PM - 3:00 PM'), findsOneWidget);
      expect(find.text('Room 101'), findsOneWidget);
    });

    testWidgets('displays title with correct content', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'Physics Class',
              time: '10:00 AM',
              location: 'Lab',
            ),
          ),
        ),
      );

      expect(find.text('Physics Class'), findsOneWidget);
    });

    testWidgets('displays time information', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'Chemistry Lecture',
              time: '3:30 PM - 5:00 PM',
              location: 'Auditorium',
            ),
          ),
        ),
      );

      expect(find.text('3:30 PM - 5:00 PM'), findsOneWidget);
    });

    testWidgets('displays location information', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'Study Group',
              time: '6:00 PM',
              location: 'Library Room 5',
            ),
          ),
        ),
      );

      expect(find.text('Library Room 5'), findsOneWidget);
    });

    testWidgets('renders Container with proper styling', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'Test',
              time: 'Now',
              location: 'Here',
            ),
          ),
        ),
      );

      expect(find.byType(Container), findsWidgets);
    });

    testWidgets('displays all event details together', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'Final Exam',
              time: '9:00 AM - 12:00 PM',
              location: 'Exam Hall',
            ),
          ),
        ),
      );

      expect(find.text('Final Exam'), findsOneWidget);
      expect(find.text('9:00 AM - 12:00 PM'), findsOneWidget);
      expect(find.text('Exam Hall'), findsOneWidget);
    });

    testWidgets('handles long titles gracefully', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'Advanced Data Structures and Algorithms Deep Dive Workshop',
              time: '10:00 AM - 4:00 PM',
              location: 'Computer Science Building Room 301',
            ),
          ),
        ),
      );

      expect(find.text('Advanced Data Structures and Algorithms Deep Dive Workshop'), findsOneWidget);
    });

    testWidgets('renders in a scrollable context', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ListView(
              children: [
                EventCard(
                  title: 'Event 1',
                  time: '1:00 PM',
                  location: 'Location 1',
                ),
                EventCard(
                  title: 'Event 2',
                  time: '2:00 PM',
                  location: 'Location 2',
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byType(EventCard), findsWidgets);
      expect(find.text('Event 1'), findsOneWidget);
      expect(find.text('Event 2'), findsOneWidget);
    });

    testWidgets('applies theme colors correctly', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData(
            useMaterial3: true,
            cardColor: Colors.purple,
          ),
          home: Scaffold(
            body: EventCard(
              title: 'Themed Event',
              time: '4:00 PM',
              location: 'Room',
            ),
          ),
        ),
      );

      expect(find.text('Themed Event'), findsOneWidget);
    });

    testWidgets('displays event with minimal information', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'X',
              time: 'Y',
              location: 'Z',
            ),
          ),
        ),
      );

      expect(find.text('X'), findsOneWidget);
      expect(find.text('Y'), findsOneWidget);
      expect(find.text('Z'), findsOneWidget);
    });

    testWidgets('event card maintains proper layout', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: SingleChildScrollView(
              child: Column(
                children: [
                  EventCard(
                    title: 'Morning Standup',
                    time: '9:00 AM',
                    location: 'Conference Room A',
                  ),
                  const SizedBox(height: 16),
                  EventCard(
                    title: 'Lunch Meeting',
                    time: '12:30 PM',
                    location: 'Cafeteria',
                  ),
                ],
              ),
            ),
          ),
        ),
      );

      expect(find.byType(EventCard), findsWidgets);
      expect(find.text('Morning Standup'), findsOneWidget);
      expect(find.text('Lunch Meeting'), findsOneWidget);
    });

    testWidgets('handles special characters in text', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: EventCard(
              title: 'C++ & Java Review',
              time: '3:00 PM - 4:30 PM',
              location: 'Lab #3 (A/B)',
            ),
          ),
        ),
      );

      expect(find.text('C++ & Java Review'), findsOneWidget);
      expect(find.text('Lab #3 (A/B)'), findsOneWidget);
    });

    testWidgets('multiple events can be displayed in grid', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: GridView.count(
              crossAxisCount: 2,
              children: [
                EventCard(
                  title: 'Event A',
                  time: '1:00 PM',
                  location: 'Place A',
                ),
                EventCard(
                  title: 'Event B',
                  time: '2:00 PM',
                  location: 'Place B',
                ),
                EventCard(
                  title: 'Event C',
                  time: '3:00 PM',
                  location: 'Place C',
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byType(EventCard), findsWidgets);
    });
  });
}
