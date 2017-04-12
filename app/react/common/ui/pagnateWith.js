import React, { PureComponent, PropTypes as RPT } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

export default function paginateWith(onPageChange) {
  return (Decorated) => {
    @connect(() => ({}), { onPageChange })
    @withRouter
    class PageWrapper extends PureComponent {
      static defaultProps = {
        query: {},
      };
      static propTypes = {
        onPageChange: RPT.func.isRequired,
        query: RPT.shape({ page: RPT.string }),
      };
      componentWillReceiveProps(nextProps) {
        if (this.props.query.page !== nextProps.query.page) {
          this.props.onPageChange(nextProps);
        }
      }
      render() {
        return <Decorated {...this.props} />;
      }
    }
    return PageWrapper;
  };
}
