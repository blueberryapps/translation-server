import React, { PropTypes as RPT } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../app/Header.react';
import Layout from '../layouts/ApplicationLayout.react';
import Menubar from '../app/menu/Menubar.react';
import VerticalMenu from '../app/menu/VerticalMenu.react';

@connect(
  ({ ui: reducer }) => ({
    isVerticalMenuShown: reducer.get('isVerticalMenuShown')
  }),
  dispatch => bindActionCreators({}, dispatch)
)
export default class Project extends React.PureComponent {

  static propTypes = {
    isVerticalMenuShown: RPT.bool.isRequired
  }

  render() {
    const { isVerticalMenuShown } = this.props;

    return (
      <Layout>
        <Header />
        <Menubar />
        <div style={styles.wrapper}>
          {isVerticalMenuShown && <VerticalMenu />}
          Project
        </div>
      </Layout>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#F7F7F7',
    height: '300px'
  }
};
