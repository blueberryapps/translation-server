/* @flow */

export type HandleEventPayload = {
  name: string,
  value: string | boolean,
  type: string,
};

export default function (name: string, eventHandler?: Function, event: Event & { target: HTMLInputElement }): void {
  event.preventDefault();
  if (!eventHandler) return;

  const payload = {
    name,
    value: valueTransform(event.target),
    type: event.target.type,
  };
  eventHandler(payload);
}

function valueTransform(target) {
  switch (String(target.type).toLowerCase()) {
    case 'checkbox':
      return target.checked;
    default:
      return target.value;
  }
}
