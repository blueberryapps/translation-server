import { closeCompatibilityNotification } from '../actions';

it('tests closeCompatibilityNotification', () => {
  expect(closeCompatibilityNotification()).toEqual({ type: 'DEVICE_COMPATIBILITY_NOTIFICATION_CLOSE' });
});
