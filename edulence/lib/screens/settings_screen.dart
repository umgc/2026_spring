import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:provider/provider.dart';

import '../constants/app_constants.dart';
import '../main.dart';
import '../theme/colors.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _leftHandedMode = true;
  bool _largeText = false;
  bool _highContrast = false;

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final textTheme = Theme.of(context).textTheme;
    final themeProvider = context.watch<ThemeProvider>();

    return FocusTraversalGroup(
      policy: OrderedTraversalPolicy(),
      child: Scaffold(
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
                Text('Appearance', style: textTheme.headlineSmall),
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
                          optionValue: ThemeMode.light,
                          selectedTheme: themeProvider.themeMode,
                        ),
                        const Divider(height: 24),
                        _buildThemeOption(
                          context,
                          title: 'Dark Mode',
                          subtitle:
                              'Easier on the eyes in low-light environments',
                          icon: Icons.dark_mode,
                          optionValue: ThemeMode.dark,
                          selectedTheme: themeProvider.themeMode,
                        ),
                        const Divider(height: 24),
                        _buildThemeOption(
                          context,
                          title: 'System Default',
                          subtitle: 'Follow device theme settings',
                          icon: Icons.brightness_auto,
                          optionValue: ThemeMode.system,
                          selectedTheme: themeProvider.themeMode,
                        ),
                      ],
                    ),
                  ),
                ),
                const Gap(AppConstants.spacingLG),
                Text('Accessibility', style: textTheme.headlineSmall),
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
                          value: _leftHandedMode,
                          onChanged: (value) {
                            setState(() => _leftHandedMode = value);
                          },
                        ),
                        const Divider(height: 24),
                        _buildSwitchOption(
                          context,
                          title: 'Large Text',
                          subtitle:
                              'Increase font sizes for better readability',
                          value: _largeText,
                          onChanged: (value) {
                            setState(() => _largeText = value);
                          },
                        ),
                        const Divider(height: 24),
                        _buildSwitchOption(
                          context,
                          title: 'High Contrast',
                          subtitle: 'Use higher contrast colors (WCAG AAA)',
                          value: _highContrast,
                          onChanged: (value) {
                            setState(() => _highContrast = value);
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                const Gap(AppConstants.spacingLG),
                Text('About', style: textTheme.headlineSmall),
                const Gap(AppConstants.spacingMD),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(AppConstants.spacingMD),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(AppConstants.appName, style: textTheme.bodyLarge),
                        const Gap(AppConstants.spacingSM),
                        Text(
                          'Version ${AppConstants.appVersion}',
                          style: textTheme.bodySmall,
                        ),
                        const Gap(AppConstants.spacingMD),
                        Text(
                          AppConstants.appDescription,
                          style: textTheme.bodyMedium,
                        ),
                        const Gap(AppConstants.spacingMD),
                        Wrap(
                          spacing: 8,
                          children: [
                            _buildInfoChip('WCAG AA', EduLenseColors.success),
                            _buildInfoChip('Accessible', EduLenseColors.info),
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
      ),
    );
  }

  Widget _buildThemeOption(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required ThemeMode optionValue,
    required ThemeMode selectedTheme,
  }) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final textTheme = Theme.of(context).textTheme;
    final isSelected = selectedTheme == optionValue;

    return MergeSemantics(
      child: Semantics(
        button: true,
        selected: isSelected,
        label: '$title. $subtitle',
        child: ListTile(
          contentPadding: EdgeInsets.zero,
          onTap: () => context.read<ThemeProvider>().setThemeMode(optionValue),
          leading: Container(
            padding: const EdgeInsets.all(AppConstants.spacingMD),
            decoration: BoxDecoration(
              color: isSelected
                  ? EduLenseColors.primary.withOpacity(0.1)
                  : (isDarkMode
                        ? EduLenseColors.darkSurface
                        : EduLenseColors.lightGrey),
              borderRadius: BorderRadius.circular(AppConstants.radiusMD),
            ),
            child: Icon(
              icon,
              color: isSelected
                  ? EduLenseColors.primary
                  : EduLenseColors.tertiaryText,
              size: 28,
            ),
          ),
          title: Text(title, style: textTheme.bodyLarge),
          subtitle: Text(subtitle, style: textTheme.bodySmall),
          trailing: Icon(
            isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
            color: isSelected
                ? EduLenseColors.primary
                : EduLenseColors.tertiaryText,
          ),
        ),
      ),
    );
  }

  Widget _buildSwitchOption(
    BuildContext context, {
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    final textTheme = Theme.of(context).textTheme;

    return MergeSemantics(
      child: SwitchListTile(
        value: value,
        onChanged: onChanged,
        activeThumbColor: EduLenseColors.primary,
        title: Text(title, style: textTheme.bodyLarge),
        subtitle: Text(subtitle, style: textTheme.bodySmall),
        contentPadding: EdgeInsets.zero,
      ),
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
