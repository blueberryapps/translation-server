
import type { LocaleType } from '../locales/types';
import type { KeyType } from '../keys/types';
import type { PaginationType } from '../../globalTypes';
import type { ProjectType } from '../projects/types';

export type TranslationsProps = {
  isVerticalMenuShown: boolean,
  locale: LocaleType,
  pagiantion: PaginationType,
  keys: Array<KeyType>,
  params: { localeId: string },
  toggleHierarchy: Function,
  location: { query: { edited: boolean} },
  project: ProjectType,
};

export type TranslationType = {
  id: number,
  text: string,
  edited: boolean,
  localeId: number,
  keyId: number,
};
