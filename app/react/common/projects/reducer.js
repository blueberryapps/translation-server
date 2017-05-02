// @flow
import { FETCH_PROJECTS_PENDING, FETCH_PROJECTS_FULFILLED } from './actions';

import type { ProjectStore } from '../storeTypes';
import type { Action } from '../../globalTypes';

const initialState: ProjectStore = {
  list: [],
  pending: false,
  entities: {
    locales: {},
    projects: {}
  }
};

export default function reducer(state: ProjectStore = initialState, action: Action<*>) {
  switch (action.type) {
    case FETCH_PROJECTS_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_PROJECTS_FULFILLED: {
      const { entities, result: { projects } } = action.payload;
      return {
        ...state,
        pending: false,
        list: projects,
        entities: { ...state.entities, ...entities }
      };
    }

    default:
      return state;
  }
}
