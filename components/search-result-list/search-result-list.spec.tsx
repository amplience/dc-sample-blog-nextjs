import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SearchResultList from './search-result-list';
import { isBlogPost } from '../../common/services/blog-post.service';

jest.mock('../../common/services/blog-post.service');
jest.mock('search-insights');
jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-dom'),
  connectStateResults: templateFn => params => templateFn(params)
}));

describe('SearchResultList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render LoadingBlogPosts when searchResults is undefined', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = { searchResults: undefined };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`<LoadingBlogPosts />`);
  });

  it('should render NoResults when search term is defined and nbHits is 0', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = { searchResults: { query: 'a', hits: [] } };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <NoResults
        query="a"
      />
    `);
  });

  it('should render NoBlogPosts when search term is "" and nbHits is 0', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = { searchResults: { query: '', hits: [] } };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`<NoBlogPosts />`);
  });

  it('should render div.searchResults with HeroCard and BlogList with no blogPosts', async () => {
    ((isBlogPost as unknown) as jest.Mock).mockReturnValue(true);
    const component = ShallowRenderer.createRenderer();
    const props = {
      searchResults: {
        query: '',
        hits: [{ ObjectID: '1' }]
      }
    };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <div
        id="searchResults"
      >
        <SortByDropdown />
        <BlogList
          blogPosts={
            Array [
              Object {
                "ObjectID": "1",
              },
            ]
          }
        />
      </div>
    `);
  });

  it('should render div.searchResults with HeroCard and BlogList with 3 blogPosts', async () => {
    ((isBlogPost as unknown) as jest.Mock).mockReturnValue(true);
    const component = ShallowRenderer.createRenderer();
    const props = {
      searchResults: {
        query: '',
        hits: [{ ObjectID: '1' }, { ObjectID: '2' }, { ObjectID: '3' }, { ObjectID: '4' }]
      }
    };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <div
        id="searchResults"
      >
        <SortByDropdown />
        <BlogList
          blogPosts={
            Array [
              Object {
                "ObjectID": "1",
              },
              Object {
                "ObjectID": "2",
              },
              Object {
                "ObjectID": "3",
              },
              Object {
                "ObjectID": "4",
              },
            ]
          }
        />
      </div>
    `);
  });

  it('should ignore objects that are not blog posts', async () => {
    ((isBlogPost as unknown) as jest.Mock).mockReturnValue(false);
    const component = ShallowRenderer.createRenderer();
    const props = {
      searchResults: {
        query: '',
        hits: [{ ObjectID: '1' }, { ObjectID: '2' }, { ObjectID: '3' }, { ObjectID: '4' }]
      }
    };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <div
        id="searchResults"
      >
        <SortByDropdown />
        <BlogList
          blogPosts={Array []}
        />
      </div>
    `);
  });
});
