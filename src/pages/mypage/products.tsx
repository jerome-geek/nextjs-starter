import React, { useState } from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';

import ActivativeProductCard from 'components/Card/ActivativeProductCard';
import OriginalRegisterButton from 'components/Button/OriginalRegisterButton';
import GenuineRegisterModal from 'components/Modal/GenuineRegisterModal';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { activationProducts } from 'mock/activationProducts';
import { flex } from 'utils/styles/mixin';

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
    ${flex}

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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { width } = useWindowSize();

    return (
        <>
            <Container>
                <Title>???????????? ??????</Title>

                {isMobile(width) && (
                    <RegisterContainer>
                        <p>????????? ???????????? ????????? ????????? ??????????????????!</p>
                        <OriginalRegisterButton
                            title={'?????? ????????????'}
                            onClick={() => setIsModalVisible(true)}
                        />
                    </RegisterContainer>
                )}

                <MyProductListContainer>
                    {!isMobile(width) && (
                        <RegisterContainer>
                            <OriginalRegisterButton
                                title={
                                    '????????? ????????????<br/>????????? ????????? ??????????????????!'
                                }
                                onClick={() => setIsModalVisible(true)}
                            />
                        </RegisterContainer>
                    )}

                    {activationProducts.map(
                        ({ id, productName, activationCode, imgUrl }) => (
                            <ActivativeProductCard
                                key={id}
                                productName={productName}
                                activationCode={activationCode}
                                imgUrl={imgUrl}
                            />
                        ),
                    )}
                </MyProductListContainer>
            </Container>

            {isModalVisible && (
                <GenuineRegisterModal
                    onClickToggleModal={() => setIsModalVisible(false)}
                    width={'752px'}
                />
            )}
        </>
    );
};

export default Products;
