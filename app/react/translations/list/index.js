/* @flow */
// Tools and Libraries
import React, { PureComponent } from 'react';
import preload from 'redux-preload';
import { push as pushLocation } from 'react-router-redux';
import { connect } from 'react-redux';
import queryListener from '../../utils/queryListener';
import createWaitFor from '../../utils/waitFor';
import toJS from '../../utils/toJS';

// Actions
import { fetchKeys } from '../../keys/actions';
import { fetchLocale } from '../../locales/actions';
import { fetchProjects } from '../../projects/actions';

// Components
import Translation from '../detail';
import VerticalMenu from '../../app/menu/VerticalMenu.react';
import Menubar from '../../app/menu/Menubar.react';
import Paginator from '../../components/Paginator.react';
import Header from '../../app/Header.react';
import Breadcrumbs from '../../hierarchy/Breadcrumbs';

// Selectors
import { getKeysMerged } from '../../keys/selectors';
import { getLocalesMerged } from '../../locales/selectors';
import { getProjectsMerged } from '../../projects/selectors';

// Types
import type { TranslationParamsType, TranslationsLocationType } from '../../types/locationTypes';
import type { PaginationType } from '../../types/generalTypes';
import type { KeyEntityType, LocaleEntityType, ProjectEntityType } from '../../types/entityTypes';

const preloader = <div>Preloading</div>;
const waitFor = createWaitFor(preloader);
const shouldFetchKeys = trigger => (
  trigger.indexOf('page') > -1
  || trigger.indexOf('edited') > -1
  || trigger.indexOf('search') > -1
);
type PropTypes = {
  pagination: PaginationType,
  location: TranslationsLocationType,
  isVerticalMenuShown: boolean,
  keys: Array<KeyEntityType>,
  currentLocale: LocaleEntityType,
  project: ProjectEntityType,
  params: TranslationParamsType,
  breadcrumbPath: Array<string>,
  path: Array<string>,
  push: Function,
  saveTranslation: Function,
  toggleHierarchy: Function,
  fillTranslation: Function
};

type StateTypes = {
  pressedKeyCode: ?number
};

@preload([fetchKeys, fetchLocale, fetchProjects])
@connect(
  (state, { params, params: { localeId, projectId }, location: { query } }) => ({
    pagination: state.keys.pagination,
    keys: getKeysMerged(query, params)(state),
    currentLocale: getLocalesMerged(state.locales)
      .find(l => +l.get('id') === +localeId),
    isVerticalMenuShown: state.ui.get('isVerticalMenuShown'),
    project: getProjectsMerged(state.projects)
      .find(p => +p.get('id') === +projectId),
    path: state.hierarchy.breadcrumbPath
  }),
  { fetchLocale, push: pushLocation },
)
@waitFor(({ keys, locales, projects }) => ([
  locales.pending,
  keys.pending,
  projects.pending
]))
@queryListener((trigger, props) => {
  if (shouldFetchKeys(trigger)) return fetchKeys.bind(null, props);
  return { type: 'QUERY_CHANGED', payload: { trigger, props } };
})
@toJS
export default class Translations extends PureComponent {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      pressedKeyCode: null
    };
  }

  state: StateTypes

  props: PropTypes

  registerPressKey = ({ keyCode }: KeyboardEvent) =>
    this.setState({ pressedKeyCode: keyCode })

  render() {
    const {
      pagination,
      location: { query: { page } },
      location,
      isVerticalMenuShown,
      keys,
      currentLocale,
      project,
      params: {
        localeId
      },
      push,
      saveTranslation,
      fillTranslation,
      path
    } = this.props;

    return (
      <div>
        <Header push={push} location={location} page={page} />
        <Menubar
          totalCount={currentLocale && currentLocale.translationCount}
          translatedCount={currentLocale && currentLocale.translatedCount}
          location={location}
          push={push}
          isVerticalMenuShown={isVerticalMenuShown}
          toggleHierarchy={this.props.toggleHierarchy}
        />
        <div style={styles.wrapper}>
          <Breadcrumbs
            path={path}
            location={location}
          />
          <VerticalMenu
            location={{
              ...location,
              params: { localeId },
            }}
            isShown={isVerticalMenuShown}
          />
          <div style={styles.translations}>
            {keys.map(key => (
              <Translation
                saveTranslation={saveTranslation}
                fillTranslation={fillTranslation}
                translationKey={key.key}
                page={page}
                location={location}
                registerPressKey={this.registerPressKey}
                pressedKeyCode={this.state.pressedKeyCode}
                currentTranslation={key.translations[+localeId]}
                defaultTranslation={project && key.translations[project.defaultLocaleId]}
                {...key}
              />
            ))}
          </div>
        </div>
        {pagination &&
          <Paginator {...pagination} location={location} />
        }
      </div>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#F7F7F7',
    display: 'flex'
  },
  translations: {
    flex: '1 1 auto',
    padding: '40px 100px',
  }
};
