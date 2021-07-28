/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import NextLink from './next-link';

const mockUseRouter = jest.fn();
jest.mock('next/router', () => {
  return {
    useRouter: () => mockUseRouter()
  };
});

describe('NextLink', () => {
  test('renders next link as an anchor tag', async () => {
    mockUseRouter.mockImplementationOnce(() => ({ route: '/', query: {} }));
    const component = await renderer.create(
      <NextLink href="/href-link/[..test]" as="/href-link/a-test">
        <div className="something-to-link"></div>
      </NextLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders next link as an anchor tag with aria-label', async () => {
    mockUseRouter.mockImplementationOnce(() => ({ route: '/', query: {} }));
    const component = await renderer.create(
      <NextLink href="/href-link/[..test]" as="/href-link/a-test" ariaLabel="link title">
        <div className="something-to-link"></div>
      </NextLink>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
