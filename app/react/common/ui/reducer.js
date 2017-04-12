import { Map, fromJS } from 'immutable';

import { TOGGLE_HIERARCHY, RAISE_API_ERROR, HANDLE_API_ERROR } from './actions';

const initialState = fromJS({
  isVerticalMenuShown: false,
  error: null,
});

export default function uiReducer(state = initialState, action) {
  if (!Map.isMap(state)) return fromJS(state);

  switch (action.type) {
    case TOGGLE_HIERARCHY:
      return state.set('isVerticalMenuShown', action.payload);

    case RAISE_API_ERROR:
      return state.set('error', action.payload);

    case HANDLE_API_ERROR:
      return state.set('error', null);

  }

  return state;
}
