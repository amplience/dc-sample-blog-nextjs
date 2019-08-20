const GaPageView = () => {
  const TRACKING_ID = process.env.GA_TRACKING_ID;

  return (
    <>
      <script async src="https://www.google-analytics.com/analytics.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ga=window.ga||function(){(ga.q = ga.q || []).push(arguments)};ga.l=+new Date; ga('create', '${TRACKING_ID}', 'auto'); ga('send', 'pageview');`
        }}
      />
    </>
  );
};

export default GaPageView;
