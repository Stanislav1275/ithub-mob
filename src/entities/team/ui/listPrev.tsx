import {useQuery} from 'react-query';
import {$api} from '@/shared/lib/axios/instance';
import {Link} from 'expo-router';
import {Avatar, Button, Card, Heading, ScrollView, Text, VStack} from "@gluestack-ui/themed";
import {Image} from "expo-image";
import {FlatList} from 'react-native'

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
                        <Image style={{borderRadius:100,width:36, height:36}} source={{uri:avatar||''}}/>
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
        <ScrollView>

        <VStack>
            <Heading >Команды</Heading>
            <FlatList
                contentContainerStyle={{ gap: 16 }}
                columnWrapperStyle={{ gap: 16 }}
                numColumns={2}
                keyExtractor={(item) => String(item.id)}
                data={teams} renderItem={({item:team, index}) => (
                        <TeamPreviewFeedItem team={team} key={team.id || index} />

            )}/>
        </VStack>
        </ScrollView>

    );
};
