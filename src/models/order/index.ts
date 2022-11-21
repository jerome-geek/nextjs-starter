import {
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    COUNTRY_CD,
    ORDER_REQUEST_TYPE,
    REPLY_TYPE,
    CYCLE_TYPE,
    ADDRESS_TYPE,
    PAY_TYPE,
    PG_TYPE,
    NCP_OPEN_ID_PROVIDER,
    NEXT_ACTION_TYPE,
    DELIVERY_PAY_TYPE,
    DELIVERY_CONDITION_TYPE,
    GROUP_DELIVERY_AMT_TYPE,
    SHIPPING_AREA_TYPE,
    SELECT_TYPE,
    DAYS_OF_WEEK,
    OPTION_TYPE,
    CLAIM_STATUS_TYPE,
    DELIVERY_TYPE,
    ORDER_STATUS_TYPE,
    BANK,
    RETURN_WAY_TYPE,
    REFUND_TYPE,
    CLAIM_CLASS_TYPE,
    DELIVERY_COMPANY_TYPE,
    RESPONSIBLE_OBJECT_TYPE,
    CLAIM_REASON_TYPE,
    CARD_COMPANY,
    TAX_TYPE,
} from 'models';

// 상품쿠폰
interface ProductCoupons {
    // 쿠폰 발급 번호 (example: 1415130)
    couponIssueNo: number;
    // 상품번호(example: 100398947)
    productNo: number;
}

interface PaymentProductCoupons {
    couponIssueNo: number;
    promotionCode?: string;
    productNo: number;
}

// 정기결제 배송 정보
interface RecurringPaymentDelivery {
    // 정기결제 배송주기 일자 (example: 20)
    data: number;
    // 정기결제 배송주기 타입 (example: MONTH)
    cycleType: CYCLE_TYPE;
    // 정기결제 첫 배송 예정일 (example: YYYY-MM-DD)
    firstRecurringDate: string;
    // 정기결제 배송주기 (example: 1)
    cycle: number;
}

// 소비자 입력형 옵션
export interface OptionInputs {
    // 구매자 작성형 입력 깂 (example: 14호)
    inputValue: string;
    // 구매자 작성형 입력 이름 (example: 사이즈)
    inputLabel: string;
    // 구매자 작성형 입력 필수여부 (example: true)
    required: boolean;
}

// 상품결제 파라미터
export interface Products {
    // 렌탈 정보 (nullable)
    rentalInfos?: RentalInfo[];
    // 정기결제 배송 정보
    recurringPaymentDelivery?: RecurringPaymentDelivery;
    channelType: string;
    // 주문수량 (example: 1)
    orderCnt: number;
    // TODO: 소비자 입력형 옵션 check
    optionInputs?: OptionInputs[];
    // 옵션번호 (example: 1258932)
    optionNo: number;
    // 상품번호 (example: 100398947)
    productNo: number;
}

// 주소
export interface AddressRequest {
    // 	배송지 주소 (example: 경기도 성남시 분당구 대왕판교로645번길 12)
    receiverAddress: string;
    // 배송지 지번(지역추가배송비계산 시 사용) (example: 경기도 성남시 분당구 삼평동 629번지 NHN 플레이뮤지엄)
    receiverJibunAddress?: string;
    // 기본배송지 여부 (example: false), TODO: boolean인지 string인지 확인 필요
    defaultYn: string;
    // 배송지타입 (example: BOOK)
    addressType: ADDRESS_TYPE;
    // 수령자 명 (example: 홍길동)
    receiverName: string;
    // 개인고유통관부호 (nullable) (example: P12341234)
    customsIdNumber?: string;
    // 국가코드 (example: KR)
    countryCd?: COUNTRY_CD;
    // 배송지 우편 번호 (example: 13487)
    receiverZipCd: string;
    // 주소록명 (example: 홍길동집)
    addressName?: string;
    // 배송지 상세 주소 (example: 16 NHN 플레이뮤지엄)
    receiverDetailAddress?: string;
    // 연락처1( example: 010-0000-0000)
    receiverContact1: string;
    // 연락처2( example: 010-0000-0000)
    receiverContact2?: string;
}

interface ClientParams {
    mallNo: string;
    orderName: string;
}

interface ExtraData {
    cardNumber: number;
    cardExpMonth: number;
    cardExpYear: number;
    cardCvc: number;
    saveYn: boolean;
}

interface ExtraData2 {
    cardId: string;
}

// 무통장 입금 정보
interface BankAccountToDeposit {
    // 계좌번호 (example: 1234123)
    bankAccount: string;
    // 은행명 (example: 002)
    bankCode: string;
    // 입금자명 (example: 홍길동)
    bankDepositorName: string;
}

interface PaymentCoupons {
    productCoupons: PaymentProductCoupons[];
    cartCouponIssueNo?: number;
    promotionCode?: string;
}

// 쿠폰
export interface CouponRequest {
    // 상품 쿠폰 (nullable)
    productCoupons?: ProductCoupons[];
    // 장바구니 쿠폰 발행 번호 (example: 12121212)
    cartCouponIssueNo?: number;
    // 쿠폰 할인 코드 (example: 1258932)
    promotionCode?: string;
    // 쇼핑채널링-채널타입 (example: NAVER_EP)
    channelType: string;
}

export interface CouponApplyResponse {
    deliveryGroups: DeliveryGroup;
    appliedCoupons: AppliedCoupons;
    availablePayTypes: AvailablePayType;
    paymentInfo: PaymentInfo;
}

// 복수 배송지 정보
interface ShippingAddresses {
    // 상품결제 파라미터
    payProductParams: Omit<Products, 'channelType'>[];
    // 배송지정일 (example: YYYY-MM-DD)
    requestShippingDate?: string;
    // 배송지 번호(0:신규, 0이상:이전배송지) (example: 1)
    addressNo: number;
    // 배송지 나중입력 여부 (true: 나중입력, false: 바로입력) (example: false)
    usesShippingInfoLaterInput?: boolean;
    // 기본 주소지 설정 여부 (true 이면 선택한 배송지 정보가 기본주소지로 설정되어 저장된다) (true: 설정, false: 미설정) (example: false)
    useDefaultAddress: boolean;
    // TODO: 배송지 정보
    shippingAddress: Omit<AddressRequest, 'addressType'>;
    // 주소록명 (example: 홍길동집)
    addressName: string;
    // 배송지 나중입력 연락처(example: 010-7770-7777)
    shippingInfoLaterInputContact?: string;
}

// 주문자정보
// !schema 이름과 설명이 다르니 추후 확인 필요
interface Orderer {
    // 주문자이메일 (example: test@nhn-commerce.com)
    ordererEmail: string;
    // 주문자연락처1 (example: 010-0000-0000)
    ordererContact1: string;
    // 주문자연락처2 (nullable) (example: 010-0000-0000)
    ordererContact2?: string;
    // 주문자명 (example: 홍길동)
    ordererName: string;
}

// TOOD: cartNo, optionNo차이?
export interface ShoppingCartBody {
    orderCnt: number;
    channelType: string;
    optionInputs?: OptionInputs[];
    optionNo: number;
    productNo: number;
    cartNo?: number;
}

export interface TokenIssueBody {
    password?: string;
    name?: string;
    mobileNo?: string;
    email?: string;
    orderRequestType: ORDER_REQUEST_TYPE;
}

// 현금영수증
export interface CashReceiptBody {
    // 발급용도 (example: INCOME_TAX_DEDUCTION)
    cashReceiptIssuePurposeType: CASH_RECEIPT_ISSUE_PURPOSE_TYPE;
    // 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) (example: 01011111111)
    cashReceiptKey: string;
}

export interface DeliveryBody {
    // 주소
    receiverAddress?: string;
    // 지번주소(대한민국 주소의 경우는 필수 값) (nullable)
    receiverJibunAddress: string;
    // 수령자명
    receiverName: string;
    // 개인통관고유부호 (nullable)
    customIdNumber?: string;
    // 국가코드(default:mall의 국가코드) (nullable)
    countryCd?: COUNTRY_CD;
    // 우편번호
    receiverZipCd: string;
    // 상세주소
    receiverDetailAddress: string;
    // 배송메모 (nullable)
    deliveryMemo?: string;
    // 수령자연락처1
    receiverContact1: string;
    // 수령자연락처2 (nullable)
    receiverContact2?: string;
}

export interface PasswordParams {
    replyType: REPLY_TYPE;
    mobileNo?: string;
    email?: string;
    name?: string;
}

