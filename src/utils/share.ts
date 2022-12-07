/**
 * @param {string} title option 공유시 사용할 타이틀
 * @param {string} imageUrl option 공유시 노출 할 이미지 주소
 * @param {string} description option 공유시 설명 글
 * @param {ItemContent} itemContent option
 * @param {string} mobileWebUrl option 모바일웹에서 공유할 링크
 * @param {string} webUrl option 웹에서 공유할 링크
 */
export interface KakaoShareParams {
    title?: string;
    imageUrl?: string;
    description?: string;
    mobileWebUrl?: string;
    webUrl?: string;
    itemContent?: ItemContent;
}

/**
 * @param {string} profileText option 헤더 또는 프로필 영역에 출력될 텍스트
 * @param {string} profileImageUrl option 프로필 영역에 출력될 이미지
 * @param {string} titleImageText option 이미지 아이템의 제목
 * @param {string} titleImageUrl option 이미지 아이템의 이미지
 * @param {string} titleImageCategory option 이미지 아이템의 제목 아래에 회색 글씨로 출력되는 카테고리 정보
 * @param {Array<ItemObject>} items option 각 텍스트 아이템 정보, 최대 5개의 아이템 지원
 * @param {string} sum option 주문금액, 결제금액 등 아이템 영역의 요약 정보 제목
 * @param {string} sumOp option 아이템 영역의 가격 합산 정보
 */

export interface ItemContent {
    profileText?: string;
    profileImageUrl?: string;
    titleImageText?: string;
    titleImageUrl?: string;
    titleImageCategory?: string;
    items?: Array<ItemObject>;
    sum?: string;
    sumOp?: string;
}

/**
 * @param {string} item 아이템 이름
 * @param {string} itemOp 아이템 가격
 */

export interface ItemObject {
    item: string;
    itemOp: string;
}

/**
 * @param {string} copiedLink option 복사버튼 클릭시 공유 할 링크
 * @param {string} copySuccessMessage option 복사버튼 클릭 이후 띄울 메세지
 */
export interface CopyLinkParams {
    copiedLink?: string;
    copySuccessMessage?: string;
}

export const kakaoShare = ({
    title = document.title,
    imageUrl = '',
    description = '',
    mobileWebUrl = window.location.href,
    webUrl = window.location.href,
    itemContent = {},
}: KakaoShareParams) => {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
    kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: title ? title : document.title,
            imageUrl: imageUrl ? imageUrl : '',
            description: description ? description : '',
            link: {
                mobileWebUrl,
                webUrl,
            },
        },
        itemContent,
    });
};

export const copyLink = ({
    copiedLink = window.location.href,
    copySuccessMessage = '주소가 복사됐습니다.',
}: CopyLinkParams) =>
    navigator.clipboard
        .writeText(copiedLink)
        .then(() => alert(copySuccessMessage))
        .catch(() => alert('주소 복사에 실패했습니다.'));
