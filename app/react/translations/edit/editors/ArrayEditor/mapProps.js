import React from 'react';

export default function mapProps(cb) {
  return Wrapped => (props) => {
    const keys = Object.keys(props);

    const newProps = keys
      .map((key, index) => {
        let result;
        try {
          result = cb(props[key], key, index, props);
        } catch (e) {
          result = props[key];
        }
        return result;
      })
      .reduce((acc, prop, i) => ({
        ...acc,
        [keys[i]]: prop
      }), {});


    return (<Wrapped {...newProps} />);
  };
}
