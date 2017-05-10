export const TOGGLE_HIERARCHY = 'TOGGLE_HIERARCHY';
export const RAISE_API_ERROR = 'RAISE_API_ERROR';
export const HANDLE_API_ERROR = 'HANDLE_API_ERROR';

export function toggleHierarchy(shouldShow) {
  return {
    type: TOGGLE_HIERARCHY,
    payload: shouldShow,
  };
}

export function handleError(dispatch, error) {
  dispatch({
    type: RAISE_API_ERROR,
    payload: error.message,
  });
  setTimeout(
    () =>
      dispatch({
        type: HANDLE_API_ERROR,
      }),
    3000,
  );
}
