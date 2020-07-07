import React from 'react';
import ClearRefinements from './clear-refinements';

import renderer from 'react-test-renderer';

jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-dom'),
  connectCurrentRefinements: templateFn => params => templateFn({ ...params, items: [] })
}));
describe('ClearRefinements component', () => {
  it('should render a clear button', async () => {
    const component = renderer.create(<ClearRefinements />).toJSON();
    expect(component).toMatchInlineSnapshot(`
      <button
        className="jsx-2901729026"
        disabled={true}
        onClick={[Function]}
      >
        Clear filters
      </button>
    `);
  });
});
