import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import request, { defaultHeaders } from 'api/core';
import { tokenStorage } from 'utils/storage';
import { ACCUMULATION_REASON, ORDER_DIRECTION } from 'models';
import {
    GetAccumulationHistoriesResponse,
    GetAccumulationSummaryResponse,
} from 'models/manage';

interface getAccumulationHistoriesBody
    extends Omit<Paging, 'hasTotalCount'>,
        SearchDate {
    accumulationReason?: ACCUMULATION_REASON;
    direction?: ORDER_DIRECTION;
}

const accumulation = {
    /**
     * 적립금 이력 조회하기
     * - 적립금 이력을 전체 검색하는 API 입니다.
     *
     * @param body getAccumulationHistoriesBody
     * @returns Promise<AxiosResponse>
     */
    getAccumulationHistories: (
        body: getAccumulationHistoriesBody = {
            pageNumber: 1,
            pageSize: 10,
            accumulationReason: ACCUMULATION_REASON.ADD,
            startYmd: dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
            endYmd: dayjs().format('YYYY-MM-DD'),
            direction: ORDER_DIRECTION.DESC,
        },
    ): Promise<AxiosResponse<GetAccumulationHistoriesResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/accumulations',
            params: {
                pageNumber: body?.pageNumber,
                pageSize: body?.pageSize,
                accumulationReason: body?.accumulationReason,
                startYmd: body?.startYmd,
                endYmd: body?.endYmd,
                direction: body?.direction,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 적립금 요약 조회하기
     * - 적립금 요약정보를 조회하는 API 입니다.
     * !주의 다른 API와 다르게 timeformat이 YYYY-MM-DD HH:mm:ss
     *
     * @param params startYmd   만료 조회 시작일(YYYY-MM-DD HH:mm:ss, default: 한달) (Example : YYYY-MM-DD HH:mm:ss)
     * @param params endYmd   만료 조회 종료일(YYYY-MM-DD HH:mm:ss, default: 한달) (Example : YYYY-MM-DD HH:mm:ss)
     * @returns Promise<AxiosResponse>
     */
    getAccumulationSummary: (
        params: SearchDate = {
            startYmd: dayjs()
                .subtract(1, 'month')
                .format(' YYYY-MM-DD HH:mm:ss'),
            endYmd: dayjs().format(' YYYY-MM-DD HH:mm:ss'),
        },
    ): Promise<AxiosResponse<GetAccumulationSummaryResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/accumulations/summary',
            params: {
                expireStartYmdt: params?.startYmd,
                expireEndYmdt: params?.endYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 해당 회원의 예상 적립금 조회하기
     * - 해당 회원의 예상 적립금(적립대기)을 조회하는 API 입니다.
     *
     * @returns Promise<AxiosResponse>
     */
    getExpectAccumulation: (): Promise<
        AxiosResponse<{ waitingAccumulation: number }>
    > => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/accumulations/waiting',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default accumulation;
