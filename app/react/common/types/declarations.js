/* @flow */
// eslint-disable-next-line no-unused-vars
declare class RecordType<T: Object> {
  constructor: Function,
  static <T: Object>(spec: T, name?: string): RecordType<T>;
  get: <A>(key: $Keys<T>) => A;
  set<A>(key: $Keys<T>, value: A): RecordType<T>;
  remove(key: $Keys<T>): RecordType<T>;
  update(key: $Keys<T>): RecordType<T>;
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this,
  setIn(keyPath: Iterable<any>, value: any): this,
}
