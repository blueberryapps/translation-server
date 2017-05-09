/* @flow */
// eslint-disable-next-line
export const calculatePercents = (amount: number, all: number): number =>
  Math.floor((all > 0) ? (amount / (all * 100)) : 0);
