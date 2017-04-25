import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import preload from 'redux-preload';
import { Flex, Box } from 'radium-flex';
import Project from './components/Project';

import * as actions from '../../../common/projects/actions';

import type { ProjectT } from '../types';

@preload(actions.fetchProjects)
@connect(
  ({ projects }) => ({
    projects,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
export default class Projects extends React.PureComponent {
  props: {
    projects: {
      list: Array<ProjectT> // eslint-disable-line react/no-unused-prop-types
    }
  }

  render() {
    const { projects: { list } } = this.props;
    return (
      <Flex>
        <Box col={12}>
          {list.map(project => <Project key={project.id} {...project} />)}
        </Box>
      </Flex>
    );
  }
}
