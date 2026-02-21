import { colors } from "../theme/colors";
import { contrastRatio } from "../utils/contrast";

describe("Color contrast", () => {
  it("meets WCAG AA for normal text combinations", () => {
    expect(
      contrastRatio(colors.textPrimary, colors.surface),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(colors.textSecondary, colors.surface),
    ).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#FFFFFF", colors.primary)).toBeGreaterThanOrEqual(
      4.5,
    );
  });
});
