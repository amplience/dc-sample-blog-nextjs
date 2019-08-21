import renderer from 'react-test-renderer';
import { MarkdownBlockquote } from './blockquote';

describe('MarkdownBlockquote', (): void => {
  it('should render as a blockquote', (): void => {
    const props = {
      children: <>test text</>
    };

    const wrapper = renderer.create(<MarkdownBlockquote {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
