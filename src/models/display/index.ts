import {
    BEST_REVIEW_YN,
    BY,
    HAS_ATTACHMENT_FILE,
    INQUIRY_TYPE,
    MY_REVIEW_YN,
    ORDER_DIRECTION,
    PAGE_TYPE,
    REPORT_REASON_CODE,
    SALE_STATUS,
    SEARCH_TYPE,
} from 'models';

export interface CategoryProductReviewsParams {
    hasAttachmentFile: boolean;
    categoryDepth: number;
    categoryNo: number;
    productName: string;
    brandName: string;
    bestReviewYn: BEST_REVIEW_YN;
    myReviewYn: MY_REVIEW_YN;
}

export interface ProductReviewsParams {
    hasAttachmentFile: HAS_ATTACHMENT_FILE;
    bestReviewYn: BEST_REVIEW_YN;
}

export interface ProductReviewBody {
    optionNo: number;
    orderOptionNo: number;
    content: string;
    rate: number;
    urls: string[];
    extraJson: string;
}

export interface ReportProductReviewBody {
    reportReasonCd: REPORT_REASON_CODE;
    content: string;
}

export interface MyProductReviewsParams {
    startYmd: string;
    endYmd: string;
    bestReviewYn: BEST_REVIEW_YN;
    searchType: SEARCH_TYPE;
    searchKeyword: string;
}

export interface MyReviewableProductsParams {
    startDate: string;
    endDate: string;
    productName: string;
    productNo: number;
    orderNo: string;
}

export interface ProductInquiry {
    parentInquiryNo: number;
    title: string;
    content: string;
    secreted: boolean;
    type: INQUIRY_TYPE;
    email: string;
}

export interface ProductInquirySearch {
    searchType: string;
    searchKeyword: string;
    answered: boolean;
    isMyInquiries: boolean;
}

export interface ProductSection {
    sectionNo: string;
    sectionId: string;
    by: BY;
    direction: ORDER_DIRECTION;
    soldout: boolean;
    saleStatus: SALE_STATUS;
    hasOptionValues: boolean;
}

export interface DesignPopup {
    displayUrl?: string;
    parameter?: string;
}

export interface Popup {
    pageType: PAGE_TYPE;
    targetNo: number;
}

export interface Event {
    order?: string;
    soldout?: boolean;
    saleStatus?: string;
}

export interface Events {
    keyword?: string;
    eventTitle: string;
    categoryNos?: number;
    productNos: number;
    onlyIngStatus: boolean;
}

export interface skinBanners {
    skinCode: string;
    bannerGroupCodes: string;
}

export interface EventDetailResponse {
    eventNo: number;
    label: string;
    urlType: string;
    url: string;
    displayPeriodType: string;
    startYmdt: string;
    endYmdt: string;
    pcImageUrl: string;
    mobileimageUrl: string;
    tag: string;
    categoryNos: number[];
    section: Section[];
    coupon: Coupon;
    top: Top;
    orders: string[];
    promotionText: string;
    eventYn: string;
}

export interface Section {
    label: string;
    imageUrl: string;
    pcPerRow: number;
    mobilePerRow: number;
    displayOrder: number;
    displayableStock: boolean;
    products: Product[];
}

export interface Product {
    productNo: number;
    productName: string;
    productNameEn: string;
    promotionText: string;
    salePrice: number;
    immediateDiscountAmt: number;
    immediateDiscountUnitType: string;
    additionDiscountAmt: number;
    additionDiscountUnitType: string;
    minSalePrice: number;
    maxSalePrice: number;
    maxDiscountAmount: number;
    liked: boolean;
    likeCount: number;
    partnerName: string;
    reviewRating: number;
    totalReviewCount: number;
    deliveryConditionType: string;
    saleCnt: number;
    stockCnt: number;
    mainStockCnt: number;
    brandNo: number;
    brandName: string;
    brandNameEn: string;
    brandNameKo: string;
    brandNameType: string;
    stickerInfos: StickerInfo[];
    stickerLabels: string[];
    adult: boolean;
    salePeriodType: string;
    saleStartYmdt: string;
    saleEndYmdt: string;
    saleStatusType: string;
    reservationData: ReservationData;
    imageUrls: string[];
    listImageUrls: string[];
    hasCoupons: HasCoupons;
    couponTag: string;
    maxCouponAmt: number;
    couponDiscountAmt: number;
    registerYmdt: string;
    contentsIfPausing: string;
    optionValues: OptionValue[];
    displayCategoryNos: string;
    searchProductId: string;
    frontDisplayYn: boolean;
    urlDirectDisplayYn: boolean;
    productManagementCd: string;
    hsCode: string;
    productSalePeriodType: any;
    sectionProductStartYmdt: any;
    sectionProductEndYmdt: any;
    enableCoupons: boolean;
}

export interface StickerInfo {
    type: string;
    label: string;
    name: string;
}

export interface ReservationData {
    reservationStartYmdt: string;
    reservationEndYmdt: string;
    reservationDeliveryYmdt: string;
    reservationStockCnt: number;
}

export interface HasCoupons {
    product: boolean;
    brand: boolean;
    category: boolean;
    partner: boolean;
    event: boolean;
}

export interface OptionValue {
    mallProductNo: number;
    stockCnt: number;
    optionValue: string;
}

export interface Coupon {
    coupons: DownloadableCoupon[];
    guideImageUrl: string;
    issuedImageUrl: string;
    alreadyIssuedImageUrl: string;
    beforeIssueImageUrl: string;
    soldOutImageUrl: string;
    dateExpiredImageUrl: string;
}

