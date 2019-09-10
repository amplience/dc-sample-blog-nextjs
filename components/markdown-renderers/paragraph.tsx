import theme from '../../common/styles/default/theme';

interface MarkdownParagraphProps {
  children: JSX.Element;
}

export const MarkdownParagraph = ({ children }: MarkdownParagraphProps) => {
  return (
    <>
      <p>{children}</p>
      <style jsx>{`
        p {
          color: ${theme.colors.doveGray};

          line-height: 1.875rem;
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          p {
            font-size: ${theme.fonts.size.small};
            font-weight: ${theme.fonts.weight.light};
          }
        }
      `}</style>
    </>
  );
};
