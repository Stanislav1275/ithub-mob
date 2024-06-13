import {AUTH_DEPEND} from '@/shared/lib/react-query/client';

export class ResumeKeys {
  public static getResumesCurrent = () => [AUTH_DEPEND, 'curUser', 'resume'];
}
