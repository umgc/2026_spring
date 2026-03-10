import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { AppNavigator } from "../navigation/AppNavigator";
import { useAppStore } from "../store/useAppStore";

describe("RNTL critical workflows suite", () => {
  beforeEach(() => {
    useAppStore.setState({
      users: [
        {
          name: "Demo Student",
          email: "demo@edulence.app",
          password: "demo1234",
        },
      ],
      currentUser: null,
      authError: null,
    });
  });

  it("signs in, navigates to explore and profile", async () => {
    const { getByLabelText, getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>,
    );

    fireEvent.press(getByLabelText("Sign in to EduLense"));

    await waitFor(() => {
      expect(getByText("Quick Actions")).toBeTruthy();
    });

    fireEvent.press(getByLabelText("Explore tab"));
    await waitFor(() => {
      expect(getByText("Introduction to Flutter")).toBeTruthy();
    });

    fireEvent.press(getByLabelText("Profile tab"));
    await waitFor(() => {
      expect(getByText("Demo Student")).toBeTruthy();
      expect(getByLabelText("Sign out")).toBeTruthy();
    });
  });

  it("opens settings from profile and shows accessibility options", async () => {
    const { getByLabelText, getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>,
    );

    fireEvent.press(getByLabelText("Sign in to EduLense"));
    await waitFor(() => {
      expect(getByText("Quick Actions")).toBeTruthy();
    });

    fireEvent.press(getByLabelText("Profile tab"));
    fireEvent.press(getByLabelText("Open settings"));

    await waitFor(() => {
      expect(getByText("Appearance")).toBeTruthy();
      expect(getByText("Accessibility")).toBeTruthy();
      expect(getByText("Left-Handed Mode")).toBeTruthy();
      expect(getByText("Large Text")).toBeTruthy();
      expect(getByText("High Contrast")).toBeTruthy();
    });
  });
});
