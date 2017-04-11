import React, { PureComponent, PropTypes as RPT } from 'react';

export default class ErrorMessage extends PureComponent {
  static propTypes = {
    message: RPT.string.isRequired,
  };

  render() {
    const { message } = this.props;
    return (
      <div>
        {message}
      </div>
    );
  }
}
