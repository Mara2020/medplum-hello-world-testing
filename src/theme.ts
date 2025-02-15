import {
  createTheme,
  DEFAULT_THEME,
  MantineColorsTuple,
  mergeMantineTheme,
} from '@mantine/core';

const primary: MantineColorsTuple = [
  "#fff0e2",
  "#ffe0cc",
  "#ffc09a",
  "#ff9d64",
  "#fe8037",
  "#fe6e1a",
  "#ff6409",
  "#e45300",
  "#cb4800",
  "#b13c00"
];

export const orangeTheme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.33,
  primaryColor: 'primary',
  primaryShade: 5,
  colors: {
    primary
  },
  headings: {
    sizes: {
      h1: {
        fontSize: '1.125rem',
        fontWeight: '500',
        lineHeight: '2.0',
      },
    },
  },
  fontSizes: {
    xs: '0.6875rem',
    sm: '0.875rem',
    md: '0.875rem',
    lg: '1.0rem',
    xl: '1.125rem',
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, orangeTheme);
