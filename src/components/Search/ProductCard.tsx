import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

import ProductSticker from 'components/Product/ProductSticker';
import { StickerInfo } from 'models/display';
import { KRW } from 'utils/currency';
import media from 'utils/styles/media';
import { ellipsis } from 'utils/styles/mixin';

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    imgUrl: string;
    productName: string;
    promotionText: string;
    salePrice: number;
    immediateDiscountAmt?: number;
    stickerInfos?: StickerInfo[];
}

const ProductCardContainer = styled.div`
    width: 31%;
    margin-bottom: 72px;
    position: relative;

    ${media.medium} {
        width: 47%;
        margin-bottom: 20px;
    }
    ${media.small} {
        width: 85%;
        margin-bottom: 20px;
    }
`;

const ProductCardImageContainer = styled.div`
    background-color: #f8f8fa;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductCardImage = styled.div`
    position: relative;
    padding: 40px;
    & > img {
        display: block;
        margin: 0 auto;
        width: 85%;
        ${media.medium} {
            width: 80%;
        }
    }
`;

const ProductCardTagContainer = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;

    ${media.medium} {
        top: 14px;
        left: 14px;
    }
`;

const ProductCardContentsContainer = styled.div`
    padding: 20px 10px;

    display: flex;
    justify-content: space-between;
    flex-direction: row;

    ${media.medium} {
        flex-direction: column;
    }
`;

const ProductInfoContainer = styled.div`
    width: 60%;
    ${media.medium} {
        width: 100%;
        margin-bottom: 10px;
    }
`;

const ProductName = styled.p`
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: #191919;
    margin-bottom: 4px;
`;

const ProductDescription = styled.p`
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    color: #858585;
    letter-spacing: -0.6px;
    line-height: 22px;

    ${ellipsis(1)}

    ${media.medium} {
        font-size: 12px;
        letter-spacing: -0.48px;
    }
`;

const ProductPriceContainer = styled.div`
    display: flex;
    flex-direction: column;

    ${media.medium} {
        flex-direction: row;
    }
`;

const SalePrice = styled.p`
    letter-spacing: 0px;
    color: #191919;
    text-align: right;
    font-size: 16px;
    line-height: 22px;

    ${media.medium} {
        font-size: 14px;
        margin-right: 10px;
    }
`;

const ProductPrice = styled.p`
    color: #a8a8a8;
    text-align: right;
    text-decoration: line-through;
    font-size: 16px;
    line-height: 22px;

    ${media.medium} {
        font-size: 12px;
    }
`;

const ProductCard: FC<ProductCardProps> = ({
    imgUrl,
    productName,
    promotionText,
    salePrice,
    immediateDiscountAmt = 0,
    stickerInfos,
    ...props
}) => {
    return (
        <ProductCardContainer {...props}>
            <ProductCardImageContainer>
                <ProductCardTagContainer>
                    <ProductSticker stickerInfos={stickerInfos} />
                </ProductCardTagContainer>
                <ProductCardImage>
                    <img src={imgUrl} alt={productName} />
                </ProductCardImage>
            </ProductCardImageContainer>

            <ProductCardContentsContainer>
                <ProductInfoContainer>
                    <ProductName>{productName}</ProductName>
                    <ProductDescription>{promotionText}</ProductDescription>
                </ProductInfoContainer>

                <ProductPriceContainer>
                    <SalePrice>
                        {KRW(salePrice - immediateDiscountAmt).format()}
                    </SalePrice>

                    <ProductPrice>{KRW(salePrice).format()}</ProductPrice>
                </ProductPriceContainer>
            </ProductCardContentsContainer>
        </ProductCardContainer>
    );
};

export default ProductCard;
