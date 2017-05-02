/* @flow */
import React, { PureComponent } from 'react';
import preload from 'redux-preload';
import { push as pushLocation } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchKeys } from '../../../common/keys/actions';
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

@preload([fetchKeys, fetchLocale, fetchProjects])
@connect(
  (state, { params: { localeId, projectId } }) => {
    return {
      // keys: state.keys.getIn(['locales', localeId, 'keys']),
      // pagination: state.keys.getIn(['locales', localeId, 'pagination']),
      // project: state.projects.list[projectId],
      // locale: state.locales.getIn(['list', localeId]),
      // isVerticalMenuShown: state.ui.get('isVerticalMenuShown'),
    };
  },
  { fetchLocale, push: pushLocation },
)
@waiter(({ keys, locales, projects }) => ([
  locales.pending,
  keys.pending,
  projects.pending
]))
@paginateWith(fetchKeys)
export default class Translations extends PureComponent {
  static defaultProps = {
    locale: {},
    pagination: {},
    keys: [],
    params: {}
  };
  props: TranslationsProps

  render() {
    return (
      <div>
        {/* <Header push={push} />
        <Menubar
          totalCount={translationCount}
          translatedCount={translatedCount}
          location={location}
          push={push}
          isVerticalMenuShown={isVerticalMenuShown}
          toggleHierarchy={toggleHierarchy}
        />
        <div style={styles.wrapper}>
          {isVerticalMenuShown && <VerticalMenu />}
          {keys.map(key => (
              <Translation
                saveTranslation={saveTranslation}
                fillTranslation={fillTranslation}

                {...key}
              />
          ))}
        </div>
        {pagination && <Paginator {...pagination} location={location} />} */}
      </div>
    );
  }
}

// unless this locale is default get defaultTranslation
// fetch defaultLocale

const styles = {
  wrapper: {
    backgroundColor: '#F7F7F7',
    height: '300px',
  },
};
