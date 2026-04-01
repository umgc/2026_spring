import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:gap/gap.dart';
import 'package:provider/provider.dart';
import '../main.dart';
import '../theme/colors.dart';
import '../theme/text_styles.dart';
import '../constants/app_constants.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final preferences = context.watch<ThemeProvider>();
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final size = MediaQuery.of(context).size;
    final isMobile = size.width < 600;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        elevation: 0,
        backgroundColor: isDarkMode
            ? EduLenseColors.darkSurface
            : EduLenseColors.white,
        leading: Semantics(
          button: true,
          label: 'Back',
          hint: 'Return to previous screen',
          child: IconButton(
            tooltip: 'Back',
            icon: const Icon(Icons.arrow_back),
            onPressed: () => Navigator.pop(context),
          ),
        ),
      ),
      body: SafeArea(
        child: Align(
          alignment: Alignment.topCenter,
          child: ConstrainedBox(
            constraints: BoxConstraints(
              maxWidth: isMobile ? double.infinity : 880,
            ),
            child: SingleChildScrollView(
              padding: EdgeInsets.all(
                isMobile ? AppConstants.spacingSM : AppConstants.spacingMD,
              ),
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
                          FocusTraversalOrder(
                            order: const NumericFocusOrder(1),
                            child: _buildThemeOption(
                              context,
                              title: 'Light Mode',
                              subtitle:
                                  'Optimized for daytime use with white backgrounds',
                              icon: Icons.light_mode,
                              selected:
                                  preferences.themeMode == ThemeMode.light,
                              optionValue: ThemeMode.light,
                              onSelected: () =>
                                  preferences.setThemeMode(ThemeMode.light),
                            ),
                          ),
                          const Divider(height: 24),
                          FocusTraversalOrder(
                            order: const NumericFocusOrder(2),
                            child: _buildThemeOption(
                              context,
                              title: 'Dark Mode',
                              subtitle:
                                  'Easier on the eyes in low-light environments',
                              icon: Icons.dark_mode,
                              selected: preferences.themeMode == ThemeMode.dark,
                              optionValue: ThemeMode.dark,
                              onSelected: () =>
                                  preferences.setThemeMode(ThemeMode.dark),
                            ),
                          ),
                          const Divider(height: 24),
                          FocusTraversalOrder(
                            order: const NumericFocusOrder(3),
                            child: _buildThemeOption(
                              context,
                              title: 'System Default',
                              subtitle: 'Follow device theme settings',
                              icon: Icons.brightness_auto,
                              selected:
                                  preferences.themeMode == ThemeMode.system,
                              optionValue: ThemeMode.system,
                              onSelected: () =>
                                  preferences.setThemeMode(ThemeMode.system),
                            ),
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
                          FocusTraversalOrder(
                            order: const NumericFocusOrder(4),
                            child: _buildSwitchOption(
                              context,
                              title: 'Left-Handed Mode',
                              subtitle:
                                  'Optimize layout for left-handed users with controls on the left',
                              value: preferences.leftHandedMode,
                              onChanged: (value) {
                                preferences.setLeftHandedMode(value);
                                SemanticsService.announce(
                                  value
                                      ? 'Left-handed mode enabled'
                                      : 'Left-handed mode disabled',
                                  Directionality.of(context),
                                );
                              },
                            ),
                          ),
                          const Divider(height: 24),
                          FocusTraversalOrder(
                            order: const NumericFocusOrder(5),
                            child: _buildSwitchOption(
                              context,
                              title: 'Large Text',
                              subtitle:
                                  'Increase font sizes for better readability',
                              value: preferences.largeText,
                              onChanged: (value) {
                                preferences.setLargeText(value);
                                SemanticsService.announce(
                                  value
                                      ? 'Large text enabled'
                                      : 'Large text disabled',
                                  Directionality.of(context),
                                );
                              },
                            ),
                          ),
                          const Divider(height: 24),
                          FocusTraversalOrder(
                            order: const NumericFocusOrder(6),
                            child: _buildSwitchOption(
                              context,
                              title: 'High Contrast',
                              subtitle: 'Use higher contrast colors (WCAG AAA)',
                              value: preferences.highContrast,
                              onChanged: (value) {
                                preferences.setHighContrast(value);
                                SemanticsService.announce(
                                  value
                                      ? 'High contrast enabled'
                                      : 'High contrast disabled',
                                  Directionality.of(context),
                                );
                              },
                            ),
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
      ),
    );
  }

  Widget _buildThemeOption(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required bool selected,
    required ThemeMode optionValue,
    required VoidCallback onSelected,
  }) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return MergeSemantics(
      child: Semantics(
        button: true,
        selected: selected,
        label: '$title. $subtitle',
        child: ListTile(
          contentPadding: EdgeInsets.zero,
          onTap: () {
            onSelected();
            SemanticsService.announce(
              '$title selected',
              Directionality.of(context),
            );
          },
          leading: Container(
            padding: const EdgeInsets.all(AppConstants.spacingMD),
            decoration: BoxDecoration(
              color: selected
                  ? EduLenseColors.primary.withOpacity(0.1)
                  : (isDarkMode
                        ? EduLenseColors.darkSurface
                        : EduLenseColors.lightGrey),
              borderRadius: BorderRadius.circular(AppConstants.radiusMD),
            ),
            child: Icon(
              icon,
              color: selected
                  ? EduLenseColors.primary
                  : EduLenseColors.tertiaryText,
              size: 28,
            ),
          ),
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
          trailing: Icon(
            selected ? Icons.check_circle : Icons.radio_button_unchecked,
            color: selected
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
    required Function(bool) onChanged,
  }) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return MergeSemantics(
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () => onChanged(!value),
          child: SwitchListTile(
            value: value,
            onChanged: onChanged,
            activeThumbColor: EduLenseColors.primary,
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
            contentPadding: const EdgeInsets.symmetric(
              horizontal: AppConstants.spacingSM,
              vertical: AppConstants.spacingSM,
            ),
            minTileHeight: 72,
          ),
        ),
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
