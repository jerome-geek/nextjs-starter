// 필수 여부
enum REQUIRED_TYPE {
    // 사용함
    USED = 'USED',
    // 필수
    REQUIRED = 'REQUIRED',
    // 사용안함
    NOT_USED = 'NOT_USED',
}

// 리스트 이미지 유형
enum IMAGE_DISPLAY_TYPE {
    // 사용 안함
    NOT_USED = 'NOT_USED',
    // 첨부파일 사용
    ATTACHMENT = 'ATTACHMENT',
    // 상품 이미지 사용
    PRODUCT = 'PRODUCT',
}

// 게시판 노출 유형
enum BOARD_DISPLAY_TYPE {
    // 리스트형
    LIST = 'LIST',
    // 카드형
    CARD = 'CARD',
    // 댓글형
    REPLY = 'REPLY',
    // 문의형
    INQUIRY = 'INQUIRY',
}

// 인트로 페이지 설정정보
enum INTRO_REDIRECTION_TYPE {
    // 사용안함
    NONE = 'NONE',
    // 접속 불가
    NO_ACCESS = 'NO_ACCESS',
    // 회원 인증
    ONLY_MEMBER = 'ONLY_MEMBER',
    // 성인 인증
    ONLY_ADULT = 'ONLY_ADULT',
}

// 상품 금액 기준 설정
enum PRODUCT_ACCUMULATION_BASIS_TYPE {
    // 판매가
    SALE_PRICE = 'SALE_PRICE',
    // 판매가 ± 옵션가
    SALE_STANDARD_PRICE = 'SALE_STANDARD_PRICE',
    // 판매가 ± 옵션가 - 프로모션할인
    SALE_PROMOTION_PRICE = 'SALE_PROMOTION_PRICE',
    // 할인적용가
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
    // 할인적용가 ± 옵션가
    DISCOUNTED_STANDARD_PRICE = 'DISCOUNTED_STANDARD_PRICE',
    // 할인적용가 ± 옵션가 - 프로모션할인
    DISCOUNTED_PROMOTION_PRICE = 'DISCOUNTED_PROMOTION_PRICE',
}

// 적립금 노출 설정
enum ACCUMULATION_DISPLAY_FORMAT_TYPE {
    // 정액 단일표시
    FIXED_AMT = 'FIXED_AMT',
    // 정률(%) 단일표시 (ex 2%)
    FIXED_RATE = 'FIXED_RATE',
    // 정률 정액 동시표시
    FIRST_FIXED_RATE = 'FIRST_FIXED_RATE',
    // 정액 정률 동시표시
    FIRST_FIXED_AMT = 'FIRST_FIXED_AMT',
}

// 적립금 지급 시점
enum ACCUMULATION_GIVE_POINT {
    // 즉시적립
    IMMEDIATE = 'IMMEDIATE',
    // 익일
    NEXTDAY = 'NEXTDAY',
    // 2일
    DAY_AFTER_TOMMOROW = 'DAY_AFTER_TOMMOROW',
    // 7일
    AFTER_A_WEEK = 'AFTER_A_WEEK',
    // 14일
    AFTER_TWO_WEEK = 'AFTER_TWO_WEEK',
    // 20일
    AFTER_TWENTY_DAYS = 'AFTER_TWENTY_DAYS',
    // 30일
    AFTER_THIRTY_DAYS = 'AFTER_THIRTY_DAYS',
    // 익월
    NEXT_MONTH = 'NEXT_MONTH',
}

// 적립사유 코드
enum ACCUMULATION_RESERVE_REASON {
    // 상품 구매확정 적립,
    ADD_AFTER_PAYMENT = 'ADD_AFTER_PAYMENT',
    // 이벤트 구매확정 적립
    ADD_AFTER_EVENT_PAYMENT = 'ADD_AFTER_EVENT_PAYMENT',
    // 상품 교환 결제 추가 적립
    ADD_AFTER_REPLACE_PAYMENT = 'ADD_AFTER_REPLACE_PAYMENT',
    // 상품평 작성 적립
    ADD_POSTING = 'ADD_POSTING',
    // 주문취소 재적립
    ADD_CANCEL = 'ADD_CANCEL',
    // 반품 재적립
    ADD_RETURN = 'ADD_RETURN',
    // 운영자 지급
    ADD_MANUAL = 'ADD_MANUAL',
    // 이벤트성 적립
    ADD_EVENT = 'ADD_EVENT',
    // 회원가입 적립금
    ADD_SIGNUP = 'ADD_SIGNUP',
    // 생일축하 적립금
    ADD_BIRTHDAY = 'ADD_BIRTHDAY',
    // 앱설치 적립금
    ADD_APP_INSTALL = 'ADD_APP_INSTALL',
    // 회원등급 적립금
    ADD_GRADE = 'ADD_GRADE',
    // 등급 혜택 즉시 지급 적립금
    ADD_GRADE_BENEFIT = 'ADD_GRADE_BENEFIT',
    // 상품 결제 사용 차감
    SUB_PAYMENT_USED = 'SUB_PAYMENT_USED',
    // 교환 상품 추가 결제 차감
    SUB_EXTRA_PAYMENT_USED = 'SUB_EXTRA_PAYMENT_USED',
    // 사용적립금 주문취소 재적립
    SUB_CANCEL = 'SUB_CANCEL',
    // 상품 구매확정 취소 차감
    SUB_RETURN = 'SUB_RETURN',
    // 상품평 삭제 차감
    SUB_DELETE_POSTING = 'SUB_DELETE_POSTING',
    // 유효기간 만료
    SUB_EXPIRED = 'SUB_EXPIRED',
    // 운영자 차감
    SUB_MANUAL = 'SUB_MANUAL',
    // 회원탈퇴 차감
    SUB_DELETE_ACCOUNT = 'SUB_DELETE_ACCOUNT',
    // 외부적립금
    EXTERNAL_ACCUMULATION = 'EXTERNAL_ACCUMULATION',
}

// 적립 지급/차감 구분 코드
enum ACCUMULATION_STATUS_GROUP_TYPE {
    // 지급
    PAYMENT = 'PAYMENT',
    // 차감
    DEDUCTION = 'DEDUCTION',
}

// 적립상태 코드
enum ACCUMULATION_STATUS {
    // 지급
    GIVE = 'GIVE',
    // 사용 취소로 인한 재지급
    GIVE_BY_CANCELED = 'GIVE_BY_CANCELED',
    // 차감
    SUBTRACTION = 'SUBTRACTION',
    // 지급 취소로 인한 재차감
    SUBTRACTION_BY_CANCELED = 'SUBTRACTION_BY_CANCELED',
}

