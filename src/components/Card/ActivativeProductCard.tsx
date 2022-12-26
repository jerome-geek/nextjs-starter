import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';
import media from 'utils/styles/media';

interface ActivativeProductCardProps {
    productName: string;
    activationCode: string;
    imgUrl: string;
}

const ProductCardWrapper = styled.div`
    width: 250px;
    background: #f8f8fa 0% 0% no-repeat padding-box;
    box-shadow: 2px 2px 4px #0000001a;
    opacity: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const ProductCardTop = styled.div`
    flex: 1 1 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ProductCardBottom = styled.div`
    padding: 14px 16px;
    background: #f0f0f3;
    width: 100%;
    min-height: 85px;
`;

const ProductCardTitle = styled.p`
    text-align: left;
    color: #191919;
    opacity: 1;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0;
    margin-bottom: 2px;

    ${media.small} {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 8px;
    }
`;

const ProductCardDesc = styled.p`
    text-align: left;
    letter-spacing: 0;
    color: #999999;
    opacity: 1;
    font-size: 10px;
    padding-top: 2px;
`;

const ActivativeProductCard: FC<ActivativeProductCardProps> = ({
    productName,
    activationCode,
    imgUrl,
}) => {
    return (
        <ProductCardWrapper>
            <ProductCardTop>
                <Image
                    width={190}
                    height={190}
                    src={imgUrl}
                    alt={productName}
                    loader={({ src, width }) => `${src}`}
                />
            </ProductCardTop>
            <ProductCardBottom>
                <ProductCardTitle>{productName}</ProductCardTitle>
                <ProductCardDesc>
                    {`시리얼 번호 : ${activationCode}`}
                </ProductCardDesc>
            </ProductCardBottom>
        </ProductCardWrapper>
    );
};

export default ActivativeProductCard;
