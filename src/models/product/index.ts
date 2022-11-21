import {
    CRITERION,
    DELIVERY_CONDITION_TYPE,
    DISCOUNTED_COMPARISON,
    DISCOUNT_UNIT_TYPE,
    INPUT_MATCHING_TYPE,
    ORDER_DIRECTION,
    PRODUCT_BY,
    PRODUCT_DIRECTION,
    PRODUCT_OPTION_TYPE,
    PRODUCT_SALE_STATUS,
    SALE_TYPE,
    SELECT_TYPE,
    SHIPPING_AREA_TYPE_PARAMS,
} from 'models';
import { StickerInfo } from 'models/display';

export interface BrandsParams {
    filter?: { name?: string; categoryNo?: number };
    pageNumber?: number;
    pageSize?: number;
    hasTotalCount?: boolean;
    fromDB?: boolean;
    sort?: { criterion?: CRITERION; direction?: PRODUCT_DIRECTION };
}

export interface ProductsParams {
    deliveryTemplateNo: number;
    hasOptionValues?: boolean;
    pageSize?: number;
    pageNumber?: number;
    productSort?: {
        criterion?: CRITERION;
        direction?: PRODUCT_DIRECTION;
    };
}

export interface RestockParams {
    optionNos: number[];
    privacyInfoAgreement: boolean;
    name: string;
    phone: string;
}

export interface GroupCodeParams {
    groupManagementCodes: string[];
    saleStatus?: PRODUCT_SALE_STATUS;
    isSoldOut?: boolean;
}

export interface ProductSearchParams {
    filter?: {
        // 판매가 - 즉시할인 - 추가상품할인이 적용된 "최종 할인가격", between검색일 경우 입력값 2개 필요(다수 정보는 항목 추가 필요) (Example : "1000")
        discountedPrices?: number;
        // 검색어(여러 검색어일 경우 space 로 구분 OR 연산) (Example : "검색어1 검색어2")
        keywords?: string;
        // 결과내 검색(결과 내 검색의 검색어 space 구분 AND 연산) (Example : "검색어1 검색어2")
        keywordInResult?: string;
        // 최종 할인가격 검색 조건 (Example : "GT")
        discountedComparison?: DISCOUNTED_COMPARISON;
        // 배송비 타입 (Example : "free")
        // deliveryConditionType?: DELIVERY_CONDITION_TYPE;
        deliveryConditionType?: Omit<
            DELIVERY_CONDITION_TYPE,
            'QUANTITY_PROPOSITIONAL_FEE' | 'PRICE_FEE' | 'QUANTITY_FEE'
        >;
        // 판매 상태 (default: ONSALE) (Example : "ALL_CONDITIONS")
        saleStatus?: PRODUCT_SALE_STATUS;
        // 품절 상품 포함 여부(default: false) (Example : "false")
        soldout?: boolean;
        // 총 상품평 수 포함 여부(default: false, false 설정 시 무조건 0) (Example : "false")
        totalReviewCount?: boolean;
        // 서비스에 계약된 모든 쇼핑몰 조회 여부 (default: false) (Example : "false")
        familyMalls?: boolean;
        // 판매자관리코드 같은 상품 검색 (Example : "managementcode")
        productManagementCd?: string;
        //  조회시 제외할 상품번호 (Example : "10001")
        excludeMallProductNo?: number;
        // 조회할 상품번호 (Example : "10000")
        includeMallProductNo?: number;
    };
    order?: {
        by?: PRODUCT_BY;
        // 정렬기준(default : DESC) (Example : "DESC")
        direction?: ORDER_DIRECTION;
        // 품절상품 뒤로 배치 여부(default = false) (Example : "false")
        soldoutPlaceEnd?: boolean;
    };
    // 전시 카테고리 번호(여러개 일 경우 항목 추가) (Example : "1,2,3,4")
    categoryNos?: string;
    // 브랜드 번호(여러개 일 경우 항목 추가) (Example : "1,2,3,4")
    brandNos?: number;
    // 파트너 번호(상품 공급업체 번호) (Example : "1")
    partnerNo?: number;
    // 클라이언트 키 (Example : "test-client-key")
    clientKey?: string;
    // 페이지 번호 (Example : "1")
    pageNumber?: number;
    // 한 페이지당 노출 수 (Example : "10")
    pageSize?: number;
    // 세일 상품만 조회 여부(default: false) (Example : "false")
    onlySaleProduct?: boolean;
    // 목록에 최대 할인 쿠폰 가격 포함 여부(default: false) (Example : "false")
    hasMaxCouponAmt?: boolean;
    //  목록 카운트 포함 여부(default: false) (Example : "false")
    hasTotalCount?: boolean;
    // 목록에 옵션 value 포함 여부(default: false) (Example : "false")
    hasOptionValues?: boolean;
    // summary 정보 포함 여부(default: true) (Example : "true")
    includeSummaryInfo?: boolean;
    // 배송 구분 (Example : "MALL")
    shippingAreaType?: SHIPPING_AREA_TYPE_PARAMS;
}

