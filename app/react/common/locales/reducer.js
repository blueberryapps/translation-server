import { FETCH_LOCALE_PENDING, FETCH_LOCALE_FULFILLED } from './actions';

const initialState = {
  pending: false,
  list: [],
  entities: {
    locales: {}
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCALE_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_LOCALE_FULFILLED:
      return {
        pending: false,
        list: [
          ...state.list,
          action.payload.result.locale
        ],
        entities: {
          ...state.entities,
          locales: {
            ...state.entities.locales,
            ...action.payload.entities.locales
          }
        }
      };

    default:
      return state;
  }
}
