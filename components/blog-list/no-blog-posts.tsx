import React, { ReactElement } from 'react';

const NoBlogPosts = (): ReactElement => {
  return (
    <>
      <div className="no-published-blogs">
        <p>No blogs published yet!</p>
        <style jsx>{`
          .no-published-blogs {
            padding-top: 60px;
            display: flex;
            justify-content: center;
            min-height: 500px;
          }
        `}</style>
      </div>
    </>
  );
};

export default NoBlogPosts;
