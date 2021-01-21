import React from 'react';
import { NextPage } from 'next';
import BlogPost from '../../common/interfaces/blog-post.interface';
import Layout from '../../layouts/default';
import { getBlogPostByDeliveryKey, getBlogPostByDeliveryId } from '../../common/services/blog-post.service';
import Microdata from '../../components/microdata/microdata';
import { NextSeo } from 'next-seo';
import Blog from '../../components/blog/blog';
import SharePost from '../../components/share-post/share-post';
import { Image } from 'dc-delivery-sdk-js';
import { defaultClientConfig } from '../../common/services/dynamic-content-client-config';
import { NextPageContext } from 'next';
import { isUuid } from 'uuidv4';
import TagChips from '../../components/tag-chips/tag-chips';

interface BlogPostProps {
  blogPost: BlogPost;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const BlogPostPage: NextPage<BlogPostProps> = ({ blogPost }: BlogPostProps) => {
  const blogImage = new Image(blogPost.image.image, defaultClientConfig).url().build();

  const seoParams: { [key: string]: string | unknown } = {
    title: blogPost.title,
    description: blogPost.description,
    twitter: {
      cardType: 'summary_large_image'
    },
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      images: [
        {
          url: `${blogImage}?w=1080`,
          width: 1080
        }
      ]
    }
  };

  if (process.env.ROBOTS_META_TAG_NOINDEX === 'true') {
    seoParams.noindex = true;
  }

  return (
    <Layout>
      <NextSeo {...seoParams} />
      <Blog blogPost={blogPost} />
      <TagChips tags={blogPost.tags} />
      <div className="content-footer">
        <SharePost twitterText={blogPost.title} />
      </div>
      <Microdata
        description={blogPost.description}
        headline={blogPost.title}
        imageUrl={blogImage}
        authors={blogPost.authors}
        datePublished={blogPost.date}
      />
      <style jsx>{`
        .content-footer,
        :global(div.tag-chips) {
          margin: auto;
          max-width: 740px;
        }

        :global(div.tag-chips) {
          padding-left: 0px !important;
        }
      `}</style>
    </Layout>
  );
};

BlogPostPage.getInitialProps = async ({ query }: NextPageContext) => {
  const { vse, slug } = query;
  const stagingEnvironment = vse ? `//${vse.toString()}` : undefined;

  if (!slug) {
    throw new Error('Unable to generate BlogPostPage, missing deliveryKey');
  }

  const deliverySlug = Array.isArray(slug) ? slug[0] : slug;
  const blogPost = isUuid(deliverySlug)
    ? await getBlogPostByDeliveryId(deliverySlug, stagingEnvironment)
    : await getBlogPostByDeliveryKey(deliverySlug, stagingEnvironment);

  return { blogPost };
};

export default BlogPostPage;
