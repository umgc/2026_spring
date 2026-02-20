import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

import '../constants/app_constants.dart';
import '../theme/colors.dart';
import 'settings_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static const List<_QuickAction> _quickActions = [
    _QuickAction(icon: Icons.book, label: 'My Courses'),
    _QuickAction(icon: Icons.assignment, label: 'Assignments'),
    _QuickAction(icon: Icons.calendar_today, label: 'Schedule'),
    _QuickAction(icon: Icons.bar_chart, label: 'Progress'),
  ];

  static const List<_ActivityItem> _recentActivities = [
    _ActivityItem(
      title: 'Flutter Basics - Lesson 3',
      subtitle: 'Completed 2 hours ago',
      icon: Icons.check_circle,
    ),
    _ActivityItem(
      title: 'Assignment: State Management',
      subtitle: 'Due in 2 days',
      icon: Icons.pending_actions,
    ),
    _ActivityItem(
      title: 'Quiz: Dart Fundamentals',
      subtitle: 'Score: 92/100',
      icon: Icons.assessment,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final textTheme = Theme.of(context).textTheme;

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
                  tooltip: 'Settings',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const SettingsScreen()),
                    );
                  },
                  icon: const Icon(Icons.settings),
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
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(AppConstants.spacingLG),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Welcome Back!', style: textTheme.headlineMedium),
                        const Gap(AppConstants.spacingSM),
                        Text(
                          'Your educational journey continues here',
                          style: textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ),
                const Gap(AppConstants.spacingLG),
                Text('Quick Actions', style: textTheme.headlineSmall),
                const Gap(AppConstants.spacingMD),
                GridView.count(
                  crossAxisCount: 2,
                  crossAxisSpacing: AppConstants.spacingMD,
                  mainAxisSpacing: AppConstants.spacingMD,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  children: [
                    for (var i = 0; i < _quickActions.length; i++)
                      _buildActionCard(
                        context,
                        action: _quickActions[i],
                        focusOrder: i + 2,
                      ),
                  ],
                ),
                const Gap(AppConstants.spacingLG),
                Text('Recent Activity', style: textTheme.headlineSmall),
                const Gap(AppConstants.spacingMD),
                ..._buildActivityList(context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _buildActivityList(BuildContext context) {
    final widgets = <Widget>[];

    for (var i = 0; i < _recentActivities.length; i++) {
      widgets.add(_buildActivityItem(context, item: _recentActivities[i]));
      if (i < _recentActivities.length - 1) {
        widgets.add(const Gap(AppConstants.spacingSM));
      }
    }

    return widgets;
  }

  Widget _buildActionCard(
    BuildContext context, {
    required _QuickAction action,
    required double focusOrder,
  }) {
    final textTheme = Theme.of(context).textTheme;

    return FocusTraversalOrder(
      order: NumericFocusOrder(focusOrder),
      child: Semantics(
        button: true,
        label: action.label,
        child: Card(
          child: InkWell(
            onTap: () {},
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingMD),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(action.icon, size: 48, color: EduLenseColors.primary),
                  const Gap(AppConstants.spacingMD),
                  Text(
                    action.label,
                    style: textTheme.bodyMedium,
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
    required _ActivityItem item,
  }) {
    final textTheme = Theme.of(context).textTheme;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingMD),
        child: Row(
          children: [
            Icon(item.icon, color: EduLenseColors.primary, size: 32),
            const Gap(AppConstants.spacingMD),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.title, style: textTheme.bodyLarge),
                  const Gap(AppConstants.spacingSM),
                  Text(item.subtitle, style: textTheme.bodySmall),
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

class _QuickAction {
  const _QuickAction({required this.icon, required this.label});

  final IconData icon;
  final String label;
}

class _ActivityItem {
  const _ActivityItem({
    required this.title,
    required this.subtitle,
    required this.icon,
  });

  final String title;
  final String subtitle;
  final IconData icon;
}
