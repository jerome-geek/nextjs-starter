import {
    COUPON_TARGET_TYPES,
    COUPON_TYPES,
    PAY_TYPE,
    USABLE_PLATFORMS,
} from 'models';

export interface CouponsParams {
    endYmd?: string;
    pageNumber: number;
    pageSize: number;
    startYmd?: string;
    usable: boolean | null;
}

export type TargetParams = Pick<CouponsParams, 'pageNumber' | 'pageSize'>;

// 다운로드 가능 쿠폰 목록
export interface IssuableCouponResponse {
    couponNo: number; // 쿠폰 번호 (example: 1)
    couponName: string; // 쿠폰 이름 (example: NCP 오픈기념 쿠폰)
    couponType: COUPON_TYPES; // 쿠폰 종류 (example: PRODUCT)
    couponTargetType: COUPON_TARGET_TYPES; // 쿠폰 대상 종류 (example: ALL_PRODUCT)
    allianceRefererType: any; // deprecated(더 이상 제공하지 않는 개체항목입니다) 제휴 방문처 타입
    discountInfo: DiscountInfo; // 할인정보
    dateInfo: DateInfo; // 발급시간정보
    useConstraint: UseConstraint; // 사용제약조건
    issueConstraint: IssueConstraint; // 발급제약조건
    couponStatus: CouponStatus; // 쿠폰발급상태
    downloadable: boolean; // 다운로드 가능여부 (true: 다운로드 가능 / false: 다운로드 불가능)
}

// 할인정보
export interface DiscountInfo {
    fixedAmt: boolean; // 정액여부 (true: 정액 / false: 정률 ) (example: true)
    discountAmt: number; // 쿠폰 할인액 (example: 10000)
    discountRate: number; // 쿠폰 할인율 (example: 10)
    maxDiscountAmt: number; // 최대 할인액 (example: 100)
    freeDelivery: boolean; // 배송비 무료 여부(배송비쿠폰인경우) (true: 무료 / false: 유료) (example: true)
    useOtherCoupon: boolean; // 타 쿠폰과 함께 사용가능 여부 (true: 사용 가능 / false: 사용 불가능) (example: false)
    useCartCoupon: boolean; // 장바구니 쿠폰 사용가능 여부 (true: 사용 가능 / false: 사용 불가능) (example: false)
    useProductCoupon: boolean; // 상품 쿠폰 사용가능 여부 (true: 사용 가능 / false: 사용 불가능) (example: false)
    skippedAccumulationAmt: boolean; // 적립급 지급 불가 여부 (true: 지급 가능 / false: 지급 불가능) (example: false)
}

// 발급시간정보
export interface DateInfo {
    issueStartYmdt: string; // 발급 시작 일 (example: yyyy-MM-dd HH:mm:ss)
    issueEndYmdt: string; // 발급 제한 일 (example: yyyy-MM-dd HH:mm:ss)
    issueStartHour: number; // 발급 시작 시간 (example: 12)
    issueEndHour: number; // 발급 종료 시간 (example: 12)
    issueDaysOfWeek: string; // 발급가능요일 (example: [1,2,3,4,5,6,7])
}

// 사용제약조건
export interface UseConstraint {
    useEndYmdt: Date; // 	사용 사용종료 일 (example: yyyy-MM-dd HH:mm:ss)
    useDays: number; // 사용가능 기간 - 쿠폰을 발급받은 날부터 (31은 월말까지, -1은 제한없음) (example: 1)
    minSalePrice: number; // 쿠폰 사용조건 최소 구매액 (example: 1000)
    maxSalePrice: number; // 쿠폰 사용조건 최대 구매액 (example: 5000)
    minDeliveryAmt: number; // 쿠폰 사용조건 최소 배송비 (example: 2500)
    limitPayType: Nullable<PAY_TYPE>;
    limitPayTypes: PAY_TYPE[]; // 쿠폰 사용가능 결제수단 (example: PAYCO)
    usablePlatformTypes: USABLE_PLATFORMS[]; // 사용가능플랫폼 (example: ["PC"])
}

