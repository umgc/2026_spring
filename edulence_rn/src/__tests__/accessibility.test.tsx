import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { ActionCard } from "../components/ActionCard";
import { InfoChip } from "../components/InfoChip";
import { AuthEntryScreen } from "../screens/AuthEntryScreen";

describe("Accessibility props", () => {
  it("ActionCard exposes button semantics and remains enabled", () => {
    const { getByLabelText } = render(
      <ActionCard label="My Courses" icon="menu-book" onPress={() => {}} />,
    );

    const card = getByLabelText("My Courses");
    expect(card.props.accessibilityRole).toBe("button");
    expect(card.props.accessibilityHint).toBe("Opens My Courses");
    expect(card).toBeEnabled();
  });

  it("InfoChip exposes readable text role", () => {
    const { getByLabelText } = render(
      <InfoChip label="WCAG AA" color="#4CAF50" />,
    );

    const chip = getByLabelText("WCAG AA");
    expect(chip.props.accessibilityRole).toBe("text");
    expect(chip).toHaveTextContent("WCAG AA");
  });

  it("Auth actions expose labels, hints, and can be activated", () => {
    const { getByLabelText } = render(<AuthEntryScreen />);

    const signIn = getByLabelText("Sign in to EduLense");
    const signUp = getByLabelText("Create a new EduLense account");

    expect(signIn.props.accessibilityRole).toBe("button");
    expect(signUp.props.accessibilityRole).toBe("button");
    expect(signIn).toBeEnabled();
    expect(signUp).toBeEnabled();

    fireEvent.press(signIn);
    fireEvent.press(signUp);
  });
});
