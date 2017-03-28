import test from 'ava';
import { setPlatform, closeCompatibilityNotification } from '../actions';
import reducer, { InitialState } from '../reducer';

test('reviving: when called with empty state it returns initial state', (t) => {
  t.deepEqual(
    reducer(undefined, {}).toJS(),
    new InitialState().toJS()
  );
});

test('reviving: when called with non record state it returns merged initial state', (t) => {
  t.deepEqual(
    reducer({ platform: 'whatever' }, {}).toJS(),
    new InitialState({ platform: 'whatever' }).toJS()
  );
});

test('action: setPlatform', (t) => {
  t.deepEqual(
    reducer(undefined, setPlatform('abc')).toJS(),
    new InitialState({ platform: 'abc' }).toJS()
  );
});

test('action: closeCompatibilityNotification', (t) => {
  t.deepEqual(
    reducer(undefined, closeCompatibilityNotification()).toJS(),
    new InitialState({ compatibilityNotificationClosed: true }).toJS()
  );
});
