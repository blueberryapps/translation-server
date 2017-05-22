/* @flow */
import React from 'react';

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
  elements: Object
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
        };
      }
      props: PropTypes
      state: StateTypes


      componentWillMount = () =>
        this._initializeValues(this.props.value)

      componentWillReceiveProps = (nextProps: PropTypes) => {
        const lengthChanged: boolean = nextProps.value.length !== this.props.value.length;
        if (lengthChanged) {
          this._initializeValues(nextProps.value);
        } else {
          this._updateValues(nextProps.value);
        }
      }

      _initializeValues = (value: Array<string>) => {
        this._updateValues(value, () =>
          this._createList(value));
      }

      _updateValues = (value: Array<string>, cb?: Function) => {
        const elements = value.reduce((acc: Object, el: string, i: number) => ({
          ...acc,
          [i]: el
        }), {});
        this.setState({ elements }, cb);
      }

      _createList = (value: Array<string>) => {
        const length: number = value.length;
        const list = (props: ListProps) => (
          <ul>
            {value.map((el: string, i: number): Element => (
              <li>
                <Element
                  index={i}
                  length={length}
                  key={`${i * 4}4`}
                  value={this.state.elements[i]}
                  {...props}
                />
              </li>))}
          </ul>
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
