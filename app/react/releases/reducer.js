import {
  FETCH_NOT_APPROVED_HIERARCHY_PENDING,
  FETCH_NOT_APPROVED_HIERARCHY_FULFILLED,
} from './actions';
import type { Action } from '../types/generalTypes';


const initialState = {
  translations: {},
  hierarchies: {},
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

    default:
      return state;
  }
}