// 쇼핑몰 회원 인증 수단
enum AUTHENTICATION_TYPE {
    // 휴대폰 본인 인증
    AUTHENTICATION_BY_PHONE = 'AUTHENTICATION_BY_PHONE',
    // SMS 비점유 인증
    SMS_AUTHENTICATION = 'SMS_AUTHENTICATION',
    // SMS 점유 인증
    SMS_OCCUPANCY_AUTHENTICATION = 'SMS_OCCUPANCY_AUTHENTICATION',
    // EMAIL 인증
    AUTHENTICATION_BY_EMAIL = 'AUTHENTICATION_BY_EMAIL',
    // 인증 없음
    NOT_USED = 'NOT_USED',
}

// 쇼핑몰 회원 인증 시점
enum AUTHENTICATION_TIME_TYPE {
    // 회원가입 시 인증
    JOIN_TIME = 'JOIN_TIME',
    // 최초 상품 구매 시 인증
    PAYMENT_TIME = 'PAYMENT_TIME',
    // 가입 완료 후 바로 인증
    AFTER_JOIN_TIME = 'AFTER_JOIN_TIME',
    // 인증하지 않음
    NONE = 'NONE',
}

enum AUTH_TYPE {
    NONE = 'NONE',
    SMS = 'SMS',
    EMAIL = 'EMAIL',
    MOBILE = 'MOBILE',
}

enum CERTIFICATED_USAGE {
    FIND_ID = 'FIND_ID',
    FIND_PASSWORD = 'FIND_PASSWORD',
    CHANGE_MOBILE_NO = 'CHANGE_MOBILE_NO',
    RELEASE_DORMANT = 'RELEASE_DORMANT',
    ADMIN = 'ADMIN',
    JOIN = 'JOIN',
    JOIN_URI = 'JOIN_URI',
    CHANGE_ID = 'CHANGE_ID',
    ADMIN_SECONDARY = 'ADMIN_SECONDARY',
    CHANGE_EMAIL = 'CHANGE_EMAIL',
}

enum PLATFORM_TYPE {
    PC = 'PC',
    MOBILE_WEB = 'MOBILE_WEB',
    AOS = 'AOS',
    IOS = 'IOS',
}

// 오픈아이디 Provider
enum NCP_OPEN_ID_PROVIDER {
    NCP_NAVER = 'ncp_naver',
    NCP_KAKAO = 'ncp_kakao',
    NCP_LINE = 'ncp_line',
    NCP_FACEBOOK = 'ncp_facebook',
    NCP_PAYCO = 'ncp_payco',
}

// 지원하는 오픈 아이디
enum OPEN_ID_PROVIDER {
    // 페이코
    PAYCO = 'PAYCO',
    // 네이버
    NAVER = 'NAVER',
    // 카카오
    KAKAO = 'KAKAO',
    // 카카오 싱크
    KAKAO_SYNC = 'KAKAO_SYNC',
    // 페이스북
    FACEBOOK = 'FACEBOOK',
    // 라인
    LINE = 'LINE',
}

// 정렬여부
enum ORDER_DIRECTION {
    // 최신 순
    ASC = 'ASC',
    // 오래된 순
    DESC = 'DESC',
}

// TODO: 체크 필요
enum PRODUCT_DIRECTION {
    DESC_DELIVERY_FEIGN_CLIENT = 'DESCDeliveryFeignClient',
    DESC = 'DESC',
    ASC = 'ASC',
}

enum ORDER_BY {
    RECOMMEND = 'RECOMMEND',
    REGISTER_YMDT = 'REGISTER_YMDT',
    RATING = 'RATING',
    BEST_REVIEW = 'BEST_REVIEW',
}

enum BY {
    SALE_YMD = 'SALE_YMD',
    ADMIN_SETTING = 'ADMIN_SETTING',
    POPULAR = 'POPULAR',
    RECOMMENDATION = 'RECOMMENDATION',
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
}

enum SALE_STATUS {
    READY_ONSALE = 'READY_ONSALE', // 판매대기, 판매중 상품만 조회
    ONSALE = 'ONSALE', // 판매중인 상품만 조회
    RESERVATION_AND_ONSALE = 'RESERVATION_AND_ONSALE', // 예약판매중인 상품과 판매중인 상품만 조회
}

// TODO: 체크 필요
enum PRODUCT_SALE_STATUS {
    // 판매중 상품만 조회
    ONSALE = 'ONSALE',
    // 전체 판매 상태 조회
    ALL_CONDITIONS = 'ALL_CONDITIONS',
    // 판매대기와 판매중 상품 조회
    READY_ON_SALE = 'READY_ONSALE',
    // 예약판매중인 상품과 판매중인 상품만 조회
    RESERVATION_AND_ONSALE = 'RESERVATION_AND_ONSALE',
}

// 상품문의 유형 값
enum INQUIRY_TYPE {
    // 상품
    PRODUCT = 'PRODUCT',
    // 배송
    DELIVERY = 'DELIVERY',
    // 취소
    CANCEL = 'CANCEL',
    // 반품
    RETURN = 'RETURN',
    // 교환
    EXCHANGE = 'EXCHANGE',
    // 환불
    REFUND = 'REFUND',
    // 기타
    OTHER = 'OTHER',
}

enum SEARCH_TYPE {
    ALL = 'ALL',
    CONTENT = 'CONTENT',
    PRODUCT_NAME = 'PRODUCT_NAME',
}

enum PAGE_TYPE {
    MAIN = 'MAIN', // 메인페이지
    CATEGORY = 'CATEGORY', // 전시카테고리
    EVENT = 'EVENT', // 기획전
    PRODUCT = 'PRODUCT', // 상품
}

enum BEST_REVIEW_YN {
    Y, // 우수 상품평
    N, // 일반 상품평
    NULL, // 전체
}

enum MY_REVIEW_YN {
    Y, // 내 상품평
    N, // 전체 상품평
}

enum HAS_ATTACHMENT_FILE {
    Y, // 파일 첨부
    N, // 파일 미첨부
    ALL, // 빈값
}

enum REPORT_REASON_CODE {
    COPYRIGHT = 'COPYRIGHT',
    SLANDER = 'SLANDER',
}

enum SEX {
    MALE = 'M',
    FEMALE = 'F',
    NONE = 'X',
}

enum OPEN_ID_TERM {
    PERSONAL_PROCESS_CONSIGNMENT = 'PERSONAL_PROCESS_CONSIGNMENT',
    PERSONAL_THIRD_PARTY_PROVISION = 'PERSONAL_THIRD_PARTY_PROVISION',
}

// 주문옵션타입
enum ORDER_REQUEST_TYPE {
    //전체
    ALL = 'ALL',
    // 클레임 진행
    CLAIM = 'CLAIM',
    // 클레임미진행
    NORMAL = 'NORMAL',
}