export interface OrderSheetBody {
    // 상품 쿠폰 (nullable, optional)
    productCoupons?: ProductCoupons[];
    // 쇼핑채널링-추적키 (example: 10a00a00-a00a-00a0-a000-000000aa0000)
    trackingKey: string;
    // 장바구니 번호 리스트 (장바구니 통해서 구매한 경우 - 구매 완료 시 해당 장바구니를 삭제합니다.) (nullable) (example: [1, 2, 3])
    cartNos?: number[];
    // 쇼핑채널링-채널타입 (example: NAVER_EP)
    channelType: string;
    // 상품 정보
    products: Products[];
}

export interface GetCalculatedOrderSheet {
    // 주소
    addressRequest: AddressRequest;
    // 쿠폰
    couponRequest?: CouponRequest;
    // 적립금 사용액(example: 0)
    accumulationUseAmt: number;
    // 복수 배송지 정보
    shippingAddress?: ShippingAddresses[];
}

export interface PaymentReserve {
    // 결제완료 API 호출 후 다시 전달 받을 값(NCPPay script에서 넣음) (nullable) (example: {"mallNo" : "1", "orderName" : "주문테스트"})
    clientParams?: ClientParams;
    // 	추가 정보 (ex : Stripe결제수단의 경우 카드 정보 or 저장된 카드의 cardId) (nullable) (example: {'cardNumber':4242424242424242, 'cardExpMonth':12, 'cardExpYear':'2020', 'cardCvc':'123', 'saveYn':'Y'} or {'cardId':'card_12354123124'})
    extraData?: ExtraData | ExtraData2;
    // 주문메모 (nullable) (example: 빠른 배송 부탁 드립니다.)
    orderMemo?: string;
    // 무통장 입금 정보
    bankAccountToDeposit?: BankAccountToDeposit;
    // 렌탈 상품 정보
    rentalInfo?: RentalInfo;
    // 결제수단 (example: CREDIT_CARD)
    payType: PAY_TYPE;
    // 결제 완료 후 리턴되는 쇼핑몰의 URL (example: http://쇼핑몰 URL/return.html)
    // URL 의 파라미터중
    // result=SUCCESS 인 경우 : 성공 페이지 구현 (orderNo 파라미터로 주문정보 출력가능)
    // result=FAIL 인 경우 : message 값을 화면이나 경고창으로 출력함
    clientReturnUrl: string;
    // TODO
    coupons?: PaymentCoupons;
    // 기본 주소지 설정 여부 (true: 선택한 배송지 정보가 기본주소지로 설정, false: 미설정) (nullable) (example: true)
    useDefaultAddress?: boolean;
    // 회원 여부 (example: true)
    member: boolean;
    // 앱내 결제 여부, Y인 경우 extraData.appUrl에 결제완료 후 돌아갈 app scheme을 넣어야 함 (nullable) (example: Y)
    inAppYn?: string;
    // 무통장 거래 시 현금영수증 발행 신청 여부(true: 신청, false: 미신청) * kcp 현금영수증 발행 대행 서비스 사용 시 true (nullable) (example: false)
    applyCashReceipt?: boolean;
    // PG 명세서에 표시될 주문명 (nullable)^|테스트상품 외 2건(default생성)
    orderTitle?: string;
    // 임시주문번호(비회원인경우 필수) (nullable) (example: 1212)
    tempPassword?: string;
    // 주소록에 등록 여부 (example: true)
    // (true 이면 선택한 배송지 정보가 주소록에 저장된다.
    // 이미 저장된 주소록을 선택하여 주소를 수정했다면, 변경한 주소로 수정되어 저장한다)
    saveAddressBook: boolean;
    // true 인 경우 주문자 정보로 회원의 정보를 수정함. 몰설정에서 회원의 점유인증을 하지 않는 경우에만 update 된다. (example: false)
    updateMember: boolean;
    // 주문서번호 (example: 202001012000000009)
    orderSheetNo: string;
    // 외부 PG사 (example: KCP)
    pgType: PG_TYPE;
    // 무통장 입금 시 입금할 입금자 이름 (nullable) (example: 홍길동)
    remitter?: string;
    // 배송메모 (nullable) (example: 문앞에 놔주세요)
    deliveryMemo?: string;
    // TODO
    orderer: Orderer;
    // 선택한 결제수단 사용여부(true: 사용, false: 미사용) (nullable) (example: false)
    paymentAmtForVerification: number;
    // TODO
    shippingAddress: MainAddress &
        Omit<DeliveryBody, 'deliveryMemo'> &
        Pick<
            ShippingAddresses,
            | 'requestShippingDate'
            | 'shippingInfoLaterInputContact'
            | 'usesShippingInfoLaterInput'
        >;
    // 선택한 결제수단 사용여부(true: 사용, false: 미사용) (nullable) (example: false)
    savesLastPayType?: boolean;
    // 보조결제 수단 결제액(적립금 사용액) (example: 0)
    subPayAmt: number;
    // 현금영수증
    cashReceipt?: CashReceiptBody;
    // TODO
    shippingAddresses?: ShippingAddresses & { savedAddressBook?: boolean }[];
}

export interface NaverPayOrderSheet {
    orderSheetNo?: string;
    clientReturnUrl: string;
    nvadid?: string;
    naco?: string;
    items: Omit<ShoppingCartBody, 'cartNo'> &
        { additionalProductNo?: number }[];
}

export interface OAuthBegin {
    clientId: string;
    provider: NCP_OPEN_ID_PROVIDER;
    nextUrl: string;
    state?: string;
    code: string;
}

// 렌탈 정보
export interface RentalInfo {
    // 렌탈 기간 (example: 1)
    rentalPeriod: number;
    // 월 렌탈료 (example: 10000)
    monthlyRentalAmount: number;
}

export interface CartList {
    // 배송그룹
    deliveryGroups: DeliveryGroup[];
    // 가격 정보
    price: CartPriceInfo;
    // 유효하지 않은 상품
    invalidProducts: InvalidProduct[];
}

// 배송그룹
export interface DeliveryGroup {
    // 파트너번호 (nullable) (example: 2500)
    partnerNo: Nullable<number>;
    // 배송비착불여부 (example: PREPAID_DELIVERY)
    deliveryPayType: DELIVERY_PAY_TYPE;
    // 배송 조건
    deliveryCondition: DeliveryCondition;
    // 배송비 (example: 2500)
    deliveryAmt: number;
    // 파트너명 (example: NCP)
    partnerName: string;
    // 주문상품
    orderProducts: OrderProduct[];
    // 배송비 템플릿 그룹 번호 (nullable) (example: 1)
    deliveryTemplateGroupNo: Nullable<number>;
    // 배송비 템플릿 번호 (nullable) (example: 1)
    deliveryTemplateNo: Nullable<number>;
}

// 주문상품
export interface OrderProduct {
    // 구매금액 합 (example: 0)
    buyAmt: number;
    // 브랜드 명 (example: string)
    brandName: string;
    // 파트너 명
    partnerName: string;
    // 쿠폰 사용 가능 여부 (example: true)
    couponUsable: boolean;
    // 배송구분 (example: PARTNER_SHIPPING_AREA)
    shippingAreaType: SHIPPING_AREA_TYPE;
    // 배송가능여부 (example: false)
    deliverable: boolean;
    // 옵션사용여부 (example: false)
    optionUsed: boolean;
    // 찜상품 여부 (example: false)
    liked: boolean;
    // 상품 명 (example: string)
    productName: string;
    // 파트너 번호
    partnerNo: number;
    // 최대 구매수량 정보
    maxBuyCountInfo: MaxBuyCountInfo;
    // hsCode (example: p1)
    hsCode: string;
    // 적립금 사용 가능 여부 (example: true)
    accumulationUsable: boolean;
    // eanCode (example: e1)
    eanCode: string;
    // 최소 구매 수량
    minBuyCount: number;
    // 상품 url (example: http://image.url)
    imageUrl: string;
    // 브랜드 영문명 (example: string)
    brandNameEn: string;
    // 옵션 선택 방식 (nullable)
    selectType: Nullable<SELECT_TYPE>;
    // 주문 상품 옵션
    orderProductOptions: OrderProductOption[];
    // 환불가능여부 (example: false)
    refundable: boolean;
    // 배송일 지정 정보
    deliveryDate: DeliveryDate;
    // 브랜드 번호 (example: 12)
    brandNo: number;
    // 해외직배송여부 (example: false)
    deliveryInternational: boolean;
    // 상품번호 (example: 0)
    productNo: number;
}

