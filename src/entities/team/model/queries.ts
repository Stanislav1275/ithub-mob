import {useQuery} from 'react-query';
import {TeamDetail} from '@/shared/api/models/team';
import {TeamKeys} from './keys';
import {$api} from '@/shared/lib/axios/instance';
import {useLocalSearchParams} from "expo-router";

export const useTeamById = (id: number | undefined) => {
  return useQuery({
    queryFn: () => $api.get<TeamDetail>(`api/team/${id}`).then((v) => v.data),
    queryKey: TeamKeys.getTeamById(id),
    enabled: !!id || id === 0,
  });
};
export const useTeamCurrentQuery = () => {
  const { id } = useLocalSearchParams() as {id:string};
  return useTeamById(Number(id));
};
