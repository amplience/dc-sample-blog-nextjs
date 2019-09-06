import React from 'react';
import { useRouter } from 'next/router';

export interface StaticLinkProps {
  children: JSX.Element;
  href: string;
  ariaLabel?: string;
}

const StaticLink = ({ children, href, ariaLabel = '' }: StaticLinkProps) => {
  const router = useRouter();
  const { vse } = router.query;
  const routerQuery = vse ? `?vse=${vse}` : '';
  return (
    <>
      <a href={`${href}${routerQuery}`} aria-label={ariaLabel}>
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
