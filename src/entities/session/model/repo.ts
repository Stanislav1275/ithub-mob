import {SignInUserSchema, SignUpUserSchema, UserType,} from '@/shared/api/models/user.model';
import {$api} from '@/shared/lib/axios/instance';

export class SessionRepo {
  public static signUp = (data: SignUpUserSchema) =>
    $api
      .post<SignUpUserSchema, UserType>('api/auth/signup', data)
      //@ts-ignore
      .then((v) => v.data);
  //@ts-ignore
  public static signIn = (data: SignInUserSchema) =>
    $api
      .post<SignInUserSchema, SigninResponse>('api/auth/signin', data)
      //@ts-ignore
      .then((v) => v.data);
}

export type SigninResponse = {
  token: string;
  type: 'Bearer';
  id: number;
  username: string;
  avatar: null | string;
  firstname: string;
  lastname: string;
  bioInfo: string | null;
  email: null | string;
  telegram: null | string;
  link: null | string;
};
