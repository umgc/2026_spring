import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { AuthEntryScreen } from "../screens/AuthEntryScreen";
import { useAppStore } from "../store/useAppStore";

describe("Auth screen interactions", () => {
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

  it("allows app entry with invalid sign in by falling back to guest", async () => {
    const { getByLabelText } = render(<AuthEntryScreen />);

    fireEvent.changeText(getByLabelText("Email"), "demo@edulence.app");
    fireEvent.changeText(getByLabelText("Password"), "wrongpass");
    fireEvent.press(getByLabelText("Sign in to EduLense"));

    await waitFor(() => {
      expect(useAppStore.getState().currentUser).not.toBeNull();
    });
  });

  it("signs up a new user from form input", async () => {
    const { getByLabelText } = render(<AuthEntryScreen />);

    fireEvent.changeText(getByLabelText("Name"), "New Student");
    fireEvent.changeText(getByLabelText("Email"), "new@student.com");
    fireEvent.changeText(getByLabelText("Password"), "newpass123");
    fireEvent.press(getByLabelText("Create a new EduLense account"));

    await waitFor(() => {
      expect(useAppStore.getState().currentUser?.email).toBe("new@student.com");
    });
  });
});
