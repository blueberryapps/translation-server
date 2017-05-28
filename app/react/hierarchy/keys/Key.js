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
  createStyles: (level: number) => Object,
  path: Array<string>,
  setPath: Function
};

export default function Key({
  dispatch,
  label,
  childrenKeys,
  location,
  style,
  createStyles,
  path,
  setPath
}: PropTypes) {
  const currentPath = [...path, label];
  return (
    <div style={style} >
      <LabelLink
        path={currentPath}
        location={location}
        label={label}
      />
      <div>
        {childrenKeys.map(key => (
          <Key
            dispatch={dispatch}
            key={key.label}
            setPath={setPath}
            style={createStyles(key.level)}
            createStyles={createStyles}
            label={key.label}
            path={currentPath}
            location={location}
            childrenKeys={key.childrenKeys}
          />
        ))}
      </div>
    </div>
  );
}

Key.defaultProps = {
  path: []
};
