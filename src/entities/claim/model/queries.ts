import {useQuery} from 'react-query';
import {ClaimKeys} from './keys';
import {$api} from '@/shared/lib/axios/instance';
import {ClaimUserListSchema} from '@/shared/api/models/claim';

export const useClaimsQuery = (logged?: boolean) =>
  useQuery({
    queryKey: ClaimKeys.getClaimsUserAuth(),
    enabled: !!logged,
    queryFn: () =>
      $api.get<ClaimUserListSchema>('api/claim').then((v) => v.data),
  });
export const useClaimsByTeamId = (teamId: number) =>
  useQuery({
    queryKey: ClaimKeys.getClaimsByTeamId(teamId),
    queryFn: () =>
      $api.get<ClaimUserListSchema>(`api/claim/${teamId}`).then((v) => v.data),
  });
