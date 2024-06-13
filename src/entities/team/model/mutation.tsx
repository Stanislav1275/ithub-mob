import {useMutation} from 'react-query';
import {TeamCreateSchema, TeamDetail,} from '@/shared/api/models/team';
import {ClaimSchema, CreateClaim} from '@/shared/api/models/claim';
import {$api} from '@/shared/lib/axios/instance';

export const useCreateTeam = () =>
  useMutation<TeamDetail, unknown, TeamCreateSchema>({
    mutationFn: (data) => $api.post('api/team', data).then((v) => v.data),
  });
export const usePostAcceptInTeam = () =>
  useMutation<ClaimSchema, unknown, CreateClaim>({
    mutationFn: (data) => $api.post('api/claim', data).then((v) => v.data),
  });
