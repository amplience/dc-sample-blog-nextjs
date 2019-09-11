import theme from '../../common/styles/default/theme';

export const MarkdownInlineCode = ({ value }: { value: string }) => {
  return (
    <>
      <code>{value}</code>
      <style jsx>{`
        code {
          padding: 3px;
          border-radius: 5px;
          background-color: ${theme.colors.whiteLilac};
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          code {
            font-size: ${theme.fonts.size.small};
            font-weight: ${theme.fonts.weight.light};
          }
        }
      `}</style>
    </>
  );
};
