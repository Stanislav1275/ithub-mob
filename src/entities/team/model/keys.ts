import {AUTH_DEPEND} from '@/shared/lib/react-query/client';

export class TeamKeys {
  public static getTeamById = (id: number | undefined) => [
    AUTH_DEPEND,
    'team',
    id || -1,
  ];
}
