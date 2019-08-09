import theme from '../../styles/default/theme';

const HeroBanner = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <>
      <section>
        <h1>{title}</h1>
        {subTitle ? <h2>{subTitle}</h2> : ''}
      </section>
      <style jsx>{`
        section {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }
        h1 {
          font-size: ${theme.fonts.size.xLarge};
          font-weight: ${theme.fonts.weight.normal};
          margin-bottom: 10px;
        }
        h2 {
          font-size: ${theme.fonts.size.normal};
          font-weight: ${theme.fonts.weight.light};
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
