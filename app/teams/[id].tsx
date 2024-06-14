import {
    Button,
    ButtonText,
    Center,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    Heading,
    HStack,
    Input,
    InputField,
    ScrollView,
    Text,
    Toast,
    ToastDescription,
    ToastTitle,
    useToast,
    View,
    VStack
} from "@gluestack-ui/themed";
import {ProfileAvatar} from "@/entities/user/ui/UserAvatar";
import {useTeamCurrentQuery} from "@/entities/team/model/queries";
import {useCurrentUser} from "@/entities/session/model/queries";
import {useUserByIdQuery} from "@/entities/user/model/queries";
import {FlatList} from "react-native";
import {TeamMember} from "@/entities/team/ui/TeamMemberPreviewCard";
import {Root, Tab, TabIcon, TabsList, TabsPanel, TabsPanels, TabTitle,} from '@/shared/ui-kit/tabs';
import {createTabs} from "@gluestack-ui/tabs";
import {RenderHTML} from "react-native-render-html";
import {ProjectCard} from "@/entities/project/ui/ProjectCard";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {CreateProjectChemaServer, CreateProjectZodChema} from "@/shared/api/models/project.model";
import {zodResolver} from "@hookform/resolvers/zod";
import {AlertTriangle} from "lucide-react-native";
import React from "react";
import {EditorTextControl} from "@/shared/lib/ui/rich-editor/editor";
import {invalidateTeam, useProjectCreateMutation} from "@/features/project-manage/model/mutation";

export const Tabs = createTabs({
    Root,
    TabList: TabsList,
    Tab: Tab,
    TabPanel: TabsPanel,
    TabPanels: TabsPanels,
    TabIcon,
    TabTitle: TabTitle,
});
export default function TeamDetail (){
    const {data:team, isLoading, refetch} = useTeamCurrentQuery();
    const {data:curUser} = useCurrentUser();
    const {data:owner} = useUserByIdQuery(team?.owner_id);
    const {clearErrors, formState:{errors, isSubmitting}, reset, handleSubmit, control} = useForm<CreateProjectChemaServer>({resolver:zodResolver(CreateProjectZodChema), defaultValues:{title:'', description: '', html_info:''}});
    const { mutateAsync, isLoading:isP } = useProjectCreateMutation();
    const toast = useToast();

    const onSubmit: SubmitHandler<CreateProjectChemaServer> = async (data) => {
        try {
            const newProj = await mutateAsync({ ...data, team_id: team?.id});
            reset()
            toast.show({
                placement: 'bottom',
                render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast nativeID={toastId} action="success">
                            <VStack space="xs" w="100%">
                                <ToastTitle>Успех!</ToastTitle>
                                <ToastDescription>
                                    <Text>Авторизация прошла успешно</Text>
                                </ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            })
            refetch()

            //@ts-ignore
            await invalidateTeam(team!.id);
        } catch (e) {
            toast.show({
                placement: 'bottom',
                render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast nativeID={toastId} action="error">
                            <VStack space="xs" w="100%">
                                <ToastTitle>Ошибка</ToastTitle>
                                <ToastDescription>
                                    <Text>Оишбка</Text>
                                </ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            })
        }
    };

    if(isLoading) return null;
    const isOwner = team && curUser && team?.owner_id === curUser?.id
    return <ScrollView>
    <View  gap='$4' px='$4' py='$2'>
        <VStack gap='$4'>
            <VStack >
                <HStack $gap='$4'>
                    <ProfileAvatar avatar={team?.avatar||""} size={100}/>
                    <VStack>
                        <Text size='md'>
                            {team?.name||"?"}
                        </Text>
                        <Text size='md'>
                            {team?.is_folow?'Подписаны':"Не подписаны"}
                        </Text>
                    </VStack>
                </HStack>

                <VStack ml='$3' mb='$4' gap='$5'>
                    <Heading>Создатель:{isOwner && 'Вы'}</Heading>
                    {!isOwner &&
                        <HStack gap='$10'>
                            <ProfileAvatar href={`/user/${owner?.id}`} avatar={owner?.avatar||''}/>
                            <Heading>{owner?.username}</Heading>
                        </HStack>
                    }
                </VStack>
            </VStack>
            <Tabs value='about'>
                <Tabs.TabList  value='about' w="100%">
                    <View
                        px="$4"
                        style={{
                            borderRadius: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}
                    >
                        <Tabs.Tab value="about">
                            <Text>О команде</Text>
                        </Tabs.Tab>
                        <Tabs.Tab value="projects">
                            <Text>проекты</Text>
                        </Tabs.Tab>

                        <Tabs.Tab value="claims">
                            <Text>заявки</Text>
                        </Tabs.Tab>
                    </View>
                </Tabs.TabList>
                <Tabs.TabPanels $mt='$4'>
                    <Tabs.TabPanel value="about">
                        <VStack>

                            <VStack $w='$full' justifyContent='space-between'>
                                <VStack px='$2' style={{marginTop:10,borderWidth: 1, borderStyle: 'solid', borderColor: 'gray', borderRadius: 16}}>
                                    <Heading>
                                        О себе
                                    </Heading>
                                    <RenderHTML source={{html: team.description || '<></>'}}/>

                                </VStack>
                                <VStack px='$2' style={{marginTop:10,borderWidth: 1, borderStyle: 'solid', borderColor: 'gray', borderRadius: 16}}>

                                    <Heading>
                                        Команды
                                    </Heading>
                                    <FlatList

                                        contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
                                        data={team?.members??[]} renderItem={({item}) => (
                                        <TeamMember member={item} key={item.id}/>
                                    )}/>
                                </VStack>
                            </VStack>
                        </VStack>
                    </Tabs.TabPanel>
                    <Tabs.TabPanel value="projects">
                        <VStack gap='$4'>
                            <Heading>
                                Создание резюме
                            </Heading>
                            {isOwner && <VStack>
                                <FormControl
                                    isInvalid={!!errors.title}
                                    isRequired={true}
                                    control={control}
                                >
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input>
                                                <InputField
                                                    placeholder="заголовок"
                                                    fontSize="$sm"
                                                    type="text"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    returnKeyType="done"
                                                />
                                            </Input>
                                        )}
                                    />
                                    <FormControlError>
                                        <FormControlErrorIcon size="md" as={AlertTriangle} />
                                        <FormControlErrorText>
                                            {errors?.title?.message}
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors.description}
                                    isRequired={true}
                                    control={control}
                                >
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input>
                                                <InputField
                                                    placeholder="заголовок"
                                                    fontSize="$sm"
                                                    type="text"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    returnKeyType="done"
                                                />
                                            </Input>
                                        )}
                                    />
                                    <FormControlError>
                                        <FormControlErrorIcon size="md" as={AlertTriangle} />
                                        <FormControlErrorText>
                                            {errors?.description?.message}
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                <EditorTextControl control={control} name='html_info'/>
                                <Button onPress={handleSubmit(onSubmit)}>

                                    <ButtonText>Создать резюме</ButtonText>
                                </Button>
                            </VStack>}
                            {!team?.projects?.length && <Center><Text>Пока нет проектов:)</Text></Center>}

                            <FlatList data={team?.projects||[]} renderItem={({item:project}) => (
                                <View style={{marginBottom:10}}>
                                    <ProjectCard key={project.id} project={project}/>

                                </View>
                            )}/>
                        </VStack>
                    </Tabs.TabPanel>

                </Tabs.TabPanels>
            </Tabs>


        </VStack>


    </View>
    </ScrollView>
}
