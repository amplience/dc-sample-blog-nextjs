import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
  return (
    <>
      <CookieConsent
        buttonText="Accept Cookies"
        contentClasses="cookie-banner-content"
        buttonClasses="cookie-banner-btn"
        disableStyles={true}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#333',
          boxShadow: '20px 20px 20px 10px #000',
          textAlign: 'center',
          'flex-direction': 'column',
          'align-items': 'center',
          zIndex: 1
        }}
        contentStyle={{
          padding: '20px 0px 10px'
        }}
        buttonStyle={{
          color: '#333',
          background: '#fff',
          border: '3px solid #CCC',
          borderRadius: '5px',
          'margin-bottom': '10px'
        }}
      >
        We use cookies to give you the best possible experience on our website. By continuing to browse this site, you
        give consent for cookies to be used. For more details please read our{' '}
        <a href="https://amplience.com/privacy-cookie-policy/" target="_blank">
          Cookie&nbsp;Policy
        </a>
        .
      </CookieConsent>
    </>
  );
};

export default CookieBanner;
