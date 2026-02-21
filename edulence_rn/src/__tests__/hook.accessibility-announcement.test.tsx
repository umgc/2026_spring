import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { AccessibilityInfo, Platform, Pressable, Text } from "react-native";

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
  it("announces using the platform prefix", () => {
    const spy = jest
      .spyOn(AccessibilityInfo, "announceForAccessibility")
      .mockImplementation(jest.fn());

    const { getByLabelText } = render(<TestHarness />);
    fireEvent.press(getByLabelText("announce"));

    const expectedPrefix = Platform.OS === "ios" ? "VoiceOver" : "TalkBack";
    expect(spy).toHaveBeenCalledWith(`${expectedPrefix}: Theme changed`);
  });
});
