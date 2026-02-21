import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { AppNavigator } from "../navigation/AppNavigator";
import { useAppStore } from "../store/useAppStore";

describe("Navigation flows", () => {
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

  it("moves from auth to home after sign in", async () => {
    const { getByLabelText, getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>,
    );

    fireEvent.press(getByLabelText("Sign in to EduLense"));

    await waitFor(() => {
      expect(getByText("Quick Actions")).toBeTruthy();
    });
  });

  it("signs out from profile and returns to auth", async () => {
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

    await waitFor(() => {
      expect(getByLabelText("Sign out")).toBeTruthy();
    });

    fireEvent.press(getByLabelText("Sign out"));

    await waitFor(() => {
      expect(getByText("Welcome to EduLense")).toBeTruthy();
    });
  });
});
