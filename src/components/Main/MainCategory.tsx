import { FC, HTMLAttributeAnchorTarget, HTMLAttributes, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

interface MainCategoryProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl: string;
    mouseOverImageUrl?: string;
    title: string;
    landingUrl: string;
    target: HTMLAttributeAnchorTarget;
}

const StyledLink = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
        margin-bottom: 5px;
    }
`;

const MainCategoryTitle = styled.span<{ isMouseOver: boolean }>`
    font-size: 12px;
    line-height: 18px;
    color: ${(props) => (props.isMouseOver ? props.theme.primary : '#191919')};
`;

const MainCategory: FC<MainCategoryProps> = ({
    imageUrl,
    mouseOverImageUrl,
    title,
    landingUrl,
    target,
}) => {
    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <StyledLink
            href={landingUrl}
            target={target}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={() => setIsMouseOver(false)}
        >
            <img
                src={
                    mouseOverImageUrl && isMouseOver
                        ? mouseOverImageUrl
                        : imageUrl
                }
                alt={title}
            />
            <MainCategoryTitle isMouseOver={!!mouseOverImageUrl && isMouseOver}>
                {title}
            </MainCategoryTitle>
        </StyledLink>
    );
};

export default MainCategory;
