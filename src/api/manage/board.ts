import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import request, { defaultHeaders } from 'api/core';
import {
    ArticleParams,
    BoardCategory,
    BoardDetail,
    BoardList,
    PostArticleParams,
} from 'models/manage';

const board = {
    /**
     * 게시판 설정 조회하기
     *
     * - 전체 게시판의 설정정보를 조회하는 API 입니다.
     * @returns Promise<AxiosResponse>
     */
    getConfigs: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/boards/configurations',
        }),

    /**
     * 게시글 리스트 조회하기
     * - 특정 게시판(게시판 번호 기준)의 게시글 리스트를 조회하는 API 입니다.
     *
     * @param boardNo string
     * @param params ArticleParams
     * @returns Promise<AxiosResponse><BoardList>>
     */
    getArticlesByBoardNo: (
        boardNo: string,
        params: ArticleParams = {
            pageNumber: 1,
            pageSize: 10,
            hasTotalCount: true,
            startYmd: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
            endYmd: dayjs().format('YYYY-MM-DD'),
            withReplied: false,
            isMine: false,
        },
    ): Promise<AxiosResponse<BoardList>> =>
        request({
            method: 'GET',
            url: `/boards/${boardNo}/articles`,
            params: {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                hasTotalCount: params.hasTotalCount,
                keyword: params.keyword,
                searchType: params.searchType,
                categoryNo: params.categoryNo,
                startYmd: params.startYmd,
                endYmd: params.endYmd,
                withReplied: params.withReplied,
                direction: params.direction,
                isMine: params.isMine,
            },
        }),

    /**
     * 게시글 작성하기
     * - 게시글을 작성하는 API 입니다.
     *
     * @param boardNo string
     * @param data PostArticleParams
     * @returns Promise<AxiosResponse>
     */
    writeArticle: (
        boardNo: string,
        data: PostArticleParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/boards/${boardNo}/articles`,
            data: {
                images: data.images,
                password: data.password,
                articleTitle: data.articleTitle,
                imageUrls: data.imageUrls,
                parentBoardArticleNo: data.parentBoardArticleNo,
                articleContent: data.articleContent,
                boardCategoryNo: data.boardCategoryNo,
                secreted: data.secreted,
                tags: data?.tags,
                guestName: data.guestName,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    /**
     * 게시판 카테고리 목록 조회하기
     * - 특정 게시판(게시판 번호 기준)의 카테고리를 조회하는 API 입니다.
     *
     * @param boardNo   string
     * @returns Promise<AxiosResponse<BoardCategory[]>>
     */
    getCategories: (boardNo: string): Promise<AxiosResponse<BoardCategory[]>> =>
        request({
            method: 'GET',
            url: `/boards/${boardNo}/categories`,
        }),

    getArticleDetail: (
        boardNo: string,
        articleNo: string,
        query?: {
            password?: string;
            withReplied?: boolean;
        },
    ): Promise<AxiosResponse<BoardDetail>> =>
        request({
            method: 'GET',
            url: `boards/${boardNo}/articles/${articleNo}`,
            params: {
                password: query?.password,
                withReplied: query?.withReplied,
            },
        }),

    updateArticle: (
        boardNo: string,
        articleNo: string,
        data: Omit<PostArticleParams, 'parentBoardArticleNo'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `board/${boardNo}/articles/${articleNo}`,
            data: {
                images: data.images,
                password: data.password,
                articleTitle: data.articleTitle,
                imageUrls: data.imageUrls,
                articleContent: data.articleContent,
                boardCategoryNo: data.boardCategoryNo,
                secreted: data.secreted,
                tags: data?.tags,
                guestName: data.guestName,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    deleteArticle: (
        boardNo: string,
        articleNo: string,
        { password }: { password?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `board/${boardNo}/articles/${articleNo}`,
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    checkEditableArticle: (
        boardNo: string,
        articleNo: string,
        { password }: { password?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `board/${boardNo}/articles/${articleNo}/editable`,
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    recommendArticle: (
        boardNo: string,
        articleNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `board/${boardNo}/articles/${articleNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    cancelArticleRecommend: (
        boardNo: string,
        articleNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `board/${boardNo}/articles/${articleNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default board;
