import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const $api = axios.create({
    maxBodyLength: 8388608,
    maxContentLength: 8388608,
    withCredentials: false,
    timeout: 360000,
    baseURL: 'http://77.222.53.231:8080/',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,Route,POST,PUT',
        'Access-Control-Allow-Header':
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    },
});

$api.interceptors.request.use(async (config) => {
    let token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
