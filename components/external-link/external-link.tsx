import theme from '../../common/styles/default/theme';

export interface ExternalLinkProps {
  children: JSX.Element;
  href: string;
}

const ExternalLink = ({ children, href }: ExternalLinkProps) => (
  <>
    <a href={href} target="_new" rel="noreferrer">
      {children}
    </a>
    <style jsx>{`
      a,
      a:active,
      a:visited {
        color: ${theme.colors.doveGray};
        text-decoration: none;
      }

      a:hover {
        color: ${theme.colors.dustyGray};
      }
    `}</style>
  </>
);

export default ExternalLink;
