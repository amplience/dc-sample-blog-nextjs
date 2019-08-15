const Tags = ({ tags }: { [key: string]: string[] }) => {
  return (
    <>
      {tags.map((tag: string) => (
        <span>{tag}</span>
      ))}
    </>
  );
};

export default Tags;
