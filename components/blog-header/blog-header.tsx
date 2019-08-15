const BlogHeader = ({ title }: { title: string }) => {
  return (
    <>
      <section>
        <img className="logo" src="/static/images/logo.png" alt="alt-tag" />
        <h1>{title}</h1>
      </section>
      <style jsx>{`
        section {
          background: #f0f0f0;
          height: 65px;
          text-align: left;
          display: flex;
          align-items: center;
        }
        .logo {
          padding: 10px;
          width: 68px;
        }
        h1 {
          font-size: 1.2rem;
          font-weight: normal;
        }
      `}</style>
    </>
  );
};

export default BlogHeader;
