import Radium from 'radium';
import React from 'react';
import { withRouter } from 'react-router';
import type { Router } from 'react-router';
import HierarchyKeys from '../../hierarchy/keys';


type PropTypes = {
  isShown: boolean,
  router: Router,
  location: Object
};

@Radium
class VerticalMenu extends React.PureComponent {
  props: PropTypes
  render() {
    const { isShown, router: { push }, location } = this.props;

    return (
      <div style={[styles.wrapper, isShown && styles.isShown]}>
        <div style={styles.innerWrapper}>
          <HierarchyKeys
            location={location}
            push={push}
          />
        </div>
        <div style={styles.fade} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    background: 'white',
    position: 'fixed',
    zIndex: 18,
    top: '115px',
    left: '-420px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 12px 1px',
    transition: 'left .2s'
  },
  isShown: {
    left: 0
  },
  innerWrapper: {
    padding: '30px 40px 40px 20px',
    height: 'calc(100vh - 110px)',
    overflow: 'scroll',
    width: '400px',
  },
  fade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 100%)'
  }
};

export default withRouter(VerticalMenu);
