import renderer from 'react-test-renderer';
import HeroBannerTitle from './title.component';

describe('HeroBannerTitle', () => {
  test('renders hero banner title', async () => {
    const props = {
      title: 'Test title'
    };
    const component = await renderer.create(<HeroBannerTitle {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
