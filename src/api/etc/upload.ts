import axios, { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

const upload = {
    uploadImage: (body: any): Promise<AxiosResponse> => {
        return request({
            method: 'POST',
            url: '/files/images',
            data: body,
            headers: Object.assign({}, defaultHeaders(), {
                'Content-Type': 'multipart/form-data',
            }),
        });
    },
    uploadImageForAdmin: (body: any): Promise<AxiosResponse> => {
        return axios({
            method: 'POST',
            url: '/file/upload',
            data: body,
            baseURL: process.env.NEXT_PUBLIC_GEEK_BASE_URL,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default upload;
