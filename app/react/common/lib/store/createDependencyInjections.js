import dispatchAndThrow from './dispatchAndThrow';
import dispatchPromise from './dispatchPromise';
import createInterface from '../../interfacer';

export default function createDependencyInjections() {
  return {
    withDispatch: {
      dispatchAndThrow,
      dispatchPromise,
      projects: createInterface('projects'),
    },
    // add api response
  };
}
