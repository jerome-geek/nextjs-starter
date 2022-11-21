import {
    ACCUMULATION_DISPLAY_FORMAT_TYPE,
    ACCUMULATION_GIVE_POINT,
    AUTHENTICATION_TIME_TYPE,
    AUTHENTICATION_TYPE,
    BOARD_DISPLAY_TYPE,
    CLAIM_STATUS_TYPE,
    CLAIM_REASON_TYPE,
    COUNTRY_CD,
    IMAGE_DISPLAY_TYPE,
    INQUIRY_TYPE,
    INTRO_REDIRECTION_TYPE,
    OPEN_ID_PROVIDER,
    ORDER_STATUS_TYPE,
    PRODUCT_ACCUMULATION_BASIS_TYPE,
    CART_EQUIVALENT_OPTION_UNIT_TYPE,
    PRODUCT_REVIEW_REPORT_TYPE,
} from 'models';
import { Category } from 'models/display';
import { InquiryType } from 'models/manage';

// 접속 URL
export interface Url {
    // PC 접속 URL (example: http://test.e-ncp.com)
    pc: string;
    // 안드로이드 마켓 URL (example: http://and.com/aa23)
    android: string;
    // 모바일웹 접속 URL (example: http://test.e-ncp.com)
    mobile: string;
    // 앱스토어 URL (example: http://ios.com/aa23)
    ios: string;
}

export interface EvaluationCondition {
    minimumCount: number;
    minimumPayment: number;
}

export interface ReserveAutoSupplying {
    used: boolean;
    amount: number;
    type: string;
}

export interface ReserveBenefit {
    used: boolean;
    reserveRate: number;
}

export interface Grade {
    used: boolean;
    label: string;
    description: string;
    evaluationCondition: EvaluationCondition;
    reserveAutoSupplying: ReserveAutoSupplying;
    reserveBenefit: ReserveBenefit;
    coupons: any[];
    pointRate: number;
    gradeDescription: string;
    accumulationRate: number;
    minOrderCnt: number;
    minOrderAmt: number;
}

// 서비스 센터 정보
export interface ServiceCenter {
    // 서비스센터 이메일 (example: test@test.com)
    email: string;
    // 서비스센터 전화번호 (example: 010-1111-1111)
    phoneNo: string;
}

// 인트로 페이지 설정정보
export interface IntroRedirection {
    // 인트로 페이지 PC 웹 설정정보 (example: ONLY_MEMBER)
    pc: INTRO_REDIRECTION_TYPE;
    // 인트로 페이지 모바일 웹 설정정보 (example: ONLY_ADULT)
    mobile: INTRO_REDIRECTION_TYPE;
}

// 쇼핑몰 정보
export interface Mall {
    // 커머스 상점번호 (example: 1234)
    godoSno: string;
    // 쇼핑몰명 (example: 테스트 쇼핑몰)
    mallName: string;
    // 인트로 페이지 설정정보
    introRedirection: IntroRedirection;
    // 쇼핑몰 서비스 국가 (example: KR)
    countryCode: COUNTRY_CD;
    // 쇼핑몰 생성일 (example: yyyy-MM-dd HH:mm:ss)
    createdDateTime: string;
    // 등급
    grades: Grade[];
    // 서비스센터 정보
    serviceCenter: ServiceCenter;
    escrowLogo: {
        // 로고 노출에 필요한 HTML 코드 (이니시스만 반환됨) (example: <div>LOGO</div>)
        logoHtml: string;
        // TODO: PG_TYPE 타입 확인 필요
        // PG사 (example: KCP)
        pgType: string;
        // 에스크로 이미지 노출여부 (example: true)
        exposure: boolean;
    };
    // 접속 URL
    url: Url;
}

// 상품문의 유형 목록
export interface ProductInquiryType {
    // 상품문의 유형 명칭 (example: 상품)
    label: string;
    // 상품문의 유형 (example: PRODUCT)
    value: INQUIRY_TYPE;
}

// 상품평 신고 유형 목록
export interface ProductReviewReportType {
    // 상품평 신고 유형 명칭 (example: 저작권 침해 및 기타사유)
    label: string;
    // 상품평 신고 유형 값 (example: COPYRIGHT)
    value: PRODUCT_REVIEW_REPORT_TYPE;
}

