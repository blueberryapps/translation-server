export const UI_CHANGE = 'UI_CHANGE';
export const RAISE_API_ERROR = 'RAISE_API_ERROR';
export const HANDLE_API_ERROR = 'HANDLE_API_ERROR';

export function change(name, show) {
  return {
    type: UI_CHANGE,
    payload: {
      name,
      show,
    },
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