export interface ProductsSearchResponse {
    totalCount: number;
    pageCount: number;
    minPrice: number;
    maxPrice: number;
    items: ProductItem[];
    brands: Brand[];
    depth1Categories: Category[];
    depth2Categories: Category[];
    depth3Categories: any[];
    depth4Categories: any[];
    depth5Categories: any[];
    multiLevelCategories: Category[];
    clickUrlPrefix: null;
    displayableStock: boolean;
}

export interface Brand {
    brandNo: number;
    brandName: string;
    brandNameKo: string;
    brandNameEn: string;
    brandNameType: string;
    count: number;
}

export interface Category {
    categoryNo: number;
    count: number;
    displayOrder: number;
    label: string;
    parentCategoryNo: number;
    childCategories?: Category[];
}

export interface ProductItem {
    optionValues: OptionValue[];
    shippingArea: string;
    frontDisplayYn: boolean;
    urlDirectDisplayYn: boolean;
    salePeriodType: string;
    saleStartYmdt: Date;
    saleEndYmdt: Date;
    totalReviewCount: number;
    stockCnt: number;
    salePrice: number;
    immediateDiscountUnitType: string;
    immediateDiscountAmt: number;
    displayCategoryNos: string;
    productNo: number;
    productName: string;
    searchProductId: string;
    brandName: string;
    reviewRating: number;
    groupManagementCode: null;
    groupManagementCodeName: null;
    minSalePrice: number;
    maxSalePrice: number;
    maxDiscountAmount: number;
    brandNameKo: string;
    brandNameEn: string;
    brandNameType: string;
    couponTag: string;
    partnerName: string;
    saleCnt: number;
    deliveryConditionType: string;
    brandNo: number;
    registerYmdt: Date;
    additionDiscountAmt: number;
    additionDiscountUnitType: string;
    adult: boolean;
    couponDiscountAmt: number;
    enableCoupons: boolean;
    hasCoupons: HasCoupons;
    imageUrls: string[];
    listImageUrls: string[];
    mainBestProductYn: boolean;
    mainStockCnt: number;
    maxCouponAmt: number;
    productSalePeriodType: null;
    reservationData: null;
    sectionProductEndYmdt: null;
    sectionProductStartYmdt: null;
    stickerLabels: null;
    liked: boolean;
    contentsIfPausing: string;
    productType: string;
    productNameEn: string;
    promotionText: Nullable<string>;
    saleStatusType: string;
    hsCode: string;
    stickerInfos: StickerInfo[];
    likeCount: number;
    productManagementCd: string;
    isSoldOut: boolean;
}

export interface HasCoupons {
    product: boolean;
    brand: boolean;
    category: boolean;
    partner: boolean;
    event: boolean;
}

export interface OptionValue {
    /** @type {number} 1 (example: 1000) */
    mallProductNo: number;
    /** @type {string} 1 (example: 1000) */
    optionValue: string;
    stockCnt: number;
}

