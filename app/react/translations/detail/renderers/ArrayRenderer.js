/* @flow */
import React from 'react';

type PropTypes = {
  value: string
}

export default function ArrayRenderer({ value }: PropTypes) {
  let parsedArray;
  try {
    parsedArray = JSON.parse(value);
  } catch (e) {
    parsedArray = [];
  }
  return (
    <div>
      {parsedArray.map(element =>
        <div>{`${element}`}</div>
      )}
    </div>
  );
}
