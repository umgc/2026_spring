import React from "react";
import { Text } from "react-native";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

function MockIcon({ name }: IconProps): React.JSX.Element {
  return <Text>{name}</Text>;
}

const glyphMap = {
  home: 1,
  search: 1,
  person: 1,
  settings: 1,
  "menu-book": 1,
  assignment: 1,
  "calendar-today": 1,
  "bar-chart": 1,
} as const;

export const MaterialIcons = Object.assign(MockIcon, { glyphMap });

export default MockIcon;
