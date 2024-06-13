import {ProjectAsTeam} from '@/shared/api/models/team';
import {Project} from '@/shared/api/models/project.model';
import {Link} from 'expo-router';
import {Badge, Button, Card, FlatList, Heading, Text, View} from '@gluestack-ui/themed';
import {RenderHTML} from 'react-native-render-html';
import {ProfileAvatar} from "@/entities/user/ui/UserAvatar";

export const ProjectCard = ({ project }: { project: ProjectAsTeam }) => {
    const { title, created_at, id, likes_count = 0, folowers_count = 0, patch_count, description } = project;
    const date = new Date(created_at).toLocaleDateString();
    return (
        <Link href={`/project/${id}`}>
            <Card>
                <Heading>
                    <Text>{title}</Text>
                    <Text style={{ margin: 0 }} >
                        {date}
                    </Text>
                </Heading>
                {description && (
                    <RenderHTML  source={{html:description}} />
                )}
                <View>
                    <span className="flex gap-3">
                        <span className="flex items-center gap-1">
                            <Text style={{ margin: 0, marginTop: 2 }}>{likes_count}</Text>
                        </span>
                        <span className="flex items-center gap-1">
                            <Text style={{ margin: 0, marginTop: 2, marginLeft: 2 }}>{folowers_count}</Text>
                        </span>
                    </span>
                    <span className="flex items-center">
                        <Text  style={{ margin: 0, marginTop: 2, marginLeft: 2 }}>{`v${patch_count}`}</Text>
                    </span>
                </View>
            </Card>
        </Link>
    );
};
export const ProjectCardDetailPreview = ({ project }: { project: Project }) => {
    console.log({team:project.team})
    const {
        title,
        created_at,
        id,
        likes_count = 0,
        folowers_count = 0,
        patch_count,
        description,
        updated_at,
        team = {},
        tags,
        is_liked,
        is_folow,
        html_info,
    } = project;
    const date = new Date(updated_at).toLocaleDateString();
    return (
        <Card >
            <Heading >
                <span className="flex gap-2 items-center cur">
                    <Link href={`/team/${team?.id}`}>
                        <ProfileAvatar   avatar={team?.avatar!}/>
                    </Link>
                    <Text style={{ margin: 0 }}>{team?.name!}</Text>
                    <Text >{title}</Text>
                </span>
                <Text style={{ margin: 0 }} >
                    {date}
                </Text>
            </Heading>
            <Link href={`/project/${id}`}>
                <View>
                    <span>
                        {description && <RenderHTML  source={{html:description}}/>}
                        <Button >{is_folow ? 'Вы подписаны' : 'Подписаться'}</Button>
                    </span>
                    {html_info && (
                        <div className="border rounded-lg p-2">
                            <RenderHTML  source={{html:html_info}} />
                        </div>
                    )}
                </View>
            </Link>
            <View>
                <span className="flex gap-3">
                    <span className="flex items-center gap-1">
                        <Text style={{ margin: 0, marginTop: 2 }}>{likes_count}</Text>
                    </span>
                    <span className="flex items-center gap-1">
                        <Text style={{ margin: 0, marginTop: 2, marginLeft: 2 }}>{folowers_count}</Text>
                    </span>
                    <span className="flex items-center gap-1">
                         {/*<FlatList*/}
                         {/*    maxItems={5}*/}
                         {/*    disableEmptyView={true}*/}
                         {/*    data={tags ?? []}*/}
                         {/*    renderItem={(tag) => (*/}
                         {/*        <Badge  key={tag.id}>*/}
                         {/*            {tag.tagname}*/}
                         {/*        </Badge>*/}
                         {/*    )}*/}
                         {/*/>*/}

                    </span>
                </span>
                <span className="flex items-center">
                    <Text  style={{ margin: 0, marginTop: 2, marginLeft: 2 }}>{`v${patch_count}`}</Text>
                </span>
            </View>
        </Card>
    );
};
export const ProjectCardDetail = ({ project }: { project: Project }) => {
    const {
        title,
        created_at,
        id,
        likes_count = 0,
        folowers_count = 0,
        patch_count,
        description,
        updated_at,
        team,
        tags,
        is_liked,
        is_folow,
        html_info,
    } = project;
    const date = new Date(updated_at).toLocaleDateString();
    return (
        <Card >
            <Heading >
                <span className="flex gap-2 items-center cur">
                    <Link href={`/team/${team.id}`}>
                        <ProfileAvatar  src={team.avatar!}  avatar={team.avatar}/>
                    </Link>
                    <Text style={{ margin: 0 }}>{team.name}</Text>
                    <Text>{title}</Text>
                </span>
                <Text style={{ margin: 0 }}>
                    {date}
                </Text>
            </Heading>
            <Link href={`/project/${id}`}>
                <View>
                    <span >
                        {description && <RenderHTML s text={{html:description}} />}
                        <Button onPress={() => {} /*подписаться*/}>{is_folow ? 'Вы подписаны' : 'Подписаться'}</Button>
                    </span>
                    {html_info && (
                        <div className="border rounded-lg p-2">
                            <RenderHTML text={{html:html_info}} /> />
                        </div>
                    )}
                </View>
            </Link>
            <View >
                <span className="flex gap-3">
                    <span className="flex items-center gap-1">
                        <Text style={{ margin: 0, marginTop: 2 }}>{likes_count}</Text>
                    </span>
                    <span className="flex items-center gap-1">
                        <Text style={{ margin: 0, marginTop: 2, marginLeft: 2 }}>{folowers_count}</Text>
                    </span>
                    <span className="flex items-center gap-1">
                        <FlatList
                            maxItems={5}
                            disableEmptyView={true}
                            data={tags ?? []}
                            renderItem={(tag) => (
                                <Badge  key={tag.id}>
                                    {tag.tagname}
                                </Badge>
                            )}
                        />
                    </span>
                </span>
                <span className="flex items-center">
                    <Text style={{ margin: 0, marginTop: 2, marginLeft: 2 }}>{`v${patch_count}`}</Text>
                </span>
            </View>
        </Card>
    );
};
