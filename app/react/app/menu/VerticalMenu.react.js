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
        <HierarchyKeys
          location={location}
          push={push}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    padding: '40px',
    background: 'white',
    overflow: 'hidden',
    display: 'none',
    width: 0,
  },
  isShown: {
    flex: '1 1 auto',
    minWidth: '350px',
    maxWidth: '450px',
    display: 'block',
    boxShadow: 'rgba(0, 0, 0, 0.098) 7px 0px 7px -7px',
    overflow: 'scroll',
  }
};

export default withRouter(VerticalMenu);
