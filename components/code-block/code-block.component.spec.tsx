import renderer from 'react-test-renderer';
import CodeBlock from './code-block.component';

describe('CodeBlock', (): void => {
  it('should render some code as a pre tag with syntax highlighting', (): void => {
    const code: { language: string; value: string } = {
      language: 'javascript',
      value: "```\nimport { something } from 'somewhere';\n\nconst someThing = something();\n```"
    };

    const wrapper = renderer.create(<CodeBlock language={code.language} value={code.value} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
