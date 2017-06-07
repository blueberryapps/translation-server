export const TOGGLE_RELEASE_FIELD = 'TOGGLE_FIELD';
export const INIT_RELEASE_FIELD = 'INIT_FIELD';

export function toggleField(keyPath, params) {
  return ({
    type: TOGGLE_RELEASE_FIELD,
    payload: { key: keyPath.join('.') },
    meta: params
  });
}
export function initField(keyPath, params) {
  return ({
    type: INIT_RELEASE_FIELD,
    payload: { key: keyPath.join('.') },
    meta: params
  });
}