// 주문상태 값
enum ORDER_STATUS_TYPE {
    // 입금대기
    DEPOSIT_WAIT = 'DEPOSIT_WAIT',
    // 결제완료
    PAY_DONE = 'PAY_DONE',
    // 상품준비중
    PRODUCT_PREPARE = 'PRODUCT_PREPARE',
    // 배송준비중
    DELIVERY_PREPARE = 'DELIVERY_PREPARE',
    // 배송중
    DELIVERY_ING = 'DELIVERY_ING',
    // 배송완료
    DELIVERY_DONE = 'DELIVERY_DONE',
    // 구매확정
    BUY_CONFIRM = 'BUY_CONFIRM',
    // 취소완료
    CANCEL_DONE = 'CANCEL_DONE',
    // 반품완료
    RETURN_DONE = 'RETURN_DONE',
    // 교환완료
    EXCHANGE_DONE = 'EXCHANGE_DONE',
    // 결제대기
    PAY_WAIT = 'PAY_WAIT',
    // 결제포기
    PAY_CANCEL = 'PAY_CANCEL',
    // 결제실패
    PAY_FAIL = 'PAY_FAIL',
    // 삭제
    DELETE = 'DELETE',
    // 교환대기
    EXCHANGE_WAIT = 'EXCHANGE_WAIT',
    // 환불완료
    REFUND_DONE = 'REFUND_DONE',
}

// (현금영수증) 발급용도
enum CASH_RECEIPT_ISSUE_PURPOSE_TYPE {
    // 소득공제용
    INCOME_TAX_DEDUCTION = 'INCOME_TAX_DEDUCTION',
    // 지출증빙용
    PROOF_EXPENDITURE = 'PROOF_EXPENDITURE',
}

// 클레임 타입
enum CLAIM_TYPE {
    // 취소
    CANCEL = 'CANCEL',
    // 반품
    RETURN = 'RETURN',
    // 교환
    EXCHANGE = 'EXCHANGE',
    NONE = 'NONE',
}

enum COUNTRY_CD {
    AX = 'AX',
    AD = 'AD',
    AU = 'AU',
    AT = 'AT',
    BH = 'BH',
    BE = 'BE',
    BZ = 'BZ',
    BR = 'BR',
    BN = 'BN',
    BG = 'BG',
    CA = 'CA',
    ES_CANARY = 'ES_CANARY',
    CL = 'CL',
    CN = 'CN',
    CO = 'CO',
    CR = 'CR',
    CY = 'CY',
    CZ = 'CZ',
    DK = 'DK',
    EC = 'EC',
    EG = 'EG',
    SV = 'SV',
    EE = 'EE',
    FR = 'FR',
    GF = 'GF',
    DE = 'DE',
    GR = 'GR',
    GL = 'GL',
    GU = 'GU',
    GT = 'GT',
    GG = 'GG',
    GY = 'GY',
    HK = 'HK',
    HU = 'HU',
    IS = 'IS',
    ID = 'ID',
    IE = 'IE',
    JP = 'JP',
    JE = 'JE',
    JO = 'JO',
    KR = 'KR',
    KW = 'KW',
    LV = 'LV',
    LB = 'LB',
    LI = 'LI',
    LT = 'LT',
    LU = 'LU',
    MO = 'MO',
    PT_MADEIRA = 'PT_MADEIRA',
    MY = 'MY',
    NL = 'NL',
    NZ = 'NZ',
    GB_NORTHERN_ISLAND = 'GB_NORTHERN_ISLAND',
    NO = 'NO',
    PY = 'PY',
    PE = 'PE',
    PL = 'PL',
    PT = 'PT',
    RO = 'RO',
    RU = 'RU',
    SM = 'SM',
    SA = 'SA',
    GB_SCOTLAND = 'GB_SCOTLAND',
    SG = 'SG',
    SK = 'SK',
    SI = 'SI',
    ES = 'ES',
    CH = 'CH',
    TW = 'TW',
    TH = 'TH',
    TR = 'TR',
    AE = 'AE',
    GB = 'GB',
    US = 'US',
    U2 = 'U2',
    UY = 'UY',
    VN = 'VN',
    GB_WALES = 'GB_WALES',
    YE = 'YE',
    HR = 'HR',
    MT = 'MT',
    FI = 'FI',
    SE = 'SE',
}

enum REPLY_TYPE {
    EMAIL = 'EMAIL',
    SMS = 'SMS',
}

enum CRITERION {
    PRODUCT_COUNT = 'PRODUCT_COUNT',
    RECENT_PRODUCT = 'RECENT_PRODUCT',
}

// 최종 할인가격 검색 조건
enum DISCOUNTED_COMPARISON {
    // 초과
    GT = 'GT',
    // 미만
    LTE = 'LTE',
    // 이상
    GTE = 'GTE',
    // 동등
    EQ = 'EQ',
    // 사이의
    BETWEEN = 'BETWEEN',
}

// 배송비 착불 여부
enum DELIVERY_PAY_TYPE {
    // 배송비 선불
    PREPAID_DELIVERY = 'PREPAID_DELIVERY',
    // 배송비 착불
    PAY_ON_DELIVERY = 'PAY_ON_DELIVERY',
}

// 배송조건
enum DELIVERY_CONDITION_TYPE {
    // 무료
    FREE = 'FREE',
    // 조건별무료
    CONDITIONAL = 'CONDITIONAL',
    // 유료(고정 배송비)
    FIXED_FEE = 'FIXED_FEE',
    // 수량 비례
    QUANTITY_PROPOSITIONAL_FEE = 'QUANTITY_PROPOSITIONAL_FEE',
    // 금액별 차등
    PRICE_FEE = 'PRICE_FEE',
    // 수량별 차등
    QUANTITY_FEE = 'QUANTITY_FEE',
}

// 묶음배송조건
enum GROUP_DELIVERY_AMT_TYPE {
    // 최대부과
    MAXIMUM_SELECTED = 'MAXIMUM_SELECTED',
    // 최소부과
    MINIMUM_SELECTED = 'MINIMUM_SELECTED',
}

// 배송구분 (`/cart`, `/guest/orders/{orderNo}` 에서 사용)
enum SHIPPING_AREA_TYPE {
    // 파트너사배송
    PARTNER_SHIPPING_AREA = 'PARTNER_SHIPPING_AREA',
    // 쇼핑몰배송
    MALL_SHIPPING_AREA = 'MALL_SHIPPING_AREA',
}

// 배송 구분 (`/product/search` 에서 사용)
enum SHIPPING_AREA_TYPE_PARAMS {
    // 파트너사 배송
    PARTNER = 'PARTNER',
    // 쇼핑몰 배송
    MALL = 'MALL',
}

// 옵션 선택 방식
enum SELECT_TYPE {
    // 일체형
    FLAT = 'FLAT',
    // 분리형
    MULTI = 'MULTI',
}

