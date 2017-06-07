import CamelCase from 'camelcase-keys';

import type { StateType } from '../types/storeTypes';
import type { Dependencies, Action } from '../types/generalTypes';

export const FETCH_NOT_APPROVED_HIERARCHY = 'FETCH_NOT_APPROVED_HIERARCHY';
export const FETCH_NOT_APPROVED_HIERARCHY_PENDING = 'FETCH_NOT_APPROVED_HIERARCHY_PENDING';
export const FETCH_NOT_APPROVED_HIERARCHY_FULFILLED = 'FETCH_NOT_APPROVED_HIERARCHY_FULFILLED';

export const CREATE_RELEASE = 'CREATE_RELEASE';
export const CREATE_RELEASE_PENDING = 'CREATE_RELEASE_PENDING';
export const CREATE_RELEASE_FULFILLED = 'CREATE_RELEASE_FULFILLED';

export const TOGGLE_APPROVE_KEY = 'TOGGLE_APPROVE_KEY';


const flatMethod = res => res.json().then(data => ({
  translations: CamelCase(data.translations, { deep: true }),
  hierarchy: data.hierarchy
}));

const getIds = (state: StateType, { localeId, projectId }: Object): Array<string> => {
  const releaseObject = state.forms.releases[projectId][localeId];
  const translationsObject = state.releases.translations[projectId][localeId];
  const keys = Object.keys(releaseObject)
    .filter(key => releaseObject[key]);

  return Object.keys(translationsObject)
    .map(key => translationsObject[key])
    .filter(translation =>
      keys.indexOf(translation.key) > -1)
    .map(t => t.id);
};

/* Network actions */
export function fetchPrerelease({ params }) {
  return ({ genericInterface }: Dependencies): Action => ({
    type: FETCH_NOT_APPROVED_HIERARCHY,
    payload: {
      promise: genericInterface.getCollection({
        error: 'Not approved keys failed to fetch',
        prefix: `projects/${params.projectId}/locale/${params.localeId}/not_approved`,
        flatMethod
      }),
    },
    meta: params,
  });
}

export function createRelease(params) {
  return ({ releasesInterface, getState }: Dependencies): Action => ({
    type: CREATE_RELEASE,
    payload: {
      promise: releasesInterface.create({
        release: { localeId: +params.localeId },
        translationIds: getIds(getState(), params)
      }, {
        error: 'Release failed to create due to network error.',
        prefix: `projects/${params.projectId}/`
      })
    }
  });
}
