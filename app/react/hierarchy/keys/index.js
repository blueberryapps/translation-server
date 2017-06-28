// @flow
import React from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';

import createWaitFor from '../../utils/waitFor';
import { fetchHierarchy } from '../actions';
import Key from './Key';

import type { LocationWithQuery } from '../../types/locationTypes';

const preloader = <div>Preloading</div>;
const waitFor = createWaitFor(preloader);

type PropTypes = {
  dispatch: Function,
  hierarchy: Array<Object>,
  // eslint-disable-next-line
  location: LocationWithQuery,
  path: Array<string>,
  setPath: Function
};

@preload([fetchHierarchy])
@waitFor(({ hierarchy }) => ([hierarchy.pending]))
@connect(({ hierarchy }) => ({
  hierarchy: hierarchy.hierarchy,
  path: hierarchy.breadcrumbPath
}))
export default class HierarchyKeys extends React.PureComponent {
  shouldComponentUpdate = nextProps => (nextProps.hierarchy !== this.props.hierarchy)

  props: PropTypes

  isCollapsed = ({ label, level }, globalPath) =>
    !!globalPath.length && globalPath[level] !== label;

  render() {
    const { dispatch, hierarchy, location, setPath, path }: PropTypes = this.props;

    return (
      <div>
        {hierarchy.map(key => (
          <Key
            dispatch={dispatch}
            key={key.label}
            setPath={setPath}
            globalPath={path}
            collapsed={this.isCollapsed(key, path)}
            isCollapsed={this.isCollapsed}
            location={location}
            label={key.label}
            childrenKeys={key.childrenKeys}
          />
        ))}
      </div>
    );
  }
}
