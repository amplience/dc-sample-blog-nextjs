import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
  return (
    <>
      <section>
        <CookieConsent
          buttonText="Accept Cookies"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            justifyContent: 'center',
            boxShadow: '20px 20px 20px 10px #000',
            textAlign: 'center'
          }}
          buttonStyle={{
            color: '#333',
            background: '#fff',
            border: '3px solid #CCC',
            borderRadius: '5px'
          }}
        >
          We use cookies to give you the best possible experience on our website. By continuing to browse this site, you
          give consent for cookies to be used. For more details please read our{' '}
          <a href="https://amplience.com/privacy-cookie-policy/" target="_blank">
            Cookie Policy
          </a>
          .
        </CookieConsent>
      </section>
      <style jsx>{`
        cookieContainer {
        }
      `}</style>
    </>
  );
};

export default CookieBanner;
