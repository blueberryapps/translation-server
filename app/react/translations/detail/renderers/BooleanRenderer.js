/* @flow */
import React from 'react';
import RendererWrapper from './RendererWrapper';
import Checkbox from '../../../components/Checkbox.react';

type PropTypes = {
  value: string
};

export default function BooleanRenderer({ value }: PropTypes) {
  return (
    <RendererWrapper>
      <Checkbox
        disabled
        value={value}
      />
    </RendererWrapper>
  );
}
