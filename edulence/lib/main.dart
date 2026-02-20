import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens/auth_entry_screen.dart';
import 'theme/theme.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => ThemeProvider(),
      child: const MyApp(),
    ),
  );
}

class ThemeProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.system;

  ThemeMode get themeMode => _themeMode;

  void setThemeMode(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        return MaterialApp(
          title: 'EduLense',
          theme: createLightTheme(),
          darkTheme: createDarkTheme(),
          themeMode: themeProvider.themeMode,
          builder: (context, child) {
            final mediaQuery = MediaQuery.of(context);
            return MediaQuery(
              data: mediaQuery.copyWith(
                textScaler: mediaQuery.textScaler.clamp(maxScaleFactor: 2.0),
              ),
              child: FocusTraversalGroup(
                policy: OrderedTraversalPolicy(),
                child: child ?? const SizedBox.shrink(),
              ),
            );
          },
          home: const AuthEntryScreen(),
          debugShowCheckedModeBanner: false,
        );
      },
    );
  }
}
