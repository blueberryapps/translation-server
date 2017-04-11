import dispatchPromise from '../dispatchPromise';

it('returns function', () => {
  expect(typeof dispatchPromise()).toEqual('function');
});

it('returns result of the promise when there\'s no error', async () => {
  const actionResult = {
    payload: 'whatever'
  };

  const action = {
    payload: {
      promise: Promise.resolve(actionResult)
    }
  };

  const result = await dispatchPromise(i => i)(action);
  expect(result).toEqual(actionResult);
});

it('throws error when there\'s an error', async () => {
  const actionResult = {
    payload: new Error('an error'),
    error: true
  };

  const action = {
    payload: {
      promise: Promise.resolve(actionResult)
    }
  };

  expect(dispatchPromise(i => i)(action)).toThrow();
});
