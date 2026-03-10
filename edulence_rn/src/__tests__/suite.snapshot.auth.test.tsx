import { render } from "@testing-library/react-native";
import React from "react";

import { AuthEntryScreen } from "../screens/AuthEntryScreen";

describe("Suite snapshots", () => {
  it("matches auth entry screen snapshot", () => {
    const { toJSON } = render(<AuthEntryScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
