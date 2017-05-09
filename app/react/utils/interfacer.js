import Interfacer from 'interfacer';
import CamelCase from 'camelcase-keys';
import SnakeCase from 'to-snake-case';
import { handleError } from '../common/ui/actions';

function snakify(body) {
  if (Array.isArray(body)) return body.map(snakify);

  if (body instanceof Object) {
    const originalKeys = Object.keys(body);
    return originalKeys
      .map(SnakeCase)
      .reduce((acc, key, i) => ({
        ...acc,
        [key]: body[originalKeys[i]]
      }), {});
  }

  return body;
}

export default endpoint =>
  dispatch =>
    Interfacer({
      baseUrl: '/api_frontend/v1/',
      request: { credentials: 'same-origin' },
      errorHandler: error => handleError(dispatch, error),
      flatMethod: res => res.json().then(data => CamelCase(data, { deep: true })),
      makeBody: snakify
    })(endpoint);
