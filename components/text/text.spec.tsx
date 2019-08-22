/* eslint-env jest */
import renderer from 'react-test-renderer';

import Text from './text';

describe('Text', () => {
  test('renders text using the child text string', async () => {
    const component = await renderer.create(<Text>some text</Text>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
