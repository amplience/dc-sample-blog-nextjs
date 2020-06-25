import React, { ReactElement } from 'react';
import ExternalLink from '../external-link/external-link';
import Text from '../text/text';

import theme from '../../common/styles/default/theme';

interface FooterLink {
  text: string;
  href: string;
}

interface FooterLinksListProps {
  title: string;
  links: FooterLink[];
}

const FooterLinksList = ({ title, links = [] }: FooterLinksListProps): ReactElement => {
  const linkElements = links.map((link: FooterLink, key: number) => (
    <li key={key}>
      <ExternalLink href={link.href}>
        <Text>{link.text}</Text>
      </ExternalLink>
    </li>
  ));
  return (
    <>
      <section className="footer-links-section">
        <h4>{title}</h4>
        <ul>{linkElements}</ul>
      </section>
      <style jsx>{`
        h4 {
          text-transform: uppercase;
          color: ${theme.colors.mineShaft};
          font-weight: ${theme.fonts.weight.medium};
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        section {
          min-width: 200px;
        }

        section:not(:last-child) {
          margin-right: 50px;
        }

        section :global(a) {
          font-size: ${theme.fonts.size.small};
          line-height: 2.25rem;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            min-width: unset;
          }
        }
      `}</style>
    </>
  );
};

export default FooterLinksList;