export interface OrderOptions {}

// 주문 상품 옵션
export interface OrderProductOption {
    // 예약주문 상품 배송시작예정일 (example: String)
    reservationDeliveryYmdt: string;
    // 옵션권장출력값 (example: string)
    optionTitle: string;
    // 구매확정 시 적립금 합 (example: 0)
    accumulationAmtWhenBuyConfirm: number;
    // 유효성 정보
    validInfo: ValidInfo;
    // 옵션값 (example: string)
    optionValue: string;
    // 주문수량 (example: 0)
    orderCnt: number;
    // 소비자 입력형 옵션
    optionInputs: OptionInputs[];
    // 품절여부 (true:품절 false:구매가능) (example: false)
    soldOut: boolean;
    // 옵션형태 (example: PRODUCT_ONLY)
    optionType: OPTION_TYPE;
    // 가격정보
    price: Price;
    // 옵션 이미지 URL (example: http://image.url)
    imageUrl: string;
    // TODO: 타입체크 필요 (number가 dot으로 연결되어 있는 형식), schema에서는 nullable이 아니지만 실제 값은 nullable
    // 정기 결제 배송 주기 (example: 1,2,3)
    recurringDeliveryCycles: Nullable<number>;
    // 주문 상품 옵션
    setOptions: SetOption[];
    // 예약주문여부 (true: 예약주문상품, false: 일반상품) (example: false)
    reservation: boolean;
    // 재고 개수 (example: 0)
    stockCnt: number;
    // 옵션번호 (example: 0)
    optionNo: number;
    // 옵션명 (example: string)
    optionName: string;
    // 판매자 관리코드 (example: string)
    optionManagementCd: string;
    // 장바구니 번호 (example: 0)
    cartNo: number;
    // 상품번호 (example: 0)
    productNo: number;
}

// 가격정보
export interface Price {
    // 구매금액(구매가 * 주문수량) (example: 0)
    buyAmt: number;
    // 추가할인금액 (example: 0)
    additionalDiscountAmt: number;
    // 즉시할인금액 (example: 0)
    immediateDiscountAmt: number;
    // 상품판매가 example: 0)
    salePrice: number;
    // 정상금액(상품판매가 + 옵션추가금액) * 주문수량 (example: 0)
    standardAmt: number;
    // 옵션가격(추가금액) (example: 0)
    addPrice: number;
}

export interface OptionInput {
    inputLabel: string;
    inputValue: string;
    required: any;
}

// 유효성 정보
export interface ValidInfo {
    // 유효 여부(true: 유효, false: 유효하지 않음) (example: false)
    valid: boolean;
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    validYn?: string;
    // 유효성 실패 코드 (nullable) (example: string)
    errorCode: Nullable<string>;
    // 유효성 실패 사유 메세지 (nullable) (example: string)
    message: Nullable<string>;
    // 주문수량변경 가능 여부 (true:변경가능, false:변경불가능) (example: false)
    orderCntChangeable: boolean;
}

// 배송일 지정 정보
export interface DeliveryDate {
    // 기간
    period: Period;
    // 요일 (example: [MON])
    daysOfWeek: DAYS_OF_WEEK[];
    // 주문일 기준 (example: 0)
    daysAfterPurchase: number;
}

// 기간
export interface Period {
    // 배송일지정 가능한 시작일 (example: YYYY-MM-DD hh:mm:ss)
    startYmdt: string;
    // 배송일지정 가능한 종료일 (example: YYYY-MM-DD hh:mm:ss)
    endYmdt: string;
}

// 최대 구매수량 정보
export interface MaxBuyCountInfo {
    // 1인당 최대 구매 수량
    maxBuyPersonCount: number;
    // 최대 구매 수량 기간 제한 : 7일 동안 최대 2개 구매가능 (2개 항목)
    maxBuyPeriodCount: number;
    // 최대 구매 수량 기간 제한 : 7일 동안 최대 2개 구매가능 (7일 항목) (example: 0)
    maxBuyDays: number;
    // 1회당 최대 구매 수량 (example: 0)
    maxBuyTimeCount: number;
}

// 배송 조건
export interface DeliveryCondition {
    // 배송조건 (nullable) (example: FREE)
    deliveryConditionType: Nullable<DELIVERY_CONDITION_TYPE>;
    // 조건부 배송비의 기준값(9,800원 미만 배송비 2,500원일때 aboveDeliveryAmt는 9800) (example: 9800)
    aboveDeliveryAmt: number;
    // 배송비(조건에 의해 계산되어진) (example: 2500)
    deliveryAmt: number;
    // 묶음배송조건 (nullable) (example: MAXIMUM_SELECTED)
    groupDeliveryAmtType: Nullable<GROUP_DELIVERY_AMT_TYPE>;
    // 반품배송비 (example: 2500)
    returnDeliveryAmt: number;
    // 조건부 배송비 미달 시 배송비(9,800원 미만 배송비 2,500원일때 baseDeliveryAmt는 2,500) (example: 2500)
    baseDeliveryAmt: number;
    // 추가배송비(조건에 의해 계산되어진) (example: 2500)
    remoteDeliveryAmt: number;
    // 지역별추가배송비사용여부 (nullable) (example: false)
    chargesRemoteDeliveryAmt: Nullable<boolean>;
}

// 유효하지 않은 상품
export interface InvalidProduct {
    // 구매금액 합 (example: 0)
    buyAmt: number;
    // 브랜드 명 (example: string)
    brandName: string;
    // 파트너 명
    partnerName: string;
    // 쿠폰 사용 가능 여부 (example: true)
    couponUsable: boolean;
    // 배송구분 (example: PARTNER_SHIPPING_AREA)
    shippingAreaType: SHIPPING_AREA_TYPE;
    // 배송가능여부 (example: false)
    deliverable: boolean;
    // 옵션사용여부 (example: false)
    optionUsed: boolean;
    // 찜상품 여부 (example: false)
    liked: boolean;
    // 상품 명 (example: string)
    productName: string;
    // 파트너 번호
    partnerNo: number;
    // 최대 구매수량 정보
    maxBuyCountInfo: MaxBuyCountInfo;
    // hsCode (example: p1)
    hsCode: string;
    // 적립금 사용 가능 여부 (example: true)
    accumulationUsable: boolean;
    // eanCode (example: e1)
    eanCode: string;
    // 최소 구매 수량
    minBuyCount: number;
    // 상품 url (example: http://image.url)
    imageUrl: string;
    // 브랜드 영문명 (example: string)
    brandNameEn: string;
    // 옵션 선택 방식 (nullable) (example: FLAT)
    selectType: Nullable<SELECT_TYPE>;
    // 주문 상품 옵션
    orderProductOptions: OrderProductOption[];
    // 환불가능여부 (example: false)
    refundable: boolean;
    // 배송일 지정 정보
    deliveryDate: DeliveryDate;
    // 브랜드 번호 (example: 12)
    brandNo: number;
    // 해외직배송여부 (example: false)
    deliveryInternational: boolean;
    // 상품번호 (example: 0)
    productNo: number;
}

export interface Period2 {
    startYmdt: string;
    endYmdt: string;
}

// 가격 정보
export interface CartPriceInfo {
    // 구매금액 합 (example: 0)
    buyAmt: number;
    // 할인금액 (example: 0)
    discountAmt: number;
    // 총 구매금액 합(구매금액 합 + 총 선불배송비 합) (example: 0)
    totalAmt: number;
    // 구매확정 시 적립금 합 (example: 0)
    accumulationAmtWhenBuyConfirm: number;
    // 정상금액(상품판매가 + 옵션추가금액) * 주문수량 (example: 0)
    standardAmt: number;
    // 총 착불배송비 합 (example: 0)
    totalPayOnDeliveryAmt: number;
    // 총 배송비 합 (example: 0)
    totalDeliveryAmt: number;
    // 총 선불배송비 합 (example: 0)
    totalPrePaidDeliveryAmt: number;
}

