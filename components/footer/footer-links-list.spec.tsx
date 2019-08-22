/* eslint-env jest */
import renderer from 'react-test-renderer';

import FooterLinksList from './footer-links-list';

describe('FooterLinksList', () => {
  test('renders a list of 2 footer links with a title', async () => {
    const props = {
      title: 'Test title',
      links: [
        {
          href: '//test-link-one',
          text: 'test-link-text-one'
        },
        {
          href: '//test-link-two',
          text: 'test-link-text-two'
        }
      ]
    };
    const component = await renderer.create(<FooterLinksList {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders an empty list when links are undefined', async () => {
    const props = {
      title: 'Test title',
      links: undefined
    };
    const component = await renderer.create(<FooterLinksList {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
