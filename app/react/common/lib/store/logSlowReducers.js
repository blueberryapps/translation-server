export default function logSlowReducers(reducers, thresholdInMs = 8) {
  return Object.keys(reducers).reduce((acc, name) => {
    const originalReducer = reducers[name];

    return { ...acc, [name]: (state, action) => {
      const start = Date.now();
      const result = originalReducer(state, action);
      const diffInMs = Date.now() - start;

      if (diffInMs >= thresholdInMs) {
        console.warn(`Reducer "${name}" took ${diffInMs}ms for ${action.type}`); // eslint-disable-line no-console
      }

      return result;
    } };
  }, {});
}
