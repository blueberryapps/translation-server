/* @flow */

import type { ID } from './generalTypes';

export type LocaleEntityType = {
  id: ID,
  projectID: ID,
  code: string,
  translationCount: number,
  translatedCount: number
};

export type ProjectEntityType = {
  id: ID,
  name: string,
  locales: Array<LocaleEntityType>,
  defaultLocaleId: number,
  apiToken: string,
  filterProjects: Function
};

export type TranslationEntityType = {
  id: ID,
  text: string,
  edited: boolean,
  localeId: number,
  keyId: number
};

export type KeyEntityType = {
  id: ID,
  key: string,
  note: string | void,
  dataType: string,
  translations: Array<TranslationEntityType>
};
