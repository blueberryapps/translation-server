import Radium from 'radium';
import React from 'react';
import { Form } from 'onion-form';

import Icon from './Icon.react';
import { colors } from '../globals';
import { Searchbar, SearchSelect } from './fields';
import { searchValidations as validations } from '../configs/search/validations';

type SearchProps = {
  search: string,
  onChange: Function
};

@Radium
export default class Search extends React.PureComponent {
  props: SearchProps

  render() {
    const { onChange, search } = this.props;

    return (
      <Form name="searchForm" validations={validations}>
        <div style={styles.search}>
          <Searchbar
            defaultValue={search}
            onChange={onChange}
            placeholder="Search through translations"
          />
          <Icon color="white" kind="magnifier" size={16} wrapperStyle={styles.searchButton} />
        </div>
      </Form>
    );
  }
}

const styles = {
  search: {
    display: 'flex',
    alignItems: 'center'
  },
  searchButton: {
    cursor: 'pointer',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  }
};
