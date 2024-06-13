import { QueryClient } from 'react-query';

export const AUTH_DEPEND = 'auth-depend';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, //24hours
    },
  },
});
