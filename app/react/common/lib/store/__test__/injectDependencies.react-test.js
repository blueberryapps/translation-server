import injectDependencies from '../injectDependencies';

it('returns function', () => {
  expect(typeof injectDependencies({})).toEqual('function');
});

it('returns function', () => {
  expect(typeof injectDependencies({})({})).toEqual('function');
});

it('returns function', () => {
  expect(typeof injectDependencies({})({})()).toEqual('function');
});

it('tests action is not a function', () => {
  const action = 'action';
  const next = jest.fn().mockReturnValue('whatever');
  const dispatch = jest.fn();
  const getState = jest.fn();

  expect(injectDependencies({})({ dispatch, getState })(next)(action)).toEqual('whatever');
  expect(next).toBeCalledWith(action);
  expect(dispatch.mock.calls.length).toBe(0);
  expect(getState.mock.calls.length).toBe(0);
});

it('tests action is a function', () => {
  const action = jest.fn().mockReturnValue('action');
  const next = jest.fn();
  const dispatch = jest.fn().mockReturnValue('whatever');
  const getState = jest.fn();

  expect(injectDependencies({})({ dispatch, getState })(next)(action)).toEqual('whatever');
  expect(next.mock.calls.length).toBe(0);
  expect(dispatch).toBeCalledWith('action');
  expect(action).toBeCalledWith({ dispatch, getState });
});

it('tests dependecies resolution: statics', () => {
  const action = jest.fn();
  const next = jest.fn();
  const dispatch = jest.fn();
  const getState = jest.fn();

  const staticA = () => {};
  const staticB = () => {};

  injectDependencies({ statics: { staticA, staticB } })({ dispatch, getState })(next)(action);

  expect(action).toBeCalledWith({ staticA, staticB, dispatch, getState });
});

it('tests dependencies resolution: dynamics', () => {
  const action = jest.fn();
  const next = jest.fn();
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue('whatever');

  const dynamicA = jest.fn().mockReturnValue('a');
  const dynamicB = jest.fn().mockReturnValue('b');

  injectDependencies({ dynamic: { dynamicA, dynamicB } })({ dispatch, getState })(next)(action);

  expect(action).toBeCalledWith({ dynamicA: 'a', dynamicB: 'b', dispatch, getState });
  expect(getState.mock.calls.length).toBe(2);
  expect(dynamicA).toBeCalledWith('whatever');
  expect(dynamicB).toBeCalledWith('whatever');
});

it('tests dependencies resolution: withDispatch', () => {
  const action = jest.fn();
  const next = jest.fn();
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue('whatever');
  const f = jest.fn().mockReturnValue('f');

  injectDependencies({ withDispatch: { f } })({ dispatch, getState })(next)(action);

  expect(action).toBeCalledWith({ f: 'f', dispatch, getState });
  expect(getState.mock.calls.length).toBe(0);
  expect(f).toBeCalledWith(dispatch);
});

it('dependencies resolution: withStateAndDispatch', () => {
  const action = jest.fn();
  const next = jest.fn();
  const dispatch = jest.fn();
  const getState = jest.fn().mockReturnValue('whatever');
  const f = jest.fn().mockReturnValue('f');

  injectDependencies({ withStateAndDispatch: { f } })({ dispatch, getState })(next)(action);

  expect(action).toBeCalledWith({ f: 'f', dispatch, getState });
  expect(getState.mock.calls.length).toBe(0);
  expect(f).toBeCalledWith(getState, dispatch);
});
