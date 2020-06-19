import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import BlogPost from '../../common/interfaces/blog-post.interface';
import NoBlogPosts from '../blog-list/no-blog-posts';
import HeroCard from '../hero-card/hero-card';
import BlogList from '../blog-list/blog-list';

import { SearchResults, BasicDoc } from 'react-instantsearch-core';

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
  const blogPosts = flattenBlogPosts(searchResults);
  return blogPosts.length > 0 ? (
    <div id="searchResults">
      <HeroCard blogPost={blogPosts[0]} />
      <BlogList blogPosts={blogPosts.slice(1)} />
    </div>
  ) : (
    <NoBlogPosts />
  );
});

export default SearchResultList;
