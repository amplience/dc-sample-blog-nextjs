/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import NoBlogPosts from './no-blog-posts';

describe('NoBlogPosts', () => {
  it('should render component', async () => {
    const component = await renderer.create(<NoBlogPosts/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