enum DAYS_OF_WEEK {
    // 일
    SUN = 'SUN',
    // 월
    MON = 'MON',
    // 화
    TUE = 'TUE',
    // 수
    WED = 'WED',
    // 목
    THU = 'THU',
    // 금
    FRI = 'FRI',
    // 토
    SAT = 'SAT',
}

// 옵션형태
enum OPTION_TYPE {
    // 옵션없음
    PRODUCT_ONLY = 'PRODUCT_ONLY',
    // 일반옵션
    NORMAL_OPTION = 'NORMAL_OPTION',
    // 추가옵션
    ADDITIONAL_PRODUCT = 'ADDITIONAL_PRODUCT',
}

enum PRODUCT_BY {
    // 판매인기순(검색엔진 도입)
    POPULAR = 'POPULAR',
    // 판매일자
    SALE_YMD = 'SALE_YMD',
    // 판매종료일자
    SALE_END_YMD = 'SALE_END_YMD',
    // 가격순
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
    // 상품평
    REVIEW = 'REVIEW',
    // 총판매량순
    SALE_CNT = 'SALE_CNT',
    // 최근상품순
    RECENT_PRODUCT = 'RECENT_PRODUCT',
    // MD추천순
    MD_RECOMMEND = 'MD_RECOMMEND',
    // 좋아요
    LIKE_CNT = 'LIKE_CNT',
}

enum CHANNEL_TYPE {
    NAVER_EP = 'NAVER_EP',
    DANAWA = 'DANAWA',
    ENURI = 'ENURI',
    WONDER = 'WONDER',
    COOCHA = 'COOCHA',
    FACEBOOK = 'FACEBOOK',
}

enum INQUIRY_SEARCH_TYPE {
    ALL = 'ALL',
    TITLE = 'TITLE',
    CONTENT = 'CONTENT',
}

// 귀책타입
enum RESPONSIBLE_OBJECT_TYPE {
    // 구매자 귀책
    BUYER = 'BUYER',
    // 판매자 귀책
    SELLER = 'SELLER',
}

// 클레임 사유 값
enum CLAIM_REASON_TYPE {
    // 단순변심(색상,사이즈)
    CHANGE_MIND = 'CHANGE_MIND',
    // 상품불량/파손
    DEFECTIVE_PRODUCT = 'DEFECTIVE_PRODUCT',
    // 배송누락/오배송
    WRONG_DELIVERY = 'WRONG_DELIVERY',
    // 재고부족(시스템)
    OUT_OF_STOCK_SYSTEM = 'OUT_OF_STOCK_SYSTEM',
    // 입금전취소
    CANCEL_BEFORE_PAY = 'CANCEL_BEFORE_PAY',
    // 상품상세 정보와 다름
    WRONG_PRODUCT_DETAIL = 'WRONG_PRODUCT_DETAIL',
    // 판매자 배송 지연
    DELAY_DELIVERY = 'DELAY_DELIVERY',
    // 기타(판매자 귀책)
    OTHERS_SELLER = 'OTHERS_SELLER',
    // 기타(구매자 귀책)
    OTHERS_BUYER = 'OTHERS_BUYER',
    // 상품 품절/재고 없음
    OUT_OF_STOCK = 'OUT_OF_STOCK',
}

// 클레임 상태 값
enum CLAIM_STATUS_TYPE {
    // 취소완료[환불없음]
    CANCEL_NO_REFUND = 'CANCEL_NO_REFUND',
    // 취소신청[승인대기]
    CANCEL_REQUEST = 'CANCEL_REQUEST',
    // 취소처리[환불보류]
    CANCEL_PROC_REQUEST_REFUND = 'CANCEL_PROC_REQUEST_REFUND',
    // 취소처리[환불대기]
    CANCEL_PROC_WAITING_REFUND = 'CANCEL_PROC_WAITING_REFUND',
    // 취소완료[환불완료]
    CANCEL_DONE = 'CANCEL_DONE',
    // 반품신청[승인대기]
    RETURN_REQUEST = 'RETURN_REQUEST',
    // 반품신청[철회대기]
    RETURN_REJECT_REQUEST = 'RETURN_REJECT_REQUEST',
    // 반품처리[수거진행]
    RETURN_PROC_BEFORE_RECEIVE = 'RETURN_PROC_BEFORE_RECEIVE',
    // 반품처리[환불보류]
    RETURN_PROC_REQUEST_REFUND = 'RETURN_PROC_REQUEST_REFUND',
    // 반품처리[환불대기]
    RETURN_PROC_WAITING_REFUND = 'RETURN_PROC_WAITING_REFUND',
    // 반품완료[환불완료]
    RETURN_DONE = 'RETURN_DONE',
    // TODO: 스키마에는 나와있지 않고 https://shopby.works/guide/skin/dev-cover/my-shopping#order-delivery-check 에만 나와있음
    // 반품완료[환불없음]
    RETURN_NO_REFUND = 'RETURN_NO_REFUND',
    // 교환처리[조정요청]
    RETURN_REFUND_AMT_ADJUST_REQUESTED = 'RETURN_REFUND_AMT_ADJUST_REQUESTED',
    // 교환신청[승인대기]
    EXCHANGE_REQUEST = 'EXCHANGE_REQUEST',
    // 교환처리[철회대기]
    EXCHANGE_REJECT_REQUEST = 'EXCHANGE_REJECT_REQUEST',
    // 교환처리[수거진행]
    EXCHANGE_PROC_BEFORE_RECEIVE = 'EXCHANGE_PROC_BEFORE_RECEIVE',
    // 교환처리[결제대기]
    EXCHANGE_PROC_REQUEST_PAY = 'EXCHANGE_PROC_REQUEST_PAY',
    // 교환처리[환불보류]
    EXCHANGE_PROC_REQUEST_REFUND = 'EXCHANGE_PROC_REQUEST_REFUND',
    // 교환처리[처리대기]
    EXCHANGE_PROC_WAITING = 'EXCHANGE_PROC_WAITING',
    // 교환완료
    EXCHANGE_DONE = 'EXCHANGE_DONE',
    // 교환처리[입금처리대기]
    EXCHANGE_PROC_WAITING_PAY = 'EXCHANGE_PROC_WAITING_PAY',
    // 교환처리[환불대기]
    EXCHANGE_PROC_WAITING_REFUND = 'EXCHANGE_PROC_WAITING_REFUND',
    // 교환완료[결제완료]
    EXCHANGE_DONE_PAY_DONE = 'EXCHANGE_DONE_PAY_DONE',
    // 교환완료[환불완료]
    EXCHANGE_DONE_REFUND_DONE = 'EXCHANGE_DONE_REFUND_DONE',
}

