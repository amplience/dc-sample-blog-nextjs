import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter';

const CodeBlock = (props: { language: string; value: string }) => {
  return (
    <SyntaxHighlighter language={props.language} wrapLines={true} showLineNumbers={true} style={dark}>
      {props.value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
