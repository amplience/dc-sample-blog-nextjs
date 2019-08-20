const Tags = ({ tags }: { [key: string]: string[] }) => {
  return (
    <>
      {tags.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
    </>
  );
};

export default Tags;
