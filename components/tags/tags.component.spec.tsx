/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Tags from './tags.component';

describe('Tags', () => {
  test('renders a list of tags', async () => {
    const props = {
      tags: ['Tag 1', 'Tag 2', 'Tag 3']
    };
    const component = await renderer.create(<Tags {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
