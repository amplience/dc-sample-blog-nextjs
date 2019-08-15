import { NextPage } from 'next';
import Image from '../../components/images/image.component';
import BlogPost from '../../common/interfaces/blog-post.interface';
import HeroBanner from '../../components/hero-banner/hero-banner';
import BlogPostAuthor from '../../components/blog-post-author/blog-post-author.component';
import Tags from '../../components/tags/tags.component';
import Layout from '../../layouts/default';
import Content from '../../components/content/content.component';
import getBlogPost, { parseContent } from '../../common/services/blog-post.service';

const BlogPostPage: NextPage<BlogPost> = (props: BlogPost) => {
  return (
    <Layout title={props.title} description={props.description}>
      <div id={'top'}>
        <HeroBanner title={props.title}/>
      </div>
      <div>
        <BlogPostAuthor authors={props.authors} date={props.date} readTime={props.readTime}/>
      </div>
      <div>
        <Image altText={props.image.altText} src={props.image.src}/>
      </div>
      <Content content={props.content}/>
      <a href={'#top'}>Back to the top</a>
      <div>
        <Tags tags={props.tags}/>
      </div>
    </Layout>
  );
};

BlogPostPage.getInitialProps = async ({ query }) => {
  const blogPostId = query['blog-id'].toString();
  const blogPost = await getBlogPost(blogPostId);
  blogPost.content = await parseContent(blogPost.content);

  try {
    return blogPost;
  } catch (err) {
    throw err;
  }
};

export default BlogPostPage;
