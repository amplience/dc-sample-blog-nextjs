import { Component, ReactElement } from 'react';
import { AmplienceContent, isAmplienceContent } from '../../common/interfaces/content.type';
import getStagingContentItemById from '../../common/services/vse.service';
import Content from '../content/content';
import { isBlogPost } from '../../common/services/blog-post.service';
import BlogPost from '../../common/interfaces/blog-post.interface';
import Blog from '../blog/blog';
import PageLoader from '../page-loader/page-loader';
import { getReferencedBlogPosts } from '../../common/services/blog-reference-list.service';
import HeroCard from '../hero-card/hero-card';
import BlogList from '../blog-list/blog-list';
import { BlogReferenceList } from '../../common/interfaces/blog-reference-list.interface';
import HeroBanner from '../hero-banner/hero-banner';
import NoBlogPosts from '../blog-list/no-blog-posts';

interface VisualizationProps {
  stagingEnvironment: string;
  contentId: string;
}

interface VisualizationState {
  error?: string;
  content?: AmplienceContent[];
  blogPost: BlogPost;
  blogList: {
    title: string;
    subTitle?: string;
    blogPosts: BlogPost[];
  };
}

export default class Visualization extends Component<VisualizationProps, VisualizationState> {
  componentDidMount(): void {
    // Do we need to load any content?
    if (this.props.stagingEnvironment.length == 0 || this.props.contentId.length == 0) {
      return;
    }
    this.loadContent();
  }

  componentDidUpdate(prevProps: Readonly<VisualizationProps>): void {
    // Has the props changed?
    if (prevProps.stagingEnvironment == this.props.stagingEnvironment && prevProps.contentId == this.props.contentId) {
      return;
    }
    this.setState({ content: undefined });
    this.loadContent();
  }

  private async loadContent() {
    try {
      const contentItem = await getStagingContentItemById(this.props.stagingEnvironment, this.props.contentId);
      if (isBlogPost(contentItem)) {
        this.setState({ blogPost: contentItem });
      } else if (isAmplienceContent(contentItem)) {
        this.setState({ content: [contentItem as AmplienceContent] });
      } else {
        let blogPosts: BlogPost[] = [];
        if ('blogPosts' in contentItem) {
          blogPosts = await getReferencedBlogPosts((contentItem as BlogReferenceList).blogPosts, this.props.stagingEnvironment);
        }
        this.setState({ blogList: { ...contentItem, ...{ blogPosts: blogPosts } } as VisualizationState['blogList'] });
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render(): ReactElement {
    if (this.state) {
      if (this.state.error) {
        return (
          <>
            <h1>Unable to Render Visualization</h1>
            <p>Reason: {this.state.error}</p>
          </>
        );
      }
      if (this.state.content !== undefined) {
        return <Content content={this.state.content} />;
      }

      if (this.state.blogPost !== undefined) {
        return <Blog blogPost={this.state.blogPost} />;
      }

      if (this.state.blogList !== undefined) {
        return (
          <>
            <HeroBanner title={this.state.blogList.title} subTitle={this.state.blogList.subTitle} />
            {this.state.blogList.blogPosts.length ? (
              <>
                <HeroCard blogPost={this.state.blogList.blogPosts[0]} />
                <BlogList blogPosts={this.state.blogList.blogPosts.slice(1)} />
              </>
            ) : (
              <NoBlogPosts />
            )}
          </>
        );
      }
    }
    return <PageLoader />;
  }
}
