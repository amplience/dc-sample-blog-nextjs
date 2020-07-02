import React, { ReactElement } from 'react';
import theme from '../../../common/styles/default/theme';

const HeroBannerHeading = ({ heading }: { heading: string }): ReactElement => {
  return (
    <>
      <h1>{heading}</h1>
      <style jsx>
        {`
          h1 {
            color: ${theme.colors.mineShaft};
            font-size: ${theme.fonts.size.xxxLarge};
            font-weight: ${theme.fonts.weight.light};
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default HeroBannerHeading;
