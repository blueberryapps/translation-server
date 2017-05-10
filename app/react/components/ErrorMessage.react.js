import React, { PureComponent } from 'react';

export default class ErrorMessage extends PureComponent {
  props: {
    message: string,
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
