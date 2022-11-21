import {
    AUTH_TYPE,
    OPEN_ID_TERM,
    SEX,
    SHOPBY_TERMS_TYPES,
    VC_TERMS_TYPES,
} from 'models';

export interface ProfileBody {
    birthday?: string;
    address?: string;
    certificated?: boolean;
    smsAgreed?: boolean;
    sex?: SEX;
    smsAuthKey?: string;
    memberName?: string;
    jibunAddress?: string;
    zipCd?: string;
    mobileNo?: string;
    pushNotificationAgreed?: boolean;
    refundBank?: string;
    currentPassword?: string;
    refundBankDepositorName?: string;
    password?: string;
    telephoneNo?: string;
    directMailAgreed?: boolean;
    joinTermsAgreements?: SHOPBY_TERMS_TYPES | VC_TERMS_TYPES[]; // TODO: 회원가입 API 분리시 타입 재정의 필요
    additionalInfo?: string;
    nickname?: string;
    detailAddress?: string;
    refundBankAccount?: string;
    email?: string;
    jibunDetailAddress?: string;
    firstName?: string;
    lastName?: string;
    openIdAccessToken?: string;
    ci?: string;
    recommenderId?: string;
    countryCd?: string;
    groupNo?: number;
    memberId: string;
}

export interface AddressBody {
    zipCd: string;
    streetAddress: string;
    streetAddressDetail: string;
    jibunAddress: string;
    jibunAddressDetail: string;
}

export interface PasswordBody {
    currentPassword: string;
    newPassword: string;
    willChangeNextTime: boolean;
}

export interface DormancyBody {
    certificationNumber: string;
    mobileNo: string;
    authType: AUTH_TYPE;
    email: string;
}

export interface FindIdBody {
    findMethod: AUTH_TYPE;
    certificationNo?: string;
    memberName?: string;
    mobileNo: string;
    key: string;
    email: string;
}

export interface FindPasswordBody {
    memberId: string;
    uri: string;
    content?: string;
    authType: string;
    inputType: string;
    receiveType: string;
}

export interface FindIdByCertificationParams {
    companyNo?: number;
    memberName?: string;
    mobileNo?: string;
    email?: string;
    ci?: string;
    certificationNumber?: string;
}

export interface UpdateProfileIdBody {
    updatesEmail: boolean;
    currentMemberId: string;
    newMemberId: string;
    certificationNumber: string;
}

export interface SignUpByOpenIdBody {
    birthday?: string;
    address?: string;
    certificated?: boolean;
    smsAgreed?: boolean;
    sex?: string;
    jibunAddress?: string;
    memberName?: string;
    zipCd?: number;
    mobileNo?: string;
    pushNotificationAgreed?: boolean;
    telephoneNoo?: string;
    joinTermsAgreements?: OPEN_ID_TERM;
    directMailAgreed?: boolean;
    nickname?: string;
    detailAddress?: string;
    email?: string;
    jibunDetailAddress?: string;
}

export interface DuplicateMemberParams {
    memberId: string;
    memberName: string;
    email: string;
    mobileNo: string;
}

export interface UpdatePasswordParams {
    newPassword: string;
    memberId: string;
    key?: string;
    certificationNumber: string;
}

