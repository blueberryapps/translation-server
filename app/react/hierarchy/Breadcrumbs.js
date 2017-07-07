// @flow
import Radium from 'radium';
import React from 'react';

import Icon from '../components/Icon.react';
import LabelLink from './keys/LabelLink';
import { colors } from '../globals';

type PropTypes = {
  path: Array<string>,
  isVerticalMenuShown: boolean,
  location: Object
};

const Separator = (<Icon kind="arrow-right" size={8} color={colors.primary} style={{ margin: '0 9px' }} />);

function Breadcrumbs({ path, location, isVerticalMenuShown }: PropTypes) {
  return (
    <div style={[styles.wrapper, isVerticalMenuShown && styles.isVerticalMenuShown]}>
      <Icon kind="key" size={20} color={colors.primary} style={styles.icon} />
      {path.map((key, i) => (
        <span key={key}>
          {!!i && Separator}
          <LabelLink
            location={location}
            label={key}
            key={key}
            path={path.slice(0, i + 1)}
          />
        </span>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'fixed',
    alignItems: 'center',
    top: '115px',
    backgroundColor: colors.backgroundGrey,
    zIndex: 18,
    left: 0,
    right: 0,
    height: '50px',
    display: 'flex',
    boxShadow: '0px 2px 12px 1px rgba(0, 0, 0, 0.25)',
    transition: 'left .2s'
  },
  isVerticalMenuShown: {
    left: '400px'
  },
  icon: {
    marginLeft: '15px',
    marginRight: '10px'
  }
};

export default Radium(Breadcrumbs);
