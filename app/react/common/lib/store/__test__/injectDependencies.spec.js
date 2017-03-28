import test from 'ava';
import injectDependencies from '../injectDependencies';
import sinon from 'sinon';

test('returns function', (t) => {
  t.is(typeof injectDependencies({}), 'function');
});

test('returns function', (t) => {
  t.is(typeof injectDependencies({})({}), 'function');
});

test('returns function', (t) => {
  t.is(typeof injectDependencies({})({})(), 'function');
});

test('action is not a function', (t) => {
  const action = 'action';
  const next = sinon.stub().returns('whatever');
  const dispatch = sinon.spy();
  const getState = sinon.spy();

  t.is(injectDependencies({})({ dispatch, getState })(next)(action), 'whatever');
  t.true(next.calledWithExactly(action));
  t.false(dispatch.called);
  t.false(getState.called);
});

test('action is a function', (t) => {
  const action = sinon.stub().returns('action');
  const next = sinon.spy();
  const dispatch = sinon.stub().returns('whatever');
  const getState = sinon.spy();

  t.is(injectDependencies({})({ dispatch, getState })(next)(action), 'whatever');
  t.false(next.called);
  t.true(dispatch.calledWithExactly('action'));
  t.true(action.calledWithExactly({ dispatch, getState }));
});

test('dependencies resolution: statics', (t) => {
  const action = sinon.spy();
  const next = sinon.spy();
  const dispatch = sinon.spy();
  const getState = sinon.spy();

  const staticA = () => {};
  const staticB = () => {};

  injectDependencies({ statics: { staticA, staticB } })({ dispatch, getState })(next)(action);

  t.true(action.calledWithExactly({ staticA, staticB, dispatch, getState }));
});

test('dependencies resolution: dynamics', (t) => {
  const action = sinon.spy();
  const next = sinon.spy();
  const dispatch = sinon.spy();
  const getState = sinon.stub().returns('whatever');

  const dynamicA = sinon.stub().returns('a');
  const dynamicB = sinon.stub().returns('b');

  injectDependencies({ dynamic: { dynamicA, dynamicB } })({ dispatch, getState })(next)(action);

  t.true(action.calledWithExactly({ dynamicA: 'a', dynamicB: 'b', dispatch, getState }));
  t.true(getState.calledTwice);
  t.true(dynamicA.calledWithExactly('whatever'));
  t.true(dynamicB.calledWithExactly('whatever'));
});

test('dependencies resolution: withDispatch', (t) => {
  const action = sinon.spy();
  const next = sinon.spy();
  const dispatch = sinon.spy();
  const getState = sinon.stub().returns('whatever');

  const f = sinon.stub().returns('f');

  injectDependencies({ withDispatch: { f } })({ dispatch, getState })(next)(action);

  t.true(action.calledWithExactly({ f: 'f', dispatch, getState }));
  t.false(getState.called);
  t.true(f.calledWithExactly(dispatch));
});

test('dependencies resolution: withStateAndDispatch', (t) => {
  const action = sinon.spy();
  const next = sinon.spy();
  const dispatch = sinon.spy();
  const getState = sinon.stub().returns('whatever');

  const f = sinon.stub().returns('f');

  injectDependencies({ withStateAndDispatch: { f } })({ dispatch, getState })(next)(action);

  t.true(action.calledWithExactly({ f: 'f', dispatch, getState }));
  t.false(getState.called);
  t.true(f.calledWithExactly(getState, dispatch));
});
