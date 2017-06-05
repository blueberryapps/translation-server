import {
  TOGGLE_FIELD
} from './actions';

import type { Action } from '../../types/generalTypes';

export default function reducer(state = {}, action: Action) {
  switch (action.type) {
    case TOGGLE_FIELD: {
      const { meta: { localeId, projectId }, payload: { ids } } = action;
      const oldKeySet = state.releases[projectId][localeId];
      const newKeySet = (oldKeySet.indexOf(id) > -1)
        ? oldKeySet.filter(key => key !== id)
        : [...oldKeySet, id];

      return {
        ...state,
        [projectId]: {
          ...state[projectId],
          [localeId]: newKeySet
        }
      };
    }
    default: return state;
  }
}
