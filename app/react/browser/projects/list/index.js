/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import preload from 'redux-preload';
import { Flex, Box } from 'radium-flex';
import Project from './components/Project';
import { getProjectsMerged } from '../../../common/projects/selectors';

import * as actions from '../../../common/projects/actions';

import type { ProjectType } from '../types';

@preload(actions.fetchProjects)
@connect(
  ({ projects }) => ({
    projects: getProjectsMerged(projects)
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
export default class Projects extends React.PureComponent {
  props: {
    projects: Array<ProjectType> // eslint-disable-line react/no-unused-prop-types
  }

  render() {
    const { projects } = this.props;
    return (
      <Flex>
        <Box col={12}>
          {projects.map((project: ProjectType) =>
            <Project key={project.id} {...project} />)
          }
        </Box>
      </Flex>
    );
  }
}
