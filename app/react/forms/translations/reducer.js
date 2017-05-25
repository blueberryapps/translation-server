import { Record, Map } from 'immutable';
import {
  CHANGE_FIELD,
  SAVE_FIELD_FULFILLED,
  SAVE_ALL_FIELDS_FULFILLED,
  INIT_FIELD,
} from './actions';

const InitialState = new Record({
  pages: new Map(),
});

export default function reducer(state = new InitialState(), action) {
  switch (action.type) {
    case CHANGE_FIELD: {
      const { payload: { value }, meta: { page, fieldId } } = action;

      return state.setIn(
        ['pages', page, fieldId],
        new Map({
          value,
          saved: false,
        }),
      );
    }

    case INIT_FIELD: {
      const { meta: { page, fieldId }, payload: { field } } = action;

      return state.setIn(['pages', page, fieldId], new Map(field));
    }

    case SAVE_FIELD_FULFILLED: {
      const { meta: { page, fieldId } } = action;
      return state.setIn(
        ['pages', page, fieldId, 'saved'],
        true,
      );
    }

    case SAVE_ALL_FIELDS_FULFILLED: {
      const { meta: { page } } = action;
      const pagePath = ['pages', page];
      const fields = state.getIn(pagePath);

      return state.setIn(
        pagePath,
        fields.mapEntries(([key, field]) => [key, field.set('saved', true)]),
      );
    }
    default:
      return state;
  }
}
