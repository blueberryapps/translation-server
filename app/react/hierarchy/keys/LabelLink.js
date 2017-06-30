// @flow
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { actions } from 'onion-form';
import { setBreadcrumbPath } from '../actions';
import { colors } from '../../globals';
import { basename } from '../../configureStoreWithHistory';

import type { LocationWithQuery } from '../../types/locationTypes';

type PropTypes = {
  location: LocationWithQuery,
  path: Array<string>,
  label: string,

  setPath: Function,
  setFormFieldProperty: Function
};

const serialize = (obj) => {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

class LabelLink extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.newSearch = props.path.join('.');
  }

  props: PropTypes
  newSearch: string

  handleSearch = (event) => {
    const { setFormFieldProperty, setPath, path } = this.props;
    setFormFieldProperty('searchForm', 'SearchField', 'value', this.newSearch);
    setPath(path);
  }

  render() {
    const { location, label } = this.props;
    const query = {
      search: this.newSearch,
      page: '1',
      edited: 'all'
    }
    return (
      <Link
        onClick={this.handleSearch}
        to={{
          pathname: location.pathname.replace(basename, ''),
          search: `?${serialize(query)}`
        }}
        style={styles.link}
      >
        {label}
      </Link>
    );
  }
}

const styles = {
  link: {
    color: colors.primary,
    textDecoration: 'underline',
    display: 'inline-block',
    fontSize: '16px'
  }
};

export default connect(() => ({}), {
  setFormFieldProperty: actions.setFormFieldProperty,
  setPath: setBreadcrumbPath
})(LabelLink);
