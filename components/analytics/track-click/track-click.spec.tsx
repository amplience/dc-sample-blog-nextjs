/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import TrackClick from './track-click';
import aa from 'search-insights';

jest.mock('search-insights');

describe('TrackClick', () => {
  test('renders a trackable click element', async () => {
    const component = ShallowRenderer.createRenderer();
    component.render(<TrackClick eventName="Test Button Click" queryId="testId" objectIds={["testObjectId"]} positions={[0]}>
      <button role='button' >Click Me</button>
    </TrackClick>);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });

  test('clicking the button records an event', async () => {
    const component = renderer.create(<TrackClick eventName="Test Button Click" queryId="testId" objectIds={["testObjectId"]} positions={[0]}>
      <button role='button'>Click Me</button>
    </TrackClick>);
    component.root.findByType('div').props.onClick();
    expect(aa.mock.calls).toMatchSnapshot();

  });
});