export interface OrderSheetResponse {
    deliveryGroups: DeliveryGroup[];
    orderSheetPromotionSummary: OrderSheetPromotionSummary;
    orderSheetAddress: OrderSheetAddress;
    ordererContact: OrdererContact;
    appliedCoupons: AppliedCoupons;
    lastPayType: string;
    paymentInfo: PaymentInfo;
    tradeBankAccountInfos: TradeBankAccountInfo[];
    availablePayTypes: AvailablePayType[];
    foreignPartners: ForeignPartner[];
    sellerPrivacyUsagePartners: SellerPrivacyUsagePartner[];
    applyCashReceiptForAccount: boolean;
    agreementTypes: string[];
    requireCustomsIdNumber: boolean;
    freeGiftInfos: FreeGiftInfo[];
    rentalInfos: RentalInfo[];
    invalidProducts: any;
}

export interface ErrorCode {
    code: string;
    simpleCode: string;
}

export interface Price {
    salePrice: number;
    addPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    standardAmt: number;
    buyAmt: number;
}

// 주문 상품 옵션
export interface SetOption {
    // 옵션사용여부 (example: true)
    usesOption: boolean;
    // 옵션번호 (example: 1)
    mallOptionNo: number;
    // 상품관리코드 (nullable) (example: 1231)
    productManagementCd: Nullable<string>;
    // 옵션 (example: 100)
    optionValue: string;
    // 구매수 (example: 1)
    count: number;
    // 옵션가격 (example: 1000)
    optionPrice: number;
    // sku (nullable)(example: 1231)
    sku: Nullable<string>;
    // 옵션명 (example: 사이즈)
    optionName: string;
    // 옵션관리코드 (nullable) (example: 1231)
    optionManagementCd: Nullable<string>;
    // 상품번호 (example: 1)
    mallProductNo: number;
    // 재고번호 (example: 1)
    stockNo: number;
    // 상품명 (example: TEST_PRODUCT)
    productName: string;
}

export interface OrderSheetPromotionSummary {
    usableCouponCnt: number;
    myCouponCnt: number;
    usableDeliveryCouponCnt: number;
    myDeliveryCouponCnt: number;
    myAccumulationAmt: number;
}

export interface OrderSheetAddress {
    mainAddress: MainAddress;
    recentAddresses: MainAddress[];
    memberAddress: MemberAddress;
    recentDeliveryMemo: any[];
}

export interface MainAddress {
    addressNo: number;
    receiverZipCd: string;
    receiverAddress: string;
    receiverJibunAddress: string;
    receiverDetailAddress: string;
    receiverName: string;
    addressName?: string;
    receiverContact1: string;
    receiverContact2?: string;
    customsIdNumber?: string;
    countryCd: string;
}

export interface MemberAddress {
    zipCd: string;
    address: string;
    detailAddress: string;
    jibunAddress: string;
    jibunDetailAddress: string;
}

export interface OrdererContact {
    ordererName: string;
    ordererContact1: string;
    ordererContact2: string;
    ordererEmail: string;
}

export interface AppliedCoupons {
    cartCouponIssueNo: number;
    promotionCode: string;
    productCoupons: ProductCoupon[];
}

export interface ProductCoupon {
    productNo: number;
    couponIssueNo: number;
}

export interface PaymentInfo {
    // 보유한 적립금
    accumulationAmt: number;
    // 구매확정시 예상 적립금
    accumulationAmtWhenBuyConfirm: number;
    // 최대 사용가능한 적립금
    availableMaxAccumulationAmt: number;
    // buyAmt[장바구니 금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가] - productCouponAmt[상품쿠폰할인금액]
    cartAmt: number;
    // 장바구니 쿠폰 할인금액
    cartCouponAmt: number;
    // customs Duty [관세] (미국 몰 전용)
    customsDuty: number;
    // 배송비
    deliveryAmt: number;
    // 착불 배송비
    deliveryAmtOnDelivery: number;
    // 배송비 쿠폰 할인금액
    deliveryCouponAmt: number;
    // 적립금 사용 가능 여부 (true: 가능, false: 불가능)
    isAvailableAccumulation: boolean;
    // 적립금을 사용할 수 있는 최소 적립금 기준
    minAccumulationLimit: number;
    // 적립금을 사용할 수 있는 최소 결제 금액 기준
    minPriceLimit: number;
    // paymentAmt[결제예정금액] = buyAmt[장바구니 금액] - cartCouponAmt[장바구니 쿠폰할인금액] + deliveryAmt[배송비] + remoteDeliveryAmt[지역별추가배송비] + salesTaxAmt - deliveryCouponAmt[배송비 쿠폰 할인금액] (- usedAccumulationAmt[사용한적립금]:OrderSheet시점에는 hidden)
    paymentAmt: number;
    // productAmt[상품금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가]
    productAmt: number;
    // 상품쿠폰 할인금액(상품쿠폰 + 플러스쿠폰)
    productCouponAmt: number;
    // 추가배송비(조건에 의해 계산되어진)
    remoteDeliveryAmt: number;
    // 착불 지역별 추가 배송비
    remoteDeliveryAmtOnDelivery: number;
    // sales Tax (미국 몰 전용)
    salesTaxAmt: number;
    // additionalDiscountAmt[추가할인가] * orderCnt[구매수량]
    totalAdditionalDiscountAmt: number;
    // immediateDiscountAmt[즉시할인가] * orderCnt[구매수량]
    totalImmediateDiscountAmt: number;
    // standardPrice[최종상품금액] (salePrice[판매가] + addPrice[옵션추가금액]) * orderCnt[구매수량]
    totalStandardAmt: number;
    // 사용한 적립금
    usedAccumulationAmt: number;
}

export interface TradeBankAccountInfo {
    bankAccount: string;
    bankCode: string;
    bankDepositorName: string;
    bankName: string;
}

export interface AvailablePayType {
    payType: string;
    pgTypes: string[];
}

export interface ForeignPartner {
    partnerName: string;
    countryCd: string;
    privacyManagerName: string;
    privacyManagerPhoneNo: string;
}

export interface SellerPrivacyUsagePartner {
    partnerName: string;
}

export interface FreeGiftInfo {
    giveConditionName: string;
    giveStartYmdt: string;
    giveEndYmdt: string;
    freeGifts: FreeGift[];
}

export interface FreeGift {
    productName: string;
    optionName: string;
    optionValue: string;
    mallProductMainImageUrl: string;
}

export interface RentalInfo {
    rentalPeriod: number;
    monthlyRentalAmount: number;
}

export interface ShippingAddressResponse {
    recentAddresses: MainAddress[];
    recurringPaymentAddresses: MainAddress[];
    bookedAddresses: MainAddress[];
    defaultAddress: MainAddress;
}

export interface ApplyCouponResponse {
    orderSheetNo: string;
    products: Product[];
    cartAmt: number;
    cartCoupons: CartCoupon[];
    deliveryAmt: number;
    productCouponDiscountAmt: number;
    cartCouponDiscountAmt: number;
    deliveryCouponDiscountAmt: number;
    deliveryCoupons: any[];
}

export interface Product {
    productNo: number;
    brandName: string;
    productName: string;
    mainOption: string;
    optionInputs: any;
    buyAmt: number;
    productCouponDiscountAmt: number;
    optionCnt: number;
    totalOrderCnt: number;
    productCoupons: ProductCoupon[];
    invalidProductCoupons: any[];
    productPlusCoupons: any[];
}

export interface ProductCoupon {
    couponIssueNo: number;
    couponNo: number;
    discountRate: number;
    freeDeliveryYn: string;
    couponName: string;
    reason: string;
    couponType: string;
    couponTargetType: string;
    usablePlatformTypes: string;
    useEndYmdt: string;
    fixedAmountDiscount: boolean;
    maxDiscountAmt: number;
    freeDelivery: boolean;
    otherCouponUsable: boolean;
    cartCouponUsable: boolean;
    productCouponUsable: boolean;
    limitPayType: string;
    displayCouponName: string;
    skipsAccumulation: boolean;
    minSalePrice: any;
    maxSalePrice: any;
    maximum: boolean;
    selected: boolean;
    used: boolean;
    couponDiscountAmt: number;
}

export interface CartCoupon {
    couponIssueNo: number;
    couponNo: number;
    discountRate: number;
    freeDeliveryYn: string;
    couponName: string;
    reason: string;
    couponType: string;
    couponTargetType: string;
    usablePlatformTypes: string;
    useEndYmdt: string;
    fixedAmountDiscount: boolean;
    maxDiscountAmt: number;
    freeDelivery: boolean;
    otherCouponUsable: boolean;
    cartCouponUsable: boolean;
    productCouponUsable: boolean;
    limitPayType: string;
    displayCouponName: string;
    skipsAccumulation: boolean;
    minSalePrice: any;
    maxSalePrice: any;
    maximum: boolean;
    selected: boolean;
    used: boolean;
    couponDiscountAmt: number;
}

