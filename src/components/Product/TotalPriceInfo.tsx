import { FC } from 'react';
import styled from 'styled-components';
import { KRW } from 'utils/currency';
import media from 'utils/styles/media';

interface TotalPriceInfoProps {
    totalAmount: number;
    totalPrice: number;
}

const TotalPriceInfoContainer = styled.div`
    margin-bottom: 26px;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0;
    color: #191919;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & span {
        font-size: 20px;
        color: #a8a8a8;
    }
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 0;
    line-height: 36px;
    color: #191919;

    span {
        font-size: 20px;
        color: #a8a8a8;
    }

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;

        span {
            font-size: 16px;
        }
    }
`;

const Price = styled.p`
    font-weight: bold;
    letter-spacing: 0;
    font-size: 24px;
    line-height: 36px;

    ${media.medium} {
        font-size: 18px;
        line-height: 24px;
    }
`;

const TotalPriceInfo: FC<TotalPriceInfoProps> = ({
    totalAmount = 0,
    totalPrice = 0,
}) => {
    return (
        <TotalPriceInfoContainer>
            <Title>
                총 상품금액&nbsp;
                <span>{`(총 ${totalAmount > 0 ? totalAmount : '-'}개)`}</span>
            </Title>
            <Price>{totalPrice > 0 ? KRW(totalPrice).format() : '- 원'}</Price>
        </TotalPriceInfoContainer>
    );
};

export default TotalPriceInfo;
