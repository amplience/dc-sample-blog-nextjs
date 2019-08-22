import renderer from 'react-test-renderer';
import { MarkdownHeading } from './heading';

describe('MarkdownHeading', (): void => {
  it('should render a h1 tag', (): void => {
    const props = {
      level: 1,
      children: 'test text'
    };

    const wrapper = renderer.create(<MarkdownHeading {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a h2 tag', (): void => {
    const props = {
      level: 2,
      children: 'test text'
    };

    const wrapper = renderer.create(<MarkdownHeading {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a h3 tag', (): void => {
    const props = {
      level: 3,
      children: 'test text'
    };

    const wrapper = renderer.create(<MarkdownHeading {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a h4 tag', (): void => {
    const props = {
      level: 4,
      children: 'test text'
    };

    const wrapper = renderer.create(<MarkdownHeading {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a h5 tag', (): void => {
    const props = {
      level: 5,
      children: 'test text'
    };

    const wrapper = renderer.create(<MarkdownHeading {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a h6 tag', (): void => {
    const props = {
      level: 6,
      children: 'test text'
    };

    const wrapper = renderer.create(<MarkdownHeading {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
