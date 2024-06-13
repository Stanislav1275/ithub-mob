import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {CreatePostResumeSchema, CreateResumeZod} from '@/shared/api/models/resume.model';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCreateResume} from '../model/mutations';
import {
    Button,
    ButtonText,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    Input,
    InputField,
    Text,
    Toast,
    ToastDescription,
    ToastTitle,
    useToast,
    VStack
} from "@gluestack-ui/themed";
import React from "react";
import {AlertTriangle} from "lucide-react-native";
import {EditorTextControl} from "@/shared/lib/ui/rich-editor/editor";

export const CreateResumeForm = () => {
    const {handleSubmit, control, reset, formState: {errors, isSubmitting}} = useForm<CreatePostResumeSchema>({
        resolver: zodResolver(CreateResumeZod),
        defaultValues: {title: '', html_info: ''},
    });
    const {mutateAsync, isLoading} = useCreateResume();
    const toast = useToast();
    const onSubmit: SubmitHandler<CreatePostResumeSchema> = async (data) => {
        try {
            await mutateAsync(data);
            toast.show({
                placement: 'bottom',
                render: ({id}) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast nativeID={toastId} action="success">
                            <VStack space="xs" w="100%">
                                <ToastTitle>Успех!</ToastTitle>
                                <ToastDescription>
                                    <Text>Резюме успешно добавлено</Text>
                                </ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            });
            reset();
        } catch (e) {
            toast.show({
                placement: 'bottom',
                render: ({id}) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast nativeID={toastId} action="error">
                            <VStack space="xs" w="100%">
                                <ToastTitle>Успех!</ToastTitle>
                                <ToastDescription>
                                    <Text>Ошибка добавления резюме</Text>
                                </ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            });
        }
    };
    return (
        <VStack>
            <VStack $gap={'$2'} $space='$2'>
                <FormControl isRequired isInvalid={!!errors.title}>
                    <Controller
                        defaultValue=""
                        name="title"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input>
                                <InputField
                                    placeholder="Заголовок"
                                    fontSize="$sm"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    returnKeyType="done"
                                    type={'text'}
                                />
                            </Input>
                        )}
                    />
                    <FormControlError>
                        <FormControlErrorIcon size="sm" as={AlertTriangle}/>
                        <FormControlErrorText>
                            {errors?.title?.message}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <EditorTextControl  control={control} msg={errors.html_info?.message} name='html_info' isError={!!errors.html_info}/>
            </VStack>

            <Button
                disabled={isSubmitting || isLoading}
                mt="$5"
                variant="solid"
                size="lg"
                onPress={handleSubmit(onSubmit, console.log)}
            >
                <ButtonText fontSize="$sm">Создать</ButtonText>
            </Button>
        </VStack>
    );
};
