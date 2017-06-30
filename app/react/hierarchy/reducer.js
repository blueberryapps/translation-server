// @flow
import {
  FETCH_HIERARCHY_PENDING,
  FETCH_HIERARCHY_FULFILLED,
  SET_BREADCRUMB_PATH
} from './actions';

import type { HierarchyStateType } from '../types/storeTypes';
import type { Action } from '../types/generalTypes';

const initialState = {
  breadcrumbPath: [],
  hierarchy: [],
  pending: false
};

const maxLevel = 10;

const transformHierarchy = (structure: Object, level: number = 0): Array<Object> => {
  if (level > maxLevel) {
    // eslint-disable-next-line no-console
    console.warn('Provided hierarchy object was to deep. Either provide different object or increase "maxLevel" variable');
    return [];
  }
  return Object.keys(structure)
    .map(key => ({
      level,
      label: key,
      childrenKeys: transformHierarchy(structure[key], level + 1)
    }));
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
        hierarchy: transformHierarchy(action.payload),
        currentHierarchy: action.payload,
        pending: false
      };

    default:
      return state;
  }
}
