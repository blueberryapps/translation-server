import { createSelector } from 'reselect';

const getMainEntity = state =>
  state.get('list').map(id =>
    state.getIn(['entities', 'locales', `${id}`]));

// eslint-disable-next-line import/prefer-default-export
export const getLocalesMerged = createSelector(
  getMainEntity,
  locales => locales
);

// USAGE: getLocalesMerged(state.locales);
