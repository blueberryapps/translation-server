import React, { PropTypes as RPT, PureComponent } from 'react';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router';

@withRouter
export default class Paginator extends PureComponent {
  static defaultProps = {
    totalPages: 1,
  };
  static propTypes = {
    location: RPT.shape({ query: { page: RPT.string } }).isRequired,
    router: RPT.shape({ push: RPT.func }).isRequired,
    totalPages: RPT.number,
  };

  handleChangePage = ({ selected: page }) => {
    this.props.router.push({
      ...this.props.location,
      // page is +1 becouse ReactPaginate works with zero indexes
      query: { ...this.props.location.query, page: page + 1 },
    });
  };
  render() {
    const { totalPages, location: { query: page } } = this.props;
    return (
      <div>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          initialPage={+page.page}
          marginPagesDisplayed={2}
          onPageChange={this.handleChangePage}
        />
      </div>
    );
  }
}
