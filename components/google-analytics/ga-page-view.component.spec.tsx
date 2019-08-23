import renderer from 'react-test-renderer';
import GaPageView from './ga-page-view.component';

describe('GaPageView', (): void => {
  it('should render some google analytics capable of tracking page views', (): void => {
    const wrapper = renderer.create(<GaPageView />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
