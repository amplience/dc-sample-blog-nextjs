import theme from '../../common/styles/default/theme';

const Logo = ({ darkMode }: { darkMode?: boolean }) => {
  const logoSrcName = darkMode ? 'logo-white' : 'logo';
  return (
    <>
      <img
        className="logo"
        src={`/static/images/${logoSrcName}-340w.png`}
        srcSet={`/static/images/${logoSrcName}-160w.png 1x, /static/images/${logoSrcName}-340w.png 2x`}
        alt="Amplience logo"
      />
      <style jsx>{`
        img {
          width: 160px;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          img {
            width: 140px;
            object-fit: contain;
          }
        }
      `}</style>
    </>
  );
};

export default Logo;
