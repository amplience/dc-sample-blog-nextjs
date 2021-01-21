/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header';

const mockUseRouter = jest.fn();
jest.mock('next/router', () => {
  return {
    useRouter: () => mockUseRouter()
  };
});

describe('Header', () => {
  test('renders blog header', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { asPath: '' };
    });
    const props = {
      title: 'Blog Title'
    };
    const component = await renderer.create(<Header {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders blog header with preview vse query string link', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { asPath: '?vse=test-vse.domain' };
    });
    const props = {
      title: 'Blog Title'
    };
    const component = await renderer.create(<Header {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
