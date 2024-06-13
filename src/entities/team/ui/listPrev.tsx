import {useQuery} from 'react-query';
import {$api} from '@/shared/lib/axios/instance';
import {Link} from 'expo-router';
import {Avatar, AvatarImage, Button, Card, FlatList, HStack, Text} from "@gluestack-ui/themed";

type TeamListPreviewItem = {
    id: number;
    name: string;
    avatar: string | null;
    folowers_count: number;
    isFolow: boolean;
};
export const TeamPreviewFeedItem = ({ team }: { team: TeamListPreviewItem }) => {
    const { id, isFolow, folowers_count, avatar, name } = team;
    return (
        <Link href={`/teams/${id}`}>
            <Card size='md'>
                    <Avatar >
                        <AvatarImage src={avatar!} />
                    </Avatar>
                    <Text>{name}</Text>
                    <Text >Подписчиков:{folowers_count}</Text>
                    <Button>
                        <Text>{!isFolow ? 'подписаться' : 'отписаться'}</Text>
                    </Button>
            </Card>
        </Link>
    );
};
export const TeamListPrev = () => {
    const {
        data: { teams } = {},
        isLoading,
        isFetched,
    } = useQuery({ queryFn: () => $api.get<{ teams: TeamListPreviewItem[] }>('api/team').then((v) => v.data), queryKey: ['list', 'teams'] });
    return (
        <HStack>
            <Text >Команды</Text>
            <FlatList
                keyExtractor={(item) => item.id}
                data={teams} renderItem={({item:team, index}) => (
                <TeamPreviewFeedItem team={team} key={team.id || index} />
            )}/>

        </HStack>
    );
};
