import {
  FETCH_NOT_APPROVED_HIERARCHY_PENDING,
  FETCH_NOT_APPROVED_HIERARCHY_FULFILLED,
  TOGGLE_APPROVE_KEY
} from './actions';
import type { Action } from '../types/generalTypes';


const initialState = {
  translations: {},
  hierarchies: {},
  releases: {},
  pending: false
};

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case FETCH_NOT_APPROVED_HIERARCHY_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_NOT_APPROVED_HIERARCHY_FULFILLED: {
      const { meta: { localeId, projectId }, payload: { hierarchy, translations } } = action;
      return {
        ...state,
        translations: {
          ...state.translations,
          [projectId]: {
            ...state.translations[projectId],
            [localeId]: translations
          }
        },
        hierarchies: {
          ...state.hierarchies,
          [projectId]: {
            ...state.hierarchies[projectId],
            [localeId]: hierarchy
          }
        },
        pending: false
      };
    }
    case TOGGLE_APPROVE_KEY: {
      const { meta: { localeId, projectId }, payload: { keyId } } = action;
      const oldKeySet = state.releases[projectId][localeId];
      const newKeySet = (oldKeySet.indexOf(keyId) > -1)
        ? oldKeySet.filter(key => key !== keyId)
        : [...oldKeySet, keyId];

      return {
        ...state,
        releases: {
          ...state.releases,
          [projectId]: {
            ...state.releases[projectId],
            [localeId]: newKeySet
          }
        }
      };
    }

    default:
      return state;
  }
}
