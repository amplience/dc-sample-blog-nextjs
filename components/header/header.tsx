import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <header>
        <section>
          <Logo />
          <h1>{title}</h1>
        </section>
      </header>

      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          background-color: ${theme.colors.whiteLilac};
          min-height: 75px;
        }
        section {
          height: 75px;
          display: flex;
          align-items: center;
          width: 1132px;
        }
        h1 {
          font-size: 1.125rem;
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
