import renderer from 'react-test-renderer';
import HeroBannerSubtitle from './subtitle.component';

describe('HeroBannerSubtitle', () => {
  test('renders hero banner subtitle', async () => {
    const props = {
      subTitle: 'Test subtitle'
    };
    const component = await renderer.create(<HeroBannerSubtitle {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders nothing when there is no subtitle', async () => {
    const props = {};
    const component = await renderer.create(<HeroBannerSubtitle {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
