import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { DesignPopup, Popup } from 'models/display';

const popup = {
    getDesignPopups: ({
        displayUrl,
        parameter,
    }: DesignPopup): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/design-popups',
            data: { displayUrl, parameter },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getAllPopups: ({ pageType, targetNo }: Popup): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/popups',
            params: { pageType, targetNo },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getPopups: (
        popupNos: string,
        { pageType, targetNo }: Popup,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/popups/${popupNos}`,
            params: { pageType, targetNo },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default popup;
