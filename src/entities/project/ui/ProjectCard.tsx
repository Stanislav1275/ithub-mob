import {ProjectAsTeam} from '@/shared/api/models/team';
import {Project, ProjectTeam} from '@/shared/api/models/project.model';
import {Link} from 'expo-router';
import {
    Badge,
    BellIcon,
    Box,
    Button,
    Card,
    FavouriteIcon,
    FlatList,
    Heading,
    HStack,
    Icon,
    Text,
    View,
    VStack
} from '@gluestack-ui/themed';
import {RenderHTML} from 'react-native-render-html';
import {ProfileAvatar} from "@/entities/user/ui/UserAvatar";
import {Dimensions} from "react-native";

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
    const {
        title,
        created_at,
        id,
        likes_count = 0,
        folowers_count = 0,
        patch_count,
        description,
        updated_at,
        team = {} as ProjectTeam,
        tags,
        is_liked,
        is_folow,
        html_info,
    } = project;
    const date = new Date(updated_at).toLocaleDateString();
    let deviceWidth = Dimensions.get('window').width
    return (
        <Card $w={deviceWidth} $mt='$4' $bg='primary' >
            <VStack style={{display:'flex', justifyContent:'space-between'}} >
                <HStack   $gap='$2'>
                    <Link href={`/teams/${team.id}`}>
                        <ProfileAvatar   avatar={team?.avatar!}/>
                    </Link>
                    <Text style={{ margin: 0 }}>{team?.name!}</Text>
                    <Text style={{ margin: 0 }} >
                        {date}
                    </Text>




                </HStack>
                <Text >{title}</Text>
            </VStack>
            <Link style={{width:'100%'}} href={`/project/${id}`}>
                <Box $w='$full' style={{maxWidth:deviceWidth - 30}}>
                    {description && <RenderHTML  contentWidth={deviceWidth - 30}  source={{html:description}}/>}
                    {/*    /!*<Button >{is_folow ? 'Вы подписаны' : 'Подписаться'}</Button>*!/*/}
                    {html_info && (
                        <Box $px='$1' $w='$full'  style={{borderWidth:1, borderStyle:'solid', borderColor:'gray', borderRadius:16, flexDirection:'row', flex: 1, flexWrap: 'wrap',flexShrink: 1, maxWidth:deviceWidth-40}}>

                            <RenderHTML defaultTextProps={{allowFontScaling:true}} contentWidth={deviceWidth - 50}      source={{html:html_info}} />
                        </Box>

                    )}
                </Box>
            </Link>
            <VStack>
                <HStack>
                    <HStack>
                        <Icon as={FavouriteIcon} m="$2" w="$4" h="$4" />
                        <Text style={{ margin: 0, marginTop: 2 }}>{likes_count}</Text>
                    </HStack>
                    <HStack>
                        <Icon as={BellIcon} m="$2" w="$4" h="$4" />
                        <Text style={{ margin: 0, marginTop: 2, marginLeft: 2 }}>{folowers_count}</Text>
                    </HStack>
                    <HStack $ml='$1'>
                        <Text  style={{ margin: 0, marginTop: 2, marginLeft: 4 }}>{`v${patch_count}`}</Text>

                    </HStack>
                </HStack>




            </VStack>
            <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap', gap:4}}>
                {tags.map(({id,tagname}) => (
                    <Badge key={id} >
                        <Text size='sm'>
                            {tagname}

                        </Text>
                    </Badge>
                ))}
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
