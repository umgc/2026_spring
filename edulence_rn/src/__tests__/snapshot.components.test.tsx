import { render } from "@testing-library/react-native";
import React from "react";

import { ActionCard } from "../components/ActionCard";
import { InfoChip } from "../components/InfoChip";
import { ScreenHeader } from "../components/ScreenHeader";
import { SectionTitle } from "../components/SectionTitle";
import { SettingSwitchRow } from "../components/SettingSwitchRow";
import { SurfaceCard } from "../components/SurfaceCard";
import { ThemeModeOptionRow } from "../components/ThemeModeOptionRow";
import { AuthEntryScreen } from "../screens/AuthEntryScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

describe("Snapshot coverage", () => {
  it("matches shared component snapshots", () => {
    const action = render(
      <ActionCard label="My Courses" icon="menu-book" onPress={() => {}} />,
    ).toJSON();
    const chip = render(<InfoChip label="WCAG AA" color="#4CAF50" />).toJSON();
    const header = render(
      <ScreenHeader title="EduLense" onPressSettings={() => {}} />,
    ).toJSON();
    const sectionTitle = render(<SectionTitle title="Appearance" />).toJSON();
    const switchRow = render(
      <SettingSwitchRow
        label="Large Text"
        hint="Increases text size"
        value={false}
        onValueChange={() => {}}
      />,
    ).toJSON();
    const surface = render(
      <SurfaceCard>
        <SectionTitle title="Card Content" />
      </SurfaceCard>,
    ).toJSON();
    const themeOption = render(
      <ThemeModeOptionRow
        mode="dark"
        selected
        platformHint="Optimized for VoiceOver"
        onPress={() => {}}
      />,
    ).toJSON();

    expect(action).toMatchSnapshot();
    expect(chip).toMatchSnapshot();
    expect(header).toMatchSnapshot();
    expect(sectionTitle).toMatchSnapshot();
    expect(switchRow).toMatchSnapshot();
    expect(surface).toMatchSnapshot();
    expect(themeOption).toMatchSnapshot();
  });

  it("matches screen snapshots", () => {
    const authScreen = render(<AuthEntryScreen />).toJSON();
    const settingsScreen = render(<SettingsScreen />).toJSON();

    expect(authScreen).toMatchSnapshot();
    expect(settingsScreen).toMatchSnapshot();
  });
});
