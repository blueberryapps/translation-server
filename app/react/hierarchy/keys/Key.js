// @flow
import Radium from 'radium';
import React from 'react';
import LabelLink from './LabelLink';

import type { LocationWithQuery } from '../../types/locationTypes';

type PropTypes = {
  dispatch: Function,
  label: string,
  // eslint-disable-next-line
  location: LocationWithQuery,
  childrenKeys: Array<Object>,
  collapsed: boolean,
  path: Array<string>,
  setPath: Function,
  isCollapsed: (Array<string>, Array<string>) => boolean,
  globalPath: Array<string>
};

type StateTypes = {
  collapsed: boolean
};

@Radium
export default class Key extends React.Component {
  static defaultProps = {
    path: []
  }

  constructor(props: PropTypes) {
    super(props);
    this.state = { collapsed: props.collapsed };
  }

  state: StateTypes

  componentWillReceiveProps = ({ collapsed }) => {
    if (collapsed !== this.state.collapsed) this.setState({ collapsed });
  }

  props: PropTypes


  toggle = () =>
    this.setState({ collapsed: !this.state.collapsed })

  render() {
    const { collapsed } = this.state;
    const {
      dispatch,
      label,
      childrenKeys,
      location,
      path,
      setPath,
      globalPath,
      isCollapsed
    } = this.props;
    const currentPath = [...path, label];

    return (
      <div style={styles.wrapper}>
        {/*
        <button onClick={this.toggle}>
          {collapsed
            ? <span>&#9654;</span>
            : <span>&#9660;</span>
          }
        </button> */}

        <LabelLink
          path={currentPath}
          location={location}
          label={label}
        />
        {!collapsed &&
          <div>
            {childrenKeys.map(key => (
              <Key
                dispatch={dispatch}
                key={key.label}
                setPath={setPath}
                isCollapsed={isCollapsed}
                collapsed={isCollapsed(key, globalPath)}
                label={key.label}
                globalPath={globalPath}
                path={currentPath}
                location={location}
                childrenKeys={key.childrenKeys}
              />
            ))}
          </div>
        }
      </div>
    );
  }
}

const styles = {
  wrapper: {
    marginTop: '10px',
    marginLeft: '20px'
  }
};
