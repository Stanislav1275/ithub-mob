import {AUTH_DEPEND} from '@/shared/lib/react-query/client';

export class SessionKeys {
  public static getCurrentUser = () => [AUTH_DEPEND, 'currentUser'];
}
