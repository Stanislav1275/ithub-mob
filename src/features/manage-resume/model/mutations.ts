import {$api} from '@/shared/lib/axios/instance';
import {CreatePostResumeSchema, ResumeByUser} from '@/shared/api/models/resume.model';
import {SessionKeys} from '@/entities/session/model/keys';
import {ResumeKeys} from '@/entities/resume/model/keys';
import {useOptimisticMutation} from "@/shared/lib/react-query/mutations";
import {UsersKeys} from "@/entities/user/model/keys";

export const useCreateResume = (userId:number) => {
    return useOptimisticMutation<CreatePostResumeSchema, unknown, ResumeByUser>({
        mutationFn: (data) => $api.post('api/resume', data).then((v) => v.data),
        invalidate: [SessionKeys.getCurrentUser(), ResumeKeys.getResumesCurrent(), UsersKeys.getUserById(userId)],
    });
};
