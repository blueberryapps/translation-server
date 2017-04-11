import Interfacer from 'interfacer';
import CamelCase from 'camelcase-keys';
import { handleError } from './ui/actions';

export default endpoint =>
  dispatch =>
    Interfacer({
      baseUrl: '/api_frontend/v1/',
      request: { credentials: 'same-origin' },
      errorHandler: error => handleError(dispatch, error),
      flatMethod: res => res.json().then(data => CamelCase(data, { deep: true })),
    })(endpoint);
