import axios, { AxiosInstance } from 'axios';
import { HTTP_RESPONSE } from 'const/http';
import PATHS from 'const/paths';
import QueryString from 'qs';
import { getPlatform } from 'utils';
import { shopbyTokenStorage, vcTokenStorage } from 'utils/storage';
import { isLogin } from 'utils/users';

export const defaultHeaders = () => {
    return {
        version: process.env.NEXT_PUBLIC_VERSION || '',
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
        platform: getPlatform(),
    };
};

const request: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: defaultHeaders(),
});

// 요청 타임아웃 설정
request.defaults.timeout = 5000;

// 요청 인터셉터 추가
request.interceptors.request.use(
    (config) => {
        config.headers = config.headers ?? {};

        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

        if (isLogin()) {
            config.headers['accessToken'] = accessTokenInfo?.accessToken || '';
        } else {
            shopbyTokenStorage.clear();
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 응답 인터셉터 추가
request.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        // switch (error.request.status) {
        //     case HTTP_RESPONSE.HTTP_UNAUTHORIZED:
        //         shopbyTokenStorage.clear();
        //         alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요.');
        //         return window.location.replace(PATHS.LOGIN);

        //     case HTTP_RESPONSE.HTTP_INTERNAL_SERVER_ERROR:
        //         return window.location.replace(PATHS.ERROR);

        //     default:
        //         throw error;
        // }
        return error;
    },
);

export const vcRequest: AxiosInstance = axios.create({
    baseURL: 'http://3.39.37.100:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

vcRequest.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};

    // config.paramsSerializer = {
    //     encode: (params) => {
    //         console.log('params =>', params);

    //         return QueryString.stringify(params, { arrayFormat: 'repeat' });
    //     },
    // };

    const vcToken = vcTokenStorage.getAccessToken();

    if (vcToken) {
        config.headers.Authorization = `Bearer ${vcToken.accessToken}`;
    }

    return config;
});

vcRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status },
        } = error;

        if (status === 401) {
            if (error.response.data.message === 'TokenExpiredError') {
                const originalRequest = config;
                const refershToken =
                    vcTokenStorage.getAccessToken()?.refreshToken;

                const { data } = await axios.post(
                    'http://3.39.37.100:8080/token/refresh',
                    { refershToken },
                );

                axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
                return axios(originalRequest);
            }
        }

        return Promise.reject(error);
    },
);

export default request;
