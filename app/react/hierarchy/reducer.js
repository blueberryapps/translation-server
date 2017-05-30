// @flow
import {
  FETCH_HIERARCHY_PENDING,
  FETCH_HIERARCHY_FULFILLED,
  SWITCH_CURRENT_HIERARCHY,
  SET_BREADCRUMB_PATH
} from './actions';

import type { HierarchyStateType } from '../types/storeTypes';
import type { Action } from '../types/generalTypes';

const initialState = {
  breadcrumbPath: [],
  hierarchy: {},
  currentHierarchy: {},
  pending: false
};

export default function reducer(state: HierarchyStateType = initialState, action: Action = {}): HierarchyStateType {
  switch (action.type) {
    case SET_BREADCRUMB_PATH:
      return {
        ...state,
        breadcrumbPath: action.payload
      };
    case FETCH_HIERARCHY_PENDING:
      return {
        ...state,
        pending: true,
      };

    case FETCH_HIERARCHY_FULFILLED:
      return {
        ...state,
        hierarchy: action.payload,
        currentHierarchy: action.payload,
        pending: false
      };

    case SWITCH_CURRENT_HIERARCHY:
      return state;

    default:
      return state;
  }
}
