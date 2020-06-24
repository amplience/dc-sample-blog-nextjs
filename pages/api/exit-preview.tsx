import { NextApiIncomingMessage, NextApiServerResponse } from '../../common/interfaces/next-api-props.interface';

export default async function exitPreview(_: NextApiIncomingMessage, res: NextApiServerResponse): Promise<void> {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
}