// 회원 / 비회원 response 구조 같음
export interface OrderDetailResponse {
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    insurance: Insurance;
    // 추가 정보 (nullable)
    extraData: Nullable<string>;
    // 구매확정 시 적립예정 적립금 (example: 0)
    accumulationAmtWhenBuyConfirm: number;
    // 기본 주문 상태 (example: DEPOSIT_WAIT)
    defaultOrderStatusType: string;
    // PG사 결제키 (example: testtest)
    pgMallKey: string;
    // 배송지 메모 (example: 배송지 메모 내용)
    memo: string;
    // 최초주문금액정보
    firstOrderAmount: FirstOrderAmount;
    // 주문메모 (nullable) (example: 선물포장 부탁드립니다)
    orderMemo: Nullable<string>;
    // 개인통관고유부호필요여부(true: 필요, false: 불필요) (example: false)
    requireCustomsIdNumber: boolean;
    // 환불(예상)방법(PG) (example: PG)
    refundType: string;
    // 결제 영수증 정보
    receiptInfos: ReceiptInfo[];
    // 교환추가결제 정보 (nullable)
    exchangePayInfos: Nullable<ExchangePayInfo[]>;
    // 결제수단 (nullable) (example: CREDIT_CARD)
    payType: Nullable<PAY_TYPE>;
    // 회원여부(true: 회원, false: 비회원) (example: true)
    member: boolean;
    // 다음에 할 수 있는 작업
    nextActions: NextAction[];
    // 에스크로 여부(true: 에스크로, false: 비에스크로) (example: false)
    escrow: boolean;
    // 선택가능한 은행
    availableBanks: AvailableBank[];
    // 비회원-인증토큰 (nullable) (example: 121212)
    guestToken: Nullable<string>;
    // 환불방법(노출용)
    refundTypeLabel: string;
    // 외부 PG사 (example: PAYCO)
    pgType: string;
    // 주문번호 (example: 202012341234)
    orderNo: string;
    // 최종주문금액정보
    lastOrderAmount: LastOrderAmount;
    // 환불정보 (nullable)
    refundInfos: Nullable<RefundInfo>;
    // 추가결제정보 (nullable)
    additionalPayInfos: AdditionalPayInfo[];
    // 배송지 메모 (example: 빠른 배송 부탁드립니다.)
    deliveryMemo: string;
    // 환불결제방법 (example: CANCEL_DEPOSIT)
    refundPayType: REFUND_TYPE;
    // 선택가능한 사유 목록
    claimReasonTypes: ClaimReasonType[];
    // 주문자정보
    orderer: Orderer;
    // PG사 결제번호(주문번호) - 매출전표등 확인용 (nullable) (example: 202012341234)
    pgOrderNo: Nullable<string>;
    // 파트너별주문리스트
    orderOptionsGroupByPartner: OrderOptionsGroupByPartner[];
    // 배송지 정보
    shippingAddress: ShippingAddress;
    // 주문일자 (example: YYYY-MM-DD hh:mm:ss)
    orderYmdt: string;
    // 결제지 주소
    billingAddress: ShippingAddress;
    // 결제수단라벨 (nullable) (example: 신용카드)
    payTypeLabel: Nullable<string>;
    // 결제정보
    payInfo: PayInfo;
}

// 결제정보
export interface PayInfo {
    // 휴대폰결제 정보
    mobileInfo: {
        // 통신사 (example: SKT)
        mobileCompany: string;
        // 휴대폰번호 (example: 010-1111-1111)
        mobileNo: string;
    };
    // 가상계좌/계좌이체/무통장 정보
    bankInfo: BankInfo;
    // 신용카드 정보
    cardInfo: CardInfo;
    // 거래번호 (nullable) (example: 201811022002417377)
    tradeNo: Nullable<string>;
    // PG 쿠폰 금액 (nullable) (example: 0)
    pgCouponAmt: Nullable<number>;
    // 카드사 쿠폰 금액 (nullable) (example: 0)
    cardCouponAmt: number;
    // 네이버페이결제정보
    naverPayInfo: NaverPayInfo;
    // 가맹점 발행쿠폰 (nullable) (example: 0)
    sellerCouponAmt: Nullable<number>;
    // 현금영수증 거래번호 (nullable) (example: 12121212)
    cashNo: Nullable<string>;
    // 현금영수증 승인번호 (nullable) (example: 12121212)
    cashAuthNo: Nullable<string>;
    // PG결제 금액 (nullable) (example: 10000)
    payAmt: Nullable<number>;
    // PG 포인트 (nullable) (example: 0)
    pointAmt: Nullable<number>;
    // 렌탈 정보
    rentalInfo: RentalInfo;
    // 결제타입 (example: CREDIT_CARD)
    payType: PAY_TYPE;
    // 에스크로 결제 여부 (example: Y)
    escrowYn: string;
    // 몰의 과세 타입 (nullable) (example: DUTY)
    taxType: Nullable<TAX_TYPE>;
}

// 가상계좌/계좌이체/무통장 정보
export interface BankInfo {
    // 예금주명 (example: 홍길동)
    depositorName: string;
    // PG 은행코드 (PG별로 다름) (example: 11)
    bankCode: string;
    // 은행 (example: KDB)
    bank: BANK;
    // 입금해야할 금액 (example: 10000)
    bankAmt: number;
    // 입금일시 (example: YYYY-MM-DD hh:mm:ss)
    depositYmdt: string;
    // 은행명 (example: 산업은행)
    bankName: string;
    // 입금자명 (example: 홍길동)
    remitterName: string;
    // 실제 입금금액 (example: 10000)
    depositAmt: number;
    // 입금 마감일 (example: YYYY-MM-DD hh:mm:ss)
    paymentExpirationYmdt: string;
    // 계좌번호 (example: 1104568886666)
    account: string;
}

// 신용카드 정보
export interface CardInfo {
    // 결제승인번호 (example: 1234)
    cardApprovalNumber: string;
    // 카드사명 (example: 현대카드)
    cardName: string;
    // 할부기간 (example: 0)
    installmentPeriod: number;
    // PG 카드사 코드(PG별로 다름) (example: CCDI)
    cardCode: string;
    // 결제승인시간 (example: YYYY-MM-DD hh:mm:ss)
    approveYmdt: string;
    // 신용카드 결제금액 (example: 10000)
    cardAmt: number;
    // 카드번호 (example: 451842******9654)
    cardNo: string;
    // TODO: enum 작성
    // 카드사(발급사) (example: BC)
    cardCompany: CARD_COMPANY;
    // 무이자여부(true: 무이자, false: 이자) (example: false)
    noInterest: boolean;
}

// 네이버페이결제정보
export interface NaverPayInfo {
    // 네이버페이 포인트 최종 결제 금액 (example: 0)
    naverMileagePaymentAmount: number;
    // 주문 유형 구분(네이버페이/통합장바구니) (example: 일반)
    orderType: string;
    // 입금 기한 (nullable) (example: YYYY-MM-DD hh:mm:ss)
    paymentDueDate: Nullable<string>;
    // 일반결제수단최종결제금액 (example: 10000)
    generalPaymentAmount: number;
    // 네이버 페이 결제 수단 (example: 신용카드)
    paymentMeans: string;
    // 충전금최종결제금액 (example: 0)
    chargeAmountPaymentAmount: number;
    // 결제 구분(네이버결제/PG 결제) (example: 네이버결제)
    paymentCoreType: string;
    // 네이버페이 적립금 최종 결제 금액 (example: 0)
    checkoutAccumulationPaymentAmount: number;
    // 주문 할인액 (example: 0)
    orderDiscountAmount: number;
    // PG승인번호 (nullable) (example: 1001305630)
    paymentNumber: Nullable<string>;
    // 결제 위치 구분(PC/MOBILE) (example: PC)
    payLocationType: string;
}

// 파트너별주문리스트
export interface OrderOptionsGroupByPartner {
    // 파트너번호 (example: 123)
    partnerNo: number;
    // 배송그룹별 옵션
    orderOptionsGroupByDelivery: OrderOptionsGroupByDelivery[];
    // 파트너명 (example: 파트너이름)
    partnerName: string;
}

