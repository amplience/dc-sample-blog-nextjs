/* eslint-env jest */
import renderer from 'react-test-renderer';
import Header from './header';

describe('Header', () => {
  test('renders blog header', async () => {
    const props = {
      title: 'Blog Title'
    };
    const component = await renderer.create(<Header {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
