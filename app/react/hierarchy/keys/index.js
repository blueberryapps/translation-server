// @flow
import React from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';

import createWaitFor from '../../utils/waitFor';
import { fetchHierarchy } from '../actions';
import Key from './Key';

import type { LocationWithQuery } from '../../types/locationTypes';
import type { KeyNode } from '../../types/generalTypes';


const createStyles = (level: number): Object => ({
  marginLeft: level * 10
});
const preloader = <div>Preloading</div>;
const waitFor = createWaitFor(preloader);
const maxLevel = 10;

const transformHierarchy = (structure: Object, level: number = 0): Array<KeyNode> => {
  if (level > maxLevel) {
    // eslint-disable-next-line no-console
    console.warn('Provided hierarchy object was to deep. Either provide different object or increase "maxLevel" variable');
    return [];
  }
  return Object.keys(structure)
    .map((key: string): KeyNode => ({
      level,
      label: key,
      childrenKeys: transformHierarchy(structure[key], level + 1)
    }));
};

type PropTypes = {
  dispatch: Function,
  hierarchy: Array<KeyNode>,
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

  isCollapsed = ({ label, level }: KeyNode, globalPath: Array<string>): boolean =>
    !!globalPath.length && globalPath[level] !== label;

  render() {
    const { dispatch, hierarchy, location, setPath, path }: PropTypes = this.props;

    return (
      <div>
        {hierarchy.map((key: KeyNode) => (
          <Key
            createStyles={createStyles}
            dispatch={dispatch}
            key={key.label}
            setPath={setPath}
            globalPath={path}
            collapsed={this.isCollapsed(key, path)}
            isCollapsed={this.isCollapsed}
            location={location}
            {...key}
          />
        ))}
      </div>
    );
  }
}
