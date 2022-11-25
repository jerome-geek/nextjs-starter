import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { StickerInfo } from 'models/display';

interface ProductStickerProps extends HTMLAttributes<HTMLDivElement> {
    stickerInfos?: StickerInfo[];
}

const ProductCardTag = styled.span`
    display: block;
    margin-left: 10px;
    > img {
        width: 20px;
    }
`;

const ProductSticker: FC<ProductStickerProps> = ({
    stickerInfos,
    ...props
}) => {
    return (
        <>
            {stickerInfos?.map((stickerInfo, index) => {
                return (
                    <ProductCardTag
                        key={`${stickerInfo.label}${index}`}
                        {...props}
                    >
                        {stickerInfo.type === 'TEXT' ? (
                            stickerInfo.label
                        ) : (
                            <img src={stickerInfo.label} alt='스티커 아이콘' />
                        )}
                    </ProductCardTag>
                );
            })}
        </>
    );
};

export default ProductSticker;
