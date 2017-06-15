/* @flow */
import React from 'react';

import EditorWrapper from '../EditorWrapper';
import { colors } from '../../../../globals';

type PropTypes = {
  value: Array<string>
}

type ListProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  onKeyDown: Function
};

type StateTypes = {
  // eslint-disable-next-line no-undef
  list: ReactClass<any> | null,
  elements: Object,
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
        const { shouldFocus } = this.state;
        const list = (props: ListProps) => (
          <EditorWrapper>
            <ul style={styles.list}>
              {value.map((el: string, i: number): Element => (
                <li key={`${i * 4}4`} style={styles.item}>
                  <span style={styles.circle}>{i + 1}</span>
                  <Element
                    index={i}
                    shouldFocus={shouldFocus}
                    length={length}
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
    display: 'flex',
    margin: '10px 0'
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
    fontWeight: 900,
    color: colors.white,
    backgroundColor: colors.inputBorder,
    transition: 'background-color .2s'
  },
  selected: {
    backgroundColor: colors.primary
  }
};
