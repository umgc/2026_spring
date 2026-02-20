import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import '../theme/colors.dart';
import '../theme/text_styles.dart';
import '../constants/app_constants.dart';

/// Custom Card Widget that matches the EduLense design system
class EduLenseCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;
  final double elevation;
  final BorderRadius borderRadius;

  const EduLenseCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(AppConstants.spacingMD),
    this.onTap,
    this.elevation = 2,
    this.borderRadius = const BorderRadius.all(
      Radius.circular(AppConstants.radiusLG),
    ),
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: elevation,
      shape: RoundedRectangleBorder(borderRadius: borderRadius),
      child: InkWell(
        onTap: onTap,
        borderRadius: borderRadius,
        child: Padding(padding: padding, child: child),
      ),
    );
  }
}

/// Section Header Widget for organizing content
class SectionHeader extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget? action;

  const SectionHeader({
    super.key,
    required this.title,
    this.subtitle,
    this.action,
  });

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                title,
                style: isDarkMode
                    ? EduLenseDarkTextStyles.h3
                    : EduLenseTextStyles.h3,
              ),
            ),
            if (action != null) action!,
          ],
        ),
        if (subtitle != null) ...[
          const Gap(AppConstants.spacingSM),
          Text(
            subtitle!,
            style: isDarkMode
                ? EduLenseDarkTextStyles.bodySmall
                : EduLenseTextStyles.bodySmall,
          ),
        ],
      ],
    );
  }
}

/// Badge Widget for displaying tags or status
class EduLenseBadge extends StatelessWidget {
  final String label;
  final Color backgroundColor;
  final Color textColor;
  final EdgeInsetsGeometry padding;

  const EduLenseBadge({
    super.key,
    required this.label,
    this.backgroundColor = EduLenseColors.primary,
    this.textColor = Colors.white,
    this.padding = const EdgeInsets.symmetric(
      horizontal: AppConstants.spacingMD,
      vertical: AppConstants.spacingSM,
    ),
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: backgroundColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(AppConstants.radiusLG),
        border: Border.all(color: backgroundColor),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: backgroundColor,
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

/// Empty State Widget for displaying when no content is available
class EmptyStateWidget extends StatelessWidget {
  final IconData icon;
  final String title;
  final String description;
  final Widget? action;

  const EmptyStateWidget({
    super.key,
    required this.icon,
    required this.title,
    required this.description,
    this.action,
  });

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingLG),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 64, color: EduLenseColors.tertiaryText),
            const Gap(AppConstants.spacingLG),
            Text(
              title,
              style: isDarkMode
                  ? EduLenseDarkTextStyles.h3
                  : EduLenseTextStyles.h3,
              textAlign: TextAlign.center,
            ),
            const Gap(AppConstants.spacingMD),
            Text(
              description,
              style: isDarkMode
                  ? EduLenseDarkTextStyles.bodyMedium
                  : EduLenseTextStyles.bodyMedium,
              textAlign: TextAlign.center,
            ),
            if (action != null) ...[const Gap(AppConstants.spacingLG), action!],
          ],
        ),
      ),
    );
  }
}
