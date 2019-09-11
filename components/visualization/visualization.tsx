import { Component, ReactElement } from 'react';
import { AmplienceContent } from '../../common/interfaces/content.type';
import getStagingContentItemById from '../../common/services/vse.service';
import Content from '../content/content';
import { isBlogPost } from '../../common/services/blog-post.service';
import BlogPost from '../../common/interfaces/blog-post.interface';
import Blog from '../blog/blog';
import PageLoader from '../page-loader/page-loader';

interface VisualizationProps {
  stagingEnvironment: string;
  contentId: string;
}

interface VisualizationState {
  error?: string;
  content?: AmplienceContent[];
  blogPost: BlogPost;
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
      } else {
        this.setState({ content: [contentItem as AmplienceContent] });
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
    }
    return <PageLoader />;
  }
}
