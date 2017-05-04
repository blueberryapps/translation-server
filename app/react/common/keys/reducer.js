import { Record, Map, List } from 'immutable';
import { FETCH_KEYS_PENDING, FETCH_KEYS_FULFILLED } from './actions';

const InitialState = new Record({
  lists: new Map({}),
  pending: false,
  entities: new Map({
    translations: new Map(),
    keys: new Map(),
  }),
  pagination: new Map(),
});

export default function reducer(state = new InitialState(), action) {
  switch (action.type) {
    case FETCH_KEYS_PENDING:
      return state.set('pending', true);

    case FETCH_KEYS_FULFILLED:
      return state
        .set('pending', false)
        .set('pagination', action.payload.result.meta.pagination)
        .setIn(['lists', action.meta.edited, action.meta.page], List(action.payload.result.keys))
        .mergeIn(['entities', 'translations'], action.payload.entities.translations)
        .mergeIn(['entities', 'keys'], action.payload.entities.keys);

    default:
      return state;
  }
}
