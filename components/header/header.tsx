import theme from '../../common/styles/default/theme';

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <header>
        <section>
          <img
            src="/static/images/logo-380w.png"
            srcSet="/static/images/logo-190w.png 1x, /static/images/logo-380w.png 2x"
            alt="Amplience logo"
          />
          <h1>{title}</h1>
        </section>
      </header>

      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          background-color: #f7f7fc;
        }
        section {
          height: 75px;
          display: flex;
          align-items: center;
          width: 1132px;
        }
        h1 {
          font-size: 1.125rem;
          font-weight: normal;
          text-transform: uppercase;
          color: ${theme.colors.darkGray};
          border-left: 1px solid ${theme.colors.midGray};
          margin-left: 18px;
          padding-left: 18px;
        }
      `}</style>
    </>
  );
};

export default Header;
