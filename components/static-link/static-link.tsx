import React from 'react';

export interface StaticLinkProps {
  children: JSX.Element;
  href: string;
}

const StaticLink = ({children, href}: StaticLinkProps) => (
  <>
    <a href={href}>
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

export default StaticLink;
