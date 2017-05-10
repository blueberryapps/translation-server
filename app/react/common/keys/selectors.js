import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

// eslint-disable-next-line no-confusing-arrow
const getMainEntity = ({ page, edited }, { localeId }) => ({ keys }) => {
  const lists = keys.get('lists');
  return !lists.isEmpty() && lists.getIn([localeId, edited, page]) ?
            lists.getIn([localeId, edited, page]).map(id =>
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
