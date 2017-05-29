import React from 'react';
import { withRouter } from 'react-router';
import type { Router } from 'react-router';
import HierarchyKeys from '../../hierarchy/keys';


type PropTypes = {
  router: Router,
  location: Object
};

class VerticalMenu extends React.PureComponent {
  props: PropTypes
  render() {
    return (
      <div style={styles.wrapper}>
        <HierarchyKeys
          location={this.props.location}
          push={this.props.router.push}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'inline-block',
    height: '100%',
    width: '300px'
  }
};

export default withRouter(VerticalMenu);
