import AmplienceText from '../../common/interfaces/text.interface';

const Text = (text: AmplienceText) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: text.text }}></div>
    </>
  );
};

export default Text;
