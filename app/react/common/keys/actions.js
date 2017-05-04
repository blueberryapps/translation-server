import { keySchema } from '../schemas';

const FETCH_KEYS = 'FETCH_KEYS';
export const FETCH_KEYS_PENDING = 'FETCH_KEYS_PENDING';
export const FETCH_KEYS_FULFILLED = 'FETCH_KEYS_FULFILLED';

export function fetchKeys({ params: { localeId }, location: { query: { page, edited } } }) {
  return ({ keysInterface }) => ({
    type: FETCH_KEYS,
    payload: {
      promise: keysInterface.getCollection({
        error: 'Keys failed to fecth',
        query: { page, edited },
        prefix: `locales/${localeId}`,
        schema: { keys: [keySchema] }
      })
    },
    meta: { localeId, page, edited }
  });
}

export function fetchHierarchy({ params: { localeId } }) {
  return ({ hierarchyInterface }) => ({
    type: 'FETCH_HIERARCHY',
    payload: {
      promise: hierarchyInterface.getCollection({
        error: 'Hierarchy failed to fetch',
        prefix: `locales/${localeId}/keys`,
      }),
    },
    meta: { localeId },
  });
}
