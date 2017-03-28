import test from 'ava';
import Promise from 'bluebird';

import dispatchPromise from '../dispatchPromise';

test('returns function', (t) => {
  t.is(typeof dispatchPromise(), 'function');
});

test('returns result of the promise when there\'s no error', async (t) => {
  const actionResult = {
    payload: 'whatever'
  };
  const action = {
    payload: {
      promise: Promise.resolve(actionResult)
    }
  };
  const result = await dispatchPromise(i => i)(action);
  t.deepEqual(result, actionResult);
});

test('throws error when there\'s an error', async (t) => {
  const actionResult = {
    payload: new Error('an error'),
    error: true
  };
  const action = {
    payload: {
      promise: Promise.resolve(actionResult)
    }
  };

  t.throws(dispatchPromise(i => i)(action));
});
