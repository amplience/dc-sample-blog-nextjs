/* eslint-env jest */
import renderer from 'react-test-renderer';
import CookieBanner from './cookie-banner';

describe('CookieBanner', () => {
  test('renders cookie consent banner', async () => {
    const component = await renderer.create(<CookieBanner />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
