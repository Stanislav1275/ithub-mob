import {IAvatarProps} from '@gluestack-ui/avatar/lib/typescript/types';
import {Avatar} from '@gluestack-ui/themed';
import {useCurrentUser} from '../../session/model/queries';
import {Image} from 'expo-image';
import {StyleSheet} from 'react-native';
import {Link} from "expo-router";
import {useState} from "react";

type UserAvatarPropsType = IAvatarProps;
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
export const ProfileAvatar = (
  props: UserAvatarPropsType & { name?: string; avatar: string; href?: string, size?:number }
) => {
  const { name = '??', avatar, href, size='sm' } = props;
  const d = name;
  const [f, setF] = useState(false);
  if(href) return (
      <Link  href={href}>
        <Avatar  size={size} borderRadius="$full" {...props}>
          <Image
              style={styles.imageLG}
              placeholder={blurhash}
              alt={d}
              source={
                {uri:avatar}
              }
          />
        </Avatar>
      </Link>
  )
  return (

      <Avatar  size={size} borderRadius="$full" {...props}>

        <Image
            style={styles.image}
            alt={d}
            source={
                {uri:avatar}

            }
            transition={300}
        />
      </Avatar>


  );
};
export const CurrentUserAvatar = (
  props: Omit<IAvatarProps, 'name' | 'avatar'> & { link?: boolean }
) => {
  const { data: user } = useCurrentUser();
  const { link, ...other } = props;
  return (
    <ProfileAvatar
      href={link && `/user/${user?.id}`}
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
    width: 36,
    height: 36,
  },
    imageMD: {
        borderRadius:100,
        width: 60,
        height: 60,
    },
    imageLG: {
        borderRadius:100,
        width: 80,
        height: 80,
    },
});
