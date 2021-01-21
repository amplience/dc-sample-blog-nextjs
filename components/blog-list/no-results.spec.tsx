/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import NoResults from './no-results';

describe('NoResults', () => {
  it('should render component with query', async () => {
    const component = await renderer.create(<NoResults query="search query"/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
