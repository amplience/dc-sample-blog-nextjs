import React from 'react';
import renderer from 'react-test-renderer';
import HeroBannerHeading from './hero-banner-heading';

describe('HeroBannerHeading', () => {
  test('renders hero banner title', async () => {
    const component = await renderer.create(<HeroBannerHeading heading='Test title' />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
