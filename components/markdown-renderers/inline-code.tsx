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
      `}</style>
    </>
  );
};
