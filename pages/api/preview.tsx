import { NextApiIncomingMessage, NextApiServerResponse } from '../../common/interfaces/next-api-props.interface';

export default async function preview(req: NextApiIncomingMessage, res: NextApiServerResponse): Promise<void> {
  if (req?.query?.vse === undefined) {
    res.writeHead(307, { Location: '/' });
    res.end();
    return;
  }

  const { vse } = req.query;
  res.setPreviewData({ vse });
  res.writeHead(307, { Location: `/` });
  res.end();
}