// 배송그룹별 옵션
export interface OrderOptionsGroupByDelivery {
    // 선/착불타입 (example: PREPAID_DELIVERY)
    deliveryPayType: DELIVERY_PAY_TYPE;
    // 배송지정일 (nullable) (example: YYYY-MM-DD)
    requestShippingDate: any;
    // 배송조건노출문구(for US) (nullable) (example: US)
    frontDisplayText: Nullable<string>;
    // 배송지 나중입력 여부 (true: 나중입력, false: 바로입력) (nullable) (example: false)
    usesShippingInfoLaterInput: Nullable<boolean>;
    // 배송지 우편 번호 (example: 13487)
    receiverZipCd: string;
    // 송장추적 URL (nullable) (example: www.cj.com/121211)
    retrieveInvoiceUrl: Nullable<string>;
    // 파트너번호 - 쇼핑몰 배송일 경우 0 (example: 121212)
    partnerNo: number;
    // 배송서비스타입라벨(for US) (nullable) (example: UPS Ground)
    shippingMethodLabel: Nullable<string>;
    // 송장번호 (example: 12121212)
    invoiceNo: string;
    // 연락처1 (example: 010-1111-1111)
    receiverContact1: string;
    // 연락처2 (example: 010-1111-1111)
    receiverContact2: string;
    // 배송지 지번 (nullable) (example: 경기도 성남시 분당구 삼평동 629번지 NHN 플레이뮤지엄)
    receiverJibunAddress: Nullable<string>;
    // 주문상품옵션
    orderOptions: OrderOption[];
    // 파트너명 - 쇼핑몰 배송일 경우 '쇼핑몰 배송' (example: 파트너명)
    partnerName: string;
    // 수령자 명 (example: 홍길동)
    receiverName: string;
    // 택배사명 (nullable) (example: CJ대한통운)
    deliveryCompanyTypeLabel: Nullable<string>;
    // 배송구분 (nullable) (example: PARCEL_DELIVERY)
    deliveryType: Nullable<DELIVERY_TYPE>;
    // 배송번호 (example: 12121212)
    deliveryNo: number;
    // 배송구분 (example: PARTNER_SHIPPING_AREA)
    shippingAreaType: SHIPPING_AREA_TYPE;
    // 택배사타입 (nullable) (example: CJ)
    deliveryCompanyType: Nullable<DELIVERY_COMPANY_TYPE>;
    // 지역별 추가 배송비 (example: 0)
    remoteDeliveryAmt: number;
    // 배송지 상세 주소 (example: 529 NHN 플레이 뮤지엄)
    receiverDetailAddress: string;
    // 배송지 메모 (nullable) (example: 빠른 배송 부탁합니다.)
    deliveryMemo: Nullable<string>;
    // 배송지 주소 (example: 경기도 성남시 분당구 대왕판교로645번길 12)
    receiverAddress: string;
    // 배송비 example: 0
    deliveryAmt: number;
    // 반품 배송비 (example: 2000)
    returnDeliveryAmt: number;
    // 배송서비스타입(for US) (nullable) (example: SUREPOST)
    shippingMethodType: Nullable<string>;
}

//주문 상품 옵션
export interface OrderOption {
    // 예약배송시작일 (nullable) (example: YYYY-MM-DD hh:mm:ss)
    reservationDeliveryYmdt: Nullable<string>;
    // 클레임 번호 (nullable) (example: 1)
    claimNo: Nullable<number>;
    // 주문상태 (nullable) (example: 결제완료)
    orderStatusTypeLabel: Nullable<string>;
    // 사은품 여부 (example: true)
    isFreeGift: boolean;
    // 구매자 작성형 옵션
    inputs: {
        // 구매자 작성형 입력 값 (nullable) (example: 14호)
        inputValue: Nullable<string>;
        // 구매자 작성형 입력 이름 (nullable) (example: 사이즈)
        inputLabel: Nullable<string>;
    }[];
    // 배송여부 (example: true)
    deliverable: boolean;
    // 옵션사용여부 (example: true)
    optionUsed: boolean;
    // 정기배송 상품여부 (nullable) (example: false)
    isRecurringPayment: Nullable<boolean>;
    // 클레임상태 (nullable) (example: 취소신청)
    claimStatusTypeLabel: Nullable<string>;
    // 상품명 (example: 상품1)
    productName: string;
    // 클레임상태 (nullable) (example: CANCEL_NO_REFUND)
    claimStatusType: Nullable<CLAIM_STATUS_TYPE>;
    // 추가상품번호 (example: 1234)
    additionalProductNo: number;
    // 옵션형태 (example: PRODUCT_ONLY)
    optionType: OPTION_TYPE;
    // 해외배송여부 (example: false)
    deliveryInternationalYn: boolean;
    // 가격정보
    price: Price;
    // 상품 이미지 URL (example: http://image.url)
    imageUrl: string;
    // 회원여부 (example: true)
    member: boolean;
    // 세트옵션
    setOptions: SetOption[];
    // 예약여부 (example: true)
    reservation: boolean;
    // 다음에 할 수 있는 작업
    nextActions: NextAction[];
    // 환불가능여부 (example: true)
    refundable: boolean;
    // 옵션번호 (example: 123)
    optionNo: number;
    // 브랜드 번호 (nullable) (example: 1234)
    brandNo: number;
    // 주문옵션번호 (example: 123)
    orderOptionNo: number;
    // 상품번호 (example: 123)
    productNo: number;
    // 배송정보
    delivery: Delivery;
    // 옵션권장출력값 (example: 색상/레드)
    optionTitle: string;
    // 브랜드명 (nullable) (example: 나이키)
    brandName: Nullable<string>;
    // 주문번호 (example: 20201011231211)
    orderNo: string;
    // 파트너명 (example: 파트너 이름)
    partnerName: string;
    // 주문상태 (example: DEPOSIT_WAIT)
    orderStatusType: ORDER_STATUS_TYPE;
    // 옵션값 (example: 레드)
    optionValue: string;
    // 배송보류 여부 (nullable) (example: false)
    holdDelivery: Nullable<boolean>;
    // 주문수량 (example: 1)
    orderCnt: number;
    // 교환여부 (example: N)
    exchangeYn: string;
    // 적립금 (example: 1000)
    accumulationAmt: number;
    // 주문 상태 일자
    orderStatusDate: OrderStatusDate;
    // 브랜드영문명 (nullable) (example: nike)
    brandNameEn: Nullable<string>;
    // 영어상품명 (nullable) (example: sangpum)
    productNameEn: Nullable<string>;
    // 옵션관리코드 (nullable) (example: OPTI123123)
    optionManagementCd: Nullable<string>;
    // 옵션명 (example: 색상)
    optionName: string;
}

// 주문 상태 일자
export interface OrderStatusDate {
    // 상품평작성기한 (nullable) (example: YYYY-MM-DD hh:mm:ss)
    reviewableYmdt: Nullable<string>;
    // 구매확정일자 (nullable) (example: YYYY-MM-DD hh:mm:ss)
    buyConfirmYmdt: Nullable<string>;
    // 결제일시 (nullable) (example: YYYY-MM-DD hh:mm:ss)
    payYmdt: Nullable<string>;
    // 등록일자 (example: YYYY-MM-DD hh:mm:ss)
    registerYmdt: string;
}

// 다음에 할 수 있는 작업
export interface NextAction {
    // 다음에 할 수 있는 작업 그룹 (example: NORMAL)
    actionGroupType: string;
    // 작업타입 (example: CANCEL_ALL)
    nextActionType: NEXT_ACTION_TYPE;
    // uri (example: /profile/orders/{orderNo}/claim)
    uri: string;
}

// 배송정보

export interface Delivery {
    // 배송지 나중입력 여부 (nullable) (example: false)
    usesShippingInfoLaterInput: Nullable<boolean>;
    // 택배사 (nullable) (example: CJ대한통운)
    deliveryCompanyTypeLabel: Nullable<string>;
    // 배송타입 (nullable) (example: PARCEL_DELIVERY)
    deliveryType: Nullable<DELIVERY_TYPE>;
    // 택배사타입 (nullable) (example: CJ)
    deliveryCompanyType: Nullable<string>;
    // 송장추적 URL (nullable) (example: https://www.logistics.dhl/de-en/home/tracking.html?tracking-id=12345)
    retrieveInvoiceUrl: Nullable<string>;
    // 송장번호 (nullable) (example: 123456789)
    invoiceNo: Nullable<string>;
}

