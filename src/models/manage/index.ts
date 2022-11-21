import {
    ACCUMULATION_RESERVE_REASON,
    ACCUMULATION_STATUS,
    ACCUMULATION_STATUS_GROUP_TYPE,
    ORDER_DIRECTION,
    SEARCH_TYPE,
} from 'models';
import { INQUIRY_SEARCH_TYPE } from 'models/index';

type INQUIRY_STATUS = 'ISSUED' | 'ASKED' | 'IN_PROGRESS' | 'ANSWERED';

type INQUIRY_STATUSES =
    | `${INQUIRY_STATUS}`
    | `${INQUIRY_STATUS},${INQUIRY_STATUS}`
    | `${INQUIRY_STATUS},${INQUIRY_STATUS},${INQUIRY_STATUS}`
    | `${INQUIRY_STATUS},${INQUIRY_STATUS},${INQUIRY_STATUS},${INQUIRY_STATUS}`;

type PAGE_TYPE = 'CART';

export type PAGE_TYPES =
    | `${PAGE_TYPE}`
    | `${PAGE_TYPE},${PAGE_TYPE}`
    | `${PAGE_TYPE},${PAGE_TYPE},${PAGE_TYPE}`;

export interface AddressParams {
    pageNumber?: number;
    pageSize?: number;
    keyword: string;
}

export interface GroupByState {
    state: string;
    count: number;
}

export interface Item {
    address: string;
    detailAddress: string;
    roadAddress: string;
    roadAddressExtra: string;
    jibunAddress: string;
    relatedJibun: string;
    zipCode: string;
    oldZipCode: string;
}

export interface AddressResponse extends ItemList<Item> {
    groupByStates: GroupByState[];
}

export interface ArticleParams extends Paging {
    // 검색어 (Example : keyword)
    keyword?: string;
    // 검색 유형 (Example : ALL)
    searchType?: SEARCH_TYPE;
    // 게시판 카테고리 (Example: 1)
    categoryNo?: number;
    // 조회일 시작일(yyyy-MM-dd, default: 3개월) (Example : YYYY-MM-DD)
    startYmd?: string;
    // 조회일 종료일(yyyy-MM-dd, default: 오늘) (Example : YYYY-MM-DD)
    endYmd?: string;
    // 답글도 리스트에 같이 조회할지 여부 (false: 답글 미포함(default), true: 답글 포함) (Example : false)
    withReplied?: boolean;
    // 최신 순 정렬 여부 (Example : DESC)
    direction?: ORDER_DIRECTION;
    // 본인이 작성한 글만 조회 여부(false: 전체 조회(default), true: 본인 글만 조회) (Example : true)
    isMine?: boolean;
}

export interface ImagesType {
    originalFileName: string;
    uploadedFileName: string;
}

export interface PostArticleParams {
    images: ImagesType[];
    password: string;
    articleTitle: string;
    imageUrls: string[];
    parentBoardArticleNo: number;
    articleContent: string;
    boardCategoryNo: number;
    secreted: boolean;
    tags?: string[];
    guestName: string;
}

export interface InquiryTypes {
    inquiryTypeNo?: number;
    inquiryStatus?: INQUIRY_STATUS;
    inquiryStatuses?: INQUIRY_STATUSES;
    keyword?: string;
    searchType?: INQUIRY_SEARCH_TYPE;
}

export interface WriteInquiry {
    originalFileName?: string[];
    inquiryTitle?: string;
    answerEmailSendYn?: boolean;
    uploadedFileName?: string[];
    orderNo?: string;
    captcha?: string;
    inquiryTypeNo?: number;
    answerSmsSendYn?: boolean;
    inquiryContent?: string;
    email?: string;
    productNo?: number;
}

export interface BoardCategory {
    categoryNo: number;
    label: string;
}

export interface BoardList {
    totalCount: number;
    items: BoardListItem[];
}

