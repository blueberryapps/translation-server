import { setPlatform, closeCompatibilityNotification } from '../actions';
import reducer, { InitialState } from '../reducer';

it('tests eviving: when called with empty state it returns initial state', () => {
  expect(reducer(undefined, {}).toJS()).toEqual(new InitialState().toJS());
});

it('tests reviving: when called with non record state it returns merged initial state', () => {
  expect(reducer({ platform: 'whatever' }, {}).toJS()).toEqual(new InitialState({ platform: 'whatever' }).toJS());
});

it('tests setPlatform action', () => {
  expect(reducer(undefined, setPlatform('abc')).toJS()).toEqual(new InitialState({ platform: 'abc' }).toJS());
});

it('tests closeCompatibilityNotification acti', () => {
  expect(reducer(undefined, closeCompatibilityNotification()).toJS()).toEqual(new InitialState({ compatibilityNotificationClosed: true }).toJS());
});
