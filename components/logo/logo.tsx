const Logo = () => {
  return (
    <>
      <img
        src="/static/images/logo-380w.png"
        srcSet="/static/images/logo-190w.png 1x, /static/images/logo-380w.png 2x"
        alt="Amplience logo"
      />
      <style jsx>{`
        img {
          width: 190px;
        }
      `}</style>
    </>
  );
};

export default Logo;
