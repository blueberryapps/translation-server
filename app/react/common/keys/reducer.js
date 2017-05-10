/* @flow */
import { Record, Map, List } from 'immutable';
import { FETCH_KEYS_PENDING, FETCH_KEYS_FULFILLED } from './actions';
import type { KeyStateType } from '../types/storeTypes';
import type { Action } from '../types/generalTypes';

const InitialState = Record({
  lists: new Map({}),
  pending: false,
  entities: new Map({
    translations: new Map(),
    keys: new Map(),
  }),
  pagination: new Map(),
});

export default function reducer(state: KeyStateType = new InitialState(), action: Action) {
  switch (action.type) {
    case FETCH_KEYS_PENDING:
      return state.set('pending', true);

    case FETCH_KEYS_FULFILLED:
      return state
        .set('pending', false)
        .set('pagination', action.payload.result.meta.pagination)
        .setIn(['lists', action.meta.localeId, action.meta.edited, action.meta.page], List(action.payload.result.keys))
        .mergeIn(['entities', 'translations'], action.payload.entities.translations)
        .mergeIn(['entities', 'keys'], action.payload.entities.keys);

    default:
      return state;
  }
}
