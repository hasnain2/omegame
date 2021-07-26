import color from 'color';
import {DefaultTheme} from 'react-native-paper';

const AppTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    primary: '#0049ff',
    accent: '#0049ff',
    lightBlue: '#02aaff',
    background: '#1b1b1b',
    white: '#ffffff',
    green: '#0fff27',
    yellow: '#ffd949',
    red: '#ff1a4a',
    surface: 'black',
    error: '#B00020',
    text: 'white',
    darkGrey: '#1C1C22',
    lightGrey: '#808080',
    onBackground: '#000000',
    transparent: 'rgba(0,0,0,0)',
    gradientA: '#014eff',
    gradientB: '#02edff',
    onSurface: '#000000',
    disabled: color('lightgrey').alpha(0.26).rgb().string(),
    placeholder: color('lightgrey').alpha(0.54).rgb().string(),
    backdrop: color('black').alpha(0.5).rgb().string(),
    notification: 'pink',
    divider: '#333333',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  animation: {
    scale: 1.0,
  },
};

export {AppTheme};
