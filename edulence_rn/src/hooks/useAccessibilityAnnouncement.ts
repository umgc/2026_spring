import type { RefObject } from "react";
import { AccessibilityInfo, findNodeHandle } from "react-native";

export function useAccessibilityAnnouncement() {
  const announce = (message: string): void => {
    AccessibilityInfo.announceForAccessibility(message);
  };

  const focusRef = (ref: RefObject<any>): void => {
    const handle = findNodeHandle(ref.current);
    if (handle != null) {
      AccessibilityInfo.setAccessibilityFocus(handle);
    }
  };

  return { announce, focusRef };
}
