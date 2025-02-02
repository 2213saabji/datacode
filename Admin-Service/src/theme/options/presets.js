import { alpha } from '@mui/material/styles';

import { grey, primary } from '../palette';

// ----------------------------------------------------------------------

export function createPresets(preset) {
  const primaryColor = getPrimary(preset);

  const theme = {
    palette: {
      primary: primaryColor,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primaryColor?.main}`, 0.24)}`,
    },
  };

  return {
    ...theme,
  };
}

// ----------------------------------------------------------------------

const cyan = {
  lighter: '#CCF4FE',
  light: '#68CDF9',
  main: '#078DEE',
  dark: '#0351AB',
  darker: '#012972',
  contrastText: '#FFFFFF',
};

const purple = {
  lighter: '#EBD6FD',
  light: '#B985F4',
  main: '#7635dc',
  dark: '#431A9E',
  darker: '#200A69',
  contrastText: '#FFFFFF',
};

const blue = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#FFFFFF',
};

const orange = {
  lighter: '#FEF4D4',
  light: '#FED680',
  main: '#fda92d',
  dark: '#B66816',
  darker: '#793908',
  contrastText: grey[800],
};

const red = {
  lighter: '#FFE3D5',
  light: '#FFC1AC',
  main: '#FF3030',
  dark: '#B71833',
  darker: '#7A0930',
  contrastText: '#FFFFFF',
};

// const pink = {
//   lighter: '#FCE4EC',
//   light: '#F8BBD0',
//   main: '#EC407A',
//   dark: '#C2185B',
//   darker: '#880E4F',
//   contrastText: '#FFFFFF',
// };

// const teal = {
//   lighter: '#BED7DC',
//   light: '#B692C2',
//   main: '#E3A5C7',
//   dark: '#AD88C6',
//   darker: '#7469B6',
//   contrastText: '#FFFFFF',
// };

// const violet = {
//   lighter: '#FFE6E6',
//   light: '#E1AFD1',
//   main: '#AD88C6',
//   dark: '#7469B6',
//   darker: '#7FA1C3',
//   contrastText: '#FFFFFF',
// };

// const green = {
//   lighter: '#F1F1F1',
//   light: '#B5C18E',
//   main: '#9EB8D9',
//   dark: '#7C93C3',
//   darker: '#8B93FF',
//   contrastText: '#FFFFFF',
// };

// const brown = {
//   lighter: '#A25772',
//   light: '#FFE6E6',
//   main: '#E1AFD1',
//   dark: '#AD88C6',
//   darker: '#7469B6',
//   contrastText: '#FFFFFF',
// };

const purpleMain = {
  main: '#615EFC',
};

const blueLight = {
  main: '#7E8EF1',
};

const greenLighter = {
  main: '#D1D8C5',
};

const blueDark = {
  main: '#7D8ABC',
};

const violetDarker = {
  main: '#7FA1C3',
};

const blueDarker = {
  main: '#6482AD',
};

const tealMain = {
  main: '#E3A5C7',
};

const tealLight = {
  main: '#B692C2',
};

const tealLighter = {
  main: '#BED7DC',
};

const violetDark = {
  main: '#7469B6',
};

const violetMain = {
  main: '#AD88C6',
};

const violetLight = {
  main: '#E1AFD1',
};

const redLighter = {
  main: '#FFE6E6',
};

const greenLight = {
  main: '#B5C18E',
};

const greenLighterAlt = {
  main: '#F1F1F1',
};

const blueMainAlt = {
  main: '#8B93FF',
};

const redLighterAlt = {
  main: '#FFE6E6',
};

const pinkLighterAlt = {
  main: '#E1AFD1',
};

const violetMainAlt = {
  main: '#AD88C6',
};

const violetDarkerAlt = {
  main: '#7469B6',
};

const greenMain = {
  main: '#9EB8D9',
};

const blueDarkAlt = {
  main: '#7C93C3',
};

const brownMain = {
  main: '#A25772',
};

export const presetOptions = [
  { name: 'default', value: primary.main },
  { name: 'cyan', value: cyan.main },
  { name: 'purple', value: purple.main },
  { name: 'blue', value: blue.main },
  { name: 'orange', value: orange.main },
  { name: 'red', value: red.main },
  // { name: 'green', value: green.main },
  // { name: 'pink', value: pink.main },
  // { name: 'teal', value: teal.main },
  // { name: 'brown', value: brown.main },
  // { name: 'violet', value: violet.main },
  { name: 'purpleMain', value: purpleMain.main },
  { name: 'blueLight', value: blueLight.main },
  { name: 'greenLighter', value: greenLighter.main },
  { name: 'blueDark', value: blueDark.main },
  { name: 'violetDarker', value: violetDarker.main },
  { name: 'blueDarker', value: blueDarker.main },
  { name: 'tealMain', value: tealMain.main },
  { name: 'tealLight', value: tealLight.main },
  { name: 'tealLighter', value: tealLighter.main },
  { name: 'violetDark', value: violetDark.main },
  { name: 'violetMain', value: violetMain.main },
  { name: 'violetLight', value: violetLight.main },
  { name: 'redLighter', value: redLighter.main },
  { name: 'greenLight', value: greenLight.main },
  { name: 'greenLighterAlt', value: greenLighterAlt.main },
  { name: 'blueMainAlt', value: blueMainAlt.main },
  { name: 'redLighterAlt', value: redLighterAlt.main },
  { name: 'pinkLighterAlt', value: pinkLighterAlt.main },
  { name: 'violetMainAlt', value: violetMainAlt.main },
  { name: 'violetDarkerAlt', value: violetDarkerAlt.main },
  { name: 'greenMain', value: greenMain.main },
  { name: 'blueDarkAlt', value: blueDarkAlt.main },
  { name: 'brownMain', value: brownMain.main },
];

export function getPrimary(preset) {
  return {
    default: primary,
    cyan,
    purple,
    blue,
    orange,
    red,
    // green,
    // pink,
    // teal,
    // brown,
    // violet,
    purpleMain,
    blueLight,
    greenLighter,
    blueDark,
    violetDarker,
    blueDarker,
    tealMain,
    tealLight,
    tealLighter,
    violetDark,
    violetMain,
    violetLight,
    redLighter,
    greenLight,
    greenLighterAlt,
    blueMainAlt,
    redLighterAlt,
    pinkLighterAlt,
    violetMainAlt,
    violetDarkerAlt,
    greenMain,
    blueDarkAlt,
    brownMain,
  }[preset];
}
