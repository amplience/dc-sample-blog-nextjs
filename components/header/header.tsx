import React from 'react';
import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';
import StaticLink from '../static-link/static-link';

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <section>
        <header>
          <StaticLink href="/">
            <Logo />
          </StaticLink>
          <h1>{title}</h1>
        </header>
      </section>

      <style jsx>{`
        section {
          display: flex;
          flex: 1 0 75px;
          justify-content: center;
          background-color: ${theme.colors.whiteLilac};
        }
        header {
          display: flex;
          align-items: center;
          min-height: 75px;
          width: 1032px;
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
