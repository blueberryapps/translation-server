/* @flow */
const SIGN_OUT = 'SIGN_OUT';

// eslint-disable-next-line import/prefer-default-export
export function signOut() {
  return {
    type: SIGN_OUT,
    payload: {
      promise: fetch('/api_frontend/v1/logout', {
        method: 'DELETE', credentials: 'same-origin'
      }).then(() => { window.location.href = '/users/sign_in'; })
    }
  };
}
