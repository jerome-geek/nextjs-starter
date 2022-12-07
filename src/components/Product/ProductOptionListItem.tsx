import { FC } from 'react';
import styled from 'styled-components';

interface ProductOptionListItemProps {
    imgUrl?: string;
    label?: string;
}

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const StyledImage = styled.img.attrs(({ src }) => {
    return {
        src,
        width: 30,
        height: 30,
    };
})`
    margin-right: 8px;
`;

const ProductOptionListItem: FC<ProductOptionListItemProps> = ({
    imgUrl,
    label,
}) => {
    return (
        <Container>
            {imgUrl && <StyledImage src={imgUrl} alt={label} />}

            {label && <p>{label}</p>}
        </Container>
    );
};

export default ProductOptionListItem;
