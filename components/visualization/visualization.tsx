import algoliasearch, { SearchClient } from 'algoliasearch';
import React, { Component } from 'react';
import { findResultsState } from 'react-instantsearch-dom/server';
import BlogPost from '../../common/interfaces/blog-post.interface';
import { isBlog } from '../../common/interfaces/blog.interface';
import { AmplienceContent, isAmplienceContent } from '../../common/interfaces/content.type';
import { isBlogPost, parseBlogPost, parseContent } from '../../common/services/blog-post.service';
import Blog from '../blog/blog';
import Content from '../content/content';
import HeroBanner from '../hero-banner/hero-banner';
import PageLoader from '../page-loader/page-loader';
import getContentItemById from '../../common/services/vse.service';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import HeaderSearchBox from '../header-search-box/header-search-box';
import SearchResultList from '../search-result-list/search-result-list';
import SearchResultPagination from '../search-result-pagination/search-result-pagination';

interface VisualizationProps {
  stagingEnvironment: string;
  contentItemId: string;
}

interface SearchParams {
  indexName: string;
  searchClient: SearchClient;
  resultsState: unknown;
}

interface VisualizationState {
  error?: string;
  content?: AmplienceContent[];
  blogPost: BlogPost;
  blogList: {
    title: string;
    heading: string;
    searchPlaceHolder: string;
    searchParams: SearchParams;
  };
}

export default class Visualization extends Component<VisualizationProps, VisualizationState> {
  componentDidMount(): void {
    // Do we need to load any content?
    if (this.props.stagingEnvironment.length == 0 || this.props.contentItemId.length == 0) {
      return;
    }
    this.loadContent();
  }

  componentDidUpdate(prevProps: Readonly<VisualizationProps>): void {
    // Has the props changed?
    if (
      prevProps.stagingEnvironment == this.props.stagingEnvironment &&
      prevProps.contentItemId == this.props.contentItemId
    ) {
      return;
    }
    this.setState({ content: undefined });
    this.loadContent();
  }

  private async getSearchParams(): Promise<SearchParams> {
    const searchClient = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID as string,
      process.env.SEARCH_API_KEY as string
    );

    const indexName = process.env.SEARCH_INDEX_NAME_STAGING as string;

    const resultsState = await findResultsState(InstantSearch, {
      searchClient,
      indexName
    });

    return {
      indexName,
      searchClient,
      resultsState
    };
  }

  private async loadContent() {
    try {
      const contentItem = await getContentItemById(this.props.contentItemId, this.props.stagingEnvironment);

      if (isBlogPost(contentItem)) {
        const blogPost = await parseBlogPost(contentItem);
        this.setState({ blogPost });
      } else if (isAmplienceContent(contentItem)) {
        const content = await parseContent([contentItem]);
        this.setState({ content });
      } else if (isBlog(contentItem)) {
        const searchParams = await this.getSearchParams();
        this.setState({ blogList: { ...contentItem, searchParams } });
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render(): JSX.Element {
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
            <InstantSearch
              indexName={this.state.blogList.searchParams.indexName}
              searchClient={this.state.blogList.searchParams.searchClient}
              resultsState={this.state.blogList.searchParams.resultsState}
            >
              <Configure hitsPerPage={10} />
              <HeroBanner heading={this.state.blogList.heading}>
                <HeaderSearchBox placeholderText={this.state.blogList.searchPlaceHolder} />
              </HeroBanner>
              <SearchResultList></SearchResultList>
              <SearchResultPagination />
            </InstantSearch>
          </>
        );
      }
    }
    return <PageLoader />;
  }
}
