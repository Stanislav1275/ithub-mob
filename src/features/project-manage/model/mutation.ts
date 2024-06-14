import {$api} from '@/shared/lib/axios/instance';
import {CreateProjectChemaServer, Project} from '@/shared/api/models/project.model';
import {TeamKeys} from '@/entities/team/model/keys';
import {useOptimisticMutation} from "@/shared/lib/react-query/mutations";
import {queryClient} from "@/shared/lib/react-query/client";

export const useProjectCreateMutation = () =>
    useOptimisticMutation<Project, unknown, CreateProjectChemaServer>({
        //@ts-ignore
        mutationFn: (data) => $api.post<CreateProjectChemaServer, Project>('api/project', data).then((v) => v.data),
    });
export const invalidateTeam = (id: number | undefined) => queryClient.invalidateQueries({ queryKey: TeamKeys.getTeamById(id) });
export const useFollowProject = () => {};
