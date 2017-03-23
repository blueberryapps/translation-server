export default function dispatchAndThrow(dispatch) {
  return (action, error) => {
    dispatch(action);
    throw error;
  };
}
