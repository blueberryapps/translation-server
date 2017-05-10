/* eslint-disable no-console */
import logSlowReducers from '../logSlowReducers';

const reducerFn = jest.fn();
const consoleWarn = jest.fn();
const warn = console.warn;

beforeEach(() => {
  console.warn = consoleWarn;
});

afterEach(() => {
  console.warn = warn;
});

it('in threshold', () => {
  logSlowReducers({ reducerFn }, 1000).reducerFn({}, {});
  expect(consoleWarn.mock.calls.length).toEqual(0);
});

it('out of threshold', () => {
  logSlowReducers({ reducerFn }, -1).reducerFn({}, {});
  expect(consoleWarn.mock.calls.length).toEqual(1);
});
