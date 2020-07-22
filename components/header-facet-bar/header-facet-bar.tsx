import React, { ReactElement } from 'react';
import ClearRefinements from '../clear-refinements/clear-refinements';
import MenuSelect from '../menu-select/menu-select';
import theme from '../../common/styles/default/theme';

interface HeaderFacetAttributes {
  authors: string;
  tags: string;
}

const HeaderFacetBar = ({ authors, tags }: HeaderFacetAttributes): ReactElement => {
  if (!authors && !tags) {
    return <></>;
  }

  return (
    <>
      <div id="FacetBar">
        <h3>Show blogs by</h3>
        {authors && (
          <div className="filter-container">
            <img src="/static/images/ic-person.svg" alt="Authors" />
            <MenuSelect attribute={authors} />
          </div>
        )}
        {tags && (
          <div className="filter-container">
            <img src="/static/images/ic-tag.svg" alt="Tags" />
            <MenuSelect attribute={tags} />
          </div>
        )}
        <ClearRefinements clearsQuery />
      </div>
      <style jsx>
        {`
          #FacetBar {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction: row;
            text-align: center;
            align-items: center;
            padding-top: 20px;
          }

          h3 {
            font-size: 16px;
            color: #999;
            font-weight: 400;
            padding-right: 20px;
            white-space: nowrap;
          }

          img {
            height: 40px;
            width: 40px;
            padding-right: 10px;
            fill: #a7aaaf;
          }

          .filter-container {
            display: flex;
          }

          @media (max-width: ${theme.layout.narrowPageWidth}) {
            #FacetBar {
              flex-direction: column;
            }
            h3 {
              margin-bottom: 2px;
              padding-right: 0;
            }
            .filter-container {
              display: flex;
            }
          }
        `}
      </style>
    </>
  );
};

export default HeaderFacetBar;
