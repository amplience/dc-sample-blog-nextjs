import {useRouter} from 'next/router';

const SharePost = ({twitterText}: { twitterText: string }) => {
  const router = useRouter();
  const baseUrl = process.env.URL !== undefined ? process.env.URL : '';
  const currentPageUrl = baseUrl + router.asPath;

  const linkedinHtmlMarkup = {
    __html: `<script async src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script><script type="IN/Share" data-url=${currentPageUrl}></script>`
  };
  
  const twitterHtmlMarkup = {
    __html: `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text=${twitterText} data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>`
  };

  return (
    <>
      <section>
        <h3>Share the post</h3>
        <div>
          <div dangerouslySetInnerHTML={linkedinHtmlMarkup} suppressHydrationWarning={true}/>
          <div dangerouslySetInnerHTML={twitterHtmlMarkup} suppressHydrationWarning={true}/>
        </div>
      </section>
      <style jsx>{`
        section {
          margin-top: 25px;
          display: flex;
          padding: 0 10px;
        }
        h3 {
          flex: 1 0 0;
          margin: 0;
          padding: 0;
        }
        section > div {
          flex: 1 0 0;
          display: flex;
          justify-content: flex-end;
        }
        section > div > div {
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default SharePost;
