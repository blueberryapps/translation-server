/* @flow */
import React, { PureComponent } from 'react';
import TranslationEditor from '../edit';

import type { TranslationEntityType } from '../../types/entityTypes';
import type { LocationWithQuery } from '../../types/locationTypes';

import SimpleRenderer from './renderers/SimpleRenderer';
import HTMLRenderer from './renderers/HTMLRenderer';
import ArrayRenderer from './renderers/ArrayRenderer';
import BooleanRenderer from './renderers/BooleanRenderer';
import KeyRenderer from './renderers/KeyRenderer';

const typeRegistry = {
  html: HTMLRenderer,
  array: ArrayRenderer,
  boolean: BooleanRenderer,
  string: SimpleRenderer,
  symbol: SimpleRenderer,
  integer: SimpleRenderer,
  float: SimpleRenderer,
};

type PropTypes = {
  currentTranslation: TranslationEntityType,
  dataType: string,
  defaultTranslation: TranslationEntityType,
  edited: string,
  location: LocationWithQuery,
  note?: string,
  page: string,
  registerTabPress: Function,
  tabPressed: ?boolean,
  translationKey: string,
};

export default class Translation extends PureComponent {
  static defaultProps = {
    note: '',
  };

  state = {
    selectedInput: null
  };

  props: PropTypes;

  handleChangeSelectedInput = (index) => {
    this.setState({ selectedInput: index });
  }

  render() {
    const {
      currentTranslation,
      dataType,
      defaultTranslation,
      edited,
      location,
      note,
      page,
      registerTabPress,
      tabPressed,
      translationKey
    } = this.props;
    const { selectedInput } = this.state;
    const shouldRenderDefaultTranslation = defaultTranslation && (defaultTranslation.id !== currentTranslation.id);
    const DefaultTranslation = typeRegistry[dataType];
    const newTranslation = edited === 'new';

    return (
      <div style={styles.wrapper}>
        <KeyRenderer
          translationKey={translationKey}
          location={location}
        />
        {note &&
          <div style={styles.note}>
            {note}
          </div>
        }
        {shouldRenderDefaultTranslation && (
          // this subcompontent exists to make styling easier later
          <DefaultTranslation
            value={defaultTranslation.text}
            selectedInput={selectedInput}
          />
        )}
        <TranslationEditor
          dataType={dataType}
          handleChangeSelectedInput={this.handleChangeSelectedInput}
          page={page}
          tabPressed={tabPressed}
          registerTabPress={registerTabPress}
          selectedInput={selectedInput}
          translation={currentTranslation}
          newTranslation={newTranslation}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)',
    marginBottom: '50px'
  },
  note: {
    padding: '10px 25px',
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)',
  }
};
