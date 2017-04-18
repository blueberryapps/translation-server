export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED';

export function fetchProjects() {
  return ({ projectsInterface }) => ({
    type: 'FETCH_PROJECTS',
    payload: {
      promise: projectsInterface.getCollection({
        error: 'Projects failed to fetch',
      }),
    },
  });
}
