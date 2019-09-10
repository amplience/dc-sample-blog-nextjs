import React from 'react';

export interface StaticLinkProps {
  children: JSX.Element;
  href: string;
  ariaLabel?: string;
}

const StaticLink = ({ children, href, ariaLabel = '' }: StaticLinkProps) => {
  return (
    <>
      <a href={href} aria-label={ariaLabel}>
        {children}
        <style jsx>{`
          a {
            text-decoration: none;
            display: flex;
          }
        `}</style>
      </a>
    </>
  );
};

export default StaticLink;
