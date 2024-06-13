import {useQuery} from 'react-query';
import {UsersKeys} from './keys';
import {UserRepo} from './repo';

export const useUserByIdQuery = (id: number | undefined) => {
  return useQuery({
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    enabled: !!id || id === 0,
    queryKey: UsersKeys.getUserById(id),
    staleTime: 0,
    queryFn: async () => {
      return await UserRepo.getUserById(id!);
    },
  });
};
