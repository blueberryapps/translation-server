// @flow
import { FETCH_PROJECTS_PENDING, FETCH_PROJECTS_FULFILLED } from './actions';

import type { ProjectStore } from '../storeTypes';
import type { Action } from '../../globalTypes';

const initialState: ProjectStore = {
  list: [],
  pending: false
};

export default function reducer(state: ProjectStore = initialState, action: Action<*>) {
  switch (action.type) {
    case FETCH_PROJECTS_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_PROJECTS_FULFILLED:
      return {
        ...state,
        pending: false,
        list: action.payload.projects
      };

    default:
      return state;
  }
}
