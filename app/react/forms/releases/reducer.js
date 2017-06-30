import {
  TOGGLE_RELEASE_FIELD,
  INIT_RELEASE_FIELD
} from './actions';

import type { Action } from '../../types/generalTypes';

export default function reducer(state = {}, action: Action) {
  switch (action.type) {
    case INIT_RELEASE_FIELD: {
      const { payload: { key }, meta: { projectId, localeId } } = action;
      const otherKeys = state[projectId]
        ? state[projectId][localeId] : {};
      return {
        ...state,
        [projectId]: {
          ...state[projectId],
          [localeId]: {
            ...otherKeys,
            [key]: false
          }
        }
      };
    }
    case TOGGLE_RELEASE_FIELD: {
      const { payload: { key }, meta: { projectId, localeId } } = action;
      return {
        ...state,
        [projectId]: {
          ...state[projectId],
          [localeId]: {
            ...state[projectId][localeId],
            [key]: !state[projectId][localeId][key]
          }
        }
      };
    }
    default: return state;
  }
}
