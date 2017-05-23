
import {
  FETCH_HIERARCHY_PENDING,
  FETCH_HIERARCHY_FULFILLED,
  SET_BREADCRUMB_PATH
} from './actions';

const initialState = {
  breadcrumbPath: [],
  hierarchy: {},
  pending: false
};

export default function reducer(state = initialState, action = {}) {
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
        pending: false
      };

    default:
      return state;
  }
}
