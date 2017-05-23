import React from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';

import createWaitFor from '../../utils/waitFor';
import { fetchHierarchy } from '../actions';
import Key from './Key';

const preloader = <div>Preloading</div>;
const waitFor = createWaitFor(preloader);

const transformHierarchy = (structure: Object, level: number = 0): Array<Object> =>
  Object.keys(structure)
    .map(key => ({
      level,
      label: key,
      childrenKeys: transformHierarchy(structure[key], level + 1)
    }));

type PropTypes = {
  hierarchy: Array<Object>,
  location: Location
};

@preload([fetchHierarchy])
@waitFor(({ hierarchy }) => ([hierarchy.pending]))
@connect(({ hierarchy }) => ({
  hierarchy: transformHierarchy(hierarchy.hierarchy)
}))
export default class HierarchyKeys extends React.Component {
  props: PropTypes

  render() {
    const { hierarchy, location } = this.props;
    return (
      <div>
        {hierarchy.map(key => (
          <Key
            key={key.label}
            style={createStyles(key.level)}
            createStyles={createStyles}
            location={location}
            label={key.label}
            childrenKeys={key.childrenKeys}
          />
        ))}
      </div>
    );
  }
}

const createStyles = level => ({
  marginLeft: level * 10
});
