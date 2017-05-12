/* @flow */
import React from 'react';
import DOMPurify from 'dompurify';

type PropTypes = {
  value: string
}

export default function HTMLRenderer({ value }: PropTypes) {
  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
  );
}
