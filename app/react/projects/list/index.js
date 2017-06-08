/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import preload from 'redux-preload';
import { Flex, Box } from 'radium-flex';
import Project from './components/Project';
import { getProjectsMerged } from '../../projects/selectors';
import toJS from '../../utils/toJS';

import * as actions from '../../projects/actions';
import type { ProjectEntityType } from '../../types/entityTypes';

@preload(actions.fetchProjects)
@connect(
  ({ projects }) => ({
    projects: getProjectsMerged(projects)
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
@toJS
class Projects extends React.PureComponent {
  props: {
    projects: Array<ProjectEntityType>
  }

  render() {
    const { projects } = this.props;

    return (
      <div>
        <Flex style={styles.columns}>
          <Box col={4} xs={6} ms={6} sm={3} md={4} lg={4}>Project</Box>
          <Box col={4} xs={6} ms={6} sm={3} md={2} lg={2}>Original</Box>
          <Box col={4} xs={0} ms={0} sm={6} md={6} lg={6}>Translations</Box>
        </Flex>
        {projects.map(project =>
          <Project key={project.id} {...project} />)
        }
      </div>
    );
  }
}

const styles = {
  columns: {
    fontSize: '13px',
    fontWeight: 400
  }
};

export default connect(({ projects }) => ({
  projects: getProjectsMerged(projects)
}),
dispatch => bindActionCreators(actions, dispatch))(Projects);
