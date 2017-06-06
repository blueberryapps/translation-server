export const TOGGLE_FIELD = 'TOGGLE_FIELD';
export const INIT_FIELD = 'INIT_FIELD';

export function toggleField(keyPath, params) {
  return ({
    type: TOGGLE_FIELD,
    payload: { key: keyPath.join('.') },
    meta: params
  });
}
export function initField(keyPath, params) {
  return ({
    type: INIT_FIELD,
    payload: { key: keyPath.join('.') },
    meta: params
  });
}
