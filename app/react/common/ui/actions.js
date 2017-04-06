export const UI_CHANGE = 'UI_CHANGE';

export function change(name, show) {
  return {
    type: UI_CHANGE,
    payload: {
      name,
      show
    }
  };
}