// 장바구니 상품 추가 타입
enum CART_EQUIVALENT_OPTION_UNIT_TYPE {
    // 수량 추가
    QUANTITY = 'QUANTITY',
    // 행 추가
    ROW = 'ROW',
}

// 상품평 신고 유형 목록
enum PRODUCT_REVIEW_REPORT_TYPE {
    // 저작권 침해 및 기타사유
    COPYRIGHT = 'COPYRIGHT',
    // 욕설 또는 비방
    SLANDER = 'SLANDER',
}

// 반품수거 타입
enum RETURN_WAY_TYPE {
    // 판매자수거요청
    SELLER_COLLECT = 'SELLER_COLLECT',
    // 구매자직접반품
    BUYER_DIRECT_RETURN = 'BUYER_DIRECT_RETURN',
}

// 배송타입
enum DELIVERY_TYPE {
    // 택배/등기/소포
    PARCEL_DELIVERY = 'PARCEL_DELIVERY',
    // 직접배송(화물배달)
    DIRECT_DELIVERY = 'DIRECT_DELIVERY',
    // 없음
    NONE = 'NONE',
}

// 택배사타입
enum DELIVERY_COMPANY_TYPE {
    CJ = 'CJ',
    POST = 'POST',
    HANJIN = 'HANJIN',
    GTX = 'GTX',
    LOOTTE = 'LOTTE',
    KGB = 'KGB',
    LOGEN = 'LOGEN',
    GSI = 'GSI',
    KGL = 'KGL',
    INTRAS = 'INTRAS',
    UPS = 'UPS',
    CHUNIN = 'CHUNIL',
    KDEXP = 'KDEXP',
    HDEXP = 'HDEXP',
    ILYANG = 'ILYANG',
    POST_EMS = 'POST_EMS',
    DAESIN = 'DAESIN',
    CVS = 'CVS',
    DHL = 'DHL',
    FEDEX = 'FEDEX',
    GSM = 'GSM',
    WARPEX = 'WARPEX',
    WIZWA = 'WIZWA',
    ACI = 'ACI',
    PANTOS = 'PANTOS',
    CJ_INTERNATIONAL = 'CJ_INTERNATIONAL',
    TNT = 'TNT',
    CU = 'CU',
    KUNYOUNG = 'KUNYOUNG',
    LOTTE_INTERNATIONAL = 'LOTTE_INTERNATIONAL',
    HONAM = 'HONAM',
    HANIPS = 'HANIPS',
    IPARCEL = 'IPARCEL',
    SLX = 'SLX',
    USPS = 'USPS',
    WONDERS = 'WONDERS',
    REGISTPOST = 'REGISTPOST',
    DHLDE = 'DHLDE',
    EZUSA = 'EZUSA',
    SWGEXP = 'SWGEXP',
    DAEWOON = 'DAEWOON',
    DODOFLEX = 'DODOFLEX',
    NH_LOGIS = 'NH_LOGIS',
    ETC = 'ETC',
}

// 은행 영문 관리명
enum BANK {
    // 미확인은행
    ANONYMOUS = 'ANONYMOUS',
    // 산업은행
    KDB = 'KDB',
    // 기업은행
    IBK = 'IBK',
    // 국민은행
    KB = 'KB',
    // 외환은행
    KEB = 'KEB',
    // 수협
    SUHYUP = 'SUHYUP',
    // 수출입은행
    KEXIM = 'KEXIM',
    // NH농협은향
    NH = 'NH',
    // 지역농축협
    NHLOCAL = 'NHLOCAL',
    // 우리은행
    WOORI = 'WOORI',
    // SC제일은행
    SC = 'SC',
    // 한국씨티은행
    CITY = 'CITY',
    // 대구은행
    DAEGU = 'DAEGU',
    // 부산은행
    PUSAN = 'PUSAN',
    // 광주은행
    GWANGJU = 'GWANGJU',
    // 제주은행
    JEJU = 'JEJU',
    // 전북은행
    JEONBUK = 'JEONBUK',
    // 경남은행
    GYEONGNAM = 'GYEONGNAM',
    // 새마을금고
    KFCC = 'KFCC',
    // 신협
    CU = 'CU',
    // 상호저축은행
    SANGHO = 'SANGHO',
    // HSBC은행
    HSBC = 'HSBC',
    // 도이치은행
    DEUTSCHE = 'DEUTSCHE',
    // 산림조합중앙회
    NFCF = 'NFCF',
    // 우체국
    EPOST = 'EPOST',
    // KEB하나은행
    KEBHANA = 'KEBHANA',
    // 신한은행
    SHINHAN = 'SHINHAN',
    // 케이뱅크
    KBANK = 'KBANK',
    // 카카오뱅크
    KAKAO = 'KAKAO',
    // 토스뱅크
    TOSS = 'TOSS',
    // 유안타증권
    YUANTA = 'YUANTA',
    KBSEC = 'KBSEC',
    MIRAE = 'MIRAE',
    MIRAEDAEWOO = 'MIRAEDAEWOO',
    SAMSUNG = 'SAMSUNG',
    HANKOOK = 'HANKOOK',
    NH_INVEST = 'NH_INVEST',
    KYOBO = 'KYOBO',
    HI_INVEST = 'HI_INVEST',
    HMC_INVEST = 'HMC_INVEST',
    KIWOOM = 'KIWOOM',
    EBEST = 'EBEST',
    SK = 'SK',
    DAISHIN = 'DAISHIN',
    SOLOMON_INVEST = 'SOLOMON_INVEST',
    HANHWA = 'HANHWA',
    HANA_INVEST = 'HANA_INVEST',
    SHINHAN_INVEST = 'SHINHAN_INVEST',
    DONGBU = 'DONGBU',
    EUGENE_INVEST = 'EUGENE_INVEST',
    MERITZ_COMPREHENSIVE = 'MERITZ_COMPREHENSIVE',
    BOOKOOK = 'BOOKOOK',
    SHINYOUNG = 'SHINYOUNG',
    CAPE = 'CAPE',
}

// 정기결제 배송주기 타입
enum CYCLE_TYPE {
    // 월
    MONTH = 'MONTH',
    // 주
    WEEK = 'WEEK',
}

// 배송지 타입
enum ADDRESS_TYPE {
    // 기본주소
    BOOK = 'BOOK',
    // 최근주소
    RECENT = 'RECENT',
    // 정기결제 배송주소
    RECURRING_PAYMENT = 'RECURRING_PAYMENT',
}

