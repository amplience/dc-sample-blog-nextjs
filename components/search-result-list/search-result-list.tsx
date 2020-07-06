import React, { FunctionComponent } from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import BlogPost from '../../common/interfaces/blog-post.interface';
import NoBlogPosts from '../blog-list/no-blog-posts';
import LoadingBlogPosts from '../blog-list/loading-blog-posts';
import HeroCard from '../hero-card/hero-card';
import BlogList from '../blog-list/blog-list';
import { StateResultsProvided } from 'react-instantsearch-core';
import NoResults from '../blog-list/no-results';
import SortByDropdown from './sort-by-dropdown';
import { isBlogPost } from '../../common/services/blog-post.service';

const BlogPostSearchResultList: FunctionComponent<StateResultsProvided<BlogPost>> = ({ searchResults }) => {
  if (!searchResults) {
    return <LoadingBlogPosts />;
  }

  if (searchResults.query.length > 0 && searchResults.hits.length === 0) {
    return <NoResults query={searchResults.query} />;
  }

  if (searchResults.hits.length === 0) {
    return <NoBlogPosts />;
  }

  const blogPosts = searchResults.hits.filter(isBlogPost);
  return (
    <div id="searchResults">
      <SortByDropdown />
      <HeroCard blogPost={blogPosts[0]} />
      <BlogList blogPosts={blogPosts.slice(1)} />
    </div>
  );
};

const SearchResultList = connectStateResults(BlogPostSearchResultList);
export default SearchResultList;
