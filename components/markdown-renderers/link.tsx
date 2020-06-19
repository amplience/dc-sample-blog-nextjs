import React, { ReactElement } from 'react';
import ExternalLink from '../external-link/external-link';

interface MarkdownLinkProps {
  children: JSX.Element;
  href: string;
}

export const MarkdownLink = ({ children, href }: MarkdownLinkProps): ReactElement => {
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
