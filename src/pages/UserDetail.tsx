import {ProfileAvatar} from "@/entities/user/ui/UserAvatar";
import {useUserByIdQuery} from "@/entities/user/model/queries";
import {useLocalSearchParams} from "expo-router";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionTitleText,
    AccordionTrigger,
    Box,
    Button,
    ChevronDownIcon,
    ChevronUpIcon,
    Heading,
    HStack,
    Icon,
    Link,
    LinkText,
    ScrollView,
    Text,
    VStack
} from "@gluestack-ui/themed";
import {telegramUrlParse} from "@/shared/lib/urls/withoutTelegram";
import {RenderHTML} from 'react-native-render-html';
import {Dimensions, FlatList} from "react-native";
import {useResumeListByUserQuery} from "@/entities/resume/model/queries";
import {PlusIcon, Settings2Icon} from "lucide-react-native";
import {CreateResumeForm} from "@/features/manage-resume/ui/create-resume-form";
import {useState} from "react";
import {useCurrentUser} from "@/entities/session/model/queries";
import {UpdateUserInfoForm} from "@/features/account/update-user-info-form";
import {TeamPreviewAsLink} from "@/entities/team/ui/TeamListPreview";

export default function UserDetail() {
    const id = Number(useLocalSearchParams<{ id: string }>().id)
    const parsedId = isNaN(id) ? undefined : id;
    let deviceWidth = Dimensions.get('window').width
    const {
        data: {
            id:userId,
            username = '',
            avatar = '',
            teams = [],
            firstname,
            bio_info,
            lastname,
            link,
            telegram = '',
            email
        } = {}, refetch
    } = useUserByIdQuery(parsedId);
    const {data: {resumes = []} = {}} = useResumeListByUserQuery()
    const {data: curUser, isLoading, isFetching} = useCurrentUser(true);
    const isOwner = curUser && curUser.id === parsedId;
    const [settings, setIsSettings] = useState(false);
    const toggleSettings = (against?:boolean) => {
        if (!isOwner) return;
        setIsSettings(v=>against!=undefined?against: !v)
        refetch()
    }
    if(settings) return <UpdateUserInfoForm onS={() => {
        toggleSettings()
    }}/>
    return <ScrollView gap='$4' py='$2' px='$4' space='lg' style={{flex: 1, gap: 4}}>
        <VStack gap='$4' py='$2'  pb='$8' space='lg' style={{flex: 1, gap: 4}}>
        <HStack gap='$4' space='md'>
            <ProfileAvatar size='lg' avatar={avatar}/>
            <VStack>
                <Text>
                    {`${firstname} ${lastname}`}
                </Text>

                <Heading>
                    {username}
                </Heading>


            </VStack>
            {isOwner && <Button
                style={{backgroundColor: settings ? '#1ec2ff' : '#d3d3d3', borderRadius: 100, width: 30, height: 30}}
                onPress={() => toggleSettings()}>
                <Icon as={Settings2Icon}/>
            </Button>}
        </HStack>
        <VStack>
            <Heading>
                Cоц.сет:
            </Heading>
            <Link href={telegram}>
                <LinkText>{`@${telegramUrlParse(telegram)}`}</LinkText>
            </Link>
            <Text>{`${email}`}</Text>

            <Link href={link}>
                <LinkText>{`${link?.replace('https://', '')}`}</LinkText>
            </Link>
        </VStack>
        <Box $px='$1' $w='$full' style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'gray',
            borderRadius: 16,
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexShrink: 1,
            maxWidth: deviceWidth - 5
        }}>
            <Heading>О себе</Heading>
            <RenderHTML source={{html: bio_info || '<></>'}}/>
        </Box>
        <VStack style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'gray', borderRadius: 16}}>
            {isOwner && <VStack>
                <Heading m='$2'>

                    Все резюме
                </Heading>
                <Accordion
                    $bg={null}
                    variant="single"
                    type="single"
                    isCollapsible={true}
                    isDisabled={false}
                >
                    <AccordionItem value="createResume">
                        <AccordionHeader>
                            <AccordionTrigger>
                                {({isExpanded}) => (
                                    <>
                                        <AccordionTitleText>
                                            <Button style={{
                                                backgroundColor: '04a6ff',
                                                borderRadius: 100,
                                                width: 40,
                                                height: 40
                                            }}>
                                                <Icon as={PlusIcon}/>
                                            </Button>
                                        </AccordionTitleText>
                                        {isExpanded ? <AccordionIcon as={ChevronUpIcon} ml="$3"/> :
                                            <AccordionIcon as={ChevronDownIcon} ml="$3"/>}
                                    </>
                                )}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            <CreateResumeForm id={userId}/>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>

            </VStack>}
            <Accordion
                $bg={null}
                width="100%"
                variant="multiple"
                type="multiple"
                isCollapsible={true}
                isDisabled={false}
            >
                {isOwner && resumes?.map(resume => (
                    <AccordionItem value={String(resume.id)}>
                        <AccordionHeader>
                            <AccordionTrigger>
                                {({isExpanded}) => (
                                    <>
                                        <AccordionTitleText>
                                            {resume.title}
                                        </AccordionTitleText>
                                        {isExpanded ? <AccordionIcon as={ChevronUpIcon} ml="$3"/> :
                                            <AccordionIcon as={ChevronDownIcon} ml="$3"/>}
                                    </>
                                )}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            <Box $px='$1' $w='$full' style={{
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: 'gray',
                                borderRadius: 16,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flexShrink: 1,
                                maxWidth: deviceWidth - 5
                            }}>

                                <RenderHTML source={{html: resume.html_info || '<></>'}}/>
                            </Box>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>


        </VStack>
        <VStack  style={{padding:8,borderWidth: 1, borderStyle: 'solid', borderColor: 'gray', borderRadius: 16}}>

        <Heading>Команды</Heading>
            <FlatList
                horisontal
                keyExtractor={(item) => String(item.id)}
                data={teams} renderItem={({item:team, index}) => (
                <TeamPreviewAsLink {...team} key={team.id || index} />

            )}/>
        </VStack>
        </VStack>
    </ScrollView>
}
