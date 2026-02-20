import 'package:flutter/material.dart';
import 'router/app_router.dart';

class EduLenseApp extends StatelessWidget {
  const EduLenseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'EduLense',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFF7C5CFC),
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        cardColor: const Color(0xFF111C2E),
      ),
      routerConfig: appRouter,
    );
  }
}
