import { shallow, ReactWrapper } from 'enzyme';
import ScrollTop from './scroll-top';

describe('ScrollTop', () => {
  test('should render null', () => {
    const wrapper = shallow(<ScrollTop />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call window.scrollTo when executing handleResize function', () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
    const wrapper = shallow(<ScrollTop />);

    //@ts-ignore
    wrapper.instance().handleResize();
    expect(scrollToMock).toHaveBeenCalled();
  });

  test('should add `resize` event listener with handleResize function', () => {
    const addEventListenerMock = jest.fn();
    window.addEventListener = addEventListenerMock;
    shallow(<ScrollTop />);
    expect(addEventListenerMock).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('should remove `resize` event listener on unmount with handleResize function', () => {
    const removeEventListenerMock = jest.fn();
    window.removeEventListener = removeEventListenerMock;
    const wrapper = shallow(<ScrollTop />);
    wrapper.unmount();
    expect(removeEventListenerMock).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
