/* @flow */
import { Record, Map, List } from 'immutable';
import { FETCH_PROJECTS_PENDING, FETCH_PROJECTS_FULFILLED } from './actions';
import type { Action } from '../types/generalTypes';
import type { ProjectStateType } from '../types/storeTypes';

const InitialState = Record({
  list: List(),
  pending: false,
  entities: new Map({
    locales: new Map(),
    projects: new Map()
  })
});

export default function reducer(state: ProjectStateType = new InitialState(), action: Action) {
  switch (action.type) {
    case FETCH_PROJECTS_PENDING:
      return state.set('pending', true);

    case FETCH_PROJECTS_FULFILLED: {
      const { entities, result: { projects } } = action.payload;
      return state
        .set('pending', true)
        .set('list', List(Object.values(projects)))
        .mergeIn(['entities'], entities);
    }

    default:
      return state;
  }
}
