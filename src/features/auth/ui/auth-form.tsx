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
import {UserAuthSchema} from '@/shared/api/models/user.model';
import {SessionRepo} from '@/entities/session/model/repo';
import {useAuthModal} from '@/entities/session/model/states';
import axios from 'axios';
import {useRouter} from 'expo-router';
import {revalidateAuth} from '@/shared/lib/react-query/mutations';

type SchemaClient = z.infer<typeof UserAuthSchema>;
type SchemaServer = SchemaClient;
export const AuthForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SchemaClient>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(UserAuthSchema),
  });
  const [pwMatched, setPwMatched] = useState(false);
  const toast = useToast();
  const [_, setOpen] = useAuthModal();
  const router = useRouter();
  const onSubmit: SubmitHandler<SchemaClient> = async (data) => {
    if (pwMatched) return;
    setPwMatched(true);
    try {
      const { token } = await SessionRepo.signIn(data);
      await SecureStore.setItemAsync('token', token);
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
      });
      reset();
      await revalidateAuth();
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
      </VStack>

      <Button
        disabled={pwMatched}
        mt="$5"
        variant="solid"
        size="lg"
        onPress={handleSubmit(onSubmit, console.log)}
      >
        <ButtonText fontSize="$sm">АВТОРИЗИРОВАТЬСЯ</ButtonText>
      </Button>
    </VStack>
  );
};
