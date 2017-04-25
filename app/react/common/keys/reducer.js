import { Record, Map } from 'immutable';
import { FETCH_KEYS_PENDING, FETCH_KEYS_FULFILLED } from './actions';

const InitialState = Record({
  locales: Map({}),
  pending: false,
  pagination: Map({}),
});

export default function reducer(state = new InitialState(), action) {
  switch (action.type) {
    case FETCH_KEYS_PENDING:
      return state.set('pending', true);
    case FETCH_KEYS_FULFILLED: {
      const pagination = Map(action.payload.meta.pagination);
      return state
        .set('pending', false)
        .setIn(['locales', action.meta.localeId], action.payload.keys)
        .set('pagination', pagination);
    }
    default:
      return state;
  }
}
