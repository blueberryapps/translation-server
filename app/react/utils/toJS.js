import React from 'react';
import { Iterable } from 'immutable';

export default WrappedComponent =>
   (wrappedComponentProps) => {
     const KEY = 0;
     const VALUE = 1;

     const propsJS = Object.entries(wrappedComponentProps)
          .reduce((newProps, wrappedComponentProp) => {
            // eslint-disable-next-line no-param-reassign
            newProps[wrappedComponentProp[KEY]] =
                  Iterable.isIterable(wrappedComponentProp[VALUE])
                      ? wrappedComponentProp[VALUE].toJS()
                      : wrappedComponentProp[VALUE];
            return newProps;
          }, {});

     return <WrappedComponent {...propsJS} />;
   };
