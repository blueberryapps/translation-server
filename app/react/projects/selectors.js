import { createSelector } from 'reselect';

const getMainEntity = state =>
  state.get('list').map(id => state.getIn(['entities', 'projects', `${id}`]));


const getLocalesEntity = state =>
  state.getIn(['entities', 'locales']);

// eslint-disable-next-line import/prefer-default-export
export const getProjectsMerged = createSelector(
  getMainEntity,
  getLocalesEntity,
  (projects, allLocales) => projects.map(project =>
      project.update('locales', locales =>
        locales.map(localeId => allLocales.get(`${localeId}`))))
);

// USAGE: getProjectsMerged(state.projects);
