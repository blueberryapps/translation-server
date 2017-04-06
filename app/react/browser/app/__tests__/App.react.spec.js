import { shallow } from 'enzyme';
import React from 'react';
import App from '../App.react';

test('shallowly renders App', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});
