export const CHANGE_FIELD = 'CHANGE_FIELD';
export const SAVE_FIELD = 'SAVE_FIELD';
export const SAVE_FIELD_FULFILLED = 'SAVE_FIELD_FULFILLED';
export const SAVE_ALL_FIELDS = 'SAVE_ALL_FIELDS';
export const SAVE_ALL_FIELDS_FULFILLED = 'SAVE_ALL_FIELDS_FULFILLED';
export const INIT_FIELD = 'INIT_FIELD';

export const changeField = (value, { fieldId, page }) => () => ({
  type: CHANGE_FIELD,
  payload: {
    value,
  },
  meta: {
    page,
    fieldId,
  },
});

export const initField = (page, fieldId, field) => () => ({
  type: INIT_FIELD,
  payload: {
    field,
  },
  meta: {
    page,
    fieldId,
  },
});

export const saveField = (text, { fieldId, page }) => ({
  translationsInterface,
}) => ({
  type: SAVE_FIELD,
  payload: {
    promise: translationsInterface.update(fieldId, { text }, {
      error: 'Translation failed to save'
    }),
  },
  meta: {
    page,
    fieldId,
  },
});


const stateToBody = translations => ({
  translations: Object.keys(translations)
    .filter(key => !translations[key].saved)
    .map(key => ({
      text: translations[key].value,
      id: key,
    })),
});

export const saveAllFields = page => ({ getState, translationsInterface }) => ({
  type: SAVE_ALL_FIELDS,
  payload: {
    promise: translationsInterface.update(
      null,
      stateToBody(getState().forms.translations.getIn(['pages', page]).toJS()),
      { error: 'Translations failed to save' },
    ),
  },
  meta: { page }
});
