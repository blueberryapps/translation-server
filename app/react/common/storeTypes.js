/* @flow */

/* Project Store */
import type { ProjectT } from '../browser/projects/types';

export type ProjectStore = {
  list: Array<ProjectT>,
  pending: boolean
};
