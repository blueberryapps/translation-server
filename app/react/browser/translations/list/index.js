/* @flow */
import React, { PureComponent } from 'react';
import preload from 'redux-preload';
import { push as pushLocation } from 'react-router-redux';
import { connect } from 'react-redux';
import * as keysActions from '../../../common/keys/actions';
import { fetchLocale } from '../../../common/locales/actions';
import { fetchProjects } from '../../../common/projects/actions';
import Translation from '../detail';
import VerticalMenu from '../../app/menu/VerticalMenu.react';
import Menubar from '../../app/menu/Menubar.react';
import Paginator from '../../components/Paginator.react';
import paginateWith from '../../../common/ui/pagnateWith';
import Header from '../../app/Header.react';
import createWaiter from '../../../common/ui/waiter';

import type { TranslationsProps } from '../types';

const preloader = <div>Preloading</div>;
const waiter = createWaiter(preloader);


@connect(
  (state, { params: { localeId, projectId } }) => ({
    keys: state.keys
      .get('locales')
      .get(localeId),
    pagination: state.keys.get('pagination'),
    project: state.projects.list[projectId],
    locale: state.locales
      .get('list')
      .get(localeId),
    isVerticalMenuShown: state.ui.get('isVerticalMenuShown'),
  }),
  { fetchLocale, push: pushLocation },
)
@waiter(({ keys, locales, projects }) => ([
  locales.pending,
  keys.pending,
  projects.pending
]))
@preload([keysActions.fetchKeys, fetchLocale, fetchProjects])
@paginateWith(keysActions.fetchKeys)
export default class Translations extends PureComponent {
  static defaultProps = {
    locale: {},
    pagination: {},
    keys: [],
    params: {}
  };
  props: TranslationsProps

  render() {
    const {
      isVerticalMenuShown,
      locale: {
        translationCount,
        translatedCount
      },
      pagination,
      keys,
      params: {
        localeId
      },
      location,
      project: {
        defaultLocaleId
      },
      push,
      toggleHierarchy
    } = this.props;


    return (
      <div>
        <Header push={push} />
        <Menubar
          totalCount={translationCount}
          localeId={localeId}
          location={location}
          push={push}
          isVerticalMenuShown={isVerticalMenuShown}
          translatedCount={translatedCount}
          toggleHierarchy={toggleHierarchy}
        />
        <div style={styles.wrapper}>
          {isVerticalMenuShown && <VerticalMenu />}
          {keys &&
            keys.map(key => (
              <Translation
                {...key}
                translationKey={key.key}
                localeId={localeId}
                defaultLocaleId={defaultLocaleId}
              />
            ))}
        </div>
        {pagination && <Paginator {...pagination.toJS()} location={location} />}
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
