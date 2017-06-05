import React from 'react';
import { connect } from 'react-redux';

import type { ID } from '../../types/generalTypes';

import { initField } from '../../forms/releases/actions';

type PropTypes = {
  toggle: Function,
  params: Object,
  status: boolean,
  label: string,
  childrenKeys: Array<Object>,
  checked: boolean
};

@connect(() => ({}), { initField })
export default class Key extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }
  props: PropTypes

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render() {
    const { status, label, childrenKeys, params, toggle } = this.props;
    return (
      <div>
        <input
          onChange={this.handleToggle}
          type="checkbox"
          value={this.state.checked}
        />
        <span>
          {label}
        </span>
        {!!childrenKeys.length && (
          <div>
            {childrenKeys.map(child => (
              <Key
                ids={child.ids}
                key={child.label}
                checked={this.state.checked}
                params={params}
                toggle={toggle}
                childrenKeys={child.childrenKeys}
                label={child.label}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
