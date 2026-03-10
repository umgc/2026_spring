import { colors } from "../theme/colors";
import { contrastRatio } from "../utils/contrast";

describe("Color contrast", () => {
  it("meets WCAG AA for normal text combinations (>= 4.5:1)", () => {
    expect(
      contrastRatio(colors.textPrimary, colors.surface),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(colors.textSecondary, colors.surface),
    ).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#FFFFFF", colors.primary)).toBeGreaterThanOrEqual(
      4.5,
    );
    expect(
      contrastRatio(colors.darkTextPrimary, colors.darkSurface),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(colors.darkTextSecondary, colors.darkSurface),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("meets WCAG large text threshold for tertiary text (>= 3:1)", () => {
    expect(
      contrastRatio(colors.textTertiary, colors.surface),
    ).toBeGreaterThanOrEqual(3.0);
  });
});
