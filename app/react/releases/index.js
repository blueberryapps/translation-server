import React from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';

import { fetchPrerelease, toggleApproveKey } from './actions';

type PropTypes = {
  hierarchy: Object
};

@preload(fetchPrerelease)
@connect((state, { params: { projectId, localeId } }) => ({
  hierarchy: state.releases.hierarchies[projectId] && state.releases.hierarchies[projectId][localeId]
}), { toggle: toggleApproveKey })
export default class Releases extends React.Component {
  props: PropTypes
  render() {
    const { toggle } = this.props;
    console.log('prps', this.props);
    return (
      <div>
        wat
      </div>
    );
  }
}
