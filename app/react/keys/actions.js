/* @flow */
import { keySchema } from '../configs/schemas';

import type { Dependencies, Action } from '../types/generalTypes';

const FETCH_KEYS = 'FETCH_KEYS';
export const FETCH_KEYS_PENDING = 'FETCH_KEYS_PENDING';
export const FETCH_KEYS_FULFILLED = 'FETCH_KEYS_FULFILLED';

type FetchKeysParams = {
  params: {
    localeId: string
  },
  location: Location & {
    query: {
      page: string,
      edited: string,
      search: string
    }
  }
}

export function fetchKeys({ params: { localeId }, location: { query: { page, edited, search } } }: FetchKeysParams) {
  return ({ keysInterface }: Dependencies): Action => ({
    type: FETCH_KEYS,
    payload: {
      promise: keysInterface.getCollection({
        error: 'Keys failed to fecth',
        query: { page, edited, search },
        prefix: `locales/${localeId}`,
        schema: { keys: [keySchema] }
      })
    },
    meta: { localeId, page, edited, search }
  });
}
