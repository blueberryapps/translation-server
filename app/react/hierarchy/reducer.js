
import {
  FETCH_HIERARCHY_PENDING,
  FETCH_HIERARCHY_FULFILLED,
} from './actions';

const initialState = {
  hierarchy: {},
  pending: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_HIERARCHY_PENDING:
      return {
        pending: true,
        ...state,
      };

    case FETCH_HIERARCHY_FULFILLED:
      return {
        hierarchy: action.payload,
        pending: false
      };

    default:
      return state;
  }
}
