import { fromJS } from 'immutable';

export default function createActionWatcherMiddleware(dependencies, actionWatchers) {
  const watcherFns = fromJS(actionWatchers)
    .flatten()
    .valueSeq()
    .filter(v => typeof v === 'function')
    .toArray();
  const flattenDeps = fromJS(dependencies)
    .flatten(true)
    .toJS();

  return function actionWatcherMiddleware({ dispatch, getState }) {
    return next => (action) => {
      watcherFns.forEach(watcher => watcher({ ...flattenDeps, dispatch, action, getState }));
      return next(action);
    };
  };
}
