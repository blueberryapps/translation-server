export const colors = {
  primary: '#317BBC',
  green: '#3DB683',
  inputBorder: '#d3d3d3',
  inputColor: '#474747',
  lightGrey: '#F0F0F0',
  black: 'black',
  white: 'white'
};

export const breakpoints = {
  infinity: Infinity,
  xl: 1400,
  l: 1190,
  m: 768,
  s: 480,
  xs: 320
};

export const media = {
  xl: `@media screen and (min-width: ${breakpoints.xl}px)`,
  l: `@media screen and (min-width: ${breakpoints.l}px)`,
  m: `@media screen and (min-width: ${breakpoints.m}px)`,
  s: `@media screen and (min-width: ${breakpoints.s}px)`,
  xs: `@media screen and (min-width: ${breakpoints.xs}px)`,
  retina: '@media (-webkit-min-device-pixel-ratio: 2)'
};
