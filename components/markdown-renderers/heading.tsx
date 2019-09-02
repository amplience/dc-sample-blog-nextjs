import theme from '../../common/styles/default/theme';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface MarkdownHeadingProps {
  children: JSX.Element;
  level: number;
}

export const MarkdownHeading = ({ children, level }: MarkdownHeadingProps) => {
  const Tag = `h${level}` as HeadingTag;
  return (
    <>
      <Tag>{children}</Tag>
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
        }
        h1 {
          color: ${theme.colors.mineShaft};
          font-size: ${theme.fonts.size.xxxxLarge};
          font-weight: ${theme.fonts.weight.regular};
          line-height: 3.75rem;
        }

        h2 {
          color: ${theme.colors.mineShaft};
          font-size: ${theme.fonts.size.xxLarge};
          font-weight: ${theme.fonts.weight.light};
          line-height: 2.25rem;
        }

        h3 {
          color: ${theme.colors.mineShaft};
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.bold};
          line-height: 1.625rem;
        }

        h4 {
          color: ${theme.colors.mineShaft};
          font-size: 1rem;
          font-weight: ${theme.fonts.weight.bold};
          line-height: ${theme.fonts.size.xxLarge};
        }

        h5 {
          color: ${theme.colors.doveGray};
          font-size: ${theme.fonts.size.small};
          font-weight: ${theme.fonts.weight.bold};
          line-height: 1.25rem;
        }

        h6 {
          color: ${theme.colors.dustyGray};
          font-size: ${theme.fonts.size.small};
          font-weight: ${theme.fonts.weight.bold};
          line-height: 1.25rem;
        }
      `}</style>
    </>
  );
};
