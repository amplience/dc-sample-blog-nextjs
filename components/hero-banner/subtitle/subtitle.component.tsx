const HeroBannerSubtitle = ({ subTitle }: { subTitle?: string }) => {
  return (
    <>
      <section>{subTitle ? <h2>{subTitle}</h2> : ''}</section>
      <style jsx>
        {`
          h2 {
            font-size: 1rem;
            font-weight: 300;
          }
        `}
      </style>
    </>
  );
};

export default HeroBannerSubtitle;
