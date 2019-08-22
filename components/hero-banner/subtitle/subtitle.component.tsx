import theme from '../../../common/styles/default/theme';

const HeroBannerSubtitle = ({ subTitle }: { subTitle?: string }) => {
  return (
    <>
      {subTitle ? <h2>{subTitle}</h2> : ''}
      <style jsx>
        {`
          h2 {
            color: ${theme.colors.mineShaft};
            font-size: ${theme.fonts.size.xLarge};
            font-weight: ${theme.fonts.weight.light};
            margin: 0;
            margin-top: 10px;
          }
        `}
      </style>
    </>
  );
};

export default HeroBannerSubtitle;
