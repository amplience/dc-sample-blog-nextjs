import renderer from 'react-test-renderer';
import { MarkdownParagraph } from './paragraph';

describe('MarkdownParagraph', (): void => {
  it('should render a p tag', (): void => {
    const props = {
      children: <>test text</>
    };

    const wrapper = renderer.create(<MarkdownParagraph {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
