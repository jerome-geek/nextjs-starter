import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    Event,
    EventDetailResponse,
    EventListResponse,
    Events,
} from 'models/display';

const event = {
    // TODO: categoryNos는 콤마로 구분되어 들어가니 number인지 string인지 확인 필요!
    getEvents: ({
        keyword,
        categoryNos,
    }: Omit<Events, 'eventTitle' | 'productNos' | 'onlyIngStatus'>): Promise<
        AxiosResponse<EventListResponse[]>
    > =>
        request({
            method: 'GET',
            url: '/display/events',
            params: { keyword, categoryNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getClosedEvents: ({
        keyword,
        eventTitle,
        pageNumber = 1,
        pageSize = 10,
        hasTotalCount = false,
    }: Omit<Events, 'categoryNos' | 'productNos' | 'onlyIngStatus'> &
        Paging): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/event/close',
            params: {
                keyword,
                eventTitle,
                pageNumber,
                pageSize,
                hasTotalCount,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO: productNos, categoryNos는 콤마로 구분되어 들어가니 number인지 string인지 확인 필요!
    getEventsByProducts: ({
        productNos,
        categoryNos,
    }: Omit<
        Events,
        'keyword' | 'eventTitle' | 'onlyIngStatus'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/events/products',
            params: { productNos, categoryNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    searchEventsByName: ({
        keyword,
        categoryNos,
        onlyIngStatus,
    }: Omit<Events, 'eventTitle' | 'productNos'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/events/search-by-name',
            params: { keyword, categoryNos, onlyIngStatus },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getEvent: (
        eventNo: string,
        { order, soldout, saleStatus }: Event,
    ): Promise<AxiosResponse<EventDetailResponse>> =>
        request({
            method: 'GET',
            url: `/display/events/${eventNo}`,
            params: { order, soldout, saleStatus },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getEventsByProduct: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/events/products/${productNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default event;
