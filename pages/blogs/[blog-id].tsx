import { NextPage } from 'next';
import getBlogPost from './services/get-blog-post.service';
import BlogPost from './interfaces/blog-post.interface';
import ImageComponent from '../../components/images/image.component';
import VideoComponent from '../../components/videos/video.component';
import Video from '../../common/interfaces/video.interface';

const BlogPostPage: NextPage<BlogPost> = (props: BlogPost) => {
  const video = props.content[2] as Video;

  return (
    <>
      <VideoComponent video={video.video}/>
      <ImageComponent altText={props.image.altText} image={props.image.image}/>
      {/* In this example we are outputting the complete content response from the Dynamic Content Service, this is where you would use props.content to render your site. */}
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
};

BlogPostPage.getInitialProps = async ({ query }) => {
  const blogPostId = query['blog-id'].toString();

  try {
    return await getBlogPost(blogPostId);
  } catch (err) {
    throw err;
  }
};

export default BlogPostPage;
