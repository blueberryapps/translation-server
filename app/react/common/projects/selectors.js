import { createSelector } from 'reselect';

const getMainEntity = state =>
  state.list.map(id => state.entities.projects[id]);

const getLocalesEntity = state =>
  state.entities.locales;

// eslint-disable-next-line import/prefer-default-export
export const getProjectsMerged = createSelector(
  getMainEntity,
  getLocalesEntity,
  (projects, locales) => projects.map(project => ({
    ...project,
    locales: project.locales.map(id => locales[id])
  }))
);

// USAGE: getProjectsMerged(state.projects);
