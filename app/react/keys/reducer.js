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

    case FETCH_KEYS_FULFILLED: {
      const {
        meta: { edited, search = '', localeId, page },
        payload: { result: { meta, keys }, entities }
      } = action;

      return state
        .set('pending', false)
        .set('pagination', meta.pagination)
        .setIn(['lists', localeId, edited, search, page], List(keys))
        .mergeIn(['entities', 'translations'], entities.translations)
        .mergeIn(['entities', 'keys'], entities.keys);
    }


    default:
      return state;
  }
}
