import { AxiosResponse } from 'axios';

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
};

export default upload;
