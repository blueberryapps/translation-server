import React from 'react';
import { Link } from 'react-router';

type PropTypes = {
  label: string,
  location: Location,
  childrenKeys: Array<Object>,
  style: Object,
  createStyles: (level: number) => Object
};

export default function Key({ label, childrenKeys, location, style, createStyles }: PropTypes) {
  return (
    <div style={style} >
      <Link to={{ ...location, search: `?search=${label}` }}>
        {label}
      </Link>
      <div>
        {childrenKeys.map(key => (
          <Key
            key={key.label}
            style={createStyles(key.level)}
            createStyles={createStyles}
            label={key.label}
            location={location}
            childrenKeys={key.childrenKeys}
          />
        ))}
      </div>
    </div>
  );
}
