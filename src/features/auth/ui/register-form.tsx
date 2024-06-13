import React, {useState} from 'react';
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
  VStack,
} from '@gluestack-ui/themed';
import * as SecureStore from 'expo-secure-store';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {AlertTriangle} from 'lucide-react-native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Keyboard} from 'react-native';
import {UserRegisterFormSchema, UserRegisterSchema,} from '@/shared/api/models/user.model';
import {SessionRepo} from '@/entities/session/model/repo';
import {useAuthModal} from '@/entities/session/model/states';
import axios from 'axios';
import {useRouter} from 'expo-router';
import {revalidateAuth} from '@/shared/lib/react-query/mutations';

type SchemaClient = z.infer<typeof UserRegisterFormSchema>;
type SchemaServer = z.infer<typeof UserRegisterSchema>;
export const RegisterForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SchemaClient>({
    defaultValues: {
      username: '',
      firstname: '',
      password: '',
      confirmPassword: '',
      lastname: '',
    },
    resolver: zodResolver(UserRegisterFormSchema),
  });
  const [pwMatched, setPwMatched] = useState(false);
  const toast = useToast();
  const [_, setOpen] = useAuthModal();
  const router = useRouter();
  const onSubmit: SubmitHandler<SchemaClient> = async (data) => {
    if (pwMatched) return;
    setPwMatched(true);
    const { confirmPassword, ...signUpData } = data;
    try {
      //@ts-ignore
      const { id } = await SessionRepo.signUp(signUpData);
      const { firstname, lastname, ...signInData } = signUpData;
      const { token } = await SessionRepo.signIn(signInData);

      await SecureStore.setItemAsync('token', token);
      await revalidateAuth();

      toast.show({
        placement: 'bottom',
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="success">
              <VStack space="xs" w="100%">
                <ToastTitle>Успех!</ToastTitle>
                <ToastDescription>
                  <Text>Регистрация прошла успешно</Text>
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      reset();
      setOpen((v) => !v);
      router.replace('/');
    } catch (e) {
      setPwMatched(false);
      if (axios.isAxiosError(e)) {
        toast.show({
          placement: 'bottom',
          render: ({ id }) => {
            const toastId = 'toast-' + id;
            return (
              <Toast position="bottom" nativeID={toastId} action="error">
                <VStack space="xs" flex={1}>
                  <ToastTitle>New Message</ToastTitle>
                  <ToastDescription>{`Ошибка сервера: ${e?.response?.data?.message || ''}`}</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      } else {
        throw e;
      }
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack>
      <VStack justifyContent="space-between" gap="$4">
        <FormControl
          isInvalid={!!errors.username}
          isRequired={true}
          control={control}
        >
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="cocktail"
                  fontSize="$sm"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.username?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
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
                  onSubmitEditing={handleKeyPress}
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
        <FormControl isRequired isInvalid={!!errors?.lastname}>
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
                  onSubmitEditing={handleKeyPress}
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
        <FormControl isInvalid={!!errors.password} isRequired={true}>
          <Controller
            defaultValue=""
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={'password'}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.confirmPassword}>
          <Controller
            defaultValue=""
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Confirm Password"
                  fontSize="$sm"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={'password'}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.confirmPassword?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>

      <Button
        disabled={pwMatched}
        mt="$5"
        variant="solid"
        size="lg"
        onPress={handleSubmit(onSubmit, console.log)}
      >
        <ButtonText fontSize="$sm">ЗАРЕГИСТРИРОВАТЬСЯ</ButtonText>
      </Button>
    </VStack>
  );
};
