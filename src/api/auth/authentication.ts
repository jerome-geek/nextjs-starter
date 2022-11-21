import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { getPlatform } from 'utils';
import { CERTIFICATED_USAGE } from 'models';
import {
    AccessTokenBody,
    CertificatedNumber,
    CertificatedNumberViaEmail,
    CertificatedNumberViaSMS,
    CheckBizmallBody,
    IssueAccessTokenResponse,
    OpenIdAccessToken,
} from 'models/auth';
import { shopbyTokenStorage } from 'utils/storage';

const authentication = {
    checkCertificatedNumber: ({
        type,
        usage,
        certificatedNumber,
        memberNo,
        notiAccount,
    }: Omit<CertificatedNumber, 'memberName'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/authentications',
            data: {
                type,
                usage,
                certificatedNumber,
                memberNo,
                notiAccount,
            },
        }),

    sendCertificatedNumber: ({
        type,
        usage,
        memberNo,
        notiAccount,
        memberName,
    }: Omit<
        CertificatedNumber,
        'certificatedNumber'
    >): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications',
            data: {
                type,
                usage,
                memberNo,
                notiAccount,
                memberName,
            },
        }),

    checkBizmallAuth: ({
        companyNo,
        name,
        idNo,
    }: CheckBizmallBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications/bizmall',
            data: { companyNo, name, idNo },
        }),

    checkCertificatedNumberViaEmail: ({
        usage,
        email,
        certificatedNumber,
    }: Omit<
        CertificatedNumberViaEmail<
            Omit<
                CERTIFICATED_USAGE,
                | 'CHANGE_MOBILE_NO'
                | 'ADMIN'
                | 'JOIN'
                | 'CHANGE_ID'
                | 'ADMIN_SECONDARY'
                | 'CHANGE_EMAIL'
            >
        >,
        'memberName' | 'uri'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/authentications/email',
            data: {
                usage,
                email,
                certificatedNumber,
            },
        }),

    sendCertificatedNumberViaEmail: ({
        usage,
        email,
        memberName,
        uri,
    }: Omit<
        CertificatedNumberViaEmail<CERTIFICATED_USAGE>,
        'certificatedNumber'
    >): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications/email',
            data: { usage, email, memberName, uri },
        }),

    checkCertificatedNumberViaSMS: ({
        usage,
        mobileNo,
        key,
    }: Omit<
        CertificatedNumberViaSMS<
            Omit<
                CERTIFICATED_USAGE,
                | 'ADMIN'
                | 'JOIN_URI'
                | 'CHANGE_ID'
                | 'ADMIN_SECONDARY'
                | 'CHANGE_EMAIL'
            >
        >,
        'memberName'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/authentications/sms',
            data: { usage, mobileNo, key },
        }),

    sendCertificatedNumberViaSMS: ({
        usage,
        mobileNo,
        memberName,
    }: Omit<
        CertificatedNumberViaSMS<CERTIFICATED_USAGE>,
        'key'
    >): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications/sms',
            data: {
                usage,
                mobileNo,
                memberName,
            },
        }),

    checkOpenIdLoginUrl: ({
        provider,
        redirectUri,
        state,
    }: Pick<
        OpenIdAccessToken,
        'provider' | 'redirectUri' | 'state'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/oauth/login-url',
            data: { provider, redirectUri, state },
        }),

    issueOpenIdAccessToken: ({
        provider,
        code,
        openAccessToken,
        redirectUri,
        state,
        platformType,
    }: OpenIdAccessToken): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/oauth/openid',
            data: {
                provider,
                code,
                openAccessToken,
                redirectUri,
                state,
                platformType,
            },
        }),

    issueAccessToken: ({
        memberId,
        password,
        keepLogin = false,
        provider,
    }: AccessTokenBody): Promise<AxiosResponse<IssueAccessTokenResponse>> =>
        request({
            method: 'POST',
            url: '/oauth/token',
            data: { memberId, password, keepLogin, provider },
        }),

    deleteAccessToken: (): Promise<AxiosResponse> => {
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

        return request({
            method: 'DELETE',
            url: '/oauth/token',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getOpenIdAccessToken: (): Promise<AxiosResponse> => {
        return request({
            method: 'GET',
            url: '/openid/token',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        });
    },
};

export default authentication;