export interface ProductDetailResponse {
    baseInfo: BaseInfo;
    deliveryDate: DeliveryDate;
    stock: Stock;
    // 가격정보
    price: Price;
    deliveryFee: DeliveryFee;
    limitations: Limitations;
    counter: Counter;
    categories: Category[];
    brand: any;
    liked: boolean;
    partner: Partner;
    status: Status;
    partnerNotice: PartnerNotice;
    reservationData: ReservationData;
    deliveryGuide: string;
    afterServiceGuide: string;
    refundGuide: string;
    exchangeGuide: string;
    liquorDelegationGuide: string;
    relatedProductNos: number[];
    shippingInfo: ShippingInfo;
    groupManagementCode: string;
    groupManagementCodeName: string;
    regularDelivery: any;
    rentalInfos: RentalInfo[];
    displayableStock: boolean;
    saleMethodType: string;
    reviewAvailable: boolean;
    mainBestProductYn: boolean;
}

export interface BaseInfo {
    productNo: number;
    saleStartYmdt: string;
    saleEndYmdt: string;
    salePeriodType: string;
    registerYmdt: string;
    promotionText: string;
    productName: string;
    productNameEn: string;
    imageUrls: string[];
    placeOriginLabel: string;
    placeOriginEtcLabel: string;
    manufactureYmdt: string;
    expirationYmdt: string;
    contentHeader: string;
    content: string;
    contentFooter: string;
    dutyInfo: string;
    stickerLabels: string[];
    stickerInfos: StickerInfo[];
    optionImageViewable: boolean;
    productManagementCd: string;
    purchaseGuide: string;
    accumulationUseYn: string;
    deliveryCustomerInfo: string;
    certificationType: string;
    certifications: Certification[];
    productGroup: string;
    hsCode: string;
    usableRestockNoti: boolean;
    productType: string;
    customPropertise: CustomPropertise[];
    couponUseYn: string;
    minorPurchaseYn: string;
}

export interface Certification {
    no: number;
    type: string;
    organization: string;
    code: string;
    target: string;
    date: string;
}

export interface CustomPropertise {
    propNo: number;
    propValueNo: number;
    propName: string;
    propValue: string;
    multipleSelectionYn: string;
}

export interface DeliveryDate {
    daysAfterPurchase: any;
    daysOfWeek: any;
    period: any;
}

export interface Stock {
    saleCnt: number;
    stockCnt: number;
    mainStockCnt: number;
}

// 가격 정보
export interface Price {
    /** @type {number} 단위가격 (example: 1000) */
    unitPrice: number;
    // 즉시할인가 (example: 1000)
    immediateDiscountAmt: number;
    // 단위명 (example: "단위명")
    unitName: string;
    // 구매 확정시 예상 적립금 (example: 0)
    accumulationAmtWhenBuyConfirm: number;
    // 상품판매가 (example: 10000)
    salePrice: number;
    // 추가할인 최소 기준금액 (example: 1000)
    minSalePrice: number;
    // 즉시할인 타입 (example: "WON")
    immediateDiscountUnitType: DISCOUNT_UNIT_TYPE;
    // 판매중지 시 가격대체문구 (example: "잠시 판매중지 중입니다.")
    contentsIfPausing: string;
    // 적립률(%) (example: 0)
    accumulationRate: number;
    // 추가상품할인 타입 (example: "WON")
    additionDiscountUnitType: DISCOUNT_UNIT_TYPE;
    // 추가상품 할인( 원 / % ) additionDiscountUnitType 에따라 달라진다. (example: 1000)
    additionDiscountValue: number;
    // 회원등급에 따른 적립률(%) (example: 0)
    accumulationRateOfMember: number;
    // 단위유형 (example: "개")
    unitNameType: string;
    // 최대 추가할인 금액 (example: 0)
    maxAdditionDiscountAmt: number;
    // 추가할인 최대 기준금액 (example: 100000)
    maxSalePrice: number;
    // 해당 상품의 옵션을 여러개 구매할 경우 받을 수 있는 최대한의 쿠폰할인 금액 (example: 5000)
    maxCouponAmt: number;
    // 상품 기본옵션 가격기준으로 적용 가능한 최대 쿠폰 할인가 (example: 1000)
    couponDiscountAmt: number;
    // 추가할인 정률 최대 할인 금액 (example: 0)
    maxDiscountAmount: number;
    // 추가상품할인가 (example: 1000)
    additionDiscountAmt: number;
    // 포토리뷰적립금 (example: 0)
    photoReviewAccumulationAmt: number;
}

