/* eslint-env jest */
import renderer from 'react-test-renderer';

import StaticLink from './static-link';

describe('StaticLink', () => {
  test('renders external link as an anchor tag when in static mode', async () => {
    process.env.NEXT_STATIC = 'true';
    const component = await renderer.create(
      <StaticLink href="//href-link">
        <div className="something-to-link-as-static"></div>
      </StaticLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders external link as an Next Link when in dynamic mode', async () => {
    process.env.NEXT_STATIC = 'false';
    const component = await renderer.create(
      <StaticLink href="//href-link" as="//href-link-as-dynamic">
        <div className="something-to-link-as-dynamic"></div>
      </StaticLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
