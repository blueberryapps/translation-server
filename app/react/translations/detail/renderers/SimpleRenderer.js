/* @flow */
import React from 'react';
import RendererWrapper from './RendererWrapper';

type PropTypes = {
  value: string
};

export default function SimpleRenderer({ value }: PropTypes) {
  return (
    <RendererWrapper>
      {value}
    </RendererWrapper>
  );
}
