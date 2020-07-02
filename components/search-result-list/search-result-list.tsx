import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import BlogPost from '../../common/interfaces/blog-post.interface';
import NoBlogPosts from '../blog-list/no-blog-posts';
import LoadingBlogPosts from '../blog-list/loading-blog-posts';
import HeroCard from '../hero-card/hero-card';
import BlogList from '../blog-list/blog-list';

import { SearchResults, BasicDoc } from 'react-instantsearch-core';
import NoResults from '../blog-list/no-results';

const flattenBlogPosts = (searchResults: SearchResults<BasicDoc>): BlogPost[] => {
  if (!searchResults || searchResults.nbHits === 0) {
    return [];
  }

  const blogPosts: BlogPost[] = [];
  searchResults.hits.forEach((hit: BasicDoc) => {
    blogPosts.push((hit as unknown) as BlogPost);
  });
  return blogPosts;
};

const SearchResultList = connectStateResults(({ searchResults }) => {
  if (!searchResults) {
    return <LoadingBlogPosts />;
  }

  if (searchResults.query.length > 0 && searchResults.nbHits === 0) {
    return <NoResults query={searchResults.query} />;
  }

  if (searchResults.nbHits === 0) {
    return <NoBlogPosts />;
  }

  const blogPosts = flattenBlogPosts(searchResults);
  return (
    <div id="searchResults">
      <HeroCard blogPost={blogPosts[0]} />
      <BlogList blogPosts={blogPosts.slice(1)} />
    </div>
  );
});

export default SearchResultList;
