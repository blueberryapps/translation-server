import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { actions } from 'onion-form';
import { setBreadcrumbPath } from '../actions';


type PropTypes = {
  location: Location,
  path: Array<string>,
  label: string,

  setPath: Function,
  setFormFieldProperty: Function
};

@connect(() => ({}), {
  setFormFieldProperty: actions.setFormFieldProperty,
  setPath: setBreadcrumbPath
})
export default class LabelLink extends React.Component {
  constructor(props) {
    super(props);
    this.newSearch = props.path.join('.');
  }

  props: PropTypes

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
