import {Badge, BadgeText} from '@gluestack-ui/themed';
import {TeamPartialAsUser} from '@/shared/api/models/team';
import {Link} from "expo-router";

export const TeamPreviewAsLink = (props: TeamPartialAsUser) => {
  const { id, name, role } = props;
  return (
    <Link href={`/teams/${id}`} key={id}>
      <Badge borderRadius="$md" bg={role === 'Создатель' && '$orange400'}>
        <BadgeText>{name}</BadgeText>
      </Badge>
    </Link>
  );
};
