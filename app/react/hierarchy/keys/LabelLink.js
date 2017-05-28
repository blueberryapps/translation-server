// @flow
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { actions } from 'onion-form';
import { setBreadcrumbPath } from '../actions';

import type { LocationWithQuery } from '../../types/locationTypes';

type PropTypes = {
  location: LocationWithQuery,
  path: Array<string>,
  label: string,

  setPath: Function,
  setFormFieldProperty: Function
};


class LabelLink extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.newSearch = props.path.join('.');
  }

  props: PropTypes
  newSearch: string

  handleSearch = () => {
    const { setFormFieldProperty, setPath, path } = this.props;
    setFormFieldProperty('searchForm', 'SearchField', 'value', this.newSearch);
    setPath(path);
  }

  render() {
    const { location, label } = this.props;
    return (
      <Link
        onClick={this.handleSearch}
        to={{
          ...location,
          query: {
            ...location.query,
            search: this.newSearch,
            page: '1',
            edited: 'all'
          }
        }}
      >
        {label}
      </Link>
    );
  }
}

export default connect(() => ({}), {
  setFormFieldProperty: actions.setFormFieldProperty,
  setPath: setBreadcrumbPath
})(LabelLink);
