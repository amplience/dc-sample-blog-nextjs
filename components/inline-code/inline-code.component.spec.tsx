import renderer from 'react-test-renderer';
import InlineCode from './inline-code.component';

describe('InlineCode', (): void => {
  it('should render some code as a code tag with styles', (): void => {
    const wrapper = renderer.create(<InlineCode value="import { something } from 'somewhere';" />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