export interface DeliveryFee {
    deliveryConditionType: string;
    deliveryAmt: number;
    aboveDeliveryAmt: any;
    returnDeliveryAmt: number;
    deliveryType: string;
    deliveryCompanyType: string;
    perOrderCnt: any;
    defaultDeliveryConditionLabel: string;
    deliveryAmtLabels: any[];
    deliveryCompanyTypeLabel: string;
    deliveryConditionDetails: any[];
    remoteDeliveryAreaFees: any[];
    deliveryPrePayment: boolean;
    returnWarehouse: ReturnWarehouse;
    deliveryCustomerInfo: string;
}

export interface ReturnWarehouse {
    warehouseNo: number;
    warehouseName: string;
    defaultReleaseWarehouseYn: string;
    defaultReturnWarehouseYn: string;
    partnerNo: number;
    address: string;
    detailAddress: string;
    zipCd: string;
    overseaAddress1: string;
    overseaAddress2: string;
    overseaCity: string;
    overseaRegion: string;
    countryCd: string;
    warehouseAddressType: string;
    deleteYn: string;
    registerAdminNo: number;
    updateYmdt: string;
    updateAdminNo: number;
    addressStr: string;
}

export interface Limitations {
    minBuyCnt: number;
    maxBuyPersonCnt: number;
    maxBuyTimeCnt: number;
    maxBuyDays: number;
    maxBuyPeriodCnt: number;
    memberOnly: boolean;
    canAddToCart: boolean;
    refundable: boolean;
    naverPayHandling: boolean;
}

export interface Counter {
    likeCnt: number;
    reviewCnt: number;
    inquiryCnt: number;
    myInquiryCnt: number;
}

export interface Category {
    fullCategoryLabel: string;
    categories: Category2[];
}

export interface Category2 {
    label: string;
    depth: number;
    categoryNo: number;
}

export interface Partner {
    partnerName: string;
    businessRegistrationNo: string;
    companyName: string;
    onlineMarketingBusinessDeclarationNo: string;
    ownerName: string;
    officeAddressLabel: string;
    phoneNo: string;
    faxNo: string;
    email: string;
}

export interface Status {
    saleStatusType: string;
    soldout: boolean;
    display: boolean;
    productClassType: string;
}

export interface PartnerNotice {
    title: string;
    content: string;
}

export interface ReservationData {
    reservationStartYmdt: string;
    reservationEndYmdt: string;
    reservationDeliveryYmdt: string;
    reservationStockCnt: number;
}

export interface ShippingInfo {
    shippingAvailable: boolean;
    shippingConfig: ShippingConfig;
}

export interface ShippingConfig {
    shippingAreaType: string;
    shippingAreaPartnerNo: number;
    combinable: boolean;
    internationalShippingAvailable: boolean;
    templateNo: number;
}

export interface RentalInfo {
    rentalPeriod: number;
    monthlyRentalAmount: number;
    creditRating: number;
}

