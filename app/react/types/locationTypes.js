/* @flow */
export type TranslationsLocationType = {
  query: {
    page: string,
    edited: 'all' | 'new'
  }
}

export type TranslationParamsType = {
  localeId: string,
  projectId: string
}

export type LocationWithQuery = {
  query: Object
}
