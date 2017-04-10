// @flow
import { List, Record } from 'immutable';
import { FETCH_PROJECTS_PENDING, FETCH_PROJECTS_FULFILLED } from './actions';

const InitialState = Record({
  list: List([]),
  pending: false,
});

export default function reducer(state = new InitialState(), action = {}) {
  switch (action.type) {
    case FETCH_PROJECTS_PENDING:
      return state.set('pending', true);
    case FETCH_PROJECTS_FULFILLED:
      return state.set('pending', false).set('list', List(action.payload.projects));

    default:
      return state;
  }
}
