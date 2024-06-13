import {AUTH_DEPEND} from '@/shared/lib/react-query/client';

export class UsersKeys {
  public static getUserById = (id: number | undefined) => [
    AUTH_DEPEND,
    'user',
    id,
  ];
}
