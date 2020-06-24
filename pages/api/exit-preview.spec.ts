import { NextApiIncomingMessage, NextApiServerResponse } from '../../common/interfaces/next-api-props.interface';
import exitPreview from './exit-preview';

describe('Exit preview API tests', () => {
  const mockRes = ({
    clearPreviewData: jest.fn(),
    writeHead: jest.fn(),
    end: jest.fn()
  } as unknown) as NextApiServerResponse;
  const mockReq = ({} as unknown) as NextApiIncomingMessage;

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test('should redirect to the homepage destroying all the preview params', () => {
    exitPreview(mockReq, mockRes);

    expect(mockRes.clearPreviewData).toHaveBeenCalledWith();
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
