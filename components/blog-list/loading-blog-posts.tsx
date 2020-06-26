import React, { ReactElement } from 'react';

const LoadingBlogPosts = (): ReactElement => {
  return (
    <>
      <div className="loading-blog-posts">
        <p>Loading...</p>
        <style jsx>{`
          .loading-blog-posts {
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

export default LoadingBlogPosts;
