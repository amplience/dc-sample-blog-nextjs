import React, { ReactElement } from 'react';
import Link from 'next/link';

export interface NextLinkProps {
  children: JSX.Element;
  href: string;
  as: string;
  ariaLabel?: string;
}

const NextLink = ({ children, href, as, ariaLabel = '' }: NextLinkProps): ReactElement => {
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
