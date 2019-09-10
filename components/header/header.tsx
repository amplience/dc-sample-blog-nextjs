import React from 'react';
import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';
import StaticLink from '../static-link/static-link';
import { useRouter } from 'next/router';

const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  const { vse } = router.query;

  const headerLink = vse ? `/?vse=${vse}` : '';
  return (
    <>
      <section>
        <header>
          <StaticLink href={headerLink}>
            <Logo />
          </StaticLink>
          <h1>{title}</h1>
        </header>
      </section>

      <style jsx>{`
        section {
          display: flex;
          flex: 1 0 auto;
          justify-content: center;
          background-color: ${theme.colors.whiteLilac};
        }
        header {
          display: flex;
          align-items: center;
          min-height: 75px;
          width: ${theme.layout.widePageWidth};
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
