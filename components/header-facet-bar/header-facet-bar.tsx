import React, { ReactElement } from 'react';
import ClearRefinements from '../clear-refinements/clear-refinements';
import MenuSelect from '../menu-select/menu-select';

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
          <>
            <img src="/static/images/ic-person.svg" alt="Authors" />
            <MenuSelect attribute={authors} />
          </>
        )}
        {tags && (
          <>
            <img src="/static/images/ic-tag.svg" alt="Tags" />
            <MenuSelect attribute={tags} />
          </>
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
          }

          h3 {
            font-size: 16px;
            color: #999;
            font-weight: 400;
            padding-right: 20px;
          }

          img {
            height: 40px;
            width: 40px;
            padding-right: 10px;
            fill: #a7aaaf;
          }
        `}
      </style>
    </>
  );
};

export default HeaderFacetBar;
