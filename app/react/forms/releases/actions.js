const TOGGLE_KEY = 'TOGGLE_KEY';

// eslint-disable-next-line import/prefer-default-export
export function toggleApproveKey(keyId, params) {
  return ({
    type: TOGGLE_KEY,
    payload: { keyId },
    meta: params
  });
}
