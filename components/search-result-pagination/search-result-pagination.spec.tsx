import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SearchResultPagination from './search-result-pagination';

function MockPagination() {
  return <></>;
}
MockPagination.displayName = 'MockPagination';

jest.mock('react-instantsearch-dom', () => ({
  Pagination: () => MockPagination
}));

describe('SearchResultPagination', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render the Pagination component', () => {
    const component = ShallowRenderer.createRenderer();
    component.render(<SearchResultPagination />);
    expect(component.getRenderOutput()).toMatchInlineSnapshot(`
      <React.Fragment>
        <Pagination
          padding={2}
          showFirst={false}
          showLast={false}
        />
        <JSXStyle
          dynamic={
            Array [
              "1097px",
              "1.125rem",
              "#333333",
            ]
          }
          id="3834662152"
        >
          .ais-Pagination-list{margin:auto;margin-top:40px;max-width:1097px;list-style-type:none;padding:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.ais-Pagination-list--noRefinement{display:none;}.ais-Pagination-item{text-align:center;width:30px;height:30px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;cursor:pointer;}.ais-Pagination-item--disabled{visibility:hidden;}.ais-Pagination-item--previousPage .ais-Pagination-link,.ais-Pagination-item--nextPage .ais-Pagination-link{font-size:1.6rem;line-height:1.6rem;}.ais-Pagination-item--selected{background-color:#f2f2f2;}.ais-Pagination-link{-webkit-text-decoration:none;text-decoration:none;font-size:1.125rem;color:#333333;line-height:1.8rem;}
        </JSXStyle>
      </React.Fragment>
    `);
  });
});
