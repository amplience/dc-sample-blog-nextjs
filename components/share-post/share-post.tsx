import { useRouter } from 'next/router';

const SharePost = ({ twitterText }: { twitterText: string }) => {
  const router = useRouter();
  const baseUrl = process.env.URL !== undefined ? process.env.URL : '';
  const currentPageUrl = baseUrl + router.asPath;

  return (
    <>
      <section>
        <h3>Share the post</h3>
        <div>
          <div>
            <script async src="https://platform.linkedin.com/in.js" type="text/javascript">
              lang: en_US
            </script>
            <script type="IN/Share" data-url={currentPageUrl}></script>
          </div>
          <div>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-text={twitterText}
              data-show-count="false"
            >
              Tweet
            </a>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          </div>
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
