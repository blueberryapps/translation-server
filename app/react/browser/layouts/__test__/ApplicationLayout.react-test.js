import React from 'react';
import Layout from '../ApplicationLayout.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Layout>Homepage</Layout>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
