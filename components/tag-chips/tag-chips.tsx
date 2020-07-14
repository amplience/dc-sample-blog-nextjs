import Router from 'next/router';
import qs from 'qs';
import React, { ReactElement } from 'react';

const buildUrl = (tag: string): string =>
  `/?${qs.stringify({ menu: { [process.env.TAGS_FACET_FIELD as string]: tag } })}`;

const TagChips = ({ tags = [] }: { tags: string[] }): ReactElement => {
  if (!process.env.TAGS_FACET_FIELD) {
    return <></>;
  }

  const tagsToDisplay = tags.slice(0, 5);
  return (
    <>
      <div className="tag-chips">
        {tagsToDisplay.map(tag => (
          <div
            key={tag}
            onClick={e => {
              e.preventDefault();
              const searchUrl = buildUrl(tag);
              Router.push(searchUrl, searchUrl, { shallow: true });
            }}
          >
            {tag}
          </div>
        ))}
      </div>
      <style jsx>{`
        div.tag-chips {
          padding: 45px 15px 30px 15px;
        }

        .tag-chips > div {
          display: inline-block;
          border-radius: 20px;
          padding: 10px 14px;
          background-color: #f2f2f2;
          margin: 0px 5px;
          font-size: 14px;
          font-weight: 400;
          color: #999;
          transition: all 0.3s;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 220px;
        }

        .tag-chips > div:hover {
          background-color: #e5e5e5;
          color: #333;
        }

        .tag-chips > div.active {
          border 2px solid hotpink;
        }
      `}</style>
    </>
  );
};

export default TagChips;
