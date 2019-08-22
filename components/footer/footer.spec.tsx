/* eslint-env jest */
import renderer from 'react-test-renderer';

import Footer from './footer';

describe('Footer', () => {
  test('renders a footer component', async () => {
    const component = await renderer.create(<Footer />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
