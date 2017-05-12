/* @flow */
import React from 'react';

type PropTypes = {
  value: string
}

export default function ArrayRenderer({ value }: PropTypes) {
  const parsedArray: Array<*> = JSON.parse(value);
  return (
    <div>
      {parsedArray.map(element =>
        <div>{`${element}`}</div>
      )}
    </div>
  );
}