export interface DownloadableCoupon {
    couponNo: number;
    couponName: string;
    couponType: string;
    couponTargetType: string;
    allianceRefererType: string;
    downloadable: boolean;
    imageUrl: string;
    discountInfo: DiscountInfo;
    dateInfo: DateInfo;
    useConstraint: UseConstraint;
    issueConstraint: IssueConstraint;
    couponStatus: CouponStatus;
}

export interface DiscountInfo {
    fixedAmt: boolean;
    discountAmt: number;
    discountRate: number;
    maxDiscountAmt: number;
    freeDelivery: boolean;
    useOtherCoupon: boolean;
    skippedAccumulationAmt: boolean;
}

export interface DateInfo {
    issueStartYmdt: string;
    issueEndYmdt: string;
    issueStartHour: number;
    issueEndHour: number;
    issueDaysOfWeek: string;
}

export interface UseConstraint {
    useEndYmdt: string;
    minSalePrice: number;
    maxSalePrice: number;
    minDeliveryAmt: number;
    limitPayType: string;
    usablePlatformTypes: string[];
}

export interface IssueConstraint {
    memberGradeName: string;
    issuablePlatformTypes: string[];
    dailyIssueLimit: boolean;
    dailyIssueLimitCnt: number;
    issuePerPersonLimit: boolean;
    issuePerPersonLimitCnt: number;
    dailyIssuePerPersonLimitCnt: number;
}

export interface CouponStatus {
    totalIssuableCnt: number;
    totalIssuedCnt: number;
    totalIssuedCntToday: number;
    issuableCnt: number;
    myIssuedCnt: number;
    myIssuedCntToday: number;
}

export interface Top {
    pc: Pc;
    mobile: Mobile;
}

export interface Pc {
    url: string;
    type: string;
}

export interface Mobile {
    url: string;
    type: string;
}

export interface EventListResponse {
    eventNo: number;
    label: string;
    url: string;
    urlType: string;
    displayPeriodType: string;
    startYmdt: string;
    endYmdt: string;
    pcImageUrl: string;
    mobileimageUrl: string;
    promotionText: string;
    tag: string;
    eventYn: string;
}

// 카테고리
export interface Category {
    // 카테고리 목록(계층)
    multiLevelCategories: MultiLevelCategory[];
    // 카테고리 목록
    flatCategories: FlatCategory[];
}

// 카테고리 목록
export interface FlatCategory {
    // 1~5차 카테고리 명 (example: 카테고리)
    fullCategoryName: string;
    depth1CategoryNo: number;
    depth1Label: string;
    depth1DisplayOrder: number;
    depth1Icon: string;
    depth1Content: string;
    depth2CategoryNo: number;
    depth2Label: string;
    depth2DisplayOrder: number;
    depth2Icon: string;
    depth2Content: string;
    depth3CategoryNo: number;
    depth3Label: string;
    depth3DisplayOrder: number;
    depth3Icon: string;
    depth3Content: string;
    depth4CategoryNo: number;
    depth4Label: string;
    depth4DisplayOrder: number;
    depth4Icon: string;
    depth4Content: string;
    depth5CategoryNo: number;
    depth5Label: string;
    depth5DisplayOrder: number;
    depth5Icon: string;
    depth5Content: string;
}

// 카테고리 목록(계층)
export interface MultiLevelCategory {
    // 뎁스 (example: 1)
    depth: number;
    // 2차 카테고리
    children: MultiLevelCategory[];
    // 아이콘 (example: //image.nhn-commerce.com/icon.png)
    icon: string;
    // 카테고리 번호 (example: 1)
    categoryNo: number;
    // 카테고리 이름 (example: 게임)
    label: string;
    // 카테고리 상세(HTML) (example: <div>아이콘</div>)
    content: string;
}

export interface Brand {
    brandNo: number;
    name: string;
    productCnt: number;
}

export interface GetBannersResponse {
    bannerSectionNo: number;
    label: string;
    code: string;
    platformDisplayPcYn: string;
    platformDisplayMobileYn: string;
    platformDisplayMobileWebYn: string;
    memberGradeDisplayInfo: null;
    memberGroupDisplayInfo: null;
    accounts: BannerAccount[];
}

export interface BannerAccount {
    accountNo: number;
    accountName: string;
    displayType: string;
    height: number;
    width: number;
    platformDisplayPcYn: string;
    platformDisplayMobileYn: string;
    platformDisplayMobileWebYn: string;
    memberGradeDisplayInfo: null;
    memberGroupDisplayInfo: null;
    banners: BannerInfo[];
}

export interface BannerInfo {
    bannerNo: number;
    name: string;
    nameColor: string;
    description: string;
    descriptionColor: string;
    imageUrl: string;
    landingUrlType: string;
    landingUrl: string;
    leftSpaceColor: string;
    rightSpaceColor: string;
    browerTargetType: 'CURRENT' | 'NEW';
    mouseOverImageUrl: string;
    displayPeriodType: string;
    displayStartYmdt: Date;
    displayEndYmdt: Date;
    displayOrder: number;
    videoUrl: string;
}

export interface getProductSectionResponse {
    sectionNo: number;
    label: string;
    promotionText: string;
    sectionExplain: string;
    products: Product[];
    productTotalCount: number;
    imageUrl: string;
    leftSpaceColor: string;
    rightSpaceColor: string;
    displayableStock: boolean;
}