// 클레임 사유 목록
export interface ClaimReasonType {
    // 클레임 사유 명칭 (example: 입금전취소)
    label: string;
    // 클레임 사유 값 (example: CANCEL_BEFORE_PAY)
    value: CLAIM_REASON_TYPE;
}

// 클레임상태 목록
export interface ClaimStatusType {
    // 클레임상태 명칭 (example: 취소완료[환불없음])
    label: string;
    // 클레임상태 값 (example: CANCEL_NO_REFUND)
    value: CLAIM_STATUS_TYPE;
}

// 주문상태 목록
export interface OrderStatusType {
    // TODO: 타입 타이핑 추가 필요
    // 주문상태 명칭 (입금대기)
    label: string;
    // 주문상태 값 (example: DEPOSIT_WAIT)
    value: ORDER_STATUS_TYPE;
}

// 은행 목록
export interface BankType {
    // TODO: 타입 타이핑 추가 필요
    // KCP 은행 관리코드 (example: 04)
    kcpCode: string;
    // TODO: 타입 타이핑 추가 필요
    // 은행 코드 (example: 004)
    code: string;
    // TODO: 타입 타이핑 추가 필요
    // 은행명 (example: 국민은행)
    name: string;
    // 은행 영문 관리명 (example: KB)
    value: string;
}

// 게시판 카테고리 정보
export interface BoardCategoryInfo {
    // 게시판 카테고리 번호 (example: 1)
    categoryNo: number;
    // 게시판 카테고리 명칭 (example: 질문)
    label: string;
}

export interface BoardsCategory {
    // 썸네일 이미지 사용 여부 (example: true)
    thumbnailUsed: boolean;
    // 답글 작성 가능 여부 (example: false)
    replied: boolean;
    // 회원 작성 가능 여부 (example: false)
    memberWrite: boolean;
    // 게시판 사용 여부 (example: true)
    used: boolean;
    // 비밀글 작성 가능 여부 (example: false)
    secreted: boolean;
    // 게시판 이름 (example: 자유게시판)
    boardName: string;
    // 비회원 작성 가능 여부 (example: false)
    guestWrite: boolean;
    // 리스트 이미지 유형 (example: NOT_USED)
    imageDisplayType: IMAGE_DISPLAY_TYPE;
    // 게시판 노출 유형 (example: LIST)
    displayType: BOARD_DISPLAY_TYPE;
    // 카테고리 사용 여부 (example: true)
    categoryUsed: boolean;
    // 첨부파일 사용 여부 (example: false)
    attachmentUsed: boolean;
    // 게시판 ID (example: freeboard)
    boardId: string;
    // 게시판 카테고리 정보
    categories: BoardCategoryInfo[];

    // 게시판 번호 (example: 1)
    boardNo: number;
}

// 쇼핑몰 기본 정보
export interface ServiceBasicInfo {
    // 주소 (example: 서울특별시 구로구 구로동 디지털로26길 72)
    address: string;
    // 대표 이메일 (example: cs@nhn-commerce.com)
    representEmail: string;
    // 회사명 (example: 엔에이치엔커머스)
    companyName: string;
    // 개인정보보호 책임자명 (example: 김종승)
    privacyManagerName: string;
    // 지번 주소 (example: 서울특별시 구로구 구로동 222-22)
    jibunAddress: string;
    // 통신판매업신고 번호 (example: 2015-서울구로-0049)
    onlineMarketingBusinessDeclarationNo: string;
    // 업태 (example: 정보통신업)
    businessCondition: string;
    // 우편번호 (example: 08393)
    zipCd: string;
    // 상세주소 (example: 3층)
    addressDetail: string;
    // 팩스번호 (example: 02-567-3744)
    faxNo: string;
    // 개인정보보호 책임자 전화번호 (example: 1688-7662)
    privacyManagerPhoneNo: string;
    // 사업자등록번호 (example: 120-86-46911)
    businessRegistrationNo: string;
    // 대표 전화번호 (example: 1688-7662)
    representPhoneNo: string;
    // 업종 (example: 통신판매업)
    businessType: string;
    // 샵바이 서비스 플랜명 (example: PREMIUM)
    plan: string;
    // 지번 상세주소 (example: 3층)
    jibunAddressDetail: string;
    // 대표자명 (example: 이식)
    representativeName: string;
}

