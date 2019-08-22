/* eslint-env jest */
import renderer from 'react-test-renderer';

import Logo from './logo';

describe('Logo', () => {
  test('renders logo', async () => {
    const component = await renderer.create(<Logo />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
