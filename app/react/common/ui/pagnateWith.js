import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

export default function paginateWith(onPageChange) {
  return (Decorated) => {
    @connect(() => ({}), { onPageChange })
    @withRouter
    class PageWrapper extends PureComponent {
      componentWillReceiveProps(nextProps) {
        if (
          this.props.location.query.page !== nextProps.location.query.page ||
          this.props.location.query.edited !== nextProps.location.query.edited
        ) {
          this.props.onPageChange(nextProps);
        }
      }

      props: {
        onPageChange: Function,
        location: { query: { page: string, edited: string } }
      }

      render() {
        return <Decorated {...this.props} />;
      }
    }
    return PageWrapper;
  };
}