// 결제수단
enum PAY_TYPE {
    CREDIT_CARD = 'CREDIT_CARD', // 신용카드
    ACCOUNT = 'ACCOUNT', // 무통장입금
    MOBILE = 'MOBILE', // 휴대폰결제
    REALTIME_ACCOUNT_TRANSFER = 'REALTIME_ACCOUNT_TRANSFER', // 실시간계좌이체
    VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT', // 가상계좌
    GIFT = 'GIFT', // 상품권
    ATM = 'ATM', // ATM
    PAYCO = 'PAYCO', // PAYCO
    ZERO_PAY = 'ZERO_PAY', // 0원결제
    ACCUMULATION = 'ACCUMULATION', // 적립금 전액 사용
    PHONE_BILL = 'PHONE_BILL', // 전화결제
    POINT = 'POINT', // 포인트결제
    YPAY = 'YPAY', // 옐로페이
    KPAY = 'KPAY', // 케이페이
    PAYPIN = 'PAYPIN', // 페이핀
    INIPAY = 'INIPAY', // INIPay 간편결제
    PAYPAL = 'PAYPAL', // PAYPAL
    STRIPE = 'STRIPE', // STRIPE
    NAVER_PAY = 'NAVER_PAY', // 네이버페이 주문형
    KAKAO_PAY = 'KAKAO_PAY', // 카카오페이
    NAVER_EASY_PAY = 'NAVER_EASY_PAY', // 네이버페이 결제형
    SAMSUNG_PAY = 'SAMSUNG_PAY', // 삼성페이
    CHAI = 'CHAI', // 차이
    TOSS_PAY = 'TOSS_PAY', // 토스페이
    ESCROW_REALTIME_ACCOUNT_TRANSFER = 'ESCROW_REALTIME_ACCOUNT_TRANSFER', // 실시간계좌이체 - 에스크로
    ESCROW_VIRTUAL_ACCOUNT = 'ESCROW_VIRTUAL_ACCOUNT', // 가상계좌 - 에스크로
    RENTAL = 'RENTAL',
    VERITRANS_CARD = 'VERITRANS_CARD', // Veritrans CreditCard
    TOASTCAM = 'TOASTCAM', // 토스트캠
    ETC = 'ETC', // 기타결제수단
}

// PG타입
enum PG_TYPE {
    // 없음
    DUMMY = 'DUMMY',
    // PAYCO
    PAYCO = 'PAYCO',
    // PAYPAL
    PAYPAL = 'PAYPAL',
    // STRIPE
    STRIPE = 'STRIPE',
    // KCP
    KCP = 'KCP',
    // 이니시스
    INICIS = 'INICIS',
    // PG없음
    NONE = 'NONE',
    // KCP(모바일)
    KCP_MOBILE = 'KCP_MOBILE',
    // KCP(앱)
    KCP_APP = 'KCP_APP',
    // 네이버페이(주문형)
    NAVER_PAY = 'NAVER_PAY',
    // 리브메이트
    LIIVMATE = 'LIIVMATE',
    // PAYPAL PRO
    PAYPALPRO = 'PAYPALPRO',
    // AthorizeNet
    ATHOR_NET = 'ATHOR_NET',
    // 카카오페이
    KAKAO_PAY = 'KAKAO_PAY',
    // 네이버페이(간편결제)
    NAVER_EASY_PAY = 'NAVER_EASY_PAY',
    // 토스페이먼츠
    LG_U_PLUS = 'LG_U_PLUS',
    // 토스페이먼츠
    TOSS_PAYMENTS = 'TOSS_PAYMENTS',
    // 차이
    CHAI = 'CHAI',
    // 스마트로
    SMARTRO_PAY = 'SMARTRO_PAY',
    // Veritrans
    VERITRANS = 'VERITRANS',
    // 나이스페이
    NICEPAY = 'NICEPAY',
}

enum DOMESTIC {
    TRUE = 'true',
    FALSE = 'false',
    NULL = 'null',
}

enum ACCUMULATION_REASON {
    ADD = 'ADD',
    SUB = 'SUB',
}

enum SHOPBY_TERMS_TYPES {
    MALL_INTRODUCTION = 'MALL_INTRODUCTION',
    USE = 'USE',
    E_COMMERCE = 'E_COMMERCE',
    PI_PROCESS = 'PI_PROCESS',
    PI_COLLECTION_AND_USE_REQUIRED = 'PI_COLLECTION_AND_USE_REQUIRED',
    PI_COLLECTION_AND_USE_OPTIONAL = 'PI_COLLECTION_AND_USE_OPTIONAL',
    PI_PROCESS_CONSIGNMENT = 'PI_PROCESS_CONSIGNMENT',
    PI_THIRD_PARTY_PROVISION = 'PI_THIRD_PARTY_PROVISION',
    PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE = 'PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE',
    ACCESS_GUIDE = 'ACCESS_GUIDE',
    WITHDRAWAL_GUIDE = 'WITHDRAWAL_GUIDE',
    PI_SELLER_PROVISION = 'PI_SELLER_PROVISION',
    PI_COLLECTION_AND_USE_ON_ORDER = 'PI_COLLECTION_AND_USE_ON_ORDER',
    ORDER_INFO_AGREE = 'ORDER_INFO_AGREE',
    CLEARANCE_INFO_COLLECTION_AND_USE = 'CLEARANCE_INFO_COLLECTION_AND_USE',
    TRANSFER_AGREE = 'TRANSFER_AGREE',
    REGULAR_PAYMENT_USE = 'REGULAR_PAYMENT_USE',
    AUTO_APPROVAL_USE = 'AUTO_APPROVAL_USE',
    PI_LIQUOR_PURCHASE_PROVISION = 'PI_LIQUOR_PURCHASE_PROVISION',
    PI_RESTOCK_NOTICE = 'PI_RESTOCK_NOTICE',
}

enum VC_TERMS_TYPES {
    LOCATION_INFO = 'LOCATION_INFO',
    LOCATION_SERVICE = 'LOCATION_SERVICE',
    VSE = 'VSE',
}

enum COUPON_TYPES {
    PRODUCT = 'PRODUCT', // 상품적용 쿠폰
    CART = 'CART', // 주문적용 쿠폰
    CART_DELIVERY = 'CART_DELIVERY', // 장바구니 배송비 할인
}

// 쿠폰 대상 종류
enum COUPON_TARGET_TYPES {
    ALL_PRODUCT = 'ALL_PRODUCT', // 전상품
    PRODUCT = 'PRODUCT', // 개별상품
    BRAND = 'BRAND', // 브랜드
    CATEGORY = 'CATEGORY', // 카테고리
    PARTNER = 'PARTNER', // 파트너사
}

// 사용가능 플랫폼
enum USABLE_PLATFORMS {
    PC = 'PC',
    MOBILE_WEB = 'MOBILE_WEB',
    MOBILE_APP = 'MOBILE_APP',
}

