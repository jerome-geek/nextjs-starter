import axios, { AxiosResponse } from 'axios';
import { COURSE_REQUEST_STATUS } from 'models';

export interface GolfCourseParams {
    q: string;
    country: string;
    realm: string;
}

export interface AdminCourseRequestBody {
    shopbyMemberNo: number;
    memberEmail: string;
    memberName: string;
    countryCode: string;
    region?: string;
    fieldName?: string;
    requestTitle: string;
    requestDetail: string;
    shopbyProductNo: number;
    scoreCardImgUrl?: string;
    courseLayoutImgUrl?: string;
    consentFl: string;
}

export interface GolfCourseRequestList {
    sno: number;
    regDt: string;
    shopbyMemberNo: number;
    memberEmail: string;
    memberName: string;
    countryCode: string;
    region: string;
    fieldName: string;
    requestTitle: string;
    requestDetail: string;
    shopbyProductNo: number;
    scoreCardImgUrl: string;
    courseLayoutImgUrl: string;
    consentFl: string;
    status: COURSE_REQUEST_STATUS;
}

const golfCourse = {
    getRegion: (params: GolfCourseParams): Promise<AxiosResponse> => {
        return axios({
            method: 'GET',
            baseURL: '/golf-course/search-realm.ajax.php',
            params,
        });
    },

    courseRequest: (body: AdminCourseRequestBody): Promise<AxiosResponse> => {
        return axios({
            method: 'POST',
            data: body,
            baseURL: process.env.NEXT_PUBLIC_GEEK_BASE_URL,
            url: '/course-request',
        });
    },

    getCourseRequestList: (
        shopbyMemberNo: number,
    ): Promise<AxiosResponse<GolfCourseRequestList[]>> => {
        return axios({
            method: 'GET',
            baseURL: process.env.NEXT_PUBLIC_GEEK_BASE_URL,
            url: `/course-request/list/${shopbyMemberNo}`,
        });
    },
};

export default golfCourse;
