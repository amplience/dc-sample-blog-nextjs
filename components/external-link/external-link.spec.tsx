/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import ExternalLink from './external-link';

describe('ExternalLink', () => {
  test('renders external link when passed a div', async () => {
    const component = await renderer.create(
      <ExternalLink href="//href-link">
        <div className="something-to-link"></div>
      </ExternalLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
