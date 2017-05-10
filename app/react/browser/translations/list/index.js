/* @flow */
// Tools and Libraries
import React, { PureComponent } from 'react';
import preload from 'redux-preload';
import { push as pushLocation } from 'react-router-redux';
import { connect } from 'react-redux';
import queryListener from '../../../utils/queryListener';
import createWaiter from '../../../utils/waiter';
import toJS from '../../../utils/toJS';

// Actions
import { fetchKeys } from '../../../common/keys/actions';
import { fetchLocale } from '../../../common/locales/actions';
import { fetchProjects } from '../../../common/projects/actions';

// Components
import Translation from '../detail';
import VerticalMenu from '../../app/menu/VerticalMenu.react';
import Menubar from '../../app/menu/Menubar.react';
import Paginator from '../../components/Paginator.react';
import Header from '../../app/Header.react';

// Selectors
import { getKeysMerged } from '../../../common/keys/selectors';
import { getLocalesMerged } from '../../../common/locales/selectors';
import { getProjectsMerged } from '../../../common/projects/selectors';

// Types
import type { TranslationParamsType, TranslationsLocationType } from '../../../common/types/locationTypes';
import type { PaginationType } from '../../../common/types/generalTypes';
import type { KeyEntityType, LocaleEntityType, ProjectEntityType } from '../../../common/types/entityTypes';

const preloader = <div>Preloading</div>;
const waiter = createWaiter(preloader);

type PropTypes = {
  pagination: PaginationType,
  location: TranslationsLocationType,
  isVerticalMenuShown: boolean,
  keys: Array<KeyEntityType>,
  currentLocale: LocaleEntityType,
  project: ProjectEntityType,
  params: TranslationParamsType,
  push: Function,
  saveTranslation: Function,
  toggleHierarchy: Function,
  fillTranslation: Function
};

type StateTypes = {
  pressedKeyCode: number | null
};

@preload([fetchKeys, fetchLocale, fetchProjects])
@connect(
  (state, { params, params: { localeId, projectId }, location: { query } }) => ({
    pagination: state.keys.pagination,
    keys: getKeysMerged(query, params)(state).toJS(),
    currentLocale: getLocalesMerged(state.locales)
      .find(l => +l.get('id') === +localeId),
    isVerticalMenuShown: state.ui.get('isVerticalMenuShown'),
    project: getProjectsMerged(state.projects)
      .find(p => +p.get('id') === +projectId)
  }),
  { fetchLocale, push: pushLocation },
)
@waiter(({ keys, locales, projects }) => ([
  locales.pending,
  keys.pending,
  projects.pending
]))
@queryListener((trigger, props) => {
  if (trigger.indexOf('page') > -1 || trigger.indexOf('edited') > -1) return fetchKeys.bind(null, props);
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
      fillTranslation
    } = this.props;
    return (
      <div>
        <Header push={push} page={page} />
        <Menubar
          totalCount={currentLocale && currentLocale.translationCount}
          translatedCount={currentLocale && currentLocale.translatedCount}
          location={location}
          push={push}
          isVerticalMenuShown={isVerticalMenuShown}
          toggleHierarchy={this.props.toggleHierarchy}
        />
        <div style={styles.wrapper}>
          {isVerticalMenuShown &&
            <VerticalMenu />
          }

          {keys.map(key => (
            <Translation
              saveTranslation={saveTranslation}
              fillTranslation={fillTranslation}
              translationKey={key.key}
              page={page}
              registerPressKey={this.registerPressKey}
              pressedKeyCode={this.state.pressedKeyCode}
              currentTranslation={key.translations[+localeId]}
              defaultTranslation={project && key.translations[project.defaultLocaleId]}
              {...key}
            />
          ))}
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
    height: '300px',
  },
};
