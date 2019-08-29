import renderer from 'react-test-renderer';
import Microdata from './microdata';
import ShallowRender from 'react-test-renderer/shallow';

describe('Microdata', (): void => {
  it('should render a full Microdata component', (): void => {
    const props = {
      url: 'test-url/test',
      headline: 'test-headline',
      description: 'description',
      imageUrl: '//test-imageurl/image-test.jpg',
      authors: [{ name: 'test-author-1' }],
      datePublished: '2019-07-07',
      dateModified: '2019-07-07'
    };
    const renderer = ShallowRender.createRenderer();
    renderer.render(<Microdata {...props} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it('should render Microdata component when author is not defined', (): void => {
    const props = {
      url: 'test-url/test',
      headline: 'test-headline',
      description: 'description',
      imageUrl: '//test-imageurl/image-test.jpg',
      authors: [{ name: 'test-author-1' }],
      datePublished: '2019-07-07',
      dateModified: '2019-07-07'
    };
    delete props.authors;
    const renderer = ShallowRender.createRenderer();
    renderer.render(<Microdata {...props} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
