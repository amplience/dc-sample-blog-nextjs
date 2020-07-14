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
          <span
            key={tag}
            onClick={e => {
              e.preventDefault();
              const searchUrl = buildUrl(tag);
              Router.push(searchUrl, searchUrl, { shallow: true });
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <style jsx>{`
        div.tag-chips {
          padding: 45px 0px 30px 15px;
        }

        span {
          border-radius: 20px;
          padding: 10px 14px;
          background-color: #f2f2f2;
          margin: 0px 5px;
          font-size: 14px;
          font-weight: 400;
          color: #999;
          transition: all 0.3s;
          cursor: pointer;
        }

        span:hover {
          background-color: #e5e5e5;
          color: #333;
        }

        span.active {
          border 2px solid hotpink;
        }
      `}</style>
    </>
  );
};

export default TagChips;
