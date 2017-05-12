/* @flow */
import React from 'react';
import { Box } from 'radium-flex';

type PropTypes = {
  value: string
};

export default function BooleanRenderer({ value }: PropTypes) {
  return (
    <Box>
      {value}
    </Box>
  );
}
