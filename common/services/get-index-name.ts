import { useRouter } from 'next/router';

const getIndexName = (): string => {
  const router = useRouter();
  if (router.query?.vse) {
    return process.env.SEARCH_INDEX_NAME_STAGING as string;
  }
  return process.env.SEARCH_INDEX_NAME_PRODUCTION as string;
};

export default getIndexName;
