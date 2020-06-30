import { useRouter } from 'next/router';

const getIndexName = (): string => {
  const router = useRouter();
  if (router?.query?.vse?.length > 0) {
    return process.env.ALGOLIA_STAGING_INDEX_NAME as string;
  }
  return process.env.ALGOLIA_PRODUCTION_INDEX_NAME as string;
};

export default getIndexName;
