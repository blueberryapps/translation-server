import React, { PureComponent } from 'react';
import ReactPaginate from 'react-paginate';
import { Style } from 'radium';
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
    totalPages: 0,
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

    if (totalPages === 0) return null;

    return (
      <div>
        <Style rules={styles} scopeSelector=".pagination" />
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          containerClassName="pagination"
          activeClassName="active"
          initialPage={+page.page - 1}
          marginPagesDisplayed={2}
          onPageChange={this.handleChangePage}
        />
      </div>
    );
  }
}

const styles = {
  '.break': {
    position: 'relative',
    float: 'left',
    padding: '6px 12px',
    lineHeight: '1.42857',
    textDecoration: 'none',
    color: '#337ab7',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    marginLeft: '-1px',
  },
  'li > a': {
    cursor: 'pointer'
  },
  '.disabled > a': {
    cursor: 'not-allowed'
  }
};