export interface GetProfileParams {
    // 광고 우편물(DM) 수신 거부 일시 (example: 2022-10-05 15:30)
    directMailDisagreeYmdt: string;
    // 회사명 (example: null)
    businessName: Nullable<string>;
    // 회원 국적 (example: KR)
    countryCd: string; // TODO: 상수로 변경
    // 우편번호 (example: ABCD)
    zipCd: string;
    // 푸쉬 알림 동의 여부
    pushNotificationAgreed: boolean;
    // 광고 우편물(DM) 수신 동의 일시 (example: 2022-10-05 15:30)
    directMailAgreeYmdt: string;
    // 광고 우편물(DM) 수신 동의 여부
    directMailAgreed: boolean;
    // 추가 정보
    additionalInfo: string;
    // 가입 일시 (example: 2022-10-05 15:30)
    joinYmdt: string;
    // 회원 아이디 (example: jinsu01)
    memberId: string;
    // 최근 접속 시간 (nullable) (example: 2022-10-05T15:30:00.582910)
    lastLoginYmdt: Nullable<string>;
    // 인증 타입
    certificationType: string;
    // 연동된 SNS 리스트 (example: ["PAYCO","NAVER"])
    providerTypes: string[]; // TODO: 타입확인 필요
    // 단문메시지서비스(SMS) 동의 여부 (example: false)
    smsAgreed: boolean;
    // 도로명 주소 (지번 주소) (example: 지번 주소)
    jibunAddress: string;
    // 단문메시지서비스(SNS) 동의 일시 (example: 2022-10-05 15:30)
    smsAgreeYmdt: string;
    // 환불 계좌 은행 (example: KB)
    refundBank: string;
    // 회원 번호 (example: 12345)
    memberNo: number;
    // 환불 계좌 예금주명 (example: 박진수)
    refundBankDepositorName: string;
    // 일반 전화 번호 (example: 01012341234)
    telephoneNo: string;
    // 푸쉬 알림 거부 일시 (example: 2022-10-05 15:30)
    pushNotificationDisagreeYmdt: string;
    // 환불 계좌 번호
    refundBankAccount: string;
    // 회원 그룹 이름 (example: 테스트그룹)
    memberGroupNames: string;
    // 생년월일 (example: 19900406)
    birthday: string;
    // 쇼핑몰 이름 (example: 테스트 몰)
    mallName: string;
    // 회원 상태 (example: ACTIVE)
    memberStatus: string;
    // 회원 이름 (example: 박진수)
    memberName: string;
    // 마지막 연동 SNS (example: PAYCO)
    providerType: string;
    // 인증 여부
    principalCertificated: boolean;
    // 마지막 접속 IP (example: 127.0.0.1)
    lastLoginIp: string;
    // 닉네임 (example: jinsu)
    nickname: string;
    // 회원 그룹
    memberGroups: {
        // 그룹 이름 (example: 테스트그룹)
        memberGroupName: string;
        // 그룹 설명 (example: 설명)
        memberGroupDescription: string;
        // 그룹 번호 (example: 0)
        memberGroupNo: number;
    }[];
    // 이메일 주소 (example: jinsu@nhn.com)
    email: string;
    // 선택 동의 항목 상세
    agreedTermsInfos: {
        // 동의 일시 (example: 2022-10-05 15:30)
        agreementYmdt: string;
        // 동의 타입 (example: ACCESS_GUIDE)
        termsType: Exclude<
            keyof typeof SHOPBY_TERMS_TYPES,
            | 'REGULAR_PAYMENT_USE'
            | 'AUTO_APPROVAL_USE'
            | 'PI_LIQUOR_PURCHASE_PROVISION'
            | 'PI_RESTOCK_NOTICE'
        >;
    }[];
    // 도로명 주소 상세 (지번 주소) (example: 지번 상세 주소)
    jibunDetailAddress: string;
    // 선택 동의 항목 (example: ACCESS_GUIDE)
    agreedTerms: string[];
    // 도로명 주소 (example: 도로명 주소)
    address: string;
    // 성인 인증 여부
    adultCertificated: boolean;
    // 성인 인증 일시 (example: 2022-10-05 15:30)
    adultCertificatedYmdt: string;
    // 성별(F, M)(nullable) (example: M)
    sex: Nullable<SEX>;
    // 가입 경로(example: PC_WEB)
    joinTypeName: string;
    // 핸드폰 번호 (example: 01012341234)
    mobileNo: string;
    // 단문메시지서비스(SNS) 거부 일시 (example: 2022-10-05 15:30)
    smsDisagreeYmdt: string;
    // 로그인 횟수 (example: 10)
    loginCount: number;
    // 회원 등급 이름 (example: 테스트 등급)
    memberGradeName: string;
    // 사업자 등록번호 (example: null)
    registrationNo: Nullable<string>;
    // Open Id Key (example: 123456789)
    oauthIdNo: string;
    // 도로명 주소 상세^|(삼평동, NHN 플레이뮤지엄)
    detailAddress: string;
    // 푸쉬 알림 동의 일시 (example: 2022-10-05 15:30)
    pushNotificationAgreeYmdt: string;
    // 회원 구분 (example: MALL)
    memberType: string;
}
