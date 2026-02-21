import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { SettingSwitchRow } from "../components/SettingSwitchRow";
import { ThemeModeOptionRow } from "../components/ThemeModeOptionRow";
import { ExploreScreen } from "../screens/ExploreScreen";
import { useAppStore } from "../store/useAppStore";

describe("RNTL accessibility matcher coverage", () => {
  beforeEach(() => {
    useAppStore.setState({
      leftHandedMode: true,
      largeText: false,
      highContrast: false,
      themeMode: "system",
      currentUser: null,
      authError: null,
    });
  });

  it("exposes switch checked state and toggles via accessibility-friendly control", () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <SettingSwitchRow
        label="Large Text"
        hint="Increases text size"
        value
        onValueChange={onValueChange}
      />,
    );

    const row = getByRole("switch", { name: "Large Text" });

    expect(row).toHaveAccessibilityState({ checked: true });

    fireEvent.press(row);
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it("exposes selected radio state for theme options", () => {
    const { getByLabelText } = render(
      <ThemeModeOptionRow
        mode="dark"
        selected
        platformHint="Optimized for VoiceOver"
        onPress={() => {}}
      />,
    );

    expect(
      getByLabelText("Dark Mode. Easier on the eyes in low-light environments"),
    ).toHaveAccessibilityState({ selected: true });
  });

  it("updates selected state on explore course cards", () => {
    const { getByLabelText } = render(<ExploreScreen />);

    const card = getByLabelText("Introduction to Flutter. Mobile Development");
    expect(card).toHaveAccessibilityState({ selected: false });

    fireEvent.press(card);

    expect(card).toHaveAccessibilityState({ selected: true });
  });
});
