import HeroBannerTitle from './title/title.component';
import HeroBannerSubtitle from './subtitle/subtitle.component';

const BlogPostHeroBanner = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <>
      <section>
        <HeroBannerTitle title={title} />
        <HeroBannerSubtitle subTitle={subTitle} />
      </section>
      <style jsx>{`
        section {
          min-height: 150px;
          display: flex;
          align-items: flex-start;
          justify-content: justified;
          flex-direction: column;
        }
        section :global(h2) {
          color: #666;
        }
      `}</style>
    </>
  );
};

export default BlogPostHeroBanner;
