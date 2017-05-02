import { FETCH_KEYS_PENDING, FETCH_KEYS_FULFILLED } from './actions';

const initialState = {
  list: [],
  pending: false,
  entities: {
    translations: {}
  },
  pagination: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_KEYS_PENDING:
      return { ...state, pending: true };

    case FETCH_KEYS_FULFILLED:
      return {
        ...state,
        list: [
          ...state.list,
          ...action.payload.result.keys
        ],
        pending: false,
        entities: {
          translations: {
            ...state.entities.translations,
            ...action.payload.entities.translations
          },
          keys: {
            ...state.entities.keys,
            ...action.payload.entities.keys
          }
        },
        pagination: action.payload.result.meta.pagination
      };

    default:
      return state;
  }
}
