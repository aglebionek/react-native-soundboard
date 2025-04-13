import type { Theme } from "@react-navigation/native";

const highlightPinkLight = '#C33593';
const highlightPinkDark = '#802363';
const backgroundBlueStart = '#2B2746';
const backgroundBlueMiddle = '#221D40';
const backgroundBlueEnd = '#05040C';
const highlightGold = '#F4C45D';

const tempColors = {
  text: '#cdcdcd',
  background: backgroundBlueStart,
  tint: highlightPinkLight,
  icon: '#9BA1A6',
  tabIconDefault: highlightPinkLight,
  tabIconSelected: highlightGold,
  highlightPinkDark,
}

export const Colors = {
  light: tempColors,
  dark: tempColors,
};

export const MainThemeColorsDark: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(37, 41, 46)', // primary color for your app, usually your brand color.
    background: 'transparent', // app background color
    card: 'transparent', // app top and bottom bar backgroud color
    text: 'rgb(229, 229, 231)', // app topbar title color
    border: 'rgb(39, 39, 41)', // border color
    notification: 'rgb(255, 69, 58)', // notification color
  },
};

export const COLORS = {
  light: {

  },
  dark: {

  }
}
