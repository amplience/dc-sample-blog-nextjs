import React, { ReactElement } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const MarkdownCodeBlock = ({ language, value }: { language: string; value: string }): ReactElement => {
  if (value === undefined) {
    value = '';
  }

  return (
    <SyntaxHighlighter language={language} wrapLines={true} showLineNumbers={true} style={atomDark}>
      {value}
    </SyntaxHighlighter>
  );
};
