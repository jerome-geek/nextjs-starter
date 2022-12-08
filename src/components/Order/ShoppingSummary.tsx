import { FC } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface ShoppingSummaryProps {
    myGoodsCount: number;
    totalAvailableAmt: number;
    couponCount: number;
}

const ShoppingSummaryContainer = styled.div`
    background: #f8f8fa 0% 0% no-repeat padding-box;
    border: 4px solid #f8f8fa;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    & > div {
        flex: 1;

        &:not(:first-child, :last-child) {
            border-right: 1px dashed #dbdbdb;
        }
    }
`;

const ShoppingSummaryTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    color: #191919;
`;

const ShoppingSummaryBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    padding: 22px 0;

    & > span {
        text-align: center;
        color: #999999;
        font-size: 12px;
        &:last-child {
            padding: 4px 0;
        }

        & > strong {
            font-size: 24px;
            color: #191919;
            padding: 0 8px;
        }
    }
`;

const ShoppingSummary: FC<ShoppingSummaryProps> = ({
    myGoodsCount = 0,
    totalAvailableAmt = 0,
    couponCount = 0,
}) => {
    const router = useRouter();

    return (
        <ShoppingSummaryContainer>
            <div style={{ padding: '8px 0 8px 11px' }}>
                <ShoppingSummaryTitle>
                    나의
                    <br />
                    쇼핑정보
                </ShoppingSummaryTitle>
            </div>
            <ShoppingSummaryBox onClick={() => router.push('/mypage/products')}>
                <span>보유제품</span>
                <span>
                    <strong>{myGoodsCount}</strong>개
                </span>
            </ShoppingSummaryBox>
            <ShoppingSummaryBox onClick={() => router.push('/mypage/products')}>
                <span>적립금</span>
                <span>
                    <strong>{totalAvailableAmt}</strong>원
                </span>
            </ShoppingSummaryBox>
            <ShoppingSummaryBox onClick={() => router.push('/mypage/products')}>
                <span>쿠폰</span>
                <span>
                    <strong>{couponCount}</strong>개
                </span>
            </ShoppingSummaryBox>
        </ShoppingSummaryContainer>
    );
};

export default ShoppingSummary;
