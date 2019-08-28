import renderer from 'react-test-renderer';
import Microdata from './microdata';

describe('Microdata', (): void => {
  it('should render a full Microdata component', (): void => {
    const props = {
      headline: 'test-headline',
      imageUrl: '//test-imageurl/image-test.jpg',
      authors: [{ name: 'test-author-1' }],
      datePublished: '2019-07-07'
    };
    const wrapper = renderer.create(<Microdata {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Microdata component when author is not defined', (): void => {
    const props = {
      headline: 'test-headline',
      imageUrl: '//test-imageurl/image-test.jpg',
      authors: [{ name: 'test-author-1' }],
      datePublished: '2019-07-07'
    };
    delete props.authors;
    const wrapper = renderer.create(<Microdata {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
