import renderer from 'react-test-renderer';
import { MarkdownLink } from './link';

describe('MarkdownLink', (): void => {
  it('should render an external link tag', (): void => {
    const props = {
      children: <>test text</>,
      href: '//an-external-link'
    };

    const wrapper = renderer.create(<MarkdownLink {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
