export const CHANGE_FIELD = 'CHANGE_FIELD';
export const SAVE_FIELD = 'SAVE_FIELD';
export const SAVE_FIELD_FULFILLED = 'SAVE_FIELD_FULFILLED';
export const SAVE_ALL_FIELDS = 'SAVE_ALL_FIELDS';
export const INIT_FIELD = 'INIT_FIELD';

export const changeField = (page, fieldId, value) => () => ({
  type: CHANGE_FIELD,
  payload: {
    page,
    fieldId,
    value
  },
});

export const initField = (page, fieldId, value) => () => ({
  type: INIT_FIELD,
  payload: {
    page,
    fieldId,
    value
  },
});

export const saveField = (page, fieldId, text) => ({ translationsInterface }) => ({
  type: SAVE_FIELD,
  payload: {
    promise: translationsInterface.update(fieldId, { text }),
    page,
    fieldId
  }
});

// export const saveAllFields = (page) => ({
//   type: SAVE_ALL_FIELDS,
//   payload: {
//     promise: translationsInterface.update('', {}, {
//       baseUrl: '/api_frontend/v1/translations'
//     })
//   }
// })
