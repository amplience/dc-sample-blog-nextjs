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

const FooterLinksList = ({ title, links = [] }: FooterLinksListProps) => {
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

        section:not(:first-child) {
          margin-left: 50px;
        }

        section :global(a) {
          font-size: 0.875rem;
          line-height: 2.25rem;
        }
      `}</style>
    </>
  );
};

export default FooterLinksList;
