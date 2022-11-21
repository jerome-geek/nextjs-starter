import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { HAS_ATTACHMENT_FILE, MY_REVIEW_YN, ORDER_DIRECTION } from 'models';
import {
    CategoryProductReviewsParams,
    MyProductReviewsParams,
    MyReviewableProductsParams,
    ProductReviewBody,
    ProductReviewsParams,
    ReportProductReviewBody,
} from 'models/display';

const review = {
    getCategoryProductReviews: ({
        hasAttachmentFile,
        categoryDepth,
        categoryNo,
        productName,
        orderBy,
        orderDirection = ORDER_DIRECTION.DESC,
        brandName,
        bestReviewYn,
        myReviewYn = MY_REVIEW_YN.N,
        pageNumber = 1,
        pageSize = 20,
        hasTotalCount = false,
    }: CategoryProductReviewsParams & Paging & Sort): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/category/product-reviews',
            params: {
                hasAttachmentFile,
                categoryDepth,
                categoryNo,
                productName,
                'order.by': orderBy,
                'order.direction': orderDirection,
                brandName,
                bestReviewYn,
                myReviewYn,
                pageNumber,
                pageSize,
                hasTotalCount,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getReviewBoardConfig: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/product-reviews/configurations' }),

    getProductReviews: (
        productNo: String,
        {
            hasAttachmentFile = HAS_ATTACHMENT_FILE.N,
            orderBy,
            orderDirection = ORDER_DIRECTION.DESC,
            bestReviewYn,
            pageNumber = 1,
            pageSize = 10,
            hasTotalCount = false,
        }: ProductReviewsParams & Paging & Sort,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/product-reviews`,
            params: {
                hasAttachmentFile,
                'order.by': orderBy,
                'order.direction': orderDirection,
                bestReviewYn,
                pageNumber,
                pageSize,
                hasTotalCount,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    registerProductReview: (
        productNo: String,
        {
            optionNo,
            orderOptionNo,
            content,
            rate,
            urls,
            extraJson,
        }: ProductReviewBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/products/${productNo}/product-reviews`,
            data: {
                optionNo,
                orderOptionNo,
                content,
                rate,
                urls,
                extraJson,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getReviewableOptions: (
        productNo: String,
        { orderNo }: { orderNo: String },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/reviewable-options`,
            params: { orderNo },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getProductReview: (
        productNo: String,
        reviewNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/product-reviews/${reviewNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    updateProductReview: (
        productNo: String,
        reviewNo: String,
        {
            urls,
            rate,
            content,
        }: Omit<ProductReviewBody, 'optionNo' | 'orderOptionNo' | 'extraJson'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/products/${productNo}/product-reviews/${reviewNo}`,
            data: {
                urls,
                rate,
                content,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    deleteProductReview: (
        productNo: String,
        reviewNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `/products/${productNo}/product-reviews/${reviewNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getProductReviewComments: (
        productNo: String,
        reviewNo: String,
        { hasTotalCount = false, pageNumber = 1, pageSize = 10 }: Paging,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/product-reviews/${reviewNo}/comments`,
            params: {
                hasTotalCount,
                page: pageNumber,
                size: pageSize,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    recommendProductReview: (
        productNo: String,
        reviewNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/products/${productNo}/product-reviews/${reviewNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    cancelProductReviewRecommend: (
        productNo: String,
        reviewNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `/products/${productNo}/product-reviews/${reviewNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    reportProductReview: (
        productNo: String,
        reviewNo: String,
        { reportReasonCd, content }: ReportProductReviewBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/products/${productNo}/product-reviews/${reviewNo}/report`,
            data: { reviewNo, reportReasonCd, content },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getMyProductReviews: ({
        pageNumber,
        pageSize,
        hasTotalCount = false,
        startYmd,
        endYmd,
        bestReviewYn,
        searchType,
        searchKeyword,
    }: MyProductReviewsParams & Paging): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/product-reviews',
            params: {
                pageNumber,
                pageSize,
                hasTotalCount,
                startYmd,
                endYmd,
                bestReviewYn,
                searchType,
                searchKeyword,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getMyReviewableProducts: ({
        pageNumber = 1,
        pageSize,
        hasTotalCount = false,
        startDate,
        endDate,
        productName,
        productNo,
        orderNo,
    }: MyReviewableProductsParams & Paging): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/order-options/product-reviewable',
            params: {
                pageNumber,
                pageSize,
                hasTotalCount,
                startDate,
                endDate,
                productName,
                productNo,
                orderNo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default review;
