import {$api} from '@/shared/lib/axios/instance';
import {UpdateUserSchema, UserPartialSchema, UserType,} from '@/shared/api/models/user.model';

export class UserRepo {
  //get
  public static getCurUser = async (): Promise<UserType> =>
    $api.get<UserType>('api/user/cur').then((v) => v.data);
  public static getUserById = async (id: number): Promise<UserType> =>
    $api.get<UserType>(`api/user/${id}`).then((v) => v.data);
  public static getAllUser = async (): Promise<UserPartialSchema> =>
    $api.get<UserPartialSchema>(`api/user`).then((v) => v.data);
  //@ts-ignore
  public static changeCurrentUser = async (): Promise<UserType> =>
    //@ts-ignore
    $api.put<UpdateUserSchema, UserType>('api/user').then((v) => v.data);
}
