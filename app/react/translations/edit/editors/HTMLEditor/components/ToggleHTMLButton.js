/* @flow */
import React from 'react';

type PropTypes = {
  editAsRaw: boolean,
  toggleRawEdit: Function
};

export default function ToggleHTMLButton({ toggleRawEdit, editAsRaw }: PropTypes) {
  const text = editAsRaw ? 'HTML Editor' : 'Raw HTML';
  return (
    <button onClick={toggleRawEdit}>
      {text}
    </button>
  );
}
