import React, { FunctionComponent } from 'react';
import { Configure, connectStateResults } from 'react-instantsearch-dom';
import BlogPost from '../../common/interfaces/blog-post.interface';
import NoBlogPosts from '../blog-list/no-blog-posts';
import LoadingBlogPosts from '../blog-list/loading-blog-posts';
import HeroCard from '../hero-card/hero-card';
import BlogList from '../blog-list/blog-list';
import { StateResultsProvided } from 'react-instantsearch-core';
import NoResults from '../blog-list/no-results';
import SortByDropdown from './sort-by-dropdown';
import { isBlogPost } from '../../common/services/blog-post.service';
import { useRouter } from 'next/router';

const BlogPostSearchResultList: FunctionComponent<StateResultsProvided<BlogPost>> = ({ searchResults }) => {
  const router = useRouter();
  const facetSelected =
    router.query[`menu[${process.env.AUTHORS_FACET_FIELD}]`] || router.query[`menu[${process.env.TAGS_FACET_FIELD}]`];
  let pageSize = 4;
  let showHeroCard = true;

  if (facetSelected || searchResults?.query || searchResults?.page > 0) {
    pageSize = 3;
    showHeroCard = false;
  }

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
      <Configure hitsPerPage={pageSize} />
      <SortByDropdown />
      {showHeroCard && <HeroCard blogPost={blogPosts.splice(0, 1)[0]} />}
      <BlogList blogPosts={blogPosts} />
    </div>
  );
};

const SearchResultList = connectStateResults(BlogPostSearchResultList);
export default SearchResultList;
