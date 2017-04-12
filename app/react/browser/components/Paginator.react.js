import React, { PropTypes as RPT, PureComponent } from 'react';
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

  onPrevClick = () =>
    this.props.router.push({
      ...this.props.location,
      query: { ...this.props.location.query, page: +this.props.location.query.page - 1 },
    });

  onNextClick = () =>
    this.props.router.push({
      ...this.props.location,
      query: { ...this.props.location.query, page: +this.props.location.query.page + 1 },
    });

  render() {
    const { totalPages, location: { query: page } } = this.props;
    return (
      <div>
        {+page.page > 1 && <button onClick={this.onPrevClick}>Prev</button>}
        {+page.page < totalPages && <button onClick={this.onNextClick}>Next</button>}
      </div>
    );
  }
}
