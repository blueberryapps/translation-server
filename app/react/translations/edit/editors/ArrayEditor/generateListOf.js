/* @flow */
import React from 'react';

import EditorWrapper from '../EditorWrapper';

type PropTypes = {
  value: Array<string>
}

type ListProps = {
  focused: boolean,
  handleBlur: Function,
  handleFocus: Function,
  handleChangeSelectedInput: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  onKeyDown: Function,
  saved: boolean,
  selectedInput: number
};

type StateTypes = {
  elements: Object,
  // eslint-disable-next-line no-undef
  list: ReactClass<any> | null,
  shouldFocus: boolean
}
// eslint-disable-next-line no-undef
export default function generateListOf(Element: ReactClass<any>) {
  // eslint-disable-next-line no-undef
  return (Wrapped: ReactClass<any>) =>
    class Decorator extends React.Component {
      constructor(props: PropTypes) {
        super(props);
        this.state = {
          list: null,
          elements: {},
          shouldFocus: false
        };
      }
      props: PropTypes
      state: StateTypes

      componentWillMount = () => this.initializeValues(this.props.value);

      componentWillReceiveProps = (nextProps: PropTypes) => {
        const lengthChanged: boolean = nextProps.value.length !== this.props.value.length;
        if (lengthChanged) {
          this.setState({ shouldFocus: true });
          this.initializeValues(nextProps.value);
        } else {
          this.updateValues(nextProps.value);
        }
      }

      initializeValues = (value: Array<string>) => {
        this.updateValues(value, () =>
          this.createList(value));
      }

      updateValues = (value: Array<string>, cb?: Function) => {
        const elements = value.reduce((acc: Object, el: string, i: number) => ({
          ...acc,
          [i]: el
        }), {});
        this.setState({ elements }, cb);
      }

      createList = (value: Array<string>) => {
        const length: number = value.length;
        const { selectedInput, handleChangeSelectedInput, saved, focused, handleFocus, handleBlur } = this.props;
        const { shouldFocus } = this.state;
        const list = (props: ListProps) => (
          <EditorWrapper focused={focused}>
            <ul style={styles.list}>
              {value.map((el: string, i: number): Element => (
                <li key={`${i * 4}4`} style={styles.item}>
                  <Element
                    index={i}
                    shouldFocus={shouldFocus}
                    length={length}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    saved={saved}
                    selectedInput={selectedInput}
                    handleChangeSelectedInput={handleChangeSelectedInput}
                    value={this.state.elements[i]}
                    {...props}
                  />
                </li>))}
            </ul>
          </EditorWrapper>
        );
        this.setState({ list });
      }

      render() {
        return (
          <Wrapped
            List={this.state.list}
            {...this.props}
          />
        );
      }
    };
}

const styles = {
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  item: {
    margin: '10px 0'
  }
};
