/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogHeader from './blog-header';

describe('BlogHeader', () => {
  test('renders blog header', async () => {
    const props = {
      title: 'Blog Title'
    };
    const component = await renderer.create(<BlogHeader {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
