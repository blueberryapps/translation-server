import type { Dependencies, Action } from '../types/generalTypes';

export const FETCH_HIERARCHY = 'FETCH_HIERARCHY';
export const FETCH_HIERARCHY_PENDING = 'FETCH_HIERARCHY_PENDING';
export const FETCH_HIERARCHY_FULFILLED = 'FETCH_HIERARCHY_FULFILLED';

type FetchHierarchyParams = {
  params: {
    localeId: string
  }
}

export function fetchHierarchy({ location: { params: { localeId } } }: FetchHierarchyParams) {
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
