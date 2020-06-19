/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Picture from './picture';

describe('Picture', () => {
  let amplienceImageFixture;

  beforeEach(() => {
    amplienceImageFixture = {
      image: {
        _meta: {
          schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
        },
        defaultHost: 'i1.adis.ws',
        endpoint: 'blogltd',
        id: 'edc77f02-0e92-4b1a-88f9-711cacb5d650',
        name: 'friends-shopping-bags'
      },
      altText: 'some-alt-text'
    };
  });
  test('it should render a picture element', () => {
    const component = renderer.create(
      <Picture
        image={amplienceImageFixture}
        sources={[
          {
            di: {
              sm: 'c',
              h: 140,
              w: 345
            }
          }
        ]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('it should render a picture element with poi', () => {
    const component = renderer.create(
      <Picture
        image={amplienceImageFixture}
        sources={[
          {
            di: {
              sm: 'c',
              h: 140,
              w: 345,
              scaleFit: 'poi'
            }
          }
        ]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('it should render a picture element with media', () => {
    const component = renderer.create(
      <Picture
        image={amplienceImageFixture}
        sources={[
          {
            di: {
              sm: 'c',
              h: 140,
              w: 345
            },
            media: '(max-width: 736px)'
          }
        ]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('it should render a picture element with no `h` di option', () => {
    const component = renderer.create(
      <Picture
        image={amplienceImageFixture}
        sources={[
          {
            di: {
              sm: 'c',
              w: 345
            }
          }
        ]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('it should render a picture element with no `w` di option', () => {
    const component = renderer.create(
      <Picture
        image={amplienceImageFixture}
        sources={[
          {
            di: {
              sm: 'c',
              h: 345
            }
          }
        ]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
