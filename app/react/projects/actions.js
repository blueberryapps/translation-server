/* @flow */
import { projectSchema } from '../configs/schemas';
import type { Action } from '../types/generalTypes';

export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED';
export const FILTER_PROJECTS = 'FILTER_PROJECTS';

export function fetchProjects(): Function {
  return ({ projectsInterface }): Action => ({
    type: 'FETCH_PROJECTS',
    payload: {
      promise: projectsInterface.getCollection({
        error: 'Projects failed to fetch',
        schema: { projects: [projectSchema] }
      }),
    },
  });
}

export function filterProjects(filterValue: string): Object {
  return ({
    type: FILTER_PROJECTS,
    payload: {
      filterValue,
    },
  });
}
