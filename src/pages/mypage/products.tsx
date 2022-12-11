import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';

import GenuineProductCard from 'components/Card/GenuineProductCard';
import OriginalRegisterButton from 'components/Button/OriginalRegisterButton';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';

const Container = styled.main`
    width: 840px;
    margin: 118px auto 155px;
    color: ${(props) => props.theme.text1};
    ${media.custom(888)} {
        width: 100%;
        margin: 49px 0 88px;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 36px;
    ${media.xlarge} {
        letter-spacing: -0.9px;
        margin-bottom: 60px;
    }
`;

const MyProductListContainer = styled.section`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
        width: 32%;
        margin-right: 2%;
        margin-bottom: 16px;
    }
    > div:nth-child(3n) {
        margin-right: 0;
    }
    ${media.medium} {
        > div {
            width: 48%;
            max-width: unset;
            margin-right: 4%;
            margin-bottom: 15px;
        }
        > div:nth-child(3n) {
            margin-right: 4%;
        }
        > div:nth-child(2n) {
            margin-right: 0;
        }
    }
`;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.medium} {
        flex-direction: column;
        width: 100%;
        margin-bottom: 14px;
        > p {
            width: 100%;
            font-size: 1.333rem;
            line-height: 24px;
            color: ${(props) => props.theme.text3};
            margin-bottom: 10px;
        }
        > button {
            width: 100%;
            height: 120px;
            span {
                font-size: 1.333rem;
            }
        }
    }
`;

const Products = () => {
    const { width } = useWindowSize();

    return (
        <Container>
            <Title>보유중인 제품</Title>
            {isMobile(width) && (
                <RegisterContainer>
                    <p>정품을 등록하고 다양한 혜택을 확인해보세요!</p>
                    <OriginalRegisterButton
                        title={'정품 등록하기'}
                        onClick={() => {}}
                    />
                </RegisterContainer>
            )}
            <MyProductListContainer>
                {!isMobile(width) && (
                    <RegisterContainer>
                        <OriginalRegisterButton
                            title={
                                [
                                    '정품을 등록하고',
                                    <br key={1} />,
                                    '다양한 혜택을 확인해보세요!',
                                ] as unknown as string
                            }
                            onClick={() => {}}
                        />
                    </RegisterContainer>
                )}
                <GenuineProductCard />
                <GenuineProductCard />
                <GenuineProductCard />
                <GenuineProductCard />
                <GenuineProductCard />
            </MyProductListContainer>
        </Container>
    );
};

export default Products;
