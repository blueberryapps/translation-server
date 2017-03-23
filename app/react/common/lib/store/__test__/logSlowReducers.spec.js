import test from 'ava';
import logSlowReducers from '../logSlowReducers';
import sinon from 'sinon';

const reducerFn = sinon.spy();

test.beforeEach(t => {
  t.context.warn = console.warn;// eslint-disable-line
  console.warn = sinon.spy();// eslint-disable-line
});

test.afterEach.always(t => {// eslint-disable-line
  console.warn = t.context.warn;// eslint-disable-line
  reducerFn.reset();
});

test.serial('in threshold', t => {
  logSlowReducers({ reducerFn }, 1000).reducerFn({}, {});
  t.false(console.warn.called);// eslint-disable-line
});

test.serial('out of threshold', t => {
  logSlowReducers({ reducerFn }, -1).reducerFn({}, {});
  t.true(console.warn.called);// eslint-disable-line
});
