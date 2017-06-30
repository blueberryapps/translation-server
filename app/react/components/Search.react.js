import Radium from 'radium';
import React from 'react';
import { Form } from 'onion-form';

import Image from './Image.react';
import { media } from '../globals';
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
      <div style={styles.search}>
        <Form
          name="searchForm"
          validations={validations}
        >
          <Searchbar
            defaultValue={search}
            onChange={onChange}
            label="Search through translations"
            style={styles.searchbar}
          />
          <SearchSelect style={styles.searchSelect} selectSize={3} />
          <Image src={'/react_assets/searchButton.png'} style={styles.searchButton} />
        </Form>
      </div>
    );
  }
}

const styles = {
  search: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '310px',
    [media.l]: {
      width: '510px'
    }
  },

  searchSelect: {
    height: '35px',
    width: '90px',
    [media.l]: {
      width: '120px'
    }
  },

  searchButton: {
    height: '35px'
  },

  searchbar: {
    width: '90px',
    [media.l]: {
      width: '250px'
    }
  }
};
