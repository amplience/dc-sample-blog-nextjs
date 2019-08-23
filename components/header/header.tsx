import React from 'react';
import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';
import Link from 'next/link';

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <header>
        <section>
          <Link href="/" prefetch={false}>
            <a>
              <Logo />
            </a>
          </Link>
          <h1>{title}</h1>
        </section>
      </header>

      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          background-color: ${theme.colors.whiteLilac};
        }
        section {
          display: flex;
          align-items: center;
          min-height: 75px;
          width: 1132px;
          margin: 0 12px;
        }
        h1 {
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.bold};
          text-transform: uppercase;
          color: ${theme.colors.mineShaft};
          border-left: 1px solid ${theme.colors.silver};
          margin-left: 18px;
          padding-left: 18px;
        }
      `}</style>
    </>
  );
};

export default Header;
