import {
    Box,
    Button,
    ButtonText,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalHeader,
    Text,
    View,
} from '@gluestack-ui/themed';
import {useRef} from 'react';
import {Root, Tab, TabIcon, TabsList, TabsPanel, TabsPanels, TabTitle,} from '@/shared/ui-kit/tabs';
import {createTabs} from '@gluestack-ui/tabs';
import {RegisterForm} from './register-form';
import {AuthForm} from './auth-form';
import {useAuthModal} from '@/entities/session/model/states';
//Root,
//   Tab,
//   TabPanels,
//   TabList,
//   TabPanel,
//   TabTitle,
//   TabIcon
export const AuthWrapper = () => {};
export const Tabs = createTabs({
  Root,
  TabList: TabsList,
  Tab: Tab,
  TabPanel: TabsPanel,
  TabPanels: TabsPanels,
  TabIcon,
  TabTitle: TabTitle,
});

export const AuthButton = () => {
  const [open, setOpen] = useAuthModal();
  const toggle = () => setOpen((v) => !v);
  const ref = useRef(null);
  return (
    <View>
      <Button ref={ref} onPress={toggle}>
        <ButtonText>Войти</ButtonText>
      </Button>
      <Modal
        useRNModal
        finalFocusRef={ref}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <ModalBackdrop />
        <ModalContent>
          <Box w={'100%'} sx={{ p: '$4', w: '100%' }}>
            <Tabs value="register">
              <ModalHeader>
                <Tabs.TabList w="100%">
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
                    <Tabs.Tab value="register">
                      <Text>регистрация</Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="auth">
                      <Text>войти</Text>
                    </Tabs.Tab>
                  </View>
                </Tabs.TabList>
              </ModalHeader>

              <ModalBody>
                <Tabs.TabPanels>
                  <Tabs.TabPanel value="register">
                    <View>
                      <RegisterForm />
                    </View>
                  </Tabs.TabPanel>
                  <Tabs.TabPanel value="auth">
                    <AuthForm />
                  </Tabs.TabPanel>
                </Tabs.TabPanels>
              </ModalBody>
            </Tabs>
          </Box>
        </ModalContent>
      </Modal>
    </View>
  );
};
