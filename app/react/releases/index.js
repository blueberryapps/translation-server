import React from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';

import Key from './components/Key';
import { fetchPrerelease, createRelease } from './actions';
import { initField, toggleField } from '../forms/releases/actions';
import transform from './transform';

type PropTypes = {
  hierarchy: Object,
  params: Object,
  initField: Function,
  toggleField: Function,
  createRelease: Function
};

@preload(fetchPrerelease)
@connect((state, { params: { projectId, localeId } }) => ({
  hierarchy: state.releases.hierarchies[projectId] && transform(state.releases.hierarchies[projectId][localeId]),
}), { initField, toggleField, createRelease })
export default class Releases extends React.Component {
  props: PropTypes
  render() {
    const { hierarchy, params } = this.props;

    return (
      <div>
        <button onClick={this.props.createRelease.bind(null, params)}>RELEASE!</button>
        {hierarchy &&
          hierarchy.map(key => (
            <Key
              key={key.label}
              params={params}
              initField={this.props.initField}
              toggleField={this.props.toggleField}
              createStyles={createStyles}
              styles={createStyles()}
              {...key}
            />
          ))
        }
      </div>
    );
  }
}

const createStyles = (level = 0) => ({
  marginLeft: level * 10
});