// 발급제약조건
export interface IssueConstraint {
    memberGradeName: string; // 발급대상 회원 등급 (example: 홍길동)
    memberGradeNames: string[]; // 발급대상 회원 등급 json (example: ["VIP"])
    memberGroupNames: string[]; // 발급대상 회원 그룹 json (example: ["임직원"])
    issuablePlatformTypes: USABLE_PLATFORMS[]; // 발행가능 플랫폼 (example: ["PC"])
    dailyIssueLimit: boolean; // 1일내 발급 수량 제한 여부 (true: 제한 있음 / false: 제한 없음) (example: false)
    dailyIssueLimitCnt: number; // 1인당 발급 제한 수량(1일간) (true: 제한 있음 / false: 제한 없음) (example: 1)
    issuePerPersonLimit: boolean; // 	1인당 발급 수량 제한 여부(true: 제한 있음 / false: 제한 없음) (example: true)
    issuePerPersonLimitCnt: number; // 1인당 발급 제한 수량(총기간) (true: 제한 있음 / false: 제한 없음) (example: 123)
    dailyIssuePerPersonLimitCnt: number; // 1일내 발급 제한 수량 (true: 제한 있음 / false: 제한 없음) (example: 1)
    channelTypes: string; // 발급/사용 채널 (example: NAVER_EP)
}

// 쿠폰발급상태
export interface CouponStatus {
    totalIssuableCnt: number; // 	쿠폰 발행가능 수량 (example: 1)
    totalIssuedCnt: number; // 총 발행수량 (example: 1)
    totalIssuedCntToday: number; // 총 발행수량(오늘) (example: 1)
    issuableCnt: number; // 발급가능수량 (example: 1)
    myIssuedCnt: number; // 내가 발급 받은 개수 (example: 1)
    myIssuedCntToday: number; // 내가 발급 받은 개수(오늘) (example: 1)
}

export interface getCouponResponse {
    items: Coupon[];
    totalCount: number;
}

export interface Coupon {
    reason: string; // 쿠폰 생성 사유 (example: 행사)
    discountRate: number; // 할인율 (example: 1)
    discountAmt: number; // 할인금액 (example: 5000)
    couponName: string; // 쿠폰 명 (example: 5월 기획전 쿠폰)
    couponIssueNo: number; // 쿠폰 발급 번호 (example: 1)
    minSalePrice: number; // 최소판매금액기준 (example: 10000)
    freeDelivery: boolean; // 배송비무료여부 (example: false)
    maxDiscountAmt: number; // 최대할인금액(정률에서) (example: 10000)
    used: boolean; // 사용여부 (true: 사용함 / false: 사용하지 않음) (example: false)
    useEndYmdt: Date; // 사용종료일 (example: yyyy-MM-dd HH:mm:ss)
    cartCouponUsable: boolean; // 장바구니 쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) (example: true)
    couponType: COUPON_TYPES; // 쿠폰 유형 (example: PRODUCT)
    productCouponUsable: boolean; // 상품쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) (example: true)
    issueYmdt: Date; // 발급일 (example: yyyy-MM-dd HH:mm:ss)
    fixedAmt: boolean; // 정액 여부 (true: 정액 / false: 정률) (example: true)
    limitPayTypes: Nullable<PAY_TYPE[]>; // 사용가능 결제수단 리스트 (example: [PAYCO, NAVER_PAY, CREDIT_CARD, REALTIME_ACCOUNT_TRANSFER, VIRTUAL_ACCOUNT, ESCROW_REALTIME_ACCOUNT_TRANSFER, ESCROW_VIRTUAL_ACCOUNT])
    limitPayType: Nullable<PAY_TYPE>; // 사용가능 결제수단 (example: PAYCO)
    useYmdt: Nullable<Date>; // 사용일시 (example: yyyy-MM-dd HH:mm:ss)
    couponNo: number; // 쿠폰 번호 (example: 1)
    couponTargetType: COUPON_TARGET_TYPES; // 할인쿠폰 대상 타입 (example: PRODUCT)
    skipsAccumulation: boolean; // 적립금 적립 불가 여부 (true: 적립 불가능 / false: 적립 가능) (example: true)
    otherCouponUsable?: boolean; // deprecated(더 이상 제공하지 않는 개체항목입니다) 선택된 쿠폰 외 다른 쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) (example: true)
    usablePlatforms: USABLE_PLATFORMS[]; // 사용가능 플랫폼 (example: PC,MOBILE_WEB,MOBILE_APP)
    minDeliveryAmt: Nullable<number>; // 배송비쿠폰일경우 최소 배송비 (example: 2500)
    maxSalePrice: number; // 최대판매금액기준 (example: 30000)
    fiexdAmt: boolean; // deprecated(더 이상 제공하지 않는 개체항목입니다) 정액 여부 (true: 정액 / false: 정률) (example: true)
    memberGradeNames: Nullable<string[]>; // 사용 가능 회원 등급 (example: [VIP, VVIP])
    memberGroupNames: Nullable<string[]>; // 사용 가능 회원 그룹 (example: [임원, 직원])
}
