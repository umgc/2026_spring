import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import '../theme/colors.dart';
import '../theme/text_styles.dart';
import '../constants/app_constants.dart';
import 'settings_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return FocusTraversalGroup(
      policy: OrderedTraversalPolicy(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('EduLense'),
          elevation: 0,
          backgroundColor: isDarkMode
              ? EduLenseColors.darkSurface
              : EduLenseColors.white,
          actions: [
            FocusTraversalOrder(
              order: const NumericFocusOrder(1),
              child: Semantics(
                button: true,
                label: 'Open settings',
                child: IconButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const SettingsScreen()),
                    );
                  },
                  icon: const Icon(Icons.settings),
                  tooltip: 'Settings',
                ),
              ),
            ),
          ],
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(AppConstants.spacingMD),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Welcome Section
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(AppConstants.spacingLG),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Welcome Back!',
                          style: isDarkMode
                              ? EduLenseDarkTextStyles.h2
                              : EduLenseTextStyles.h2,
                        ),
                        const Gap(AppConstants.spacingSM),
                        Text(
                          'Your educational journey continues here',
                          style: isDarkMode
                              ? EduLenseDarkTextStyles.bodyMedium
                              : EduLenseTextStyles.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ),
                const Gap(AppConstants.spacingLG),

                // Quick Actions Section
                Text(
                  'Quick Actions',
                  style: isDarkMode
                      ? EduLenseDarkTextStyles.h3
                      : EduLenseTextStyles.h3,
                ),
                const Gap(AppConstants.spacingMD),
                GridView.count(
                  crossAxisCount: 2,
                  crossAxisSpacing: AppConstants.spacingMD,
                  mainAxisSpacing: AppConstants.spacingMD,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  children: [
                    _buildActionCard(
                      context,
                      icon: Icons.book,
                      label: 'My Courses',
                      onTap: () {},
                      focusOrder: 2,
                    ),
                    _buildActionCard(
                      context,
                      icon: Icons.assignment,
                      label: 'Assignments',
                      onTap: () {},
                      focusOrder: 3,
                    ),
                    _buildActionCard(
                      context,
                      icon: Icons.calendar_today,
                      label: 'Schedule',
                      onTap: () {},
                      focusOrder: 4,
                    ),
                    _buildActionCard(
                      context,
                      icon: Icons.bar_chart,
                      label: 'Progress',
                      onTap: () {},
                      focusOrder: 5,
                    ),
                  ],
                ),
                const Gap(AppConstants.spacingLG),

                // Recent Activity Section
                Text(
                  'Recent Activity',
                  style: isDarkMode
                      ? EduLenseDarkTextStyles.h3
                      : EduLenseTextStyles.h3,
                ),
                const Gap(AppConstants.spacingMD),
                _buildActivityItem(
                  context,
                  title: 'Flutter Basics - Lesson 3',
                  subtitle: 'Completed 2 hours ago',
                  icon: Icons.check_circle,
                ),
                const Gap(AppConstants.spacingSM),
                _buildActivityItem(
                  context,
                  title: 'Assignment: State Management',
                  subtitle: 'Due in 2 days',
                  icon: Icons.pending_actions,
                ),
                const Gap(AppConstants.spacingSM),
                _buildActivityItem(
                  context,
                  title: 'Quiz: Dart Fundamentals',
                  subtitle: 'Score: 92/100',
                  icon: Icons.assessment,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionCard(
    BuildContext context, {
    required IconData icon,
    required String label,
    required VoidCallback onTap,
    required double focusOrder,
  }) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return FocusTraversalOrder(
      order: NumericFocusOrder(focusOrder),
      child: Semantics(
        button: true,
        label: label,
        child: Card(
          child: InkWell(
            onTap: onTap,
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingMD),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(icon, size: 48, color: EduLenseColors.primary),
                  const Gap(AppConstants.spacingMD),
                  Text(
                    label,
                    style: isDarkMode
                        ? EduLenseDarkTextStyles.bodyMedium
                        : EduLenseTextStyles.bodyMedium,
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActivityItem(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
  }) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingMD),
        child: Row(
          children: [
            Icon(icon, color: EduLenseColors.primary, size: 32),
            const Gap(AppConstants.spacingMD),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: isDarkMode
                        ? EduLenseDarkTextStyles.bodyLarge
                        : EduLenseTextStyles.bodyLarge,
                  ),
                  const Gap(AppConstants.spacingSM),
                  Text(
                    subtitle,
                    style: isDarkMode
                        ? EduLenseDarkTextStyles.bodySmall
                        : EduLenseTextStyles.bodySmall,
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: EduLenseColors.tertiaryText,
            ),
          ],
        ),
      ),
    );
  }
}
