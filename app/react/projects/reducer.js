/* @flow-weak */
import { Record, Map, List } from 'immutable';
import fuzzy from 'fuzzy';
import { FETCH_PROJECTS_PENDING, FETCH_PROJECTS_FULFILLED, FILTER_PROJECTS } from './actions';
import type { Action } from '../types/generalTypes';
import type { ProjectStateType } from '../types/storeTypes';
import { getProjectsMerged } from './selectors';

const InitialState = Record({
  list: List(),
  pending: false,
  merged: [],
  entities: new Map({
    locales: new Map(),
    projects: new Map(),
  }),
  fiteredProjects: [],
  filterValue: '',
});

const filterProjects = (value, merged) => fuzzy.filter(value, merged, { extract: el => (el.name) });

export default function reducer(state: ProjectStateType = new InitialState(), action: Action) {
  switch (action.type) {
    case FETCH_PROJECTS_PENDING:
      return state.set('pending', true);

    case FETCH_PROJECTS_FULFILLED: {
      const { entities, result: { projects } } = action.payload;
      const nextState = state
        .set('pending', true)
        .set('list', List(Object.values(projects)))
        .mergeIn(['entities'], entities);
      const merged = getProjectsMerged(nextState).toJS();
      return nextState
        .set('merged', merged)
        .set('fiteredProjects', filterProjects(state.filterValue, merged));
    }

    case FILTER_PROJECTS: {
      const { filterValue } = action.payload;
      return state.set('filterValue', filterValue)
        .set('fiteredProjects', filterProjects(filterValue, state.merged));
    }

    default:
      return state;
  }
}
