import dispatchAndThrow from './dispatchAndThrow';
import dispatchPromise from './dispatchPromise';
import createInterface from '../../../utils/interfacer';

export default function createDependencyInjections() {
  return {
    withDispatch: {
      dispatchAndThrow,
      dispatchPromise,
      genericInterface: createInterface(''),
      projectsInterface: createInterface('projects'),
      localesInterface: createInterface('locales'),
      hierarchyInterface: createInterface('hierarchy'),
      keysInterface: createInterface('keys'),
      translationsInterface: createInterface('translations'),
      releasesInterface: createInterface('releases')
    },
    // add api response
  };
}
