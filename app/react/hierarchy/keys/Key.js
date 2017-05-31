// @flow
import React from 'react';
import LabelLink from './LabelLink';

import type { LocationWithQuery } from '../../types/locationTypes';

type PropTypes = {
  dispatch: Function,
  label: string,
  // eslint-disable-next-line
  location: LocationWithQuery,
  childrenKeys: Array<Object>,
  style: Object,
  collapsed: boolean,
  createStyles: (level: number) => Object,
  path: Array<string>,
  setPath: Function,
  isCollapsed: (Array<string>, Array<string>) => boolean,
  globalPath: Array<string>
};

type StateTypes = {
  collapsed: boolean
};

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
      style,
      createStyles,
      path,
      setPath,
      globalPath,
      isCollapsed
    } = this.props;
    const currentPath = [...path, label];

    return (
      <div style={style}>
        <button onClick={this.toggle}>
          {collapsed
            ? <span>&#9654;</span>
            : <span>&#9660;</span>
          }
        </button>

        <LabelLink
          path={currentPath}
          location={location}
          label={label}
        />
        {!collapsed && (
          <div>
            {childrenKeys.map(key => (
              <Key
                dispatch={dispatch}
                key={key.label}
                setPath={setPath}
                isCollapsed={isCollapsed}
                collapsed={isCollapsed(key, globalPath)}
                style={createStyles(key.level)}
                createStyles={createStyles}
                label={key.label}
                globalPath={globalPath}
                path={currentPath}
                location={location}
                childrenKeys={key.childrenKeys}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
