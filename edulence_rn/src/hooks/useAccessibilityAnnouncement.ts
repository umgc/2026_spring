import { AccessibilityInfo, Platform } from "react-native";

export function useAccessibilityAnnouncement() {
  const announce = (message: string): void => {
    const platformPrefix = Platform.OS === "ios" ? "VoiceOver" : "TalkBack";
    AccessibilityInfo.announceForAccessibility(`${platformPrefix}: ${message}`);
  };

  return { announce };
}
