import { IncomingMessage, ServerResponse } from 'http';

export interface NextApiIncomingMessage extends IncomingMessage {
  query: { [key: string]: string };
}

export interface NextApiServerResponse extends ServerResponse {
  setPreviewData: (props: { [key: string]: unknown }) => void;
  clearPreviewData: () => void;
}
