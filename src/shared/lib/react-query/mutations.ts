import {AUTH_DEPEND, queryClient} from './client';
import {QueryClient, QueryKey, useMutation, UseMutationOptions, UseMutationResult,} from 'react-query';
import {QueryFilters} from 'react-query/types/core/utils';

export const useOptimisticMutation = <
  TData = unknown,
    TError = {message:string},
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> & {
    invalidate?: QueryKey | QueryKey[] | QueryFilters['predicate'];
  },
  client: QueryClient = queryClient
): UseMutationResult<TData, TError, TVariables, TContext> =>
  useMutation({
    ...options,
    onSuccess: async (data, error, context) => {
      await options?.onSuccess?.(data, error, context);
      if (options.invalidate) {
        await client.invalidateQueries({
          predicate: (query) => {
            //@ts-ignore
            if (typeof options.invalidate === 'function')
              return options.invalidate(query);
            //@ts-ignore
            const isSingleKey = options.invalidate!.every(
              (key) => !Array.isArray(key)
            );
            if (isSingleKey) {
              return (
                JSON.stringify(options.invalidate) ===
                JSON.stringify(query.queryKey)
              );
            }
            //@ts-ignore
            return options.invalidate!.some(
              (key) => JSON.stringify(key) === JSON.stringify(query.queryKey)
            );
          },
        });
      }
    },
  });

export const revalidateAuth = () =>
  queryClient.invalidateQueries({
    predicate: (query) => query.queryKey.includes(AUTH_DEPEND),
  });
