import ExternalLink from '../external-link/external-link';

interface MarkdownLinkProps {
  children: JSX.Element;
  href: string;
}

export const MarkdownLink = ({ children, href }: MarkdownLinkProps) => {
  return (
    <>
      <span>
        <ExternalLink href={href}>{children}</ExternalLink>
      </span>
      <style jsx>{`
        span :global(a) {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
