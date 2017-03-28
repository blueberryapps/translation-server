import test from 'ava';
import { closeCompatibilityNotification } from '../actions';

test('closeCompatibilityNotification', (t) => {
  t.deepEqual(
    closeCompatibilityNotification(),
    {
      type: 'DEVICE_COMPATIBILITY_NOTIFICATION_CLOSE'
    }
  );
});
