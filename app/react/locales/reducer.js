/* @flow */
import { Record, Map, List } from 'immutable';
import { FETCH_LOCALE_PENDING, FETCH_LOCALE_FULFILLED } from './actions';
import type { LocaleStateType } from '../types/storeTypes';
import type { Action } from '../types/generalTypes';

const InitialState = Record({
  pending: false,
  list: List(),
  entities: new Map({
    locales: new Map()
  })
});

export default function reducer(state: LocaleStateType = new InitialState(), action: Action): LocaleStateType {
  switch (action.type) {
    case FETCH_LOCALE_PENDING:
      return state.set('pending', true);

    case FETCH_LOCALE_FULFILLED:
      return state
        .set('pending', false)
        .update('list', list => list.push(action.payload.result.locale))
        .mergeIn(['entities', 'locales'], action.payload.entities.locales);

    default:
      return state;
  }
}
