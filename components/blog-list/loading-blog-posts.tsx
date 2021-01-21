import React, { ReactElement } from 'react';

const LoadingBlogPosts = (): ReactElement => {
  return (
    <>
      <div className="loading-blog-posts">
        <p>Loading...</p>
      </div>
      <style jsx>{`
        .loading-blog-posts {
          padding-top: 60px;
          display: flex;
          justify-content: center;
        }
        p {
          text-align: center;
          margin: auto;
          width: 100%;
          padding-top: 60px;
        }
      `}</style>
    </>
  );
};

export default LoadingBlogPosts;