// 쇼핑몰 계좌 정보
export interface BankAccountInfo {
    // 계좌번호 (example: 123456789)
    bankAccount: string;
    // 예금주명 (example: 커머스)
    bankDepositorName: string;
    // 은행명 (example: 우리은행)
    bankName: string;
}

// 회원 가입 설정
export interface MemberJoinConfig {
    // 생년월일 필수 여부 (example: NOT_USED)
    birthday: string;
    // 비밀번호 필수 여부 (example: NOT_USED)
    password: string;
    // 주소 필수 여부 (example: NOT_USED)
    address: string;
    // 국적 필수 여부 (example: NOT_USED)
    nationality: string;
    // 성별 필수 여부 (example: NOT_USED)
    sex: string;
    // 닉네임 필수 여부 (example: NOT_USED)
    nickname: string;
    // 회원명 필수 여부 (example: NOT_USED)
    memberName: string;
    // 휴대전화번호 필수 여부 (example: NOT_USED)
    mobileNo: string;
    // 전화번호 필수 여부 (example: NOT_USED)
    phoneNo: string;
    // 이메일 필수 여부 (example: NOT_USED)
    email: string;
    // 아이디 필수 여부 (example: NOT_USED)
    memberId: string;
}

// 상품평 적립금 상세정보
export interface ReviewsAccumulationDetail {
    // 포토 상품평 적립금 (example: 150)
    photoReviewsAccumulation: number;
    // 포토 상품평 글자수 (example: 10)
    photoReviewsLength: number;
    // 상품평 글자수 (example: 10)
    reviewsLength: number;
    // 상품평 적립금 (example: 100)
    reviewsAccumulation: number;
}

// 적립금 설정 정보
export interface AccumulationConfig {
    // 적립금 만료 알림 사용여부 (example: false)
    useExpireNotification: boolean;
    // 회원가입 적립금 사용여부 (example: false)
    useSignUpAccumulation: boolean;
    // 운영자 메모 (example: 적립금 지급)
    adminMemo: string;
    // 적립금 단위 (example: 포인트)
    accumulationUnit: string;
    // 적립금 지급 시점 (example: AFTER_A_WEEK)
    accumulationGivePoint: ACCUMULATION_GIVE_POINT;
    // 적립금 기본 적립률 (example: 10)
    accumulationRate: number;
    // 적립금 사용 최대 적립금 제한 여부 (example: false)
    limitMaxRate: boolean;
    // 적립금 사용 최소 상품금액 제한 여부 (example: false)
    limitMinProductPrice: boolean;
    // 적립금 사용 최소 적립금 (example: 1000)
    accumulationUseMinPrice: number;
    // 적립금 노출 설정 (example: FIXED_AMT)
    accumulationDisplayFormatType: ACCUMULATION_DISPLAY_FORMAT_TYPE;
    // 상품평 적립금 상세정보
    reviewsAccumulationDetail: ReviewsAccumulationDetail;
    // 적립금 만료 알림 시점 (day 기준) (example: 30)
    expireNotificationPoint: number;
    // 적립금 유효기간 (month 기준) (example: 3)
    accumulationValidPeriod: number;
    // 상품 적립 사용여부 (example: false)
    useProductAccumulation: boolean;
    // 적립금 사용 최대비율 (example: false)
    excludingReservePayAccumulation: boolean;
    // 적립금 사용 최소 적립금 제한 여부 (example: false)
    limitMinPrice: boolean;
    // 적립금 사용 최소 상품금액 (example: 5000)
    accumulationUseMinProductPrice: number;
    // 회원가입 적립금 (example: 1000)
    signUpAccumulation: number;
    // 적립금 사용 최대비율 (example: 100)
    accumulationUseMaxRate: number;
    // 상품평 적립금 사용여부 (example: false)
    useReviewsAccumulation: boolean;
    // 상품 금액 기준 설정 (example: null)
    productAccumulationBasisType: Nullable<PRODUCT_ACCUMULATION_BASIS_TYPE>;
    // 적립금명 (example: 구매 적립금)
    accumulationName: string;
    // 쿠폰할인 결제시 적립금 지급 제외여부 (example: false)
    excludingReservePayCoupon: boolean;
    // 회원 적립 사용여부 (example: false)
    useMemberAccumulation: boolean;
}

