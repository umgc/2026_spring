import { isTabletLayout } from "../utils/layout";
import { sanitizeDisplayText } from "../utils/security";

describe("Utility functions", () => {
  it("detects tablet layout by width", () => {
    expect(isTabletLayout(767)).toBe(false);
    expect(isTabletLayout(768)).toBe(true);
  });

  it("sanitizes unsafe display text characters", () => {
    expect(sanitizeDisplayText("<b>Hello</b>")).toBe("bHello/b");
    expect(sanitizeDisplayText("safe text")).toBe("safe text");
  });
});
