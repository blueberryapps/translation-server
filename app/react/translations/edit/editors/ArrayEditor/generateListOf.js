import React from 'react';

type PropTypes = {
  value: Array<string>
}

export default function generateListOf(Element) {
  return Wrapped =>
    class Decorator extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          list: null,
          elements: {},
        };
      }
      props: PropTypes

      componentWillMount = () =>
        this._initializeValues(this.props.value)

      componentWillReceiveProps = (nextProps: PropTypes) => {
        const lengthChanged = nextProps.value.length !== this.props.value.length;
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

      _updateValues = (value: Array<string>, cb: Function) => {
        const elements = value.reduce((acc, el, i) => ({
          ...acc,
          [i]: el
        }), {});
        this.setState({ elements }, cb);
      }

      _createList = (value: Array<string>) => {
        const length: number = value.length;
        const list = props => (
          <ul>
            {value.map((el: string, i: number): HTMLElement => (
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
