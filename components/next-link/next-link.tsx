import React, { ReactElement } from 'react';
import Link from 'next/link';

export interface StaticLinkProps {
  children: JSX.Element;
  href: string;
  as: string;
  ariaLabel?: string;
}

const NextLink = ({ children, href, as, ariaLabel = '' }: StaticLinkProps): ReactElement => {
  return (
    <>
      <Link href={href} as={as}>
        <a aria-label={ariaLabel}>
          {children}
          <style jsx>{`
            a {
              text-decoration: none;
              display: flex;
            }
          `}</style>
        </a>
      </Link>
    </>
  );
};

export default NextLink;
