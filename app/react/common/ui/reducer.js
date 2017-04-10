import { Map, fromJS } from 'immutable';

import * as actions from './actions';

const initialState = fromJS({
  isVerticalMenuShown: false,
  error: null,
});

export default function uiReducer(state = initialState, action) {
  if (!Map.isMap(state)) return fromJS(state);

  switch (action.type) {
    case actions.UI_CHANGE: {
      const { name, show } = action.payload;

      return state.set(`is${name}Shown`, show);
    }
    case actions.RAISE_API_ERROR:
      return state.set('error', action.payload);

    case actions.HANDLE_API_ERROR:
      return state.set('error', null);

  }

  return state;
}
