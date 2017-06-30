// @flow
import React from 'react';

import LabelLink from './LabelLink';

import type { LocationWithQuery } from '../../types/locationTypes';
import type { KeyNode } from '../../types/generalTypes';

type PropTypes = KeyNode & {
  childrenKeys: Array<Object>,
  collapsed: boolean,
  createStyles: (level: number) => Object,
  dispatch: Function,
  globalPath: Array<string>,
  isCollapsed: (Array<string>, Array<string>) => boolean,
  label: string,
  // eslint-disable-next-line
  location: LocationWithQuery,
  path: Array<string>,
  setPath: Function,
  style: Object,
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

  componentWillReceiveProps = ({ collapsed }: PropTypes) => {
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
      createStyles,
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
            {childrenKeys.map((key: KeyNode) => (
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
                {...key}
                location={location}
                // childrenKeys={key.childrenKeys}
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
