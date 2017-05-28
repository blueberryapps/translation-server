// @flow
import { localeSchema } from '../configs/schemas';

import type { Dependencies, Action } from '../types/generalTypes';

export const FETCH_LOCALE_PENDING = 'FETCH_LOCALE_PENDING';
export const FETCH_LOCALE_FULFILLED = 'FETCH_LOCALE_FULFILLED';

type FetchParams = {
  params: {
    localeId: number
  },
  location: Location & {
    query: {
      page: string
    }
  }
}

export const fetchLocale = ({ params: { localeId }, location: { query: { page } } }: FetchParams) =>
  ({ localesInterface }: Dependencies): Action => ({
    type: 'FETCH_LOCALE',
    payload: {
      promise: localesInterface.get(localeId, {
        error: 'Locale information failed to fetch',
        query: { page },
        schema: { locale: localeSchema }
      }),
    },
    meta: { localeId },
  });
