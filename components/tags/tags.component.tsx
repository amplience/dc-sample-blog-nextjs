import React, { ReactElement } from 'react';

const Tags = ({ tags }: { [key: string]: string[] }): ReactElement => {
  return (
    <>
      {tags.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
    </>
  );
};

export default Tags;
