import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { ProductInquiry, ProductInquirySearch } from 'models/display';

const productInquiry = {
    getAllProductInquiries: ({
        pageNumber = 1,
        pageSize = 20,
        hasTotalCount = false,
        searchType,
        searchKeyword,
    }: Omit<ProductInquirySearch, 'answered' | 'isMyInquiries'> &
        Paging): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/inquiries',
            params: {
                pageSize,
                pageNumber,
                hasTotalCount,
                searchType,
                searchKeyword,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getProductInquiriesConfig: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/products/inquiries/configurations' }),

    updateProductInquiry: (
        inquiryNo: string,
        { type, title, secreted, content }: Omit<ProductInquiry, 'email'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/products/inquiries/${inquiryNo}`,
            data: { type, title, secreted, content },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    deleteProductInquiry: (inquiryNo: string): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `/products/inquiries/${inquiryNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getProductInquiries: (
        productNo: string,
        {
            pageNumber,
            pageSize,
            hasTotalCount,
            startYmd,
            endYmd,
            answered,
            isMyInquiries,
        }: Omit<ProductInquirySearch, 'searchType' | 'searchKeyword'> &
            SearchDate &
            Paging,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/inquiries`,
            params: {
                pageNumber,
                pageSize,
                hasTotalCount,
                startYmd,
                endYmd,
                answered,
                isMyInquiries,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    writeProductInquiries: (
        productNo: string,
        {
            parentInquiryNo,
            title,
            content,
            secreted,
            type,
            email,
        }: ProductInquiry,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/products/${productNo}/inquiries`,
            data: {
                productNo: Number(productNo),
                parentInquiryNo,
                title,
                content,
                secreted,
                type,
                email,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getProductInquiry: (
        productNo: string,
        inquiryNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/inquiries/${inquiryNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getMyProductInquiries: ({
        pageNumber,
        pageSize,
        hasTotalCount,
        startYmd,
        endYmd,
        answered,
        searchType,
        searchKeyword,
    }: Omit<ProductInquirySearch, 'isMyInquiries'> &
        SearchDate &
        Paging): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/product-inquiries',
            params: {
                pageNumber,
                pageSize,
                hasTotalCount,
                startYmd,
                endYmd,
                answered,
                searchType,
                searchKeyword,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getMyProductInquiriesCount: ({
        startYmd,
        endYmd,
    }: SearchDate): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/product-inquiries/count',
            params: { startYmd, endYmd },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default productInquiry;
