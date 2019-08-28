/* eslint-env jest */
import renderer from 'react-test-renderer';

import StaticLink from './static-link';

describe('StaticLink', () => {
  test('renders external link as an anchor tag when in static mode', async () => {
    const component = await renderer.create(
      <StaticLink href="//href-link">
        <div className="something-to-link-as-static"></div>
      </StaticLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
