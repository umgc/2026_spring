import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { AccessibilityInfo, Pressable, Text } from "react-native";

import { useAccessibilityAnnouncement } from "../hooks/useAccessibilityAnnouncement";

function TestHarness(): React.JSX.Element {
  const { announce } = useAccessibilityAnnouncement();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="announce"
      onPress={() => {
        announce("Theme changed");
      }}
    >
      <Text>Announce</Text>
    </Pressable>
  );
}

describe("useAccessibilityAnnouncement", () => {
  it("announces clear messages without platform-prefixed noise", () => {
    const spy = jest
      .spyOn(AccessibilityInfo, "announceForAccessibility")
      .mockImplementation(jest.fn());

    const { getByLabelText } = render(<TestHarness />);
    fireEvent.press(getByLabelText("announce"));

    expect(spy).toHaveBeenCalledWith("Theme changed");
  });
});
