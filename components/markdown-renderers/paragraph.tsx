import React, { ReactElement } from 'react';
import theme from '../../common/styles/default/theme';

interface MarkdownParagraphProps {
  children: JSX.Element;
}

export const MarkdownParagraph = ({ children }: MarkdownParagraphProps): ReactElement => {
  return (
    <>
      <p>{children}</p>
      <style jsx>{`
        p {
          color: ${theme.colors.doveGray};
          font-size: ${theme.fonts.size.normal};
          line-height: 1.6rem;
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          p {
            font-size: ${theme.fonts.size.large};
            font-weight: ${theme.fonts.weight.light};
            line-height: 1.7rem;
          }
        }
      `}</style>
    </>
  );
};
