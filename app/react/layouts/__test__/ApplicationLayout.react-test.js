import React from 'react';
import renderer from 'react-test-renderer';

import Layout from '../ApplicationLayout.react';

it('renders correctly', () => {
  const tree = renderer.create(
    <Layout>Homepage</Layout>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
