import React from 'react';
import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';
import StaticLink from '../static-link/static-link';
import { useRouter } from 'next/router';

const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  const { vse } = router.query;

  const headerLink = vse ? `/?vse=${vse}` : '/';
  return (
    <>
      <section>
        <header>
          <StaticLink href={headerLink}>
            <Logo darkMode={true} />
          </StaticLink>
          <h1>{title}</h1>
        </header>
      </section>

      <style jsx>{`
        section {
          display: flex;
          flex: 1 0 auto;
          justify-content: center;
          background-color: ${theme.colors.mirage};
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
          font-weight: ${theme.fonts.weight.medium};
          text-transform: uppercase;
          color: white;
          border-left: 1px solid ${theme.colors.dustyGray};
          margin-left: 18px;
          padding-left: 18px;
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          h1 {
            font-size: ${theme.fonts.size.small};
          }

          header {
            min-height: 40px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
