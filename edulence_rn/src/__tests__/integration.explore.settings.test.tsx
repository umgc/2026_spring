import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { AccessibilityInfo, Switch } from "react-native";

import { ExploreScreen } from "../screens/ExploreScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useAppStore } from "../store/useAppStore";

describe("Explore and Settings integration", () => {
  beforeEach(() => {
    useAppStore.setState({
      themeMode: "system",
      leftHandedMode: true,
      largeText: false,
      highContrast: false,
      currentUser: null,
      authError: null,
    });
    jest.restoreAllMocks();
  });

  it("filters explore courses and shows selected course details", () => {
    const { getByLabelText, getByText, queryByText } = render(
      <ExploreScreen />,
    );

    fireEvent.changeText(getByLabelText("Search courses"), "Data");

    expect(getByText("Data Structures Essentials")).toBeTruthy();
    expect(queryByText("Introduction to Flutter")).toBeNull();

    fireEvent.press(
      getByLabelText("Data Structures Essentials. Computer Science"),
    );

    expect(getByText("Selected: Data Structures Essentials")).toBeTruthy();
  });

  it("updates theme and accessibility preferences from settings controls", () => {
    const announceSpy = jest
      .spyOn(AccessibilityInfo, "announceForAccessibility")
      .mockImplementation(jest.fn());

    const { getByLabelText, UNSAFE_getAllByType } = render(<SettingsScreen />);

    fireEvent.press(
      getByLabelText("Dark Mode. Easier on the eyes in low-light environments"),
    );

    const switches = UNSAFE_getAllByType(Switch);
    fireEvent(switches[0], "valueChange", false);
    fireEvent(switches[1], "valueChange", true);
    fireEvent(switches[2], "valueChange", true);

    const state = useAppStore.getState();
    expect(state.themeMode).toBe("dark");
    expect(state.leftHandedMode).toBe(false);
    expect(state.largeText).toBe(true);
    expect(state.highContrast).toBe(true);
    expect(announceSpy).toHaveBeenCalled();
  });
});
