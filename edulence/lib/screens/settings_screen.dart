import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import '../theme/colors.dart';
import '../theme/text_styles.dart';
import '../constants/app_constants.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  late ThemeMode _themeMode;

  @override
  void initState() {
    super.initState();
    // Initialize with system theme
    _themeMode = ThemeMode.system;
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        elevation: 0,
        backgroundColor: isDarkMode
            ? EduLenseColors.darkSurface
            : EduLenseColors.white,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(AppConstants.spacingMD),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Theme Settings Section
              Text(
                'Appearance',
                style: isDarkMode
                    ? EduLenseDarkTextStyles.h3
                    : EduLenseTextStyles.h3,
              ),
              const Gap(AppConstants.spacingMD),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(AppConstants.spacingMD),
                  child: Column(
                    children: [
                      _buildThemeOption(
                        context,
                        title: 'Light Mode',
                        subtitle:
                            'Optimized for daytime use with white backgrounds',
                        icon: Icons.light_mode,
                        onTap: () {
                          setState(() => _themeMode = ThemeMode.light);
                        },
                        isSelected: _themeMode == ThemeMode.light,
                      ),
                      const Divider(height: 24),
                      _buildThemeOption(
                        context,
                        title: 'Dark Mode',
                        subtitle: 'Easier on the eyes in low-light environments',
                        icon: Icons.dark_mode,
                        onTap: () {
                          setState(() => _themeMode = ThemeMode.dark);
                        },
                        isSelected: _themeMode == ThemeMode.dark,
                      ),
                      const Divider(height: 24),
                      _buildThemeOption(
                        context,
                        title: 'System Default',
                        subtitle: 'Follow device theme settings',
                        icon: Icons.brightness_auto,
                        onTap: () {
                          setState(() => _themeMode = ThemeMode.system);
                        },
                        isSelected: _themeMode == ThemeMode.system,
                      ),
                    ],
                  ),
                ),
              ),
              const Gap(AppConstants.spacingLG),

              // Accessibility Section
              Text(
                'Accessibility',
                style: isDarkMode
                    ? EduLenseDarkTextStyles.h3
                    : EduLenseTextStyles.h3,
              ),
              const Gap(AppConstants.spacingMD),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(AppConstants.spacingMD),
                  child: Column(
                    children: [
                      _buildSwitchOption(
                        context,
                        title: 'Left-Handed Mode',
                        subtitle:
                            'Optimize layout for left-handed users with controls on the left',
                        value: true,
                        onChanged: (value) {},
                      ),
                      const Divider(height: 24),
                      _buildSwitchOption(
                        context,
                        title: 'Large Text',
                        subtitle: 'Increase font sizes for better readability',
                        value: false,
                        onChanged: (value) {},
                      ),
                      const Divider(height: 24),
                      _buildSwitchOption(
                        context,
                        title: 'High Contrast',
                        subtitle: 'Use higher contrast colors (WCAG AAA)',
                        value: false,
                        onChanged: (value) {},
                      ),
                    ],
                  ),
                ),
              ),
              const Gap(AppConstants.spacingLG),

              // About Section
              Text(
                'About',
                style: isDarkMode
                    ? EduLenseDarkTextStyles.h3
                    : EduLenseTextStyles.h3,
              ),
              const Gap(AppConstants.spacingMD),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(AppConstants.spacingMD),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'EduLense',
                        style: isDarkMode
                            ? EduLenseDarkTextStyles.bodyLarge
                            : EduLenseTextStyles.bodyLarge,
                      ),
                      const Gap(AppConstants.spacingSM),
                      Text(
                        'Version 1.0.0',
                        style: isDarkMode
                            ? EduLenseDarkTextStyles.bodySmall
                            : EduLenseTextStyles.bodySmall,
                      ),
                      const Gap(AppConstants.spacingMD),
                      Text(
                        'A mobile-first design system optimized for left-handed users in educational productivity.',
                        style: isDarkMode
                            ? EduLenseDarkTextStyles.bodyMedium
                            : EduLenseTextStyles.bodyMedium,
                      ),
                      const Gap(AppConstants.spacingMD),
                      Wrap(
                        spacing: 8,
                        children: [
                          _buildInfoChip(
                            'WCAG AA',
                            EduLenseColors.success,
                          ),
                          _buildInfoChip(
                            'Accessible',
                            EduLenseColors.info,
                          ),
                          _buildInfoChip(
                            'Left-Friendly',
                            EduLenseColors.primary,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const Gap(AppConstants.spacingLG),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildThemeOption(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required VoidCallback onTap,
    required bool isSelected,
  }) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(AppConstants.spacingMD),
            decoration: BoxDecoration(
              color: isSelected
                  ? EduLenseColors.primary.withOpacity(0.1)
                  : (isDarkMode
                      ? EduLenseColors.darkSurface
                      : EduLenseColors.lightGrey),
              borderRadius:
                  BorderRadius.circular(AppConstants.radiusMD),
            ),
            child: Icon(
              icon,
              color: isSelected
                  ? EduLenseColors.primary
                  : EduLenseColors.tertiaryText,
              size: 28,
            ),
          ),
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
          Radio<ThemeMode>(
            value: _themeMode,
            groupValue: _themeMode,
            onChanged: (_) => onTap(),
            fillColor: MaterialStateProperty.all(EduLenseColors.primary),
          ),
        ],
      ),
    );
  }

  Widget _buildSwitchOption(
    BuildContext context, {
    required String title,
    required String subtitle,
    required bool value,
    required Function(bool) onChanged,
  }) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Row(
      children: [
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
        Switch(
          value: value,
          onChanged: onChanged,
          activeColor: EduLenseColors.primary,
        ),
      ],
    );
  }

  Widget _buildInfoChip(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.spacingMD,
        vertical: AppConstants.spacingSM,
      ),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(AppConstants.radiusLG),
        border: Border.all(color: color),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
