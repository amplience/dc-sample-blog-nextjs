import React from 'react';
import MenuSelect from './menu-select';

import renderer from 'react-test-renderer';

jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-dom'),
  connectMenu: templateFn => params =>
    templateFn({
      ...params,
      items: [
        { label: 'label1', value: 'value1', count: 4, isRefined: false },
        { label: 'label2', value: 'value2', count: 2, isRefined: false },
        { label: 'label3', value: 'value3', count: 278, isRefined: false }
      ]
    })
}));
describe('MenuSelect component', () => {
  it('should render a drop down', async () => {
    const component = renderer.create(<MenuSelect attribute="testValue" />).toJSON();
    expect(component).toMatchInlineSnapshot(`
      <select
        className="jsx-2370241207 "
        onChange={[Function]}
        value=""
      >
        <option
          className="jsx-2370241207"
          value=""
        >
          See all options
        </option>
        <option
          className="jsx-2370241207"
          value="value1"
        >
          label1
           (
          4
          )
        </option>
        <option
          className="jsx-2370241207"
          value="value2"
        >
          label2
           (
          2
          )
        </option>
        <option
          className="jsx-2370241207"
          value="value3"
        >
          label3
           (
          278
          )
        </option>
      </select>
    `);
  });
});
