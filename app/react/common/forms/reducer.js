import { Record, Map } from 'immutable';
import {
  CHANGE_FIELD,
  SAVE_FIELD_FULFILLED,
  SAVE_ALL_FIELDS,
  INIT_FIELD,
} from './actions';

const InitialState = new Record({
  translations: new Map({
    pages: new Map(),
  }),
});

export default function reducer(state = new InitialState(), action) {
  switch (action.type) {
    case CHANGE_FIELD: {
      const { payload: { page, value, fieldId } } = action;

      return state.setIn(
        ['translations', 'pages', page, fieldId],
        new Map({
          value,
          saved: false,
        }),
      );
    }

    case INIT_FIELD: {
      const { payload: { page, value, fieldId } } = action;

      return state.setIn(
        ['translations', 'pages', page, fieldId],
        new Map({
          value,
          saved: true,
        }),
      );
    }

    case SAVE_FIELD_FULFILLED: {
      const { payload: { page, fieldId } } = action;
      return state.setIn(
        ['translations', 'pages', page, fieldId, 'saved'],
        true,
      );
    }

    case SAVE_ALL_FIELDS: {
      const { payload: { page } } = action;
      const pagePath = ['translations', 'pages', page];
      const fields = state.getIn(pagePath);
      return state.setIn(
        pagePath,
        fields.mapEntries(field => field.set('saved', true)),
      );
    }
    default:
      return state;
  }
}
