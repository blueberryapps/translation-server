import Radium from 'radium';
import React from 'react';
import { Form } from 'onion-form';

import Icon from './Icon.react';
import { colors } from '../globals';
import { Searchbar } from './fields';
import { searchValidations as validations } from '../configs/search/validations';

type SearchProps = {
  onChange: Function,
  onClear: Function,
  search: string,
};

@Radium
export default class Search extends React.PureComponent {
  props: SearchProps

  render() {
    const { onChange, onClear, search } = this.props;

    return (
      <Form name="searchForm" validations={validations}>
        <div style={styles.search}>
          <Searchbar
            defaultValue={search}
            onChange={onChange}
            placeholder="Search through translations"
          />
          <Icon color={colors.inputColor} kind="close" size={16} wrapperStyle={[styles.searchButton, styles.clear]} onClick={onClear} />
          <Icon color="white" kind="magnifier" size={16} wrapperStyle={styles.searchButton} />
        </div>
      </Form>
    );
  }
}

const styles = {
  search: {
    display: 'flex',
    position: 'relative',
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
  },
  clear: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: '40px',
    opacity: .5,
    top: 0,
    transition: 'opacity .2s',
    ':hover': {
      opacity: 1,
    }
  },
};
