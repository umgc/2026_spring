import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:edulense_flutter_new/widgets/app_scaffold.dart';

void main() {
  group('AppScaffold Widget', () {
    testWidgets('renders scaffold with navigation bar', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 4,
              child: const Center(child: Text('Home Content')),
            );
          },
        ),
      );

      expect(find.byType(Scaffold), findsOneWidget);
      expect(find.byType(NavigationBar), findsOneWidget);
    });

    testWidgets('displays child content', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 4,
              child: const Center(child: Text('Test Content')),
            );
          },
        ),
      );

      expect(find.text('Test Content'), findsOneWidget);
    });

    testWidgets('renders all navigation destinations', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 0,
              child: const SizedBox.shrink(),
            );
          },
        ),
      );

      expect(find.text('Profile'), findsOneWidget);
      expect(find.text('Progress'), findsOneWidget);
      expect(find.text('Schedule'), findsOneWidget);
      expect(find.text('Courses'), findsOneWidget);
      expect(find.text('Home'), findsOneWidget);
    });

    testWidgets('highlights correct navigation item', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 0,
              child: const SizedBox.shrink(),
            );
          },
        ),
      );

      expect(find.byType(NavigationBar), findsOneWidget);
    });

    testWidgets('displays home destination when currentIndex is 4', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 4,
              child: const SizedBox.shrink(),
            );
          },
        ),
      );

      expect(find.text('Home'), findsOneWidget);
    });

    testWidgets('displays profile destination when currentIndex is 0', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 0,
              child: const SizedBox.shrink(),
            );
          },
        ),
      );

      expect(find.text('Profile'), findsOneWidget);
    });

    testWidgets('has proper icons for each destination', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 4,
              child: const SizedBox.shrink(),
            );
          },
        ),
      );

      expect(find.byIcon(Icons.person_outline), findsOneWidget);
      expect(find.byIcon(Icons.bar_chart_outlined), findsOneWidget);
      expect(find.byIcon(Icons.calendar_month_outlined), findsOneWidget);
      expect(find.byIcon(Icons.menu_book_outlined), findsOneWidget);
      expect(find.byIcon(Icons.home_outlined), findsOneWidget);
    });

    testWidgets('wraps child in SafeArea', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 4,
              child: const Text('Content'),
            );
          },
        ),
      );

      expect(find.byType(SafeArea), findsOneWidget);
      expect(find.text('Content'), findsOneWidget);
    });

    testWidgets('displays navigation bar at bottom', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 4,
              child: const SizedBox.shrink(),
            );
          },
        ),
      );

      expect(find.byType(NavigationBar), findsOneWidget);
    });

    testWidgets('can display different content for each screen', (WidgetTester tester) async {
      final mockRouterDelegate = MockGoRouterDelegate();
      final mockRouteInformationParser = MockGoRouteInformationParser();

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: mockRouterDelegate,
          routeInformationParser: mockRouteInformationParser,
          builder: (context, child) {
            return AppScaffold(
              currentIndex: 2,
              child: const Center(child: Text('Schedule Content')),
            );
          },
        ),
      );

      expect(find.text('Schedule Content'), findsOneWidget);
      expect(find.text('Schedule'), findsOneWidget);
    });
  });
}

// Mock implementations for GoRouter
class MockGoRouterDelegate extends GoRouterDelegate {
  @override
  String get currentPath => '/';

  @override
  Future<bool> popRoute() async => false;

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}

class MockGoRouteInformationParser extends GoRouteInformationParser {
  @override
  Future<RouteMatchList> parseRouteInformation(RouteInformation routeInformation) async {
    return RouteMatchList(matches: [], uri: Uri.parse('/'), pathParameters: {});
  }
}
