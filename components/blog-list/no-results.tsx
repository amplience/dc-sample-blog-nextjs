import React, { ReactElement } from 'react';

interface NoResultsProps {
  query: string;
}

const NoResults = ({query}: NoResultsProps): ReactElement => {
  return (
    <>
      <div className="no-results">
        <p>No results matching &quot;{query}&quot;</p>
        <style jsx>{`
          .no-results {
            padding-top: 60px;
            display: flex;
            justify-content: center;
            min-height: 500px;
            font-style: italic
          }
        `}</style>
      </div>
    </>
  );
};

export default NoResults;
