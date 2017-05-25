// @flow
import React from 'react';
import LabelLink from './keys/LabelLink';

type PropTypes = {
  path: Array<string>,
  location: Object
};

const Separator = (<span> &gt; </span>);

export default function Breadcrumbs({ path, location }: PropTypes) {
  return (
    <div>
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
