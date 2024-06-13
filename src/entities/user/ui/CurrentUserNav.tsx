import { useCurrentUser } from '../../session/model/queries';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
  Button,
  ButtonText,
  FlatList,
  HStack,
  Link,
  Pressable,
  Text,
  Toast,
  ToastTitle,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed';
import * as SecureStore from 'expo-secure-store';
import { revalidateAuth } from '../../../shared/lib/react-query/mutations';
import React, { useState } from 'react';
import { useLog } from '../../session/model/hooks';
import { CurrentUserAvatar } from './UserAvatar';
import { TeamPreviewAsLink } from '../../team/ui/TeamListPreview';
import { TeamPartialAsUser } from '../../../shared/models/team.model';

export const CurrentUserNav1 = () => {
  const { data: logged } = useLog();
  const { data: user } = useCurrentUser(logged);
  const { username, teams = [], firstname, lastname } = user ?? {};
  const [showActionsheet, setShowActionsheet] = useState<boolean>(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const toast = useToast();
  if (!logged) return null;
  const finalTeams = teams
    ?.slice(0, 4)
    ?.sort(
      ({ name: { length: len1 } }, { name: { length: len2 } }) => len1 - len2
    );
  const url = `/user/${user?.id || ''}`;
  return (
    <Box>
      <Button onPress={handleClose}>
        <CurrentUserAvatar />
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <Link
          href={url}
          className="hover:text-muted-foreground underline flex gap-3 items-center"
        >
          <Text>avatar</Text>
          {/*<CurrentUserAvatar variant="pointer" />*/}
          <Text
            size="sm"
            style={{ lineClamp: 1, margin: 0 }}
          >{`@${username}`}</Text>
        </Link>
        <Text
          size="sm"
          style={{ lineClamp: 1, margin: 0 }}
        >{`${String.fromCharCode(160)}- ${firstname} ${lastname}`}</Text>
        <Link href={`${url}/team`} className="hover:text-muted-foreground">
          <Text size="2xl" className="flex items-start justify-start">
            Команды:
          </Text>
        </Link>
        <ActionsheetItem className="cursor-pointer" asChild>
          <Link href={`/projects`} className="hover:text-muted-foreground">
            <Text size="2xl">Лента</Text>
          </Link>
        </ActionsheetItem>
        <ActionsheetItem className="cursor-pointer" asChild>
          <Link href={`/team/feed`} className="hover:text-muted-foreground">
            <Text size="2xl">Команды</Text>
          </Link>
        </ActionsheetItem>
        <Button
          mt="$2"
          onClick={async () => {
            await SecureStore.setItemAsync('token', undefined);
            toast.show({
              placement: 'bottom',
              render: ({ id }) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast position="bottom" nativeID={toastId} action="success">
                    <VStack space="xs" flex={1}>
                      <ToastTitle>Вы вышли с аккаунта(:</ToastTitle>
                    </VStack>
                  </Toast>
                );
              },
            });
            await revalidateAuth();
          }}
        >
          <ButtonText>Выйти</ButtonText>
        </Button>
      </Actionsheet>
    </Box>
  );
};

export function CurrentUserNav() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const { data: logged, isLoading } = useLog();
  const { data: curUser } = useCurrentUser(isLoading ? null : logged);
  if (!logged) return null;
  const { teams = [] } = curUser ?? {};
  const finalTeams = teams
    ?.slice(0, 4)
    ?.sort(
      ({ name: { length: len1 } }, { name: { length: len2 } }) => len1 - len2
    );
  const url = `/user/${curUser?.id || ''}`;
  const toast = useToast();
  return (
    <Box>
      <Pressable onPress={handleClose}>
        <CurrentUserAvatar />
      </Pressable>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <VStack>
              <Link href={`/user/${curUser?.id}`}>
                <HStack>
                  {/*@ts-ignore*/}
                  <CurrentUserAvatar link size="md" />
                  <VStack>
                    <ActionsheetItemText>
                      {curUser?.username}
                    </ActionsheetItemText>
                    <HStack>
                      <ActionsheetItemText>
                        {curUser?.lastname}
                      </ActionsheetItemText>
                      <ActionsheetItemText>
                        {curUser?.firstname}
                      </ActionsheetItemText>
                    </HStack>
                  </VStack>
                </HStack>
              </Link>
              <View mt="$2">
                <FlatList
                  keyExtractor={(item: TeamPartialAsUser) => item.id}
                  data={finalTeams}
                  renderItem={({ item }: { item: TeamPartialAsUser }) => (
                    <TeamPreviewAsLink
                      id={item.id}
                      role={item.role}
                      name={item.name}
                    />
                  )}
                />
              </View>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <Button
              mt="$2"
              onPress={async () => {
                await SecureStore.deleteItemAsync('token');
                toast.show({
                  placement: 'bottom',
                  render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                      <Toast
                        position="bottom"
                        nativeID={toastId}
                        action="success"
                      >
                        <VStack space="xs" flex={1}>
                          <ToastTitle>Вы вышли с аккаунта(:</ToastTitle>
                        </VStack>
                      </Toast>
                    );
                  },
                });
                await revalidateAuth();
              }}
            >
              <ButtonText>Выйти</ButtonText>
            </Button>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
