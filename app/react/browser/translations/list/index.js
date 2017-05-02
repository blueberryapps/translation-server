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
import { getKeysMerged } from '../../../common/keys/selectors';
import { getLocalesMerged } from '../../../common/locales/selectors';
import { getProjectsMerged } from '../../../common/projects/selectors';
import type { TranslationsProps } from '../types';

const preloader = <div>Preloading</div>;
const waiter = createWaiter(preloader);

@preload([fetchKeys, fetchLocale, fetchProjects])
@connect(
  (state, { params: { localeId, projectId } }) => ({
    pagination: state.keys.pagination,
    keys: getKeysMerged(state.keys),
    currentLocale: getLocalesMerged(state.locales)
      .filter(l => l.id === +localeId)[0] || {},
    isVerticalMenuShown: state.ui.isVerticalMenuShown,
    project: getProjectsMerged(state.projects)
      .filter(p => p.id === +projectId)[0]
  }),
  { fetchLocale, push: pushLocation },
)
@waiter(({ keys, locales, projects }) => ([
  locales.pending,
  keys.pending,
  projects.pending
]))
@paginateWith(fetchKeys)
export default class Translations extends PureComponent {

  props: TranslationsProps

  render() {
    const {
      pagination,
      location,
      isVerticalMenuShown,
      keys,
      currentLocale,
      project,
      params: {
        localeId
      }
    } = this.props;

    return (
      <div>
        <Header push={this.props.push} />
        <Menubar
          totalCount={currentLocale && currentLocale.translationCount}
          translatedCount={currentLocale && currentLocale.translatedCount}
          location={this.props.location}
          push={this.props.push}
          isVerticalMenuShown={isVerticalMenuShown}
          toggleHierarchy={this.props.toggleHierarchy}
        />
        <div style={styles.wrapper}>
          {isVerticalMenuShown && <VerticalMenu />}

          {keys.map(key => (
            <Translation
              saveTranslation={this.props.saveTranslation}
              fillTranslation={this.props.fillTranslation}
              translationKey={key.key}
              page={location.query.page}
              currentTranslation={key.translations[localeId]}
              defaultTranslation={project && key.translations[project.defaultLocaleId]}
              {...key}
            />
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
