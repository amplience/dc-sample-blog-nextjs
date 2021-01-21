import React from 'react';
import renderer from 'react-test-renderer';
import { MarkdownInlineCode } from './inline-code';

describe('MarkdownInlineCode', (): void => {
  it('should render some inline code as a code tag with styles', (): void => {
    const wrapper = renderer.create(<MarkdownInlineCode value="import { something } from 'somewhere';" />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
