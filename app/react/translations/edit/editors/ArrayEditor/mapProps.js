/* @flow */
import React from 'react';

export default function mapProps(cb: Function) {
  // eslint-disable-next-line no-undef
  return (Wrapped: ReactClass<any>) => (props: Object) => {
    const keys: Array<string> = Object.keys(props);

    const newProps = keys
      .map((key: string, index: number) => {
        let result;
        try {
          result = cb(props[key], key, index, props);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`Prop ${key} in "mapProps" of ${Wrapped} failed, due to ${e}`);
          result = props[key];
        }
        return result;
      })
      .reduce((acc: Object, prop: any, i: number) => ({
        ...acc,
        [keys[i]]: prop
      }), {});


    return (<Wrapped {...newProps} />);
  };
}
