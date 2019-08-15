/* eslint-env jest */
import renderer from 'react-test-renderer';
import HeroBanner from './hero-banner';

describe('HeroBanner', () => {
  test('renders hero banner with title and subtitle', async () => {
    const props = {
      title: 'Test title',
      subTitle: 'Test subtitle'
    };
    const component = await renderer.create(<HeroBanner {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders hero banner with title only', async () => {
    const props = {
      title: 'Test title'
    };
    const component = await renderer.create(<HeroBanner {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
