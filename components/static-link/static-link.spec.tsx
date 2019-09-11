/* eslint-env jest */
import renderer from 'react-test-renderer';

import StaticLink from './static-link';

const mockUseRouter = jest.fn();
jest.mock('next/router', () => {
  return {
    useRouter: () => mockUseRouter()
  };
});

describe('StaticLink', () => {
  test('renders external link as an anchor tag', async () => {
    mockUseRouter.mockImplementationOnce(() => ({ route: '/', query: {} }));
    const component = await renderer.create(
      <StaticLink href="//href-link">
        <div className="something-to-link-as-static"></div>
      </StaticLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders external link as an anchor tag with aria-label', async () => {
    mockUseRouter.mockImplementationOnce(() => ({ route: '/', query: {} }));
    const component = await renderer.create(
      <StaticLink href="//href-link" ariaLabel="link title">
        <div className="something-to-link-as-static"></div>
      </StaticLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders external link as an anchor tag and vse query string', async () => {
    mockUseRouter.mockImplementationOnce(() => ({ route: '/', query: { vse: '//some-vse-base-url' } }));
    const component = await renderer.create(
      <StaticLink href="//href-link">
        <div className="something-to-link-as-static"></div>
      </StaticLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
