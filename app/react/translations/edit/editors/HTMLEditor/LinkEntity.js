/* @flow */
import React from 'react';

const Link = ({ children, contentState, entityKey }: { children: Node, contentState: Object, entityKey: string }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a href={url}>
      {children}
    </a>
  );
};

export default Link;
