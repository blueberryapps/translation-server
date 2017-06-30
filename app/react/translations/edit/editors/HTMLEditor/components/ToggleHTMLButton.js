/* @flow */
import React from 'react';
import { colors } from '../../../../../globals';

type PropTypes = {
  editAsRaw: boolean,
  toggleRawEdit: Function
};

export default function ToggleHTMLButton({ toggleRawEdit, editAsRaw }: PropTypes) {
  const text = editAsRaw ? 'Wysiwyg editor' : 'Edit in HTML';
  return (
    <button onClick={toggleRawEdit} style={styles.button}>
      {text}
    </button>
  );
}

const styles = {
  button: {
    height: '37px',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0px 12px',
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: colors.white
  }
};
