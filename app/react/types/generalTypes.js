/* @flow */
import type { Interface } from 'interfacer';
import type { StateType } from './storeTypes';

export type ID = string;

export type Action = Object;

export type ActionMetaType = {
  edited?: boolean,
  localeId?: number,
  page?: number,
};

export type ApiQueryType = {
  page: number,
  edited: boolean,
};

export type ApiSchemaType = {
  keys?: Array<any>,
  locale?: any,
  projects?: Array<any>,
};

export type ApiMethodType =
  | 'get'
  | 'getCollection'
  | 'update';

export type ApiAction = {
  type:
    | 'FETCH_HIERARCHY'
    | 'FETCH_KEYS'
    | 'FETCH_LOCALE'
    | 'FETCH_PROJECTS'
    | 'SAVE_ALL_FIELDS'
    | 'SAVE_FIELD',
  method: ApiMethodType,
  payload: {
    error: string,
    schema?: ApiSchemaType,
    query?: ApiQueryType,
    schema?: ApiSchemaType,
    prefix?: string,
    fieldId?: ?number,
    text?: ?string,
  },
  meta?: ActionMetaType,
};

export type Dependencies = {
  dispatch: (action: Action) => any,
  dispatchAndThrow: (action: Action, error: Error) => any,
  dispatchPromise: (action: Action) => any,
  getState: () => StateType,
  hierarchyInterface: Interface,
  keysInterface: Interface,
  localesInterface: Interface,
  projectsInterface: Interface,
  translationsInterface: Interface,
};

export type PaginationType = {
  currentPage: number,
  nextPage: number | null,
  prevPage: number | null,
  totalPages: number,
  totalCount: number
}