// 가격정보 (/profile/orders)
export interface Price {
    // 구매가(즉시할인 + 추가할인 적용) (example: 10000)
    buyPrice: number;
    // 구매금액(구매가 * 주문수량) (example: 10000)
    buyAmt: number;
    // 즉시할인적용가 * 주문수량 (example: 10000)
    immediateDiscountedAmt: number;
    // 추가할인금액 (example: 10000)
    additionalDiscountAmt: number;
    // 즉시할인금액 (example: 10000)
    immediateDiscountAmt: number;
    // 상품판매가 (example: 10000)
    salePrice: number;
    // 정상금액(상품판매가 + 옵션추가금액) * 주문수량 (example: 10000)
    standardAmt: number;
    // 즉시할인적용가 (example: 10000)
    immediateDiscountedPrice: number;
    // 옵션추가금액 (example: 10000)
    addPrice: number;
    // 정상가(상품판매가 + 옵션추가금액) (example: 10000)
    standardPrice: number;
    // 적립율 (example: 10)
    accumulationRate: number;
}

// 환불정보
export interface RefundInfo {
    // 환불금액 (example: 0)
    refundMainPayAmt: number;
    // 환불방법(노출용) (example: 미입금 취소처리)
    refundTypeLabel: string;
    // 클레임번호 (example: 12121212)
    claimNo: number;
    // 배송비금액
    deliveryAmtInfo: DeliveryAmtInfo;
    // 반품수거 타입 (nullable) (example: SELLER_COLLECT)
    returnWayType: Nullable<RETURN_WAY_TYPE>;
    // 반품 이미지 리스트
    claimImageUrls: boolean | string[] | number[];
    // 환불결제방법 (example: CREDIT_CARD)
    // ! Schema에는 string이지만 PAY_TYPE과 같다고 가정
    refundPayType: PAY_TYPE;
    // 반품수거 주소지 (nullable)
    returnAddress: Nullable<ReturnAddress>;
    // 환불상품금액
    productAmtInfo: ProductAmtInfo;
    // 환불차감금액
    subtractionAmtInfo: SubtractionAmtInfo;
    // 반품 송장번호 (nullable) (example: 1234555)
    returnInvoiceNo: Nullable<string>;
    // 환불(예상)방법(PG) (example: CANCEL_DEPOSIT)
    refundType: REFUND_TYPE;
    // 교환출고 주소지 (nullable)
    exchangeAddress: Nullable<ReturnAddress>;
    // 적립금환불금액 (example: 0)
    refundSubPayAmt: number;
    // 반품 택배사명 (nullable) (example: CJ대한통운)
    returnDeliveryCompanyTypeLabel: Nullable<string>;
    // 클레임 타입 (nullable) (example: ORDER_CANCEL)
    claimClassType: Nullable<CLAIM_CLASS_TYPE>;
    // 교환상품정보 (nullable)
    exchangeOrderOption: ExchangeOrderOption;
    // 환불금액(적립금포함) (example: 0)
    refundPayAmt: number;
    // 환불계좌 정보(무통장 및 가상계좌)
    refundBankAccount: RefundBankAccount;
}

// 교환상품정보
export interface ExchangeOrderOption {
    // 텍스트옵션 (nullable) (example: http://image.url)
    userInputText: Nullable<string>;
    // 상품 이미지 (example: 105)
    imageUrl: string;
    // 옵션 값 (nullable) (example: 1)
    optionValue: string;
    // 교환 상품 수량 (nullable) (example: 사이즈)
    orderCnt: number;
    // 옵션 명 (nullable) (example: 테스트 상품)
    optionName: string;
    // 상품 명 (nullable)
    productName: Nullable<string>;
}

// 환불상품금액
export interface ProductAmtInfo {
    // 할인금액 (example: 0)
    discountAmt: number;
    // 총환불상품금액 (example: 0)
    totalAmt: number;
    // 교환상품금액 (example: 100)
    exchangeImmediateDiscountedPrice: number;
    // 추가할인가 (example: 0)
    additionalDiscountAmt: number;
    // 즉시할인가 (example: 100)
    immediateDiscountAmt: number;
    // 상품금액(즉시할인적용된) (example: 100)
    immediateDiscountedPrice: number;
    // 교환조정금액 (example: 100)
    exchangeAdjustAmt: number;
    // 상품금액(즉시할인적용 전) (example: 100)
    standardPrice: number;
    // 반품상품금액
    returnImmediateDiscountedPrice: number;
    // 상품쿠폰할인가 (example: 0)
    productCouponDiscountAmt: number;
    // 교환할인금액 (example: 0)
    exchangeDiscountAmt: number;
}

// 배송비금액
export interface DeliveryAmtInfo {
    // 변경 후 배송비(지역별배송비포함) (example: 0)
    afterDeliveryAmt: number;
    // 변경 전 배송비(지역별배송비포함) (example: 0)
    beforeDeliveryAmt: number;
    // 총배송비 (example: 0)
    totalAmt: number;
    // 교환재발송배송비(지역별배송비포함) (example: 0)
    exchangeDeliveryAmt: number;
    // 구매자직접배송여부(true: 구매자직접반품, false: 판매자수거요청) (example: true)
    buyerReturn: boolean;
    // 반품배송비(지역별배송비포함) (example: 0)
    returnDeliveryAmt: number;
    // 착불여부(true: 착불, false: 선불) * true일 경우 refundDeliveryAmt 0 (example: true)
    payOnDelivery: boolean;
    // 교환재발송배송비 조정금액 (example: 0)
    exchangeAdjustAmt: number;
    // 판매자부담여부(true: 판매자부담, false: 구매자부담) * true일 경우 refundDeliveryAmt 0 (example: true)
    sellerFault: boolean;
    // 환불배송비(마이너스 시 고객에게 배송비 부과) (example: 0)
    refundDeliveryAmt: number;
    // 반품배송비 조정금액 (example: 0)
    returnAdjustAmt: number;
}

// 환불차감금액
export interface SubtractionAmtInfo {
    // 총주문차감금액
    totalAmt: number;
    // 배송비쿠폰 변경금액 (example: 0)
    deliveryCouponAmt: number;
    // 환불금액조정사유
    refundAdjustReason: string;
    // 환불금액조정 (example: 0)
    refundAdjustAmt: number;
    // 장바구니쿠폰 변경금액 (example: 0)
    cartCouponAmt: number;
}

// 반품수거 주소지
export interface ReturnAddress {
    // 배송메모 (example: 조심해주시면 감사하겠습니다.)
    note: string;
    // 주소 요약^|(46769) 경기도 성남시 분당구 삼평동 629번지 NHN 플레이뮤지엄...
    addressStr: string;
    // 주소 (example: 경기도 성남시 분당구 대왕판교로645번길 12)
    address: string;
    // 개인고유통관부호 (nullable) (example: P12341234)
    customsIdNumber: Nullable<string>;
    // 이름 (example: 홍길동)
    name: string;
    // 상세주소 (nullable) (example: 16 NHN 플레이뮤지엄)
    detailAddress: Nullable<string>;
    // 지번주소 (nullable) (example: 경기도 성남시 분당구 삼평동 629번지 NHN 플레이뮤지엄)
    jibunAddress: Nullable<string>;
    // 우편번호 (example: 46769)
    zipCd: string;
    // 연락처1 (example: 010-1111-1111)
    contact1: string;
    // 연락처2 (nullable) (example: 010-1111-1111)
    contact2: Nullable<string>;
}

// 환불계좌 정보(무통장 및 가상계좌)
export interface RefundBankAccount {
    // 계좌번호 (nullable) (example: 1234123)
    bankAccount: Nullable<string>;
    // 예금주명 (nullable) (example: 홍길동)
    bankDepositorName: Nullable<string>;
    // 은행 (example: KDB)
    bank: BANK;
    // 은행명 (example: 산업은행)
    bankName: string;
}

