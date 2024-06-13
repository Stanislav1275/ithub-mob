import {AUTH_DEPEND} from '@/shared/lib/react-query/client';

export class ClaimKeys {
  public static getClaimsUserAuth = () => [
    AUTH_DEPEND,
    'claims',
    'currentUser',
  ];
  public static getClaimsByTeamId = (id: number | string | undefined) => [
    AUTH_DEPEND,
    'claims',
    'team',
    id || 'not_found',
  ];
}
