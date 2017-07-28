/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import preload from 'redux-preload';
import { Flex, Box } from 'radium-flex';
import Project from './components/Project';
import toJS from '../../utils/toJS';

import * as actions from '../../projects/actions';
import type { FilteredProjectEntityType } from '../../types/entityTypes';

type PropTypes = {
  fiteredProjects?: Array<FilteredProjectEntityType>,
  filterValue?: string
};

@preload(actions.fetchProjects)
@connect(
  ({ projects }) => ({
    filterValue: projects.filterValue,
    list: projects.list,
    fiteredProjects: projects.fiteredProjects
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
@toJS
export default class Projects extends React.PureComponent {
  static defaultProps = {
    filterValue: '',
    fiteredProjects: []
  }

  props: PropTypes

  render() {
    const { fiteredProjects, filterValue } = this.props;

    if (fiteredProjects && fiteredProjects.length === 0 && filterValue !== '') {
      return <div>No projects found!</div>;
    }

    return (
      <div>
        <Flex style={styles.columns}>
          <Box col={4} xs={6} ms={6} sm={3} md={4} lg={4}>Project</Box>
          <Box col={4} xs={6} ms={6} sm={3} md={2} lg={2}>Original</Box>
          <Box col={4} xs={0} ms={0} sm={6} md={6} lg={6}>Translations</Box>
        </Flex>
        {fiteredProjects && fiteredProjects.map(({ original }) =>
          <Project key={original.id} {...original} />)
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
