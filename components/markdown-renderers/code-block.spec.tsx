import React from 'react';
import renderer from 'react-test-renderer';
import { MarkdownCodeBlock } from './code-block';

describe('CodeBlock', (): void => {
  it('should render some code as a pre tag with syntax highlighting', (): void => {
    const code: { language: string; value: string } = {
      language: 'javascript',
      value: "```\nimport { something } from 'somewhere';\n\nconst someThing = something();\n```"
    };

    const wrapper = renderer.create(<MarkdownCodeBlock language={code.language} value={code.value} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render empty line if value is undefined', (): void => {
    const code: { language: string; value?: string } = {
      language: 'javascript',
      value: undefined
    };

    const wrapper = renderer
      .create(<MarkdownCodeBlock language={code.language} value={code.value as string} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
