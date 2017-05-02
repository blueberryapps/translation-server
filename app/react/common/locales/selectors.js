import { createSelector } from 'reselect';

const getMainEntity = state =>
  state.list.map(id => state.entities.locales[id]);

// eslint-disable-next-line import/prefer-default-export
export const getLocalesMerged = createSelector(
  getMainEntity,
  locales => locales
);

// USAGE: getLocalesMerged(state.locales);
