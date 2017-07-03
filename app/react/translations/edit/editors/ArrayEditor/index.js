/* @flow */
import React from 'react';

import EditorSave from '../EditorSave';
import ElementEditor from './ElementEditor';
import generateListOf from './generateListOf';
import mapProps from './mapProps';
import UnsavedLabel from '../UnsavedLabel';

import type { ArrayInfo } from './ElementEditor';
import type { FieldInfo } from '../../index';
import type { InputEvent } from '../../../../types/generalTypes';

type PropTypes = {
  handleBlur: Function,
  handleFocus: Function,
  handleChangeSelectedInput: Function,
  fieldInfo: FieldInfo,
  focused: boolean,
  // eslint-disable-next-line no-undef
  List: ReactClass<any>,
  onChange: Function,
  onSubmit: Function,
  saved: boolean,
  selectedInput: number,
  value: Array<string>,
};

const parseArray = (propValue: any, propKey: string) => {
  switch (propKey) {
    case 'value':
      return propValue && JSON.parse(propValue);
    case 'onChange': return (value, fieldId) =>
      propValue(JSON.stringify(value), fieldId);
    case 'onSubmit': return (value, fieldId) =>
      propValue(JSON.stringify(value), fieldId);
    default:
      return propValue;
  }
};

@mapProps(parseArray)
@generateListOf(ElementEditor)
export default class ArrayEditor extends React.PureComponent {
  props: PropTypes

  popArray = () => {
    const { onChange, fieldInfo, value }: PropTypes = this.props;
    const updatedArray = value.slice(0, value.length - 1);

    onChange(updatedArray, fieldInfo);
  }
  pushArray = () => {
    const { onChange, fieldInfo, value }: PropTypes = this.props;
    const updatedArray: Array<string> = [...value, ''];

    onChange(updatedArray, fieldInfo);
  }

  updateArray = (index: number, newValue: string) => {
    const { onChange, fieldInfo, value }: PropTypes = this.props;
    const updatedArray = value.map((el, i) => (i === index) ? newValue : el);

    onChange(updatedArray, fieldInfo);
  }

  handleChange = (event: InputEvent, { index }: ArrayInfo) => {
    event.preventDefault();
    const newValue: string = event.currentTarget.value;

    this.updateArray(index, newValue);
  }

  handleKeyDown = (event: InputEvent, { index, length }: ArrayInfo) => {
    const isEmpty: boolean = event.currentTarget && !event.currentTarget.value;
    const isLast: boolean = index === length - 1;

    if (event.keyCode === 13) {
      this.pushArray();
    }
    if (event.keyCode === 8 && isLast && isEmpty) {
      event.preventDefault();
      this.popArray();
    }
    if (event.keyCode === 9 && isLast) {
      this.handleSubmit(event);
    }
  }

  handleSubmit = (e: Event) => {
    if (e) e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    const { handleBlur, handleFocus, focused, saved, List, selectedInput, handleChangeSelectedInput }: PropTypes = this.props;

    return (
      <div>
        <div style={styles.wrapper}>
          {List &&
            <List
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onBlur={handleBlur}
              onFocus={handleFocus}
              selectedInput={selectedInput}
              saved={saved}
              focused={focused}
              handleChangeSelectedInput={handleChangeSelectedInput}
            />
          }
          <UnsavedLabel focused={focused} saved={saved} />
        </div>
        <EditorSave onClick={this.handleSubmit} saved={saved} focused={focused} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative'
  }
};
