import React from 'react';
import renderer from 'react-test-renderer';
import SharePost from './share-post';

describe('SharePost', (): void => {
  it('should render using the process.env.URL is defined', (): void => {
    process.env.URL = 'http://example.com/';
    const twitterText = 'Testing Title';
    const wrapper = renderer.create(<SharePost twitterText={twitterText} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render when process.env.URL is undefined', (): void => {
    delete process.env.URL;
    const twitterText = 'Testing Title';
    const wrapper = renderer.create(<SharePost twitterText={twitterText} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
