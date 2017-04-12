import React, { PropTypes as RPT } from 'react';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { connect } from 'react-redux';
import preload from 'redux-preload';
import { Flex, Box } from 'radium-flex';
import Project from './components/Project';

import * as actions from '../../../common/projects/actions';

@preload(actions.fetchProjects)
@connect(
  ({ projects }) => ({
    projects,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
export default class Projects extends React.PureComponent {
  static defaultProps = {
    projects: List([]),
  };
  static propTypes = {
    projects: RPT.shape({ list: RPT.object, pending: RPT.bool }),
  };

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
