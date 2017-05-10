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
  location: {
    query: {
      page: string,
      edited: string
    }
  }
}

export function fetchKeys({ params: { localeId }, location: { query: { page, edited } } }: FetchKeysParams) {
  return ({ keysInterface }: Dependencies): Action => ({
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

type FetchHierarchyParams = {
  params: {
    localeId: string
  }
}

export function fetchHierarchy({ params: { localeId } }: FetchHierarchyParams) {
  return ({ hierarchyInterface }: Dependencies): Action => ({
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
