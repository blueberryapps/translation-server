import { createSelector } from 'reselect';

const getMainEntity = state =>
  state.list.map(id => state.entities.keys[id]);

const getTranslationsEntity = state =>
  state.entities.translations;

// eslint-disable-next-line import/prefer-default-export
export const getProjectsMerged = createSelector(
  getMainEntity,
  getTranslationsEntity,
  (keys, translations) => keys.map(key => ({
    ...key,
    locales: key.translations.map(id => translations[id])
  }))
);

// USAGE: getProjectsMerged(state.projects);