// 환불 예상 방법
enum REFUND_TYPE {
    // PG 환불
    PG = 'PG',
    // 입금 전 취소,
    CANCEL_DEPOSIT = 'CANCEL_DEPOSIT',
    // 무통장입금 환불,
    ACCOUNT = 'ACCOUNT',
    // 적립금 환불,
    ACCUMULATION = 'ACCUMULATION',
    // 0원 환불,
    ZERO_REFUND = 'ZERO_REFUND',
    // 현금 환불,
    CASH = 'CASH',
    // 페이코 환불,
    PAYCO = 'PAYCO',
    // PAYPAL 환불,
    PAYPAL = 'PAYPAL',
    // STRIPE 환불,
    STRIPE = 'STRIPE',
    // KCP 환불,
    KCP = 'KCP',
    // 신용카드 환불,
    CREDIT_CARD = 'CREDIT_CARD',
    // 리브메이트 환불,
    LIIVMATE = 'LIIVMATE',
    // 이니시스 환불,
    INICIS = 'INICIS',
    // 네이버페이(간펼결제) 환불,
    NAVER_EASY_PAY = 'NAVER_EASY_PAY',
    // 카카오페이 환불,
    KAKAO_PAY = 'KAKAO_PAY',
    // 네이버(주문형) 환불
    NAVER_PAY = 'NAVER_PAY',
    // 토스페이먼츠 환불
    LG_U_PLUS = 'LG_U_PLUS',
    // 토스페이먼츠 환불
    TOSS_PAYMENTS = 'TOSS_PAYMENTS',
    // 강제 환불,
    FORCE_REFUND = 'FORCE_REFUND',
    // 없음
    DUMMY = 'DUMMY',
}

// 할인 타입
enum DISCOUNT_UNIT_TYPE {
    // 정액
    WON = 'WON',
    // 정률
    RATE = 'RATE',
}

// 작업타입
enum NEXT_ACTION_TYPE {
    // 주문취소
    CANCEL_ALL = 'CANCEL_ALL',
    // 취소
    CANCEL = 'CANCEL',
    // 교환
    EXCHANGE = 'EXCHANGE',
    // 반품
    RETURN = 'RETURN',
    // 취소신청 취소
    WITHDRAW_CANCEL = 'WITHDRAW_CANCEL',
    // 교환신청 취소
    WITHDRAW_EXCHANGE = 'WITHDRAW_EXCHANGE',
    // 반품신청 취소
    WITHDRAW_RETURN = 'WITHDRAW_RETURN',
    // 클레임 조회
    VIEW_CLAIM = 'VIEW_CLAIM',
    // 배송조회
    VIEW_DELIVERY = 'VIEW_DELIVERY',
    // 수취확인
    DELIVERY_DONE = 'DELIVERY_DONE',
    // 구매확정
    CONFIRM_ORDER = 'CONFIRM_ORDER',
    // 배송지변경
    CHANGE_ADDRESS = 'CHANGE_ADDRESS',
    // 상품평작성
    WRITE_REVIEW = 'WRITE_REVIEW',
    // 현금영수증 발행
    ISSUE_CASH_RECEIPT = 'ISSUE_CASH_RECEIPT',
    // 현금영수증 조회
    VIEW_RECEIPT = 'VIEW_RECEIPT',
}

// 클레임 타입
enum CLAIM_CLASS_TYPE {
    // 레거시
    LEGACY = 'LEGACY',
    // 전체취소
    ORDER_CANCEL = 'ORDER_CANCEL',
    // 부분취소
    OPTION_CANCEL = 'OPTION_CANCEL',
    // 출고 후 교환
    RETURN_EXCHANGE = 'RETURN_EXCHANGE',
    // 출고 전 교환
    CANCEL_EXCHANGE = 'CANCEL_EXCHANGE',
    // 반품
    RETURN = 'RETURN',
}

// 카드사(발급사)
enum CARD_COMPANY {
    // 미분류카드
    ANONYMOUS = 'ANONYMOUS',
    // BC카드
    BC = 'BC',
    // KB국민카드
    KB = 'KB',
    // NH농협카드
    NH = 'NH',
    // 광주카드
    KWANGJU = 'KWANGJU',
    // 롯데아멕스카드
    LOTTE_AMEX = 'LOTTE_AMEX',
    // 롯데카드
    LOTTE = 'LOTTE',
    // 산업카드
    KDB = 'KDB',
    // 삼성카드
    SAMSUNG = 'SAMSUNG',
    // 수협카드
    SUHYUP = 'SUHYUP',
    // 신세계카드
    SHINSEGAE = 'SHINSEGAE',
    // 신한카드
    SHINHAN = 'SHINHAN',
    // 신협카드
    SHINHYUP = 'SHINHYUP',
    // 씨티카드
    CITY = 'CITY',
    // 우리카드
    WOORI = 'WOORI',
    // 은련카드
    UNIONPAY = 'UNIONPAY',
    // 저축카드
    JEOCHOOK = 'JEOCHOOK',
    // 전북카드
    JEONBUK = 'JEONBUK',
    // 제주카드
    JEJU = 'JEJU',
    // 하나(외환)카드
    HANA_KEB = 'HANA_KEB',
    // 하나카드
    HANA = 'HANA',
    // 한미카드
    HANMI = 'HANMI',
    // JCB카드
    JCB = 'JCB',
    // MASTER카드
    MASTER = 'MASTER',
    // VISA카드
    VISA = 'VISA',
    // 현대카드
    HYUNDAI = 'HYUNDAI',
    // AMEX카드
    AMEX = 'AMEX',
    // 다이너스카드
    DINERS = 'DINERS',
    // 광주카드
    GWANGJU = 'GWANGJU',
    // 카카오뱅크카드
    KAKAO = 'KAKAO',
    // 케이뱅크카드
    KBANK = 'KBANK',
    // 기업은행카드
    IBK = 'IBK',
    // 국민은행(구주택)
    HCB = 'HCB',
    // 단위농협
    NHLOCAL = 'NHLOCAL',
    // 축협중앙회
    NHLIVESTOCK = 'NHLIVESTOCK',
    // 신한은행(조흥은행)
    JH = 'JH',
    // 제일은행
    SC = 'SC',
    // 대구은행
    DAEGU = 'DAEGU',
    // 부산은행
    PUSAN = 'PUSAN',
    // 강원은행
    KANGWON = 'KANGWON',
    // 경남은행
    GYEONGNAM = 'GYEONGNAM',
    // 홍콩상하이은행
    HSB = 'HSB',
    // 우체국
    EPOST = 'EPOST',
    // 하나은행(서울은행)
    HANA_SEOUL = 'HANA_SEOUL',
    // 평화은행
    PB = 'PB',
    // 신한은행(조흥 통합)
    SHINHAN_JH = 'SHINHAN_JH',
    // PAYCO
    PAYCO = 'PAYCO',
    // 새마을금고
    KFCC = 'KFCC',
    // DISCOVER카드
    DISCOVER = 'DISCOVER',
    // 현대증권카드
    HYUNDAI_STOCK = 'HYUNDAI_STOCK',
    // 네이버포인트
    NAVER_POINT = 'NAVER_POINT',
    // 토스머니
    TOSS_MONEY = 'TOSS_MONEY',
    // SSG머니
    SSG_MONEY = 'SSG_MONEY',
    // 엘포인트
    L_POINT = 'L_POINT',
    // 카카오머니
    KAKAO_MONEY = 'KAKAO_MONEY',
}

