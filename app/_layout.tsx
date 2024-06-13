import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useFonts} from 'expo-font';
import {Link, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {Providers} from "@/settings/providers";
import {HStack, Text} from '@gluestack-ui/themed';
import {useLog} from '@/entities/session/model/hooks';
import {AuthButton} from "@/features/auth/ui/auth-button";
import {CurrentUserNav} from "@/entities/user/ui/CurrentUserNav";
// export const unstable_settings = {
//     initialRouteName: '(home)',
// };
export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'feed',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}


function RootLayoutNav() {
    return (
        <Providers>
            <Stack screenOptions={{
                headerTitle: () => (
                    <HStack gap="$4">
                        <Link href="/feed">
                            Лента
                        </Link>
                        <Link href="/teams">
                            Команды
                        </Link>
                    </HStack>
                ),
                headerLeft: () => (
                    <Link href="feed">
                        <Text>KITE</Text>
                    </Link>
                ),
                headerStyle: {
                    backgroundColor: 'transparent', // Делаем фон заголовка прозрачным
                },
                headerRight: () => {
                    const { data: logged, isLoading } = useLog();
                    return !logged && !isLoading ? (
                        <AuthButton />
                    ) : isLoading ? (
                        <Text>Susp</Text>
                    ) : (
                        <CurrentUserNav />
                    );
                },
                contentStyle: { backgroundColor: 'transparent' },
                headerShown: true,
                headerBackVisible: false,
            }}>
                <Stack.Screen
                    name="feed"
                />
                <Stack.Screen
                    name="teams"
                />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
            </Stack>
        </Providers>
    );
}

