/* @flow */
import React from 'react';

type PropTypes = {
  value: string
}

export default function ArrayRenderer({ value }: PropTypes): React$Element<*> {
  let parsedArray;
  try {
    parsedArray = JSON.parse(value);
  } catch (e) {
    parsedArray = [];
  }
  return (
    <div>
      {parsedArray.map((element, i) =>
        <div key={`${element}${i * 3}`}>
          {`${element}`}
        </div>
      )}
    </div>
  );
}
