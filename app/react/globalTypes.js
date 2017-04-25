/* @flow */

export type Action<T> = {
  type: string,
  payload: T
};

export type PaginationType = {
  currentPage: number,
  nextPage?: number,
  prevPage?: number,
  totalPages: number,
  totalCount: number
}
