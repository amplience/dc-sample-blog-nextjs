import renderer from 'react-test-renderer';
import GaPageView from './ga-page-view.component';

describe('GaPageView', (): void => {
  it('should render some google analytics capable of tracking page views', (): void => {
    process.env.GA_TRACKING_ID = 'test';
    const wrapper = renderer.create(<GaPageView />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render google analytics when GA_TRACKING_ID is undefined', (): void => {
    delete process.env.GA_TRACKING_ID;
    const wrapper = renderer.create(<GaPageView />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
