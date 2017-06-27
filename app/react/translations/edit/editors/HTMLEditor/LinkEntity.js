/* @flow */
import React from 'react';

const Link = ({ children, contentState, entityKey }: { children: Node, contentState: Object, entityKey: string }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  console.log(url);
  return (
    <a href={url}>
      {children}
    </a>
  );
};

export default Link;
