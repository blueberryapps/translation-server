import { Record, Map } from 'immutable';
import { FETCH_LOCALE_PENDING, FETCH_LOCALE_FULFILLED } from './actions';

const InitialState = new Record({
  pending: false,
  list: new Map({}),
});

export default function reducer(state = new InitialState(), action) {
  switch (action.type) {
    case FETCH_LOCALE_PENDING:
      return state.set('pending', true);

    case FETCH_LOCALE_FULFILLED:
      return state
        .set('pending', false)
        .setIn(['list', action.meta.localeId], action.payload.locale);

    default:
      return state;
  }
}
