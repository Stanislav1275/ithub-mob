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
    ChevronDownIcon,
    ChevronUpIcon,
    Heading,
    HStack,
    Link,
    LinkText,
    ScrollView,
    Text,
    VStack
} from "@gluestack-ui/themed";
import {telegramUrlParse} from "@/shared/lib/urls/withoutTelegram";
import {RenderHTML} from 'react-native-render-html';
import {Dimensions} from "react-native";
import {useResumeListByUserQuery} from "@/entities/resume/model/queries";

export default function UserDetail (){
    const id = Number(useLocalSearchParams<{id:string}>().id)
    const parsedId = isNaN(id)?undefined:id;
    let deviceWidth = Dimensions.get('window').width
    const {data:{username = '', avatar = '', teams, firstname, bio_info, lastname, link, telegram = '', email} = {}} = useUserByIdQuery(parsedId);
    const {data:{resumes = []} = {}} = useResumeListByUserQuery()
    return <ScrollView gap='$4' py='$2' px='$4' space='lg' style={{flex:1, gap:4}}>
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

        </HStack>
        <VStack>
            <Heading>
                Cоц.сет:
            </Heading>
            <Link  href={telegram}>
                <LinkText>{`@${telegramUrlParse(telegram)}`}</LinkText>
            </Link>
            <Text>{`${email}`}</Text>

            <Link   href={link}>
                <LinkText>{`${link?.replace('https://','')}`}</LinkText>
            </Link>
        </VStack>
        <Box $px='$1' $w='$full'  style={{borderWidth:1, borderStyle:'solid', borderColor:'gray', borderRadius:16, flexDirection:'row',  flexWrap: 'wrap',flexShrink: 1, maxWidth:deviceWidth-5}}>

            <RenderHTML source={{html:bio_info||'<></>'}}/>
        </Box>
        <VStack style={{borderWidth:1, borderStyle:'solid', borderColor:'gray', borderRadius:16}}>
            <Heading m='$2'>
                Все резюме
            </Heading>
            <Accordion
                $bg={null}
                width="100%"
                variant="multiple"
                type="multiple"
                isCollapsible={true}
                isDisabled={false}
            >
                {resumes?.map(resume => (
                    <AccordionItem value={String(resume.id)}>
                        <AccordionHeader>
                            <AccordionTrigger>
                                {({isExpanded}) => (
                                    <>
                                        <AccordionTitleText>
                                            {resume.title}
                                        </AccordionTitleText>
                                        {isExpanded?<AccordionIcon as={ChevronUpIcon} ml="$3" />:<AccordionIcon as={ChevronDownIcon} ml="$3" />}
                                    </>
                                )}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            <Box $px='$1' $w='$full'  style={{borderWidth:1, borderStyle:'solid', borderColor:'gray', borderRadius:16, flexDirection:'row',  flexWrap: 'wrap',flexShrink: 1, maxWidth:deviceWidth-5}}>

                                <RenderHTML source={{html:resume.html_info||'<></>'}}/>
                            </Box>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </VStack>

    </ScrollView>
}
