import React from 'react';
import renderer from 'react-test-renderer';

import PostsList from '../posts-list.component';

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<PostsList />).toJSON();
  expect(tree).toMatchSnapshot();
});