// 몰의 과세 타입
enum TAX_TYPE {
    // 과세
    DUTY = 'DUTY',
    // 면세
    DUTYFREE = 'DUTYFREE',
    // 영세
    SMALL = 'SMALL',
}

// (상품)옵션 타입
enum PRODUCT_OPTION_TYPE {
    // 단독형 옵션(샵바이프로: 텍스트 옵션)
    STANDARD = 'STANDARD',
    // 조합형 옵션
    COMBINATION = 'COMBINATION',
    // 옵션 사용안함
    DEFAULT = 'DEFAULT',
    // 맵핑(샵바이 프리미엄 전용)
    MAPPING = 'MAPPING',
}

// 판매타입
enum SALE_TYPE {
    // 판매가능
    AVAILABLE = 'AVAILABLE',
    // 품절
    SOLD_OUT = 'SOLD_OUT',
}

// (옵션) 매칭 타입
enum INPUT_MATCHING_TYPE {
    // 옵션별
    OPTION = 'OPTION',
    // 상품별
    PRODUCT = 'PRODUCT',
    // 수량별
    AMOUNT = 'AMOUNT',
}

/***** 아래부터는 통합 회원 관리에서 쓰이는 타입 *****/
enum VC_MEMBER_ACCOUNT_CD {
    VC = '01',
    GOOGLE = '02',
    FACEBOOK = '03',
    APPLE = '04',
    KAKAO = '05',
    NAVER = '06',
}

enum VC_MEMBER_CD {
    NORMAL = '01',
    CADDIE = '02',
}

enum VC_SERVICE_CD {
    KOREA = '01',
    USA = '02',
    JAPAN = '03',
    MVC = '04',
    MSC = '05',
    VSE = '06',
    Y1 = '07',
    VCM = '08',
}

enum VC_NATION_CD {
    USA = 'USA',
    JPN = 'JPN',
    KOR = 'KOR',
}

enum VC_CLAUSE_CD {
    // 서비스 이용약관
    SERVICE = '0001',
    // 개인정보 처리방침
    PERSONAL_INFORMATION = '0002',
    // 위치정보사업 이용약관
    LOCATION_INFORMATION = '0003',
    // 위치기반서비스 이용약관
    LOCATION_BASED_SERVICE = '0004',
    // VSE 서비스 이용약관
    VSE_SERVICE = '0005',
    // 마케팅 활용 동의
    MARKETING = '0006',
}

enum VC_MEMBER_STATUS_CD {
    JOIN = '01',
    WITHDRAW = '02',
    DORMANT = '03',
    NOT_REGISTERED = '04',
}

enum VC_CONFIRM_METHOD_CD {
    EMAIL = '01',
    SMS = '02',
}

export {
    REQUIRED_TYPE,
    IMAGE_DISPLAY_TYPE,
    BOARD_DISPLAY_TYPE,
    INTRO_REDIRECTION_TYPE,
    PRODUCT_ACCUMULATION_BASIS_TYPE,
    ACCUMULATION_DISPLAY_FORMAT_TYPE,
    ACCUMULATION_GIVE_POINT,
    ACCUMULATION_RESERVE_REASON,
    ACCUMULATION_STATUS_GROUP_TYPE,
    ACCUMULATION_STATUS,
    AUTHENTICATION_TYPE,
    AUTHENTICATION_TIME_TYPE,
    AUTH_TYPE,
    CERTIFICATED_USAGE,
    PLATFORM_TYPE,
    NCP_OPEN_ID_PROVIDER,
    OPEN_ID_PROVIDER,
    ORDER_DIRECTION,
    PRODUCT_DIRECTION,
    ORDER_BY,
    BY,
    SALE_STATUS,
    PRODUCT_SALE_STATUS,
    INQUIRY_TYPE,
    SEARCH_TYPE,
    PAGE_TYPE,
    BEST_REVIEW_YN,
    MY_REVIEW_YN,
    HAS_ATTACHMENT_FILE,
    REPORT_REASON_CODE,
    SEX,
    OPEN_ID_TERM,
    ORDER_REQUEST_TYPE,
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    CLAIM_TYPE,
    COUNTRY_CD,
    REPLY_TYPE,
    CRITERION,
    DISCOUNTED_COMPARISON,
    DELIVERY_PAY_TYPE,
    DELIVERY_CONDITION_TYPE,
    GROUP_DELIVERY_AMT_TYPE,
    SHIPPING_AREA_TYPE,
    SHIPPING_AREA_TYPE_PARAMS,
    SELECT_TYPE,
    DAYS_OF_WEEK,
    OPTION_TYPE,
    ORDER_STATUS_TYPE,
    PRODUCT_BY,
    CHANNEL_TYPE,
    INQUIRY_SEARCH_TYPE,
    RESPONSIBLE_OBJECT_TYPE,
    CLAIM_REASON_TYPE,
    CLAIM_STATUS_TYPE,
    CART_EQUIVALENT_OPTION_UNIT_TYPE,
    PRODUCT_REVIEW_REPORT_TYPE,
    RETURN_WAY_TYPE,
    DELIVERY_TYPE,
    DELIVERY_COMPANY_TYPE,
    BANK,
    CYCLE_TYPE,
    ADDRESS_TYPE,
    PAY_TYPE,
    PG_TYPE,
    DOMESTIC,
    ACCUMULATION_REASON,
    SHOPBY_TERMS_TYPES,
    VC_TERMS_TYPES,
    COUPON_TYPES,
    COUPON_TARGET_TYPES,
    USABLE_PLATFORMS,
    REFUND_TYPE,
    DISCOUNT_UNIT_TYPE,
    NEXT_ACTION_TYPE,
    CLAIM_CLASS_TYPE,
    CARD_COMPANY,
    TAX_TYPE,
    PRODUCT_OPTION_TYPE,
    SALE_TYPE,
    INPUT_MATCHING_TYPE,
    VC_MEMBER_ACCOUNT_CD,
    VC_MEMBER_CD,
    VC_SERVICE_CD,
    VC_NATION_CD,
    VC_CLAUSE_CD,
    VC_MEMBER_STATUS_CD,
    VC_CONFIRM_METHOD_CD,
};
