export const SET_PLATFORM = 'SET_PLATFORM';
export const DEVICE_COMPATIBILITY_NOTIFICATION_CLOSE = 'DEVICE_COMPATIBILITY_NOTIFICATION_CLOSE';

export function setPlatform(platform) {
  return {
    type: SET_PLATFORM,
    payload: { platform }
  };
}

export function closeCompatibilityNotification() {
  return {
    type: DEVICE_COMPATIBILITY_NOTIFICATION_CLOSE
  };
}
