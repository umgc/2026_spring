import 'package:flutter/material.dart';
import '../theme/colors.dart';
import 'main_navigation_screen.dart';

class AuthEntryScreen extends StatelessWidget {
  const AuthEntryScreen({super.key});

  void _enterApp(BuildContext context) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const MainNavigationScreen()),
    );
  }

  Widget _buildAuthActionButton({
    required double focusOrder,
    required String semanticsLabel,
    required String buttonText,
    required Key buttonKey,
    required VoidCallback onPressed,
    required bool outlined,
  }) {
    final buttonChild = SizedBox(
      width: double.infinity,
      child: outlined
          ? OutlinedButton(
              key: buttonKey,
              onPressed: onPressed,
              child: Text(buttonText),
            )
          : ElevatedButton(
              key: buttonKey,
              onPressed: onPressed,
              child: Text(buttonText),
            ),
    );

    return FocusTraversalOrder(
      order: NumericFocusOrder(focusOrder),
      child: Semantics(button: true, label: semanticsLabel, child: buttonChild),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              theme.colorScheme.primary.withOpacity(isDark ? 0.35 : 0.22),
              theme.colorScheme.secondary.withOpacity(isDark ? 0.35 : 0.18),
              theme.colorScheme.surface,
            ],
            stops: const [0.0, 0.55, 1.0],
          ),
        ),
        child: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) => SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 28,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ExcludeSemantics(
                        child: Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primary.withOpacity(0.12),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.school_outlined,
                            size: 34,
                            color: theme.colorScheme.primary,
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      Semantics(
                        header: true,
                        child: Text(
                          'Welcome to EduLense',
                          style: theme.textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Your personalized learning hub. Sign in to continue or create an account to get started.',
                        style: theme.textTheme.bodyLarge?.copyWith(
                          color: isDark
                              ? EduLenseColors.darkSecondaryText
                              : EduLenseColors.primaryText,
                          height: 1.4,
                        ),
                      ),
                      const SizedBox(height: 24),
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.surface,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(
                                isDark ? 0.3 : 0.08,
                              ),
                              blurRadius: 20,
                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Sign in or create an account',
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(height: 12),
                            Text(
                              'Save progress, sync across devices, and unlock tailored study insights.',
                              style: theme.textTheme.bodyMedium?.copyWith(
                                color: isDark
                                    ? EduLenseColors.darkSecondaryText
                                    : EduLenseColors.secondaryText,
                              ),
                            ),
                            const SizedBox(height: 20),
                            _buildAuthActionButton(
                              focusOrder: 1,
                              semanticsLabel: 'Sign in to EduLense',
                              buttonText: 'Sign In',
                              buttonKey: const Key('auth_sign_in_button'),
                              onPressed: () => _enterApp(context),
                              outlined: false,
                            ),
                            const SizedBox(height: 12),
                            _buildAuthActionButton(
                              focusOrder: 2,
                              semanticsLabel: 'Create a new EduLense account',
                              buttonText: 'Sign Up',
                              buttonKey: const Key('auth_sign_up_button'),
                              onPressed: () => _enterApp(context),
                              outlined: true,
                            ),
                            const SizedBox(height: 16),
                            Center(
                              child: Semantics(
                                readOnly: true,
                                label:
                                    'By continuing you agree to our Terms and Privacy.',
                                child: Text(
                                  'By continuing you agree to our Terms & Privacy.',
                                  textAlign: TextAlign.center,
                                  style: theme.textTheme.bodySmall?.copyWith(
                                    color: isDark
                                        ? EduLenseColors.darkSecondaryText
                                        : EduLenseColors.secondaryText,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
