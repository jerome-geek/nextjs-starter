import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { InquiriesResponse, InquiryTypes, WriteInquiry } from 'models/manage';
import { tokenStorage } from 'utils/storage';

const inquiry = {
    getInquiries: (
        params?: Partial<Paging & SearchDate & InquiryTypes>,
    ): Promise<AxiosResponse<InquiriesResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();
        return request({
            method: 'GET',
            url: '/inquiries',
            params: {
                pageNumber: params?.pageNumber,
                pageSize: params?.pageSize,
                hasTotalCount: params?.hasTotalCount,
                startYmd: params?.startYmd,
                endYmd: params?.endYmd,
                inquiryTypeNo: params?.inquiryTypeNo,
                inquiryStatus: params?.inquiryStatus,
                inquiryStatuses: params?.inquiryStatuses,
                keyword: params?.keyword,
                searchType: params?.searchType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    // TODO 400 error, message: 해당 쇼핑몰에서 접근할 수 없거나 없는 문의 유형입니다. test 필요
    writeInquiry: (data: WriteInquiry): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();
        return request({
            method: 'POST',
            url: '/inquiries',
            data,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    // PREMIUM 타입에서 지원하지 않는 기능입니다.
    getInquiryConfig: (): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();
        return request({
            method: 'GET',
            url: '/inquiries/configurations',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    // TODO 404 error, message: 문의글이 존재하지 않습니다.
    getDetailInquiry: (inquiryNo: string): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();
        return request({
            method: 'GET',
            url: `/inquiries/${inquiryNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    // TODO 404 error, 위와 동일
    updateInquiry: (
        inquiryNo: string,
        data: WriteInquiry,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();
        return request({
            method: 'PUT',
            url: `/inquiries/${inquiryNo}`,
            data,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    // TODO 404 error, 위와 동일
    deleteInquiry: (inquiryNo: string): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();
        return request({
            method: 'DELETE',
            url: `/inquiries/${inquiryNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default inquiry;
