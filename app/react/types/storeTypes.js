/* @flow */
import type { List, Map } from 'immutable';
import type { ID, PaginationType, Action } from './generalTypes';
import type {
  LocaleEntityType,
  ProjectEntityType,
  TranslationEntityType,
  KeyEntityType
} from './entityTypes';

export type LocaleStateType = RecordType<{
  pending: boolean,
  list: List<ID>,
  entities: {
    locales: Map<string, LocaleEntityType>
  }
}>;

export type ProjectStateType = RecordType<{
  list: List<ID>,
  pending: boolean,
  entities: Map<{
    locales: Map<string, LocaleEntityType>,
    projects: Map<string, ProjectEntityType>
  }>
}>

export type KeyStateType = RecordType<{
  lists: List<ID>,
  pending: boolean,
  entities: Map<{
    translations: Map<string, TranslationEntityType>,
    keys: Map<string, KeyEntityType>,
  }>,
  pagination: PaginationType,
}>

export type HierarchyStateType = {
  breadcrumbPath: Array<string>,
  hierarchy: Object,
  pending: boolean
}

export type StateType = {
  locales: (state: LocaleStateType, action: Action) => LocaleStateType,
  projects: (state: ProjectStateType, action: Action) => ProjectStateType,
  keys: (state: KeyStateType, action: Action) => KeyStateType,
  hierarchy: (state: HierarchyStateType, action: Action) => HierarchyStateType
};