// 추가결제정보
export interface AdditionalPayInfo {
    // 입금계좌정보
    bankAccount: BankAccount;
    // 교환처리금액 (example: 0)
    exchangePayAmt: number;
    // 클레임번호 (example: 12121212)
    claimNo: number;
    // 배송비금액
    deliveryAmtInfo: DeliveryAmtInfo;
    // 송금인 (example: 홍길동)
    remitter: string;
    // 반품수거 타입 (nullable) (example: SELLER_COLLECT)
    returnWayType: Nullable<RETURN_WAY_TYPE>;
    // 반품 이미지 리스트
    claimImageUrls: boolean | string[] | number[];
    // 반품수거 주소지 (nullable)
    returnAddress: Nullable<ReturnAddress>;
    // 환불상품금액
    productAmtInfo: ProductAmtInfo;
    // 환불차감금액
    subtractionAmtInfo: SubtractionAmtInfo;
    // 반품 송장번호 (nullable) (example: 1234555)
    returnInvoiceNo: Nullable<string>;
    // 교환처리금 결제방법 (example: CREDIT_CARD)
    payType: PAY_TYPE;
    // 교환출고 주소지 (nullable)
    exchangeAddress: Nullable<ReturnAddress>;
    // 반품 택배사명 (nullable) (example: CJ대한통운)
    returnDeliveryCompanyTypeLabel: Nullable<string>;
    // 클레임 타입 (nullable) (example: ORDER_CANCEL)
    claimClassType: Nullable<CLAIM_CLASS_TYPE>;
    // 교환상품정보 (nullable)
    exchangeOrderOption: Nullable<ExchangeOrderOption>;
}

// 입금계좌정보
export interface BankAccount {
    // 계좌번호 (nullable) (example: 1234123)
    bankAccount: Nullable<string>;
    // 예금주명 (nullable) (example: 홍길동)
    bankDepositorName: string;
    // 은행 (example: KDB)
    bank: BANK;
    // 은행명 (example: 산업은행)
    bankName: string;
}

// 교환추가결제 정보
export interface ExchangePayInfo {
    bankAccount: BankAccount[];
    // 교환처리금액 (example: 0)
    exchangePayAmt: number;
    // 교환처리금 결제방법 (example: CREDIT_CARD)
    payType: PAY_TYPE;
    // 송금인 (example: 홍길동)
    remitter: string;
}

// 최초주문금액정보
export interface FirstOrderAmount {
    // 총 상품금액 (example: 10000)
    totalProductAmt: number;
    // 총 추가할인 금액 (example: 0)
    additionalDiscountAmt: number;
    // 총 즉시할인 금액 (example: 0)
    immediateDiscountAmt: number;
    // 사용자 결제 금액 (example: 10000)
    chargeAmt: number;
    // 총 배송비 (example: 2500)
    deliveryAmt: number;
    // 배송비쿠폰 할인 금액 (example: 0)
    deliveryCouponDiscountAmt: number;
    // 총 상품정상금액(즉시할인, 추가할인 제외) (example: 7500)
    standardAmt: number;
    // 총 지역추가배송비 (example: 0)
    remoteDeliveryAmt: number;
    // 주문쿠폰할인 금액 (example: 0)
    cartCouponDiscountAmt: number;
    // 총 상품쿠폰할인 금액 (example: 0)
    productCouponDiscountAmt: number;
    // 보조결제금액(적립금) (example: 2000)
    subPayAmt: number;
    // 결제금액 (example: 10000)
    payAmt: number;
}

// 최종 주문 금액 정보
export interface LastOrderAmount {
    // 총 상품금액 (example: 10000)
    totalProductAmt: number;
    // 총 추가할인 금액 (example: 0)
    additionalDiscountAmt: number;
    // 총 즉시할인 금액 (example: 0)
    immediateDiscountAmt: number;
    // 사용자 결제 금액 (example: 10000)
    chargeAmt: number;
    // 총 배송비 (example: 2500)
    deliveryAmt: number;
    // 배송비쿠폰 할인 금액 (example: 0)
    deliveryCouponDiscountAmt: number;
    // 총 상품정상금액(즉시할인, 추가할인 제외) (example: 7500)
    standardAmt: number;
    // 총 지역추가배송비 (example: 0)
    remoteDeliveryAmt: number;
    // 주문쿠폰할인 금액 (example: 0)
    cartCouponDiscountAmt: number;
    // 총 상품쿠폰할인 금액 (example: 0)
    productCouponDiscountAmt: number;
    // 보조결제금액(적립금) (example: 2000)
    subPayAmt: number;
    // 결제금액 (example: 10000)
    payAmt: number;
}

// 배송지정보
export interface ShippingAddress {
    // 배송지 주소
    receiverAddress: string;
    // 배송지 지번(지역추가배송비계산 시 사용)
    receiverJibunAddress: string;
    // 배송지 번호(0:신규, 0이상:이전배송지)
    addressNo: number;
    // 수령자 명 (nullable) (example: 홍길동)
    receiverName: Nullable<string>;
    // 개인고유통관부호 (nullable) (example: P12341234)
    customsIdNumber: Nullable<string>;
    // 국가코드 (nullable) (example: KR)
    countryCd: Nullable<COUNTRY_CD>;
    // 배송지 우편 번호
    receiverZipCd: string;
    // 배송지 상세 주소 (nullable) (example: 16 NHN 플레이뮤지엄)
    receiverDetailAddress: string;
    // 연락처1 (nullable) (example: 010-1111-1111)
    receiverContact1: Nullable<string>;
    // 연락처2 (nullable) (example: 010-1111-1111)
    receiverContact2: Nullable<string>;
}

export interface NextAction2 {
    nextActionType: string;
    uri: string;
    actionGroupType: string;
}

// 결제 영수증 정보
export interface ReceiptInfo {
    // 영수증 타입 (example: SALE_STATEMENT)
    receiptType: string;
    // 영수증 url (example: http://receipt.info.url)
    url: string;
}

// 선택가능한 사유 목록
export interface ClaimReasonType {
    // 귀책타입 (example: SELLER)
    responsibleObjectType: RESPONSIBLE_OBJECT_TYPE;
    // 클레임 사유타입 (example: CHANGE_MIND)
    claimReasonType: CLAIM_REASON_TYPE;
    // 클레임 사유 라벨^|단순변심(색상,사이즈 등)
    label: string;
}

// deprecated(더 이상 제공하지 않는 개체항목입니다)
export interface Insurance {
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    no: string;
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    type: string;
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    url: string;
}

// 선택가능한 은행
export interface AvailableBank {
    // 은행코드 (example: KDB)
    bank: string;
    // 은행명 (example: 산업은행)
    label: string;
}

export interface OrderSummary {
    depositWaitCnt: number; // 입금대기
    payDoneCnt: number; // 결제완료
    productPrepareCnt: number; // 상품준비중
    deliveryPrepareCnt: number; // 배송준비중
    deliveryIngCnt: number; // 배송중
    deliveryDoneCnt: number; // 배송완료
    buyConfirmCnt: number; // 구매확정
    cancelProcessingCnt: number; // 취소진행중
    cancelDoneCnt: number; // 취소완료
    exchangeProcessingCnt: number; // 교환진행중
    exchangeDoneCnt: number; // 교환완료
    returnProcessingCnt: number; // 반품진행중
    returnDoneCnt: number; // 반품완료
}

export interface OrderItems {
    // 주문 상품 옵션
    orderOptions: OrderOption[];
    // 외부 PG사 (example: PAYCO)
    pgType: PG_TYPE;
    // 주문번호 (example: 201912312312121234)
    orderNo: string;
    // PG사 결제키 (nullable) (example: 12)
    pgMallKey: Nullable<string>;
    // 결제수단 (example: CREDIT_CARD)
    payType: PAY_TYPE;
    // 최종주문금액정보
    lastOrderAmt: LastOrderAmount;
    // PG사 주문번호 - 매출전표등 확인용 (nullable) (example: 12)
    pgOrderNo: Nullable<string>;
    // 회원여부 (example: true)
    member: boolean;
    // 다음에 할 수 있는 작업
    nextActions: NextAction[];
    // 에스크로 여부 (example: false)
    escrow: boolean;
    // 주문일자 (example: YYYY-MM-DD hh:mm:ss)
    orderYmdt: string;
    // 결제수단라벨 (example: 신용카드)
    payTypeLabel: string;
    // 최초주문금액정보
    firstOrderAmt: FirstOrderAmount;
}

export interface getMaximumCouponCartPriceResponse {
    // 최적 상품쿠폰 정보
    productCoupons: {
        // 상품쿠폰 할인금액
        discountAmt: number;
        // 상품쿠폰 발급번호
        productCouponIssueNo: number;
        // 상품쿠폰번호
        productCouponNo: number;
        // 상품번호
        mallProductNo: number;
    }[];
    // 전체 할인 금액
    totalDiscountAmt: number;
    // 최적 장바구니쿠폰 정보
    cartCoupons: {
        // 장바구니쿠폰 할인금액
        discountAmt: number;
        // 장바구니쿠폰 발급번호
        cartCouponIssueNo: number;
        // 장바구니쿠폰 번호
        cartCouponNo: number;
    }[];
}
