import {
    AUTH_TYPE,
    CERTIFICATED_USAGE,
    NCP_OPEN_ID_PROVIDER,
    PLATFORM_TYPE,
} from 'models';

export interface CertificatedNumber {
    type: AUTH_TYPE;
    usage: CERTIFICATED_USAGE;
    certificatedNumber: string;
    memberNo?: number;
    notiAccount?: string;
    memberName: string;
}

export interface CheckBizmallBody {
    companyNo: number;
    name: string;
    idNo: string;
}

export interface CertificatedNumberViaEmail<T> {
    usage: T;
    email: string;
    certificatedNumber: string;
    memberName: string;
    uri: string;
}

export interface CertificatedNumberViaSMS<T> {
    usage: T;
    mobileNo: string;
    key: string;
    memberName: string;
}

export interface OpenIdAccessToken {
    provider: NCP_OPEN_ID_PROVIDER;
    code: string;
    openAccessToken: string;
    redirectUri: string;
    state: string;
    platformType: PLATFORM_TYPE;
}

export interface AccessTokenBody {
    memberId: string;
    password: string;
    keepLogin: Boolean;
    captcha?: string;
    provider?: string;
}

export interface CaptchaImage {
    code: string;
    key: string;
}

export interface IssueAccessTokenResponse {
    accessToken: string;
    daysFromLastPasswordChange: number;
    dormantMemberResponse?: {
        memberName?: string;
        mobileNo?: string;
        email?: string;
    };
    expireIn: number;
    passwordChangeRequired: boolean;
}
