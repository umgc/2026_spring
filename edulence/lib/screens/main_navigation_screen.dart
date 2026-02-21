import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:gap/gap.dart';
import 'auth_entry_screen.dart';
import 'home_screen.dart';
import 'settings_screen.dart';
import '../constants/app_constants.dart';
import '../theme/colors.dart';
import '../theme/text_styles.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    ExploreScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return FocusTraversalGroup(
      policy: OrderedTraversalPolicy(),
      child: Scaffold(
        body: _screens[_selectedIndex],
        bottomNavigationBar: Semantics(
          container: true,
          label: 'Main navigation tabs',
          child: BottomNavigationBar(
            currentIndex: _selectedIndex,
            onTap: (index) {
              setState(() {
                _selectedIndex = index;
              });
            },
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
              BottomNavigationBarItem(
                icon: Icon(Icons.search),
                label: 'Explore',
              ),
              BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
            ],
          ),
        ),
      ),
    );
  }
}

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  static const List<String> _topics = [
    'Flutter Fundamentals',
    'Dart Collections and Generics',
    'State Management Patterns',
    'Accessibility and Inclusive UX',
    'Testing and QA Automation',
    'Mobile Security Best Practices',
  ];

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Explore'), elevation: 0),
      body: ListView.separated(
        padding: const EdgeInsets.all(AppConstants.spacingMD),
        itemCount: _topics.length,
        separatorBuilder: (_, __) => const Gap(AppConstants.spacingSM),
        itemBuilder: (context, index) {
          final topic = _topics[index];
          return Semantics(
            button: true,
            label: 'Open learning topic $topic',
            hint: 'Double tap to view topic details',
            child: Card(
              child: ListTile(
                contentPadding: const EdgeInsets.all(AppConstants.spacingMD),
                title: Text(
                  topic,
                  style: isDarkMode
                      ? EduLenseDarkTextStyles.bodyLarge
                      : EduLenseTextStyles.bodyLarge,
                ),
                subtitle: Text(
                  'Estimated ${10 + (index * 2)} minutes',
                  style: isDarkMode
                      ? EduLenseDarkTextStyles.bodySmall
                      : EduLenseTextStyles.bodySmall,
                ),
                leading: const Icon(Icons.menu_book, color: EduLenseColors.info),
                trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                onTap: () {
                  SemanticsService.announce(
                    'Opened topic $topic',
                    Directionality.of(context),
                  );
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Opened: $topic')),
                  );
                },
              ),
            ),
          );
        },
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        elevation: 0,
        actions: [
          FocusTraversalOrder(
            order: const NumericFocusOrder(1),
            child: Semantics(
              button: true,
              label: 'Open settings',
              hint: 'Double tap to open application settings',
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
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.spacingMD),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingLG),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 34,
                    backgroundColor: Theme.of(context).colorScheme.primary,
                    child: const Icon(Icons.person, color: Colors.white, size: 34),
                  ),
                  const Gap(AppConstants.spacingMD),
                  Text(
                    'Student User',
                    style: isDarkMode
                        ? EduLenseDarkTextStyles.h3
                        : EduLenseTextStyles.h3,
                  ),
                  const Gap(AppConstants.spacingSM),
                  Text(
                    'student@edulense.app',
                    style: isDarkMode
                        ? EduLenseDarkTextStyles.bodyMedium
                        : EduLenseTextStyles.bodyMedium,
                  ),
                ],
              ),
            ),
          ),
          const Gap(AppConstants.spacingMD),
          _ProfileActionTile(
            icon: Icons.check_circle_outline,
            title: 'Completed Lessons',
            subtitle: 'View your learning history',
            onTap: () {},
          ),
          const Gap(AppConstants.spacingSM),
          _ProfileActionTile(
            icon: Icons.flag_outlined,
            title: 'Learning Goals',
            subtitle: 'Track your weekly targets',
            onTap: () {},
          ),
          const Gap(AppConstants.spacingSM),
          _ProfileActionTile(
            icon: Icons.logout,
            title: 'Sign Out',
            subtitle: 'Return to the authentication screen',
            onTap: () {
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (_) => const AuthEntryScreen()),
                (route) => false,
              );
            },
          ),
        ],
      ),
    );
  }
}

class _ProfileActionTile extends StatelessWidget {
  const _ProfileActionTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Semantics(
      button: true,
      label: title,
      hint: subtitle,
      child: Card(
        child: ListTile(
          contentPadding: const EdgeInsets.all(AppConstants.spacingMD),
          leading: Icon(icon, color: EduLenseColors.primary),
          title: Text(
            title,
            style: isDarkMode
                ? EduLenseDarkTextStyles.bodyLarge
                : EduLenseTextStyles.bodyLarge,
          ),
          subtitle: Text(
            subtitle,
            style: isDarkMode
                ? EduLenseDarkTextStyles.bodySmall
                : EduLenseTextStyles.bodySmall,
          ),
          trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          onTap: onTap,
        ),
      ),
    );
  }
}
