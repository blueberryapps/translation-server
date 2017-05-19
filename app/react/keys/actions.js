/* @flow */
import { keySchema } from '../configs/schemas';

import type { ApiAction } from '../types/generalTypes';

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

export function fetchKeys({ params: { localeId }, location: { query: { page, edited } } }: FetchKeysParams): ApiAction {
  return {
    type: 'FETCH_KEYS',
    method: 'getCollection',
    interface: 'keys',
    payload: {
      error: 'Keys failed to fetch',
      query: { page, edited },
      prefix: `locales/${localeId}`,
      schema: { keys: [keySchema] }
    },
    meta: { localeId, page, edited }
  };
}

type FetchHierarchyParams = {
  params: {
    localeId: string
  }
}

export function fetchHierarchy({ params: { localeId } }: FetchHierarchyParams): ApiAction {
  return {
    type: 'FETCH_HIERARCHY',
    method: 'getCollection',
    interface: 'hierarchy',
    payload: {
      error: 'Hierarchy failed to fetch',
      prefix: `locales/${localeId}/keys`,
    },
    meta: { localeId },
  };
}
