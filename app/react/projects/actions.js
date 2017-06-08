/* @flow */
import { projectSchema } from '../configs/schemas';
import type { Action } from '../types/generalTypes';

export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED';

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
