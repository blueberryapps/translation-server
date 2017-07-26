import { Record, Map } from 'immutable';
import {
  CHANGE_TRANSLATION_FIELD,
  SAVE_TRANSLATION_FIELD_FULFILLED,
  SAVE_ALL_TRANSLATION_FIELDS_FULFILLED,
  INIT_TRANSLATION_FIELD,
} from './actions';

const InitialState = new Record({
  pages: new Map(),
  unsavedCount: 0,
});

export default function reducer(state = new InitialState(), action) {
  switch (action.type) {
    case CHANGE_TRANSLATION_FIELD: {
      const { payload: { value }, meta: { page, fieldId } } = action;
      const fieldPath = ['pages', page, fieldId];

      return state.setIn(
        fieldPath,
        new Map({
          value,
          saved: false,
        }),
      )
        .set(
          'unsavedCount',
          state.getIn([...fieldPath, 'saved']) === true ? state.unsavedCount + 1 : state.unsavedCount
        );
    }

    case INIT_TRANSLATION_FIELD: {
      const { meta: { page, fieldId }, payload: { field } } = action;

      return state.setIn(['pages', page, fieldId], new Map(field));
    }

    case SAVE_TRANSLATION_FIELD_FULFILLED: {
      const { meta: { page, fieldId } } = action;
      return state.setIn(
        ['pages', page, fieldId, 'saved'],
        true,
      )
      .set('unsavedCount', state.unsavedCount - 1);
    }

    case SAVE_ALL_TRANSLATION_FIELDS_FULFILLED: {
      const { meta: { page } } = action;
      const pagePath = ['pages', page];
      const fields = state.getIn(pagePath);

      return state.setIn(
        pagePath,
        fields.mapEntries(([key, field]) => [key, field.set('saved', true)]),
      )
      .set('unsavedCount', 0);
    }
    default:
      return state;
  }
}
