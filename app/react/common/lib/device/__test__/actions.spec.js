import test from 'ava';
import { setPlatform, closeCompatibilityNotification } from '../actions';

test('setPlatform', t => {
  t.deepEqual(
    setPlatform('abc'),
    {
      type: 'SET_PLATFORM',
      payload: {
        platform: 'abc'
      }
    }
  );
});

test('closeCompatibilityNotification', t => {
  t.deepEqual(
    closeCompatibilityNotification(),
    {
      type: 'DEVICE_COMPATIBILITY_NOTIFICATION_CLOSE'
    }
  );
});
