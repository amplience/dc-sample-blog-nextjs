import theme from '../../common/styles/default/theme';

const Logo = ({ darkMode }: { darkMode?: boolean }) => {
  const logoSrcName = darkMode ? 'logo-white' : 'logo';
  return (
    <>
      <img
        className="logo"
        src={`/static/images/${logoSrcName}-100h.png`}
        srcSet={`/static/images/${logoSrcName}-50h.png 1x, /static/images/${logoSrcName}-100h.png 2x`}
        alt="Amplience logo"
      />
      <style jsx>{`
        img {
          height: 50px;
          margin-bottom: 6px;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          img {
            object-fit: contain;
          }
        }
      `}</style>
    </>
  );
};

export default Logo;
