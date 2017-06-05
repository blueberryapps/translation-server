import React from 'react';
import { connect } from 'react-redux';

import { initField } from '../../forms/releases/actions';

type PropTypes = {
  level: number,
  label: string,
  path: Array<string>,
  createStyles: Function,
  styles: Object,
  resetParents: Function,
  childrenKeys: Array<Object>,
  checked: ?boolean
};

@connect(() => ({}), { initField })
export default class Key extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  props: PropTypes

  handleToggle = () => {
    const { resetParents } = this.props;
    if (this.state.checked && resetParents) resetParents();
    this.setState({ checked: !this.state.checked });
  }

  resetParents = () => {
    const { resetParents } = this.props;

    if (resetParents) resetParents();
    this.setState({ checked: false });
  }

  render() {
    console.log('and thus we render state', this.state);
    return (
      <div style={this.props.styles}>
        <input
          onChange={this.handleToggle}
          type="checkbox"
          checked={this.state.checked}
        />
        <span>
          {this.props.label}
        </span>
        {
          <div>
            {this.props.childrenKeys.map(key => (
              <Key
                checked={this.state.checked}
                key={key.label}
                resetParents={this.resetParents}
                createStyles={this.props.createStyles}
                styles={this.props.createStyles(key.level)}
                {...key}
              />
            ))}
          </div>
        }
      </div>
    );
  }
}
