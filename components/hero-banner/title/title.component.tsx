const HeroBannerTitle = ({ title }: { title: string }) => {
  return (
    <>
      <section>
        <h1>{title}</h1>
      </section>
      <style jsx>
        {`
          h1 {
            font-size: 2rem;
            font-weight: normal;
            margin-bottom: 10px;
          }
        `}
      </style>
    </>
  );
};

export default HeroBannerTitle;