export interface BoardListItem {
    articleNo: number;
    attached: Attachment[];
    categoryLabel: string;
    categoryNo: number;
    imageUrl: string;
    modifierName: string;
    modifierNo: null;
    modifierType: null;
    modifyYmdt: null;
    notice: boolean;
    recommendCount: number;
    registerName: string;
    registerNo: number;
    registerType: string;
    registerYmdt: Date;
    replied: boolean;
    repliedCnt: number;
    secreted: boolean;
    tags: string[];
    title: string;
    viewCnt: number;
}

export interface BoardDetailState {
    boardNo: string;
    articleNo: string;
}

export interface BoardDetail extends Omit<BoardListItem, 'attached'> {
    attachments: Attachment[]; //new
    childArticles: number[]; //new
    content: string; //new
    memberId: string; //new
    modifiable: boolean; //new
    parentArticle: number; //new
    registerGroupNames: null; //new
}

export interface Attachment {
    fileName: string;
    uploadedFileName: string;
    downloadFileUrl: string;
}

export interface InquiriesResponse {
    totalCount: number;
    items: InquiryItem[];
}

export interface InquiryItem {
    inquiryNo: number;
    orderNo: string;
    productNo: number;
    productName: string;
    inquiryTitle: string;
    inquiryContent: string;
    answerSmsSend: boolean;
    answerEmailSend: boolean;
    registerNo: number;
    registerYmdt: string;
    inquiryStatus: INQUIRY_STATUS;
    inquiryType: InquiryType;
    answer: Answer;
    imageUrls: any[];
    originalImageUrls: any[];
    issuerName: string;
}

// 1:1 문의 유형 목록
export interface InquiryType {
    // 1:1문의 유형 번호 (example: 6276)
    inquiryTypeNo: number;
    // 1:1문의 유형 이름 (example: 네이버페이문의)
    inquiryTypeName: string;
    // 1:1문의 유형 설명 (example: 네이버페이 사용 시 네이버페이를 통해서 접수되는 문의가 연동되는 유형입니다.)
    inquiryTypeDescription: string;
}

export interface Answer {
    answerNo: number;
    answerContent: string;
    answerRegisterYmdt: string;
}

export interface GetAccumulationHistoriesResponse {
    // 회원 번호 (example: 0)
    memberNo: number;
    // 적립 총액 (example: 0)
    totalAmt: number;
    // 전체 카운트 (example: 0)
    totalCount: number;
    itmes: AccumulationHistory[];
}

export interface AccumulationHistory {
    // 만료일 (example: YYYY-MM-DD HH:mm:ss)
    expireYmdt: string;
    // 주문번호 (example: string)
    orderNo: string;
    // 적립금 번호(example: 0)
    accumulationNo: number;
    // 잔여 적립금 (example: 0)
    accumulationRestAmt: number;
    // 적립사유 코드 (example: ADD_AFTER_PAYMENT)
    accumulationReserveReason: ACCUMULATION_RESERVE_REASON;
    // 적립사유 코드 표시명 (example: string)
    accumulationReserveReasonDisplay: string;
    // 시작일 (example: YYYY-MM-DD HH:mm:ss)
    startYmdt: string;
    // 적립사유 상세 (example: string);
    reasonDetail: string;
    // 적립금 총액 (example: 0)
    totalAvailableAmt: number;
    // 적립 지급/차감 구분 코드 (example: PAYMENT)
    accumulationStatusGroupType: ACCUMULATION_STATUS_GROUP_TYPE;
    // 적립금액 (example: 0)
    accumulationAmt: number;
    // 적립상태 코드 (example: GIVE_AVAILABLE)
    accumulationStatus: ACCUMULATION_STATUS;
    // 등록일 (example: YYYY-MM-DD HH:mm:ss)
    registerYmdt: string;
}

export interface GetAccumulationSummaryResponse {
    // 사용가능한 총 적립금액 (example: 0)
    totalAvailableAmt: number;
    // 만료조회 총 적립금액 (example: 0)
    totalExpireAmt: number;
}
