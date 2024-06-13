import {useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {useQuery} from 'react-query';
import {AUTH_DEPEND} from '@/shared/lib/react-query/client';

export const useSecureValue = (key: string) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(key);
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error fetching token from SecureStore', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [key]);

  return { value: token, loading };
};
export const useLog = () =>
  useQuery<boolean>({
    queryFn: () => SecureStore.getItemAsync('token').then((v) => !!v),
    queryKey: [AUTH_DEPEND, 'logged'],
  });
