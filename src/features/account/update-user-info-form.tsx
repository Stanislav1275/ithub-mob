import {z} from 'zod';
import {UpdateUserSchema, UpdateUserShemaZod} from "@/shared/api/models/user.model";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useMemo} from "react";
import {useCurrentUser} from "@/entities/session/model/queries";
import {
    Button,
    ButtonText,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    Input,
    InputField,
    Spinner,
    Text,
    Toast,
    ToastDescription,
    ToastTitle,
    useToast,
    VStack
} from "@gluestack-ui/themed";
import {AlertTriangle} from "lucide-react-native";
import {changeUserById} from "@/entities/user/model/mutations";
import {EditorTextControl} from "@/shared/lib/ui/rich-editor/editor";

type SchemaClient = z.infer<typeof UpdateUserShemaZod>;

export const UpdateUserInfoForm = ({onS}:{onS?:(success?:boolean) => void}) => {
    const {data:user, isLoading} = useCurrentUser()
    const { mutateAsync, data } = changeUserById();
    const toast = useToast();

    const {control, handleSubmit, reset, formState:{errors, isSubmitting}, clearErrors} = useForm<UpdateUserSchema>({
        resolver: zodResolver(UpdateUserShemaZod),
        defaultValues: useMemo(
            () => ({
                ...user,
                email: user?.email ?? '',
                firstname: user?.firstname ?? '',
                lastname: user?.lastname ?? '',
                avatar: user?.avatar ?? '',
                bio_info: user?.bio_info ?? '',
                link: user?.link ?? '',
                telegram: user?.telegram ?? '',
            }),
            [user, data],
        ),
    });
    useEffect(() => {
        reset()
    }, [user])
    if(isLoading) return <Spinner/>
    const onSubmit: SubmitHandler<UpdateUserSchema> = async (data) => {
        clearErrors();
        //@ts-ignore
        const { username, id, ...other } = data;
        try {
            await mutateAsync({ ...other });
            toast.show({
                placement: 'bottom',
                render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast nativeID={toastId} action="success">
                            <VStack space="xs" w="100%">
                                <ToastTitle>Успех!</ToastTitle>
                                <ToastDescription>
                                    <Text>Изменения приняты</Text>
                                </ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            });
            onS?.(true)
        } catch (e) {
            toast.show({
                placement: 'bottom',
                render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast nativeID={toastId} action="success">
                            <VStack space="xs" w="100%">
                                <ToastTitle>Успех!</ToastTitle>
                                <ToastDescription>
                                    <Text>Ошибка сервера</Text>
                                </ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            });
        }
    };
    return <VStack>
        <VStack>
            <FormControl
                isInvalid={!!errors.firstname}
                isRequired={true}
                control={control}
            >
                <Controller
                    name="firstname"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input>
                            <InputField
                                placeholder="Имя"
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
                        {errors?.firstname?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <FormControl
                isInvalid={!!errors.lastname}
                isRequired={true}
                control={control}
            >
                <Controller
                    name="lastname"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input>
                            <InputField
                                placeholder="Фамилия"
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
                        {errors?.lastname?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <FormControl
                isInvalid={!!errors.avatar}
                control={control}
            >
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field: { onChange, onBlur, value = '' } }) => (
                        <Input>
                            <InputField
                                placeholder="аватар"
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
                        {errors?.avatar?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <EditorTextControl isReq control={control} name='bio_info'/>
            <FormControl
                isInvalid={!!errors.email}
                control={control}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value = '' } }) => (
                        <Input>
                            <InputField
                                placeholder="email"
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
                        {errors?.email?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <FormControl
                isInvalid={!!errors.telegram}
                control={control}
            >
                <Controller
                    name="telegram"
                    control={control}
                    render={({ field: { onChange, onBlur, value = '' } }) => (
                        <Input>
                            <InputField
                                placeholder="telegram"
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
                        {errors?.telegram?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <FormControl
                isInvalid={!!errors.link}
                control={control}
            >
                <Controller
                    name="link"
                    control={control}
                    render={({ field: { onChange, onBlur, value = '' } }) => (
                        <Input>
                            <InputField
                                placeholder="link"
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
                        {errors?.link?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
        </VStack>
        <Button
            disabled={isSubmitting || isLoading}
            mt="$5"
            variant="solid"
            size="lg"
            onPress={handleSubmit(onSubmit, console.log)}
        >
            <ButtonText fontSize="$sm">Изменить</ButtonText>
        </Button>
    </VStack>
}
