import {IAvatarProps} from '@gluestack-ui/avatar/lib/typescript/types';
import {Avatar, Link,} from '@gluestack-ui/themed';
import {useCurrentUser} from '../../session/model/queries';
import {Image} from 'expo-image';
import {StyleSheet} from 'react-native';

type UserAvatarPropsType = IAvatarProps;
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
export const ProfileAvatar = (
  props: UserAvatarPropsType & { name?: string; avatar: string; href?: string }
) => {
  const { name = '??', avatar, href } = props;
  const d = name;
  return (
    <Link isDisabled={!href} href={href}>

      <Avatar  size="sm" borderRadius="$full" {...props}>
        <Image
            style={[styles.image]}
            alt="d"
            source={
              avatar
            }
            transition={300}
        />
      </Avatar>
    </Link>
  );
};
export const CurrentUserAvatar = (
  props: Omit<IAvatarProps, 'name' | 'avatar'> & { link?: boolean }
) => {
  const { data: user } = useCurrentUser();
  const { link, ...other } = props;
  return (
    <ProfileAvatar
      href={link && `/user/${user.id}`}
      //@ts-ignore
      avatar={user?.avatar!}
      name={`${user?.firstname} ${user?.lastname}`}
      {...other}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius:100,
    width: 40,
    height: 40,
  },
});
