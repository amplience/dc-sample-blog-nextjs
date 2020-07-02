import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SearchResultList from './search-result-list';

jest.mock('react-instantsearch-dom', () => ({
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
    const props = { searchResults: { query: 'a', nbHits: 0 } };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <NoResults
        query="a"
      />
    `);
  });

  it('should render NoBlogPosts when search term is "" and nbHits is 0', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = { searchResults: { query: '', nbHits: 0 } };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`<NoBlogPosts />`);
  });

  it('should render div.searchResults with HeroCard and BlogList with no blogPosts', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = {
      searchResults: {
        query: '',
        nbHits: 1,
        hits: [{ ObjectID: '1' }]
      }
    };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <div
        id="searchResults"
      >
        <SortByDropdown />
        <HeroCard
          blogPost={
            Object {
              "ObjectID": "1",
            }
          }
        />
        <BlogList
          blogPosts={Array []}
        />
      </div>
    `);
  });

  it('should render div.searchResults with HeroCard and BlogList with 3 blogPosts', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = {
      searchResults: {
        query: '',
        nbHits: 4,
        hits: [{ ObjectID: '1' }, { ObjectID: '2' }, { ObjectID: '3' }, { ObjectID: '4' }]
      }
    };
    component.render(<SearchResultList {...props} />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <div
        id="searchResults"
      >
        <SortByDropdown />
        <HeroCard
          blogPost={
            Object {
              "ObjectID": "1",
            }
          }
        />
        <BlogList
          blogPosts={
            Array [
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
});
