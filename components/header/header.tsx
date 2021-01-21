import React, { ReactElement } from 'react';
import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';
import StaticLink from '../static-link/static-link';
import { useRouter } from 'next/router';
import qs from 'qs';

const Header = ({ title }: { title: string }): ReactElement => {
  const router = useRouter();

  const parsedQueryString = qs.parse(router.asPath.substring(router.asPath.indexOf('?') + 1));
  const stagingEnvironment: string = parsedQueryString.vse as string;

  const headerLink = stagingEnvironment ? `/?vse=${stagingEnvironment}` : '/';
  return (
    <>
      <section>
        <header>
          <StaticLink href={headerLink}>
            <Logo darkMode={true} />
          </StaticLink>
          <span>{title}</span>
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
        span {
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.medium};
          text-transform: uppercase;
          color: white;
          border-left: 1px solid ${theme.colors.dustyGray};
          margin-left: 18px;
          padding-left: 18px;
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          span {
            font-size: ${theme.fonts.size.small};
          }
        }
      `}</style>
    </>
  );
};

export default Header;
