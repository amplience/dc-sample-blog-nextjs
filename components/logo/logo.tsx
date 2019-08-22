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
      `}</style>
    </>
  );
};

export default Logo;
