export const FETCH_KEYS_PENDING = 'FETCH_KEYS_PENDING';
export const FETCH_KEYS_FULFILLED = 'FETCH_KEYS_FULFILLED';

export function fetchKeys({ params: { localeId }, location: { query: { page } } }) {
  return ({ keysInterface }) => ({
    type: 'FETCH_KEYS',
    payload: {
      promise: keysInterface.getCollection({
        error: 'Keys failed to fecth',
        query: { page },
        prefix: `locales/${localeId}`,
      }),
    },
    meta: { localeId, page },
  });
}

export function fetchHierarchy({ params: { localeId } }) {
  return ({ hierarchyInterface }) => ({
    type: 'FETCH_HIERARCHY',
    payload: {
      promise: hierarchyInterface.getCollection({
        error: 'Hierarchy failed to fecth',
        prefix: `locales/${localeId}/keys`,
      }),
    },
    meta: { localeId },
  });
}
