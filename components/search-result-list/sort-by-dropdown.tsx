import React, { ReactElement } from 'react';
import { SortBy } from 'react-instantsearch-dom';
import getIndexName from '../../common/services/get-index-name';
import theme from '../../common/styles/default/theme';

const SortByDropdown = (): ReactElement => {
  const indexName = getIndexName();
  return (
    <>
      <div className="sort-by-container">
        <span>Sort by</span>
        <SortBy
          className="container-option"
          defaultRefinement="instant_search"
          items={[
            {
              label: 'Sort by date (ascending)',
              value: `${indexName}_sort-dateastimestamp-asc`
            },
            {
              label: 'Sort by date (descending)',
              value: `${indexName}_sort-dateastimestamp-desc`
            },

            {
              label: 'Sort by readtime (ascending)',
              value: `${indexName}_sort-readtime-asc`
            },
            {
              label: 'Sort by readtime (descending)',
              value: `${indexName}_sort-readtime-desc`
            }
          ]}
        />
      </div>
      <style jsx>{`
        div.sort-by-container {
          margin: auto;
          display: flex;
          margin-top: 20px;
          justify-content: right;
          align-items: center;
          max-width: ${theme.layout.widePageWidth};
          padding-right: 40px;
        }

        div.sort-by-container > span {
          padding-right: 15px;
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.regular};
        }

        :global(select.ais-SortBy-select) {
          color: #333;
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.medium};
          background-color: #f2f2f2;
          padding: 5px 30px 5px 5px;
          appearance: none;
          border: none;
        }

        :global(div.ais-SortBy) {
          position: relative;
        }

        :global(div.ais-SortBy:after) {
          color: #333;
          content: '▾';
          right: 15px;
          top: 6px;
          position: absolute;
          pointer-events: none;
        }
      }`}</style>
    </>
  );
};

export default SortByDropdown;
