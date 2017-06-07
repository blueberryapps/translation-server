// @flow
import type { Dependencies, Action } from '../types/generalTypes';

export const FETCH_HIERARCHY = 'FETCH_HIERARCHY';
export const FETCH_HIERARCHY_PENDING = 'FETCH_HIERARCHY_PENDING';
export const FETCH_HIERARCHY_FULFILLED = 'FETCH_HIERARCHY_FULFILLED';

export const SET_BREADCRUMB_PATH = 'SET_BREADCRUMB_PATH';

type FetchHierarchyParams = {
  location: {
    params: {
      localeId: string
    }
  }
}

export function fetchHierarchy({ location: { params: { localeId } } }: FetchHierarchyParams) {
  return ({ interfacer: { hierarchyInterface } }: Dependencies): Action => ({
    type: FETCH_HIERARCHY,
    payload: {
      promise: hierarchyInterface.getCollection({
        error: 'Hierarchy failed to fetch',
        prefix: `locales/${localeId}/keys`,
        flatMethod: data => data.json() // don't transform to CamelCase
      }),
    },
    meta: { localeId },
  });
}

export function setBreadcrumbPath(path: Array<string>) {
  return {
    type: SET_BREADCRUMB_PATH,
    payload: path
  };
}
