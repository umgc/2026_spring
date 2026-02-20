import 'package:edulence/main.dart';
import 'package:edulence/screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

void main() {
  Future<void> pumpApp(WidgetTester tester) async {
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => ThemeProvider(),
        child: const MyApp(),
      ),
    );
    await tester.pumpAndSettle();
  }

  Future<void> expectGuidelinePasses(
    WidgetTester tester, {
    required Future<void> Function() pump,
    required AccessibilityGuideline guideline,
  }) async {
    final semantics = tester.ensureSemantics();
    await pump();
    await expectLater(tester, meetsGuideline(guideline));
    semantics.dispose();
  }

  group('Accessibility guidelines', () {
    testWidgets('Auth entry screen passes tap target labeling guideline', (
      WidgetTester tester,
    ) async {
      await expectGuidelinePasses(
        tester,
        pump: () => pumpApp(tester),
        guideline: labeledTapTargetGuideline,
      );
    });

    testWidgets('Auth entry screen passes Android tap target size guideline', (
      WidgetTester tester,
    ) async {
      await expectGuidelinePasses(
        tester,
        pump: () => pumpApp(tester),
        guideline: androidTapTargetGuideline,
      );
    });

    testWidgets('Auth entry screen passes text contrast guideline', (
      WidgetTester tester,
    ) async {
      await expectGuidelinePasses(
        tester,
        pump: () => pumpApp(tester),
        guideline: textContrastGuideline,
      );
    });

    testWidgets('HomeScreen meets androidTapTargetGuideline', (
      WidgetTester tester,
    ) async {
      await expectGuidelinePasses(
        tester,
        pump: () async {
          await tester.pumpWidget(const MaterialApp(home: HomeScreen()));
          await tester.pumpAndSettle();
        },
        guideline: androidTapTargetGuideline,
      );
    });

    testWidgets('HomeScreen meets iOS tap target size guideline', (
      WidgetTester tester,
    ) async {
      await expectGuidelinePasses(
        tester,
        pump: () async {
          await tester.pumpWidget(const MaterialApp(home: HomeScreen()));
          await tester.pumpAndSettle();
        },
        guideline: iOSTapTargetGuideline,
      );
    });

    testWidgets('HomeScreen passes tap target labeling guideline', (
      WidgetTester tester,
    ) async {
      await expectGuidelinePasses(
        tester,
        pump: () async {
          await tester.pumpWidget(const MaterialApp(home: HomeScreen()));
          await tester.pumpAndSettle();
        },
        guideline: labeledTapTargetGuideline,
      );
    });

    testWidgets('HomeScreen passes text contrast guideline', (
      WidgetTester tester,
    ) async {
      await expectGuidelinePasses(
        tester,
        pump: () async {
          await tester.pumpWidget(const MaterialApp(home: HomeScreen()));
          await tester.pumpAndSettle();
        },
        guideline: textContrastGuideline,
      );
    });
  });

  group('Accessibility behavior', () {
    testWidgets('Auth entry supports 200% text scaling without layout errors', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => ThemeProvider(),
          child: Builder(
            builder: (context) {
              return MediaQuery(
                data: const MediaQueryData(textScaler: TextScaler.linear(2.0)),
                child: const MyApp(),
              );
            },
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Sign In'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets('Auth entry can be operated with keyboard navigation', (
      WidgetTester tester,
    ) async {
      await pumpApp(tester);
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pumpAndSettle();

      expect(find.text('Quick Actions'), findsOneWidget);
    });
  });
}
