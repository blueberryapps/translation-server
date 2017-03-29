import dispatchAndThrow from '../dispatchAndThrow';

it('returns function', () => {
  expect(typeof dispatchAndThrow()).toEqual('function');
});

it('calls dispatch and throws an error', () => {
  const action = 'action';
  const error = 'an error';
  const dispatch = jest.fn();

  function callback() {
    dispatchAndThrow(dispatch)(action, new Error(error));
    done(); // eslint-disable-line no-undef
  }

  expect(callback).toThrow(error);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch).toBeCalledWith(action);
});
