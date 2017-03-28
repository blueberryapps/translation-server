import { Record } from 'immutable';

import * as actions from './actions';

export const InitialState = Record({
  isMobile: false,
  platform: '',
  type: 'desktop',
  unsupported: false,
  compatibilityNotificationClosed: false,
  userAgent: null,
  userAgentString: null,
  host: ''
});
const initialState = new InitialState();

export default function deviceReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {

    case actions.SET_PLATFORM: {
      const { platform } = action.payload;
      return state.set('platform', platform);
    }

    case actions.DEVICE_COMPATIBILITY_NOTIFICATION_CLOSE:
      return state.set('compatibilityNotificationClosed', true);

  }

  return state;
}
