import { useState, useMemo, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { filter, head, pipe, toArray } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';

import Button from 'components/Button/Button';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { ORDER_DIRECTION, PRODUCT_BY } from 'models';

interface ProductSortProps {
    productSort: {
        id: string;
        title: string;
        by: PRODUCT_BY;
        direction: ORDER_DIRECTION;
        isActive: boolean;
    }[];
    onProductSortClick: (id: string) => void;
}

const ProductSortListContainer = styled.div<{ isOpen?: boolean }>`
    /* ${(props) =>
        props.isOpen
            ? css`
                  opacity: 1;
                  top: 30px;
                  transform: translateZ(0);
                  transition: opacity 0.6s, top 0s, transform 0.6s;
              `
            : css`
                  position: absolute;
                  top: -10000px;
                  right: 0;
                  opacity: 0;
                  width: 100%;
                  transform: translate3d(0, 5px, 0);
                  transition: opacity 0.6s, top 0s 0.6s, transform 0.6s;
                  border: 1px solid #ccc;
                  background: #fff;
              `} */
`;

const ProductSortListButton = styled(Button)`
    border: 1px solid #ededed;
    font-size: 12px;
    letter-spacing: -0.48px;
    color: #858585;
    padding: 6px 10px;
    position: relative;
    width: 120px;
`;

const ProductSortList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.medium} {
        display: block;
        padding: 3px 7px;
        position: absolute;
        width: 120px;
        border: 1px solid #ededed;
        background-color: #fff;
    }
`;

const ProductSortListItem = styled.li<{ isActive?: boolean }>`
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
    text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
    color: ${(props) => (props.isActive ? '#191919' : '#767676')};

    &:not(:last-child) {
        margin-right: 20px;
    }

    ${media.medium} {
        font-weight: normal;
        text-decoration: none;
        font-size: 12px;
        letter-spacing: -0.48px;
        color: #858585;
        padding: 6px 10px;
        margin-right: 0;
    }
`;

const ProductSort = ({ productSort, onProductSortClick }: ProductSortProps) => {
    const { width } = useWindowSize();

    const [isOpen, setIsOpen] = useState(true);

    const activeProductSort = useMemo(
        () =>
            pipe(
                productSort,
                filter((a) => a.isActive),
                toArray,
                head,
            ),
        [productSort],
    );

    useLayoutEffect(() => {
        setIsOpen(!isMobile(width));
    }, [width]);

    const onSortClick = (id: string) => {
        onProductSortClick(id);
        if (isMobile(width)) {
            setIsOpen(false);
        }
    };

    return (
        <ProductSortListContainer>
            {isMobile(width) && (
                <ProductSortListButton
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {activeProductSort?.title}
                </ProductSortListButton>
            )}

            {isOpen && (
                <ProductSortList>
                    {productSort.map(({ id, isActive, title }) => (
                        <ProductSortListItem
                            isActive={isActive}
                            key={id}
                            onClick={() => onSortClick(id)}
                        >
                            {title}
                        </ProductSortListItem>
                    ))}
                </ProductSortList>
            )}
        </ProductSortListContainer>
    );
};

export default ProductSort;
