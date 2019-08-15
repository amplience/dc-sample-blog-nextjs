const BlogHeader = ({title}: { title: string;}) => {
  return (
    <>
      <section>
        <div className="header">
          <img className="logo" src='/static/images/logo.png' alt="alt-tag"/>
          <h1>{title}</h1>
        </div>
      </section>
      <style jsx>{`
        .header {
          background: #F0F0F0;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
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
