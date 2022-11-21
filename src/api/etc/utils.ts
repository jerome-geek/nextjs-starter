import axios, { AxiosResponse } from 'axios';

export interface GetCurrentIpResponse {
    IPv4: string;
    city: string;
    country_code: string;
    country_name: string;
    latitude: number;
    longitude: number;
    postal: number;
    state: string;
}

const utils = {
    /**
     * 현재 접속한 클라이언트 IP 정보를 가져온다 (https://geolocation-db.com/ 참고)
     * @returns Promise<AxiosResponse<GetCurrentIpResponse>>
     */
    getCurrentIp: (): Promise<AxiosResponse<GetCurrentIpResponse>> => {
        return axios({
            method: 'GET',
            baseURL: 'https://geolocation-db.com/json/',
        });
    },
};

export default utils;
