import { Map, fromJS } from 'immutable';

import * as actions from './actions';

const initialState = fromJS({
  isVerticalMenuShown: false
});

export default function uiReducer(state = initialState, action) {
  if (!(Map.isMap(state))) return fromJS(state);

  switch (action.type) {
    case actions.UI_CHANGE: {
      const { name, show } = action.payload;

      return state.set(`is${name}Shown`, show);
    }
  }

  return state;
}
