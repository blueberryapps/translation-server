/* @flow */
import type { Action } from '../../globalTypes';
import { projectSchema } from '../schemas';

export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED';

type Payload = {
  promise: Promise<Object>
};

export function fetchProjects(): Function {
  return ({ projectsInterface }): Action<Payload> => ({
    type: 'FETCH_PROJECTS',
    payload: {
      promise: projectsInterface.getCollection({
        error: 'Projects failed to fetch',
        schema: { projects: [projectSchema] }
      }),
    },
  });
}
