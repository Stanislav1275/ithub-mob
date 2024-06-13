import {useQuery} from 'react-query';
import {z} from 'zod';
import {UserRegisterSchema, UserType,} from '@/shared/api/models/user.model';
import {SessionKeys} from './keys';
import {UserRepo} from '../../user/model/repo';

type SchemaServer = z.infer<typeof UserRegisterSchema>;



export const useCurrentUser = (enabled?: boolean | null | undefined) => {
  return useQuery<UserType | null>({
    queryFn: async () => {
      return await UserRepo.getCurUser().catch((v) => null);
    },
    queryKey: SessionKeys.getCurrentUser(),
    refetchOnMount: true,
    enabled: enabled === undefined ? true : !!enabled,
    refetchInterval: 3 * 1000 * 60 * 60,
    staleTime: 0,
    retry: 1,
  });
};
