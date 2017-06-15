/* @flow */
import React from 'react';
import DOMPurify from 'dompurify';
import RendererWrapper from './RendererWrapper';

type PropTypes = {
  value: string
}

export default function HTMLRenderer({ value }: PropTypes) {
  return (
    <RendererWrapper>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </RendererWrapper>
  );
}
