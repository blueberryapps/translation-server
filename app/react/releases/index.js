import React from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';

import Key from './components/Key';
import { fetchPrerelease } from './actions';
import { toggleApproveKey } from '../forms/releases/actions';
import transform from './transform';

type PropTypes = {
  hierarchy: Object,
  toggle: Function
};

@preload(fetchPrerelease)
@connect((state, { params: { projectId, localeId } }) => ({
  hierarchy: state.releases.hierarchies[projectId] && transform(state.releases.hierarchies[projectId][localeId], state.releases.translations[projectId][localeId]),
}), { toggle: toggleApproveKey })
export default class Releases extends React.Component {
  props: PropTypes
  render() {
    const { toggle, hierarchy } = this.props;
    console.log('hierarchy', hierarchy);
    return (
      <div>
        {hierarchy &&
          hierarchy.map(key => (
            <Key
              label={key.label}
              key={key.label}
              ids={key.ids}
              childrenKeys={key.childrenKeys}
              toggle={toggle}
            />
          ))
        }
      </div>
    );
  }
}
