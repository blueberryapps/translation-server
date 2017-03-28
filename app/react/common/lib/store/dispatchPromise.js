function throwAfterPromiseAction(result) {
  if (result.error) { throw result.payload; }
  return result;
}

export default function dispatchPromise(dispatch) {
  return action =>
    dispatch(action).payload.promise.then(throwAfterPromiseAction);
}
