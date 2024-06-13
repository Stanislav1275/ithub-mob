import { useQuery } from 'react-query';
import { queryClient } from '../react-query/client';

interface UseRQValue<T> {
  key: string;
  defaultValue: T;
}

const isJSON = (str: unknown): str is string => {
  if (typeof str !== 'string') {
    return false;
  }

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};
export const useRQValue = <T>({ key, defaultValue }: UseRQValue<T>) => {
  const client = queryClient;
  const value = useQuery({
    queryKey: [key],
    queryFn: () => defaultValue,
    refetchOnMount: false,
    staleTime: Infinity,
  }).data! as T;

  const setValue = (newValue: T | ((prev: T) => T)) => {
    client.setQueryData([key], newValue);
  };

  return [value, setValue] as const;
};
