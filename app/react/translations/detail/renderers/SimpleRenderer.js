/* @flow */
import React, { PureComponent } from 'react';
import RendererWrapper from './RendererWrapper';

type PropTypes = {
  value: string
};

export default class SimpleRenderer extends PureComponent {
  props: PropTypes

  render() {
    return (
      <RendererWrapper>
        {this.props.value}
      </RendererWrapper>
    );
  }
}
