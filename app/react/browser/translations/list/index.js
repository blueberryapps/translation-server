import React, { PureComponent } from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';
import * as keysActions from '../../../common/keys/actions';
import { fetchLocale } from '../../../common/locales/actions';
import Translation from '../components/translation.react';
import VerticalMenu from '../../app/menu/VerticalMenu.react';
import Menubar from '../../app/menu/Menubar.react';
import Paginator from '../../components/Paginator.react';
import paginateWith from '../../../common/ui/pagnateWith';
import { composeLocales } from '../helpers';

@connect(
  state => ({
    keyList: state.keys.get('locales').toJS(),
    pagination: state.keys.get('pagination').toJS(),
    locale: state.locales.get('list').toJS(),
    isVerticalMenuShown: state.ui.get('isVerticalMenuShown'),
    query: state.routing.locationBeforeTransitions.query,
  }),
  { fetchLocale },
)
@preload([keysActions.fetchKeys, keysActions.fetchHierarchy, fetchLocale])
@paginateWith(keysActions.fetchKeys)
export default class Translations extends PureComponent {
  static defaultProps = {};

  render() {
    const {
      isVerticalMenuShown,
      localeId,
      totalCount,
      translatedCount,
      currentPage,
      query,
      pagination,
      location,
    } = composeLocales(this.props);

    return (
      <div>
        <Menubar
          totalCount={totalCount}
          localeId={localeId}
          // query={query}
          location={location}
          translatedCount={translatedCount}
        />

        <div style={styles.wrapper}>
          {isVerticalMenuShown && <VerticalMenu />}
          {currentPage &&
            currentPage.map(key => (
              <Translation {...key} translationKey={key.key} localeId={localeId} />
            ))}
        </div>
        {pagination && <Paginator {...pagination} location={location} />}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#F7F7F7',
    height: '300px',
  },
};
