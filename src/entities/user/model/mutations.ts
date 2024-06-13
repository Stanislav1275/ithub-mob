import {SessionKeys} from '../../session/model/keys';
import {UpdateUserSchema, UserType} from '@/shared/api/models/user.model';
import {useOptimisticMutation} from '@/shared/lib/react-query/mutations';
import {$api} from '@/shared/lib/axios/instance';

export const changeUserById = () =>
  useOptimisticMutation<UserType, unknown, UpdateUserSchema>({
    invalidate: SessionKeys.getCurrentUser(),
    mutationFn: (data: UpdateUserSchema) =>
      $api.put('api/user', data).then((v) => v.data),
  });