// 장바구니 설정
export interface CartConfig {
    // 최대 보관 일수 (example: 7)
    storagePeriod: number;
    // 장바구니 상품 추가 타입 (example: QUANTITY)
    cartEquivalentOptionUnitType: CART_EQUIVALENT_OPTION_UNIT_TYPE;
    // 무제한 보관 설정 (example: false)
    storagePeriodNoLimit: boolean;
    // 장바구니 보관 최대 수량 (example: 100)
    storageMaxQuantity: number;
}

// 	쇼핑몰 회원 인증 수단
export interface MallJoinConfig {
    // 쇼핑몰 회원 인증 수단 (example: SMS_OCCUPANCY_AUTHENTICATION)
    authenticationType: AUTHENTICATION_TYPE;
    // 쇼핑몰 회원 인증 시점 example: JOIN_TIME)
    authenticationTimeType: AUTHENTICATION_TIME_TYPE;
}

// 오픈아이디 설정 정보
export interface OpenIdJoinConfig {
    // 오픈아이디 회원인증 수단 (example: SMS_OCCUPANCY_AUTHENTICATION)
    authenticationType: AUTHENTICATION_TYPE;
    // 오픈아이디 회원인증 시점 (example: JOIN_TIME)
    authenticationTimeType: AUTHENTICATION_TIME_TYPE;
    // 지원하는 오픈아이디 (example: ["payco","kakao"])
    providers: OPEN_ID_PROVIDER[];
}

// 공정거래 로고 정보
export interface TermsConfig {
    // 공정거래 로고 이미지 URL (example: http://test.com)
    fairLogoUrl: string;
    // 공정거래 로고 사용 여부 (example: false)
    fairLogoUsed: boolean;
}

// 외부 서비스 설정
export interface ExterServiceConfig {
    kakaoMap: {
        // 카카오맵 경도 (example: 70)
        kakaoMapLongitude: string;
        // 카카오맵 위도 (example: 30)
        kakaoMapLatitude: string;
        // 카카오맵 Appkey (example: kakaoMapKey)
        kakaoMapKey: string;
    };
    // 구글 통계 추적 ID (example: googleAnalytics-value)
    googleAnalytics: string;
    // 외부스크립트 사용여부 (example: false)
    useScript: boolean;
    // 네이버 웹마스터 Appkey (example: naverWebmaster-value)
    naverWebmaster: string;
}

export interface MallResponse {
    // 회원 가입 설정
    memberJoinConfig: MemberJoinConfig;
    // 1:1문의 유형 목록
    inquiryType: InquiryType[];
    // 쇼핑몰 계좌 정보
    bankAccountInfo: BankAccountInfo;
    // 은행 목록
    bankType: BankType[];
    // 주문상태 목록
    orderStatusType: OrderStatusType[];
    // 쇼핑몰 정보
    mall: Mall;
    // 클레임 사유 목록
    claimReasonType: ClaimReasonType[];
    // 쇼핑몰 기본정보
    serviceBasicInfo: ServiceBasicInfo;
    // 공정거래 로고 정보
    termsConfig: TermsConfig;
    // 오픈아이디 설정 정보
    openIdJoinConfig: OpenIdJoinConfig;
    // 외부 서비스 설정
    externalServiceConfig: ExterServiceConfig;
    // 클레임상태 목록
    claimStatusType: ClaimStatusType[];
    // 장바구니 설정
    cartConfig: CartConfig;
    // 상품평 신고 유형 목록
    productReviewReportType: ProductReviewReportType[];
    // 상품문의 유형 목록
    productInquiryType: ProductInquiryType[];
    // 쇼핑몰 회원 인증 수단
    mallJoinConfig: MallJoinConfig;
    // 적립금 설정 정보
    accumulationConfig: AccumulationConfig;
    // 카테고리 정보
    categories: Category;
    // 쇼핑몰 계좌 정보 목록
    bankAccountInfos: BankAccountInfo[];
    // 게시판 카테고리 목록
    boardsCategories: BoardsCategory[];
}
