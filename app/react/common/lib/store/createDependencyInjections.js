import dispatchAndThrow from './dispatchAndThrow';
import dispatchPromise from './dispatchPromise';

export default function createDependencyInjections() {
  return {
    withDispatch: { dispatchAndThrow, dispatchPromise },
    // add api response
  };
}
