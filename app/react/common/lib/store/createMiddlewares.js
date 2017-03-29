import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { applyMiddleware, compose } from 'redux';

import createActionWatcherMiddleware from './createActionWatcherMiddleware';
import createStoreDependencyInjections from './createDependencyInjections';
import injectDependencies from './injectDependencies';

export default function createMiddlewares({ actionWatchers, initialState, definedPlatformMiddleware = [] }) {
  const actionDependencyInjection = createStoreDependencyInjections({ initialState });

  const middlewares = [
    ...definedPlatformMiddleware,
    createActionWatcherMiddleware(actionDependencyInjection, actionWatchers),
    injectDependencies(actionDependencyInjection),
    promiseMiddleware
  ];

  // Enable logger
  const enableLogger =
    process.env.DEVTOOLS &&
    !process.env.IS_TEST &&
    (process.env.IS_BROWSER || process.env.IS_REACT_NATIVE);

  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    // Logger must be the last middleware in chain.
    middlewares.push(logger);
  }

  const enableDevToolsExtension =
    process.env.DEVTOOLS &&
    !process.env.IS_TEST &&
    process.env.IS_BROWSER &&
    window.devToolsExtension;

  const appliedMiddlewares = applyMiddleware(...middlewares);

  return enableDevToolsExtension
    ? compose(appliedMiddlewares, window.devToolsExtension())
    : appliedMiddlewares;
}
