import {useCurrentUser} from '../../session/model/queries';
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
  Pressable,
  Toast,
  ToastTitle,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed';
import * as SecureStore from 'expo-secure-store';
import {revalidateAuth} from '@/shared/lib/react-query/mutations';
import React, {useState} from 'react';
import {useLog} from '../../session/model/hooks';
import {CurrentUserAvatar} from './UserAvatar';
import {TeamPreviewAsLink} from '../../team/ui/TeamListPreview';
import {TeamPartialAsUser} from '@/shared/api/models/team';
import {Link} from "expo-router";


export function CurrentUserNav() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const { data: logged, isLoading } = useLog();
  const { data: curUser } = useCurrentUser(isLoading ? null : logged);
  const toast = useToast();

  if (!logged) return null;
  const { teams = [], avatar } = curUser ?? {};
  const finalTeams = teams
      ?.slice(0, 4)
      ?.sort(
          ({ name: { length: len1 } }, { name: { length: len2 } }) => len1 - len2
      );
  const url = `/user/${curUser?.id || ''}`;
  console.log()
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
                <Link href={url}>
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
                              id={item?.id}
                              role={item?.role}
                              name={item?.name}
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
