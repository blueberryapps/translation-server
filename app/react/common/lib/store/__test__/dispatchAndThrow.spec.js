import test from 'ava';
import dispatchAndThrow from '../dispatchAndThrow';
import sinon from 'sinon';

test('returns function', (t) => {
  t.is(typeof dispatchAndThrow(), 'function');
});

test('calls dispatch and throws an error', (t) => {
  const action = 'action';
  const error = 'an error';
  const dispatch = sinon.spy();

  t.throws(() => dispatchAndThrow(dispatch)(action, new Error(error)), error);
  t.true(dispatch.calledOnce);
  t.true(dispatch.calledWithExactly(action));
});
