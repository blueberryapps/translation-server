import React from 'react';
import { connect } from 'react-redux';

import { ID } from '../../types/generalTypes';

type PropTypes = {
  toggle: Function,
  params: Object,
  id: ID,
  status: boolean,
  label: string,
  childrenKeys: Array<Object>
};

@connect((state, { params: { localeId, projectId }, id }) => ({
  status: state.releases[projectId] && state.releases[projectId][localeId][id]
}))
export default class Key extends React.Component {
  props: PropTypes

  handleToggle = () => {
    const { toggle, id, params } = this.props;
    return toggle(id, params);
  }

  render() {
    const { status, label, childrenKeys, params, toggle } = this.props;
    return (
      <div>
        <input
          onChange={this.handleToggle}
          type="checkbox"
          value={status}
        />
        <span>
          {label}
        </span>
        {!!childrenKeys.length && (
          <div>
            {childrenKeys.map(child => (
              <Key
                id={child.id}
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
