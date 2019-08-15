import renderer from 'react-test-renderer';
import Text from './text.component';
import AmplienceText from '../../common/interfaces/text.interface';

describe('Text', (): void => {
  it('should render some text as html', (): void => {
    const text: AmplienceText = {
      text:
        '<h1 id="this-is-my-first-bloblog">This is my first Bloblog</h1>\n<p>This is some sample text.</p>\n<h2 id="look-a-header">Look-a-header</h2>\n<p>This is some more sample text</p>\n'
    };

    const wrapper = renderer.create(<Text text={text.text} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
