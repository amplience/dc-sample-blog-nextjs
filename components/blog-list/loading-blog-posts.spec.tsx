/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import LoadingBlogPosts from './loading-blog-posts';

describe('LoadingBlogPosts', () => {
  it('should render component', async () => {
    const component = await renderer.create(<LoadingBlogPosts/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
