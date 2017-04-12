// eslint-disable-next-line import/prefer-default-export
export const composeLocales = props => ({
  isVerticalMenuShown: props.isVerticalMenuShown,
  localeId: props.params.localeId,
  totalCount: props.pagination.totalCount,
  currentLocale: props.locale[props.params.localeId],
  translatedCount: props.locale[props.params.localeId]
    ? props.locale[props.params.localeId].translatedCount
    : 0,
  currentPage: props.keyList[props.params.localeId],
  query: props.query,
  pagination: props.pagination,
  location: props.location,
});
