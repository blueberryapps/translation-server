import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

// eslint-disable-next-line no-confusing-arrow
const getMainEntity = ({ search = '', page, edited }, { localeId }) => ({ keys }) => {
  const lists = keys.get('lists');
  const statePath = [localeId, edited, search, page];
  return !lists.isEmpty() && lists.hasIn(statePath) ?
            lists.getIn(statePath).map(id =>
              keys.getIn(['entities', 'keys', `${id}`]))
          : List();
};

const getTranslationsEntity = ({ keys }) =>
  keys.getIn(['entities', 'translations']);

// eslint-disable-next-line import/prefer-default-export
export const getKeysMerged = (query, params) =>
  createSelector(
    getMainEntity(query, params),
    getTranslationsEntity,
    (keys, translations) =>
      keys.map(key =>
        key.set('translations', key.get('translations').reduce((acc, id) =>
          acc.set(translations.getIn([`${id}`, 'localeId']), translations.get(`${id}`)), new Map()),
        ),
      )
  );

// USAGE: getKeysMerged(page)(state.keys);
