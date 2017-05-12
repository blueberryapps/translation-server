/* @flow */
import React from 'react';
import { Box } from 'radium-flex';

type PropTypes = {
  value: string
};

export default function SimpleRenderer({ value }: PropTypes) {
  return (
    <Box>
      {value}
    </Box>
  );
}
