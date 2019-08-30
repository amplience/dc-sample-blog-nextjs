import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const MarkdownCodeBlock = ({ language, value }: { language: string; value: string }) => {
  return (
    <SyntaxHighlighter language={language} wrapLines={true} showLineNumbers={true} style={atomDark}>
      {value}
    </SyntaxHighlighter>
  );
};
