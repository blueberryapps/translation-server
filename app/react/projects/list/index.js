/* @flow */
import fuzzy from 'fuzzy';
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
  ({ projects }) => {
    const merged = getProjectsMerged(projects);
    return {
      filterValue: projects.filterValue,
      list: projects.list,
      projects: fuzzy.filter(projects.filterValue, merged.toJS(), { extract: el => (el.name) })
    };
  },
  dispatch => bindActionCreators(actions, dispatch),
)
@toJS
export default class Projects extends React.PureComponent {
  props: {
    projects: Array<ProjectEntityType>,
    filterValue: string
  }

  render() {
    const { projects, filterValue } = this.props;

    if (projects.length === 0 && filterValue !== '') {
      return <div>No projects found!</div>;
    }

    return (
      <div>
        <Flex style={styles.columns}>
          <Box col={4} xs={6} ms={6} sm={3} md={4} lg={4}>Project</Box>
          <Box col={4} xs={6} ms={6} sm={3} md={2} lg={2}>Original</Box>
          <Box col={4} xs={0} ms={0} sm={6} md={6} lg={6}>Translations</Box>
        </Flex>
        {projects.map(({ original }) =>
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
