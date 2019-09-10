import theme from '../../common/styles/default/theme';

const Logo = () => {
  return (
    <>
      <img
        className="logo"
        src="/static/images/logo-340w.png"
        srcSet="/static/images/logo-160w.png 1x, /static/images/logo-340w.png 2x"
        alt="Amplience logo"
      />
      <style jsx>{`
        img {
          width: 160px;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          img {
            width: 120px;
          }
        }
      `}</style>
    </>
  );
};

export default Logo;