export interface ProductOptionResponse {
    // 일체형 옵션
    flatOptions: FlatOption[];
    // 구매자 작성형 정보(텍스트 옵션 내 기입문장)
    inputs: Input[];
    // 분리형 옵션
    multiLevelOptions: MultiLevelOption[];
    // 옵션 선택 타입 (example: "MULTI")
    selectType: SELECT_TYPE;
    /**
     * 재고 노출 여부 (false:재고 미노출 / true:재고 노출)
     *  - false로 재고를 숨김처리 한 경우,
     *      - 1. 재고 관련 필드는(실제 재고가 있더라도) -999로 고정으로 리턴하며 실재고 값은 따로 내려주지 않아 조회 불가합니다.
     *      - 2. 실재고가 0인 경우에만 0으로 응답합니다.
     *          - 만약 재고 숨김처리 시, front에서 [-999]로 표시되도록 처리되고 있는게 있다면 재고노출여부(displayableStock)를 기준으로 수정 작업이 필요합니다.
     *          - 만약 재고 숨김처리 시, front에서 [품절]로 표시되도록 처리되고 있는게 있다면 재고/예약재고값을 기준이 아닌, 품절상태(saleType>SOLD_OUT)값을 기준으로 처리되도록 수정 작업이 필요합니다.
     */
    displayableStock: boolean;
    // 옵션 타입 (example: "COMBINATION")
    type: PRODUCT_OPTION_TYPE;
    // 옵션명 목록 (example: ["색상","사이즈"])
    labels: string[];
}

// 분리형 옵션
export interface MultiLevelOption {
    // 자식 옵션 목록
    children: Children[];
    // 옵션명 (example: "색상")
    label: string;
    // 옵션값 (example: "민트")
    value: string;
}

// 이미지 정보
export interface Image {
    // 메인이미지 여부 (true: 메인이미지, false: 메인이미지 아님) (example: true)
    main: boolean;
    // 이미지 URL (example: "www.image.com/image.jpg")
    url: string;
}

// 렌탈료 정보
export interface RentalInfo {
    // 월 렌탈 금액 (example: 473000)
    monthlyRentalAmount: number;
    // 렌탈 기간 (example: 12)
    rentalPeriod: number;
    // 서비스 가능 최저 신용 등급 (example: 600)
    creditRating: number;
}

// 일체형 옵션
export interface FlatOption {
    // 할인적용가 example: 15000
    buyPrice: number;
    // (옵션) 이미지 정보
    images: Image[];
    // 판매타입 (example: "AVAILABLE")
    saleType: SALE_TYPE;
    // 대표 옵션 여부 (true: 대표 옵션, false:대표 옵션 아님) (example: true)
    main: boolean;
    // 추가금액 (example: 10000)
    addPrice: number;
    // 옵션명 (example: "색상")
    label: string;
    // 렌탈료 정보
    rentalInfo: RentalInfo[];
    // 판매수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) (example: 100)
    saleCnt: number;
    // 예약재고수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) (example: 10)
    reservationStockCnt: number;
    // 재고수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) (example: 20)
    stockCnt: number;
    // 옵션 판매자 관리 코드 (example: "managementCode")
    optionManagementCd: string;
    // 옵션번호 (example: 1)
    optionNo: number;
    // 옵션값 (example: "민트")
    value: string;
    // 임시 품절 여부 (true: 임시품절, false:임시품절 아님) (example: false)
    forcedSoldOut: boolean;
}

// 자식 옵션 목록
export interface Children extends FlatOption {
    // 자식 옵션 목록 (example: "[]")
    children: Children[];
}

// 구매자 작성형 정보(텍스트 옵션 내 기입문장)
export interface Input {
    // 매칭타입 (example: "PRODUCT")
    inputMatchingType: INPUT_MATCHING_TYPE;
    // 텍스트 옵션 입력 문구 (example: "최대한 늦게 생산된걸로 보내주세요")
    inputLabel: string;
    // 필수 여부 (true: 필수, false: 필수 아님) (example: true)
    required: boolean;
    // 텍스트 옵션 번호 (example: 1)
    inputNo: number;
}

export interface ProductOption {
    label: string;
    price: number;
    count: number;
    optionNo: number;
    productNo: string;
    amountPrice: number;
}
