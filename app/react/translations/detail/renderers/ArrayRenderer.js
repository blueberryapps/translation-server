/* @flow */
import Radium from 'radium';
import React, { PureComponent } from 'react';

import RendererWrapper from './RendererWrapper';
import { colors } from '../../../globals';

type PropTypes = {
  selectedInput: number,
  value: string
}

@Radium
export default class Translation extends PureComponent {
  props: PropTypes;

  render() {
    const { value, selectedInput } = this.props;

    let parsedArray;
    try {
      parsedArray = JSON.parse(value);
    } catch (e) {
      parsedArray = [];
    }
    return (
      <RendererWrapper>
        {parsedArray.map((element, i) =>
          (<div key={`${element}${i * 3}`} style={styles.wrapper}>
            <span style={[styles.circle, selectedInput === i && styles.selected]}>{i + 1}</span> {element}
          </div>)
        )}
      </RendererWrapper>
    );
  }
}

const styles = {
  wrapper: {
    fontSize: '16px',
    display: 'flex',
    marginRight: '18px',
    alignItems: 'center'
  },
  circle: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    marginRight: '5px',
    color: colors.white,
    backgroundColor: colors.inputBorder,
    fontWeight: 900,
    transition: 'background-color .2s'
  },
  selected: {
    backgroundColor: colors.primary
  }
};
