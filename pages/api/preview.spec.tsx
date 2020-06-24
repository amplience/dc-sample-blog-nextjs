import { NextApiIncomingMessage, NextApiServerResponse } from '../../common/interfaces/next-api-props.interface';
import preview from './preview';

describe('Preview API tests', () => {
  const mockRes = ({
    setPreviewData: jest.fn(),
    writeHead: jest.fn(),
    end: jest.fn()
  } as unknown) as NextApiServerResponse;
  const mockReq = ({
    query: {
      vse: 'VSE_DOMAIN'
    }
  } as unknown) as NextApiIncomingMessage;

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test('should redirect to the homepage without setting preview params - No VSE', () => {
    preview(({} as unknown) as NextApiIncomingMessage, mockRes);

    expect(mockRes.setPreviewData).not.toHaveBeenCalled();
    expect((mockRes.writeHead as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          307,
          Object {
            "Location": "/",
          },
        ],
      ]
    `);
    expect(mockRes.end).toBeCalledWith();
  });

  test('should redirect to the homepage setting preview params - VSE supplied', () => {
    preview(mockReq, mockRes);

    expect((mockRes.setPreviewData as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "vse": "VSE_DOMAIN",
          },
        ],
      ]
    `);
    expect((mockRes.writeHead as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          307,
          Object {
            "Location": "/",
          },
        ],
      ]
    `);
    expect(mockRes.end).toBeCalledWith();
  });
});
