// @flow-weak
import React from 'react';

import LabelLink from './LabelLink';

import type { LocationWithQuery } from '../../types/locationTypes';
import type { KeyNode } from '../../types/generalTypes';

type PropTypes = KeyNode & {
  childrenKeys: Array<Object>,
  collapsed: boolean,
  dispatch: Function,
  globalPath: Array<string>,
  isCollapsed: (Array<string>, Array<string>) => boolean,
  label: string,
  // eslint-disable-next-line
  location: LocationWithQuery,
  path: Array<string>,
  setPath: Function,
  style?: Object,
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


  toggle = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

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
        {childrenKeys.length !== 0 &&
          <a href="#toggle" onClick={this.toggle} style={styles.toggleButton}>
            {collapsed
              ? <span>&#9656;</span>
              : <span>&#9662;</span>
            }
          </a>
        }
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
    marginLeft: '10px',
    paddingLeft: '20px',
    position: 'relative',
    textOverflow: 'ellipsis',
  },
  toggleButton: {
    textDecoration: 'none',
    display: 'inline-block',
    padding: '0 0.5em',
    position: 'absolute',
    left: 0,
    top: '1px'
  },
};
