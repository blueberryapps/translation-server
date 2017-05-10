import React, { PureComponent } from 'react';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router';

/*
  ReactPaginate calls "onPageChange" even on mount of component.
  This way this redundant call is avoided, as "onPageChange" is
  undefined by the time of mounting.
*/
function handleChangePage({ selected: page }) {
  this.props.router.push({
    ...this.props.location,
    query: { ...this.props.location.query, page: page + 1 },
  });
}

@withRouter
export default class Paginator extends PureComponent {
  static defaultProps = {
    totalPages: 1,
  };

  constructor(props) {
    super(props);
    this.handleChangePage = () => {};
  }

  componentDidMount() {
    this.handleChangePage = handleChangePage.bind(this);
  }

  props: {
    location: { query: { page: string } }, // eslint-disable-line react/no-unused-prop-types
    totalPages?: number
  }

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
