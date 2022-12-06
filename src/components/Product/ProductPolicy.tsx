import { FC } from 'react';
import styled from 'styled-components';

import media from 'utils/styles/media';
import { flex } from 'utils/styles/mixin';

interface ProductPolicyProps {
    productName?: string;
}

const StyledContainer = styled.div`
    margin-bottom: 40px;
`;

const ProductName = styled.p`
    font-weight: bold;
    font-size: 36px;
    line-height: 54px;
    letter-spacing: 0;
    margin-bottom: 154px;
    text-align: center;
    color: #191919;

    ${media.medium} {
        margin-bottom: 58px;
        font-size: 16px;
        line-height: 24px;
    }
`;

const PolicyList = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
`;

const PolicyListItem = styled.li`
    ${flex}
    background-color: #F8F8FA;

    &:not(:last-of-type) {
        border-bottom: 1px solid #dbdbdb;
    }
`;

const PolicyListTitle = styled.p`
    flex: 1;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0;
    color: #191919;
    text-align: center;

    ${media.medium} {
        font-size: 14px;
        line-height: 20px;
    }
`;

const DescriptionList = styled.ul`
    flex: 3;
    text-align: left;
    padding: 50px;
    background-color: #fff;

    ${media.medium} {
        padding: 20px;
    }
`;

const DescriptionListItem = styled.li`
    font-size: 16px;
    line-height: 36px;
    letter-spacing: -0.64px;
    color: #858585;
    list-style-position: inside;
    list-style-type: disc;
    text-indent: -16px;
    padding-left: 16px;
    word-break: keep-all;

    ${media.medium} {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.56px;
        text-indent: -14px;
        padding-left: 14px;
    }
`;

const ProductPolicy: FC<ProductPolicyProps> = ({ productName }) => {
    return (
        <StyledContainer>
            {productName && <ProductName>{productName}</ProductName>}

            <PolicyList>
                <PolicyListItem>
                    <PolicyListTitle>배송정보안내</PolicyListTitle>
                    <DescriptionList>
                        <DescriptionListItem>
                            액세서리 구매시 로젠택배/제품 구매시 CJ 대한통운을
                            이용해 배송합니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            오후 3시 이전에 결제완료된 상품은 당일 출고를
                            원칙으로 합니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            7만원 이상 구매 시 무료배송 됩니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            7만원 이하 구매 시 배송비는 편도 3,000원이
                            부과됩니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            재고 및 물류 사정에 따라 배송이 지연되거나, 취소될
                            수 있는 점 양해 부탁드립니다.
                        </DescriptionListItem>
                    </DescriptionList>
                </PolicyListItem>
                <PolicyListItem>
                    <PolicyListTitle>교환 / 반품 안내</PolicyListTitle>
                    <DescriptionList>
                        <DescriptionListItem>
                            상품 등이 공급되 날로부터 7일 이내에 교환/반품을
                            신청하실 수 있습니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            동일상품에 대해서만 교환 가능하며, 타 상품과는
                            교환이 되지 않습니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            전자상거래 등에서의 소비자 보호에 관한 법률규에
                            규정되어 있는 소비자의 청약철회 가능 범위에 해당하는
                            경우 교환/반품을 신청하실 수 있습니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            단순 변심 및 고객의 사정으로 인한 교환/반품시 왕복
                            배송비 6,000원 고객 부담입니다.
                        </DescriptionListItem>
                        <DescriptionListItem>
                            무통장 입금시 환불은 해당 월의 중순과 말일에 일괄
                            처리됩니다.
                        </DescriptionListItem>
                    </DescriptionList>
                </PolicyListItem>
                <PolicyListItem>
                    <PolicyListTitle>교환 / 반품 불가능</PolicyListTitle>
                    <DescriptionList>
                        <DescriptionListItem>
                            소비자의 책임 있는 사유로 상품 등이 손실 / 훼손된
                            경우 ( 제품 확인 차 포장 훼손 제외 )
                        </DescriptionListItem>
                        <DescriptionListItem>
                            소비자의 사용 / 소비에 의해 상품 등의 가치가 현저히
                            감소한 경우
                        </DescriptionListItem>
                        <DescriptionListItem>
                            시간의 경과에 의해 재판매가 곤란할 정도로 상품등의
                            가치가 현저히 감소한 경우
                        </DescriptionListItem>
                        <DescriptionListItem>
                            복제가 가능한 상품 등의 포장을 훼손한 경우
                        </DescriptionListItem>
                    </DescriptionList>
                </PolicyListItem>
            </PolicyList>
        </StyledContainer>
    );
};
export default ProductPolicy;
