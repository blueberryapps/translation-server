import { reducer as onionForm } from 'onion-form';
import { routerReducer as routing } from 'react-router-redux';

import device from './lib/device/reducer';
import ui from './ui/reducer';
import projects from './projects/reducer';
import keys from './keys/reducer';
import locales from './locales/reducer';
import forms from './forms/reducer';

import type { Action } from '../globalTypes';

import type {
  ProjectStore,
  TranslationStore
} from './storeTypes';

type Store = {
  projects: (state: ProjectStore, action: Action<*>) => ProjectStore,
  translations: (state: TranslationStore, action: Action<*>) => TranslationStore
};

const store: Store = {
  device,
  onionForm,
  routing,
  ui,
  projects,
  keys,
  locales,
  forms
};

export default store;
