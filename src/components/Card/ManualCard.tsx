import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ManualCardProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    imgUrl?: string;
}

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 30%;
    margin: 1rem;
    background-color: ${(props) => props.theme.bg2};

    &:hover {
        cursor: pointer;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;

    & > img {
        width: 284px;
        height: 284px;
    }
`;

const TitleContainer = styled.div`
    background-color: ${(props) => props.theme.bg3};
    padding: 20px;
`;

const Title = styled.p`
    color: ${(props) => props.theme.text1};
    font-size: 16px;
`;

const ManualCard: FC<ManualCardProps> = ({
    children,
    title,
    imgUrl,
    ...props
}: ManualCardProps) => (
    <CardContainer {...props}>
        <ImageContainer>
            <img src={imgUrl} alt={title} />
        </ImageContainer>
        <TitleContainer>
            <Title>{title}</Title>
        </TitleContainer>
        {children}
    </CardContainer>
);

export default ManualCard;
