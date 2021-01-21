import React, { ReactElement } from 'react';
import aa from 'search-insights';

const INDEX_NAME = process.env.SEARCH_INDEX_NAME_PRODUCTION as string;

interface TrackClickProps {
  children: ReactElement | ReactElement[];
  eventName: string;
  queryId: string;
  objectIds: string[];
  positions: number[];
}

const TrackClick = ({ children, eventName, queryId, objectIds, positions }: TrackClickProps): ReactElement => (
  <div
    style={{ display: 'flex' }}
    onClick={() => {
      aa('init', {
        appId: process.env.ALGOLIA_APPLICATION_ID as string,
        apiKey: process.env.SEARCH_API_KEY as string
      });
      aa('clickedObjectIDsAfterSearch', {
        index: INDEX_NAME,
        eventName,
        queryID: queryId,
        objectIDs: objectIds,
        positions
      });
    }}
  >
    {children}
  </div>
);

export default TrackClick;
