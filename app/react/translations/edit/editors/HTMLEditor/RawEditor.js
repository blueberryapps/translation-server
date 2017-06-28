/* @flow */
import Radium, { Style } from 'radium';
import React from 'react';

import Textarea from 'react-textarea-autosize';
import ToggleHTMLButton from './components/ToggleHTMLButton';
import { colors } from '../../../../globals';

import type { FieldInfo } from '../../index';

type PropTypes = {
  focused: boolean,
  onChange: Function,
  toggleRawEdit: Function,
  editAsRaw: boolean,
  handleBlur: Function,
  handleFocus: Function,
  registerTabPress: Function,
  handleSubmit: Function,
  tabPressed: ?boolean,
  value: string,
  fieldInfo: FieldInfo
}

@Radium
export default class RawEditor extends React.Component {

  props: PropTypes

  handleBlur = () => {
    if (this.props.tabPressed) this.props.handleSubmit();
    this.props.handleBlur();
  }

  handleFocus = () => this.props.handleFocus();

  // eslint-disable-next-line react/no-unused-prop-types
  handleChange = ({ target }: { target: HTMLInputElement }) =>
    this.props.onChange(target.value, this.props.fieldInfo);

  render() {
    const { focused, value, editAsRaw, toggleRawEdit, registerTabPress } = this.props;

    return (
      <div>
        <div style={styles.controls}>
          <ToggleHTMLButton
            editAsRaw={editAsRaw}
            toggleRawEdit={toggleRawEdit}
          />
        </div>
        <div style={[styles.areaWrapper.base, focused && styles.areaWrapper.focused]}>
          <Style rules={textareaStyles} />
          <Textarea
            placeholder="Insert raw HTML"
            value={value}
            onKeyDown={registerTabPress}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            style={styles.textarea}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '25px',
    borderBottom: `1px solid ${colors.inputBorder}`
  },
  textarea: {
    display: 'block',
    padding: '25px 0',
    border: 'none',
    width: '100%',
    minHeight: '40px',
    resize: 'none',
    wordWrap: 'break-word'
  },
  areaWrapper: {
    base: {
      opacity: .6,
      transition: 'opacity .2s'
    },
    focused: {
      opacity: 1
    }
  }
};

const textareaStyles = {
  'textarea:focus': {
    outline: 'none'
  }
};
