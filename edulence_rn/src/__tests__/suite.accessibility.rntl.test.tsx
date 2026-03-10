import { render } from "@testing-library/react-native";
import React from "react";

import { AuthEntryScreen } from "../screens/AuthEntryScreen";

describe("RNTL accessibility suite", () => {
  it("exposes labeled controls for auth flow", () => {
    const { getByLabelText, getByText } = render(<AuthEntryScreen />);

    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByLabelText("Name")).toBeTruthy();
    expect(getByLabelText("Email")).toBeTruthy();
    expect(getByLabelText("Password")).toBeTruthy();
    expect(getByLabelText("Sign in to EduLense")).toBeTruthy();
    expect(getByLabelText("Create a new EduLense account")).toBeTruthy();
  });

  it("keeps minimum touch target styling for key controls", () => {
    const { getByLabelText } = render(<AuthEntryScreen />);

    expect(getByLabelText("Email")).toHaveStyle({ minHeight: 44 });
    expect(getByLabelText("Password")).toHaveStyle({ minHeight: 44 });
    expect(getByLabelText("Sign in to EduLense")).toHaveStyle({ minHeight: 44 });
    expect(getByLabelText("Create a new EduLense account")).toHaveStyle({ minHeight: 44 });
  });
});
