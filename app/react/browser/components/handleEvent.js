export default function (name, eventHandler, event) {
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
