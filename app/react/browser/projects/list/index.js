/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import preload from 'redux-preload';
import { Flex, Box } from 'radium-flex';
import Project from './components/Project';
import { getProjectsMerged } from '../../../common/projects/selectors';
import toJS from '../../../utils/toJS';

import * as actions from '../../../common/projects/actions';
import type { ProjectEntityType } from '../../../common/types/entityTypes';

@preload(actions.fetchProjects)
@connect(
  ({ projects }) => ({
    projects: getProjectsMerged(projects)
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
@toJS
export default class Projects extends React.PureComponent {
  props: {
    projects: Array<ProjectEntityType>
  }

  render() {
    const { projects } = this.props;

    return (
      <Flex>
        <Box col={12}>
          {projects.map(project =>
            <Project key={project.id} {...project} />)
          }
        </Box>
      </Flex>
    );
  }
}
