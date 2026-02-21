import { render } from "@testing-library/react-native";
import React from "react";

import { ActionCard } from "../components/ActionCard";
import { InfoChip } from "../components/InfoChip";
import { AuthEntryScreen } from "../screens/AuthEntryScreen";

describe("Accessibility props", () => {
  it("ActionCard exposes button accessibility props", () => {
    const { getByLabelText } = render(
      <ActionCard label="My Courses" icon="menu-book" onPress={() => {}} />,
    );

    const card = getByLabelText("My Courses");
    expect(card.props.accessibilityRole).toBe("button");
    expect(card.props.accessibilityHint).toBe("Opens My Courses");
  });

  it("InfoChip exposes readable text role", () => {
    const { getByLabelText } = render(
      <InfoChip label="WCAG AA" color="#4CAF50" />,
    );

    const chip = getByLabelText("WCAG AA");
    expect(chip.props.accessibilityRole).toBe("text");
  });

  it("Auth actions expose labels and hints", () => {
    const { getByLabelText } = render(<AuthEntryScreen />);

    expect(getByLabelText("Sign in to EduLense").props.accessibilityRole).toBe(
      "button",
    );
    expect(
      getByLabelText("Create a new EduLense account").props.accessibilityRole,
    ).toBe("button");
  });
});
