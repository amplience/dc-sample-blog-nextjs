import React, { ReactElement } from 'react';
import { Pagination } from 'react-instantsearch-dom';
import theme from '../../common/styles/default/theme';

const SearchResultPagination = (): ReactElement => (
  <>
    <Pagination showFirst={false} showLast={false} padding={2} />
    <style jsx global>{`
      .ais-Pagination-list {
        margin: auto;
        margin-top: 40px;
        max-width: ${theme.layout.widePageWidth};
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .ais-Pagination-list--noRefinement {
        display: none;
      }
      .ais-Pagination-item {
        text-align: center;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
      .ais-Pagination-item--disabled {
        visibility: hidden;
      }
      .ais-Pagination-item--previousPage .ais-Pagination-link,
      .ais-Pagination-item--nextPage .ais-Pagination-link {
        font-size: 1.6rem;
        line-height: 1.6rem;
      }
      .ais-Pagination-item--selected {
        background-color: #f2f2f2;
      }
      .ais-Pagination-link {
        text-decoration: none;
        font-size: ${theme.fonts.size.large};
        color: ${theme.colors.mineShaft};
        line-height: 1.8rem;
      }
    `}</style>
  </>
);

export default SearchResultPagination;
