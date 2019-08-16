const HeroBannerSubtitle = ({ subTitle }: { subTitle?: string }) => {
  return <>{subTitle ? <h2>{subTitle}</h2> : ''}</>;
};

export default HeroBannerSubtitle;
