import { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useWindowSize } from 'usehooks-ts';
import currency from 'currency.js';

import CloseButtonIcon from 'assets/icons/gray_close_icon.svg';
import Checked from 'assets/icons/checkbox_square_checked.svg';
import UnChecked from 'assets/icons/checkbox_square_unchecked.svg';
import Plus from 'assets/icons/plus_button.svg';
import Minus from 'assets/icons/minus_button.svg';
import { OrderProductOption } from 'models/order';
import { isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import PATHS from 'const/paths';

interface CartListProps {
    cartData: OrderProductOption & {
        deliveryAmt: number;
        productName: string;
        isChecked?: boolean;
    };
    agreeButton?: (optionNo: number) => void;
    productCountHandler?: (number: number, cartNo: number) => () => void;
    deleteCartList?: (cartNo: number) => () => void;
    isModifiable?: boolean;
    isLogin?: boolean;
}

const CartListBox = styled.div`
    display: flex;
    justify-content: space-between;
    height: 164px;
    border-bottom: 1px solid #dbdbdb;
    padding: 12px 0;
    &:last-child {
        border-bottom: none;
    }
    ${media.medium} {
        flex-wrap: wrap;
        height: auto;
        min-height: 229px;
        padding: 24px 0;
    }
`;

const CartInformation = styled.div`
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    ${media.medium} {
        width: 33.7%;
        min-width: 123px;
        padding-left: 11px;
    }
`;

const CartImage = styled.div`
    background: #f8f8fa;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 142px;
    > img {
        width: 63%;
    }
    ${media.medium} {
        width: 100%;
    }
`;

const CartSelect = styled.div`
    > input {
        display: none;
    }
    > label {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const CartName = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > p {
        font-size: 1rem;
        color: ${(props) => props.theme.text1};
    }
    > p:last-child {
        font-size: 0.75rem;
        color: #999;
        margin-top: 3px;
    }
    ${media.medium} {
        width: 100%;
        > p {
            font-size: 1rem;
            font-weight: bold;
            margin-top: 10px;
        }
        > p:last-child {
            color: ${(props) => props.theme.text3};
            font-size: 1rem;
            margin-top: 10px;
            font-weight: 400;
        }
    }
    ${media.medium} {
        > p {
            font-size: 1.2rem;
        }
        > p:last-child {
            font-size: 1.2rem;
        }
    }
`;

const CartCountBox = styled.div<{ isModifiable: boolean }>`
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: ${(props) => (props.isModifiable ? '1px solid #dbdbdb' : '')};
        width: 52%;
        min-width: 52px;
        height: 30px;
        > div {
            width: 33.33%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    ${media.medium} {
        justify-content: flex-start;
        margin-bottom: 8px;
        > div {
            height: 20px;
        }
    }
`;

const CartCountMinus = styled.div`
    cursor: pointer;
    height: 100%;
`;

const CartCount = styled.div`
    color: ${(props) => props.theme.text1};
    font-weight: bold;
    font: 16px;
`;

const CartCountPlus = styled.div`
    cursor: pointer;
    height: 100%;
`;

const CartPrice = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
        font-size: 16px;
        color: ${(props) => props.theme.text1};
        position: relative;
        > span.standard_amount {
            display: block;
            position: absolute;
            bottom: 100%;
            text-decoration: line-through;
            font-size: 12px;
            color: #ababab;
        }
    }
    ${media.medium} {
        width: fit-content;
        font-size: 14px;
        > p {
            font-weight: bold;
            > span.unit {
                font-weight: 400;
            }
        }
    }
`;

const CartDelivery = styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #191919;
    font: 16px;
`;

const CartAmount = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    > span {
        font-weight: 400;
    }
`;

const CartCloseButton = styled.div`
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.medium} {
        align-items: flex-start;
        justify-content: end;
        position: absolute;
        top: -4px;
        right: -8px;
    }
`;

const MobileCartInformationBox = styled.div`
    width: 61.5%;
    padding-right: 8px;
    ${media.small} {
        width: 59%;
    }
`;

const MobileCartPriceBox = styled.div`
    ${media.medium} {
        width: 100%;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        text-align: center;
        padding: 10px 0;
        color: ${(props) => props.theme.text3};
        margin-top: 24px;
        letter-spacing: 0;
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const MobileCartBoxTop = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #dbdbdb;
    ${media.medium} {
        position: relative;
    }
`;

const MobileCartBoxBottom = styled.div``;

const CartList: FC<CartListProps> = ({
    cartData,
    agreeButton,
    productCountHandler,
    deleteCartList,
    isModifiable = true,
    isLogin,
}) => {
    const { width } = useWindowSize();
    const router = useRouter();

    return (
        <CartListBox>
            {!isMobile(width) ? (
                <CartInformation>
                    <CartImage>
                        {isModifiable && (
                            <CartSelect>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        agreeButton &&
                                        agreeButton(cartData.optionNo)
                                    }
                                    checked={cartData.isChecked}
                                    id={cartData.cartNo.toString()}
                                />
                                <label htmlFor={cartData.cartNo.toString()}>
                                    {cartData.isChecked ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                </label>
                            </CartSelect>
                        )}
                        <img
                            src={cartData.imageUrl}
                            alt={cartData.optionName}
                            style={{ maxWidth: '100%' }}
                            onClick={() =>
                                router.push(
                                    `${PATHS.PRODUCT_DETAIL}/${cartData.productNo}`,
                                )
                            }
                        />
                    </CartImage>
                    <CartName>
                        <p>{cartData.productName}</p>
                        <p>{cartData.optionName}</p>
                    </CartName>
                </CartInformation>
            ) : (
                <CartInformation>
                    <CartImage>
                        {isModifiable && (
                            <CartSelect>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        agreeButton &&
                                        agreeButton(cartData.optionNo)
                                    }
                                    checked={cartData.isChecked}
                                    id={
                                        isLogin
                                            ? cartData.cartNo.toString()
                                            : cartData.optionNo.toString()
                                    }
                                />
                                <label
                                    htmlFor={
                                        isLogin
                                            ? cartData.cartNo.toString()
                                            : cartData.optionNo.toString()
                                    }
                                >
                                    {cartData.isChecked ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                </label>
                            </CartSelect>
                        )}
                        <img
                            src={cartData.imageUrl}
                            alt={cartData.optionName}
                        />
                    </CartImage>
                </CartInformation>
            )}
            {!isMobile(width) ? (
                <>
                    <CartCountBox isModifiable={isModifiable}>
                        <div>
                            {isModifiable && (
                                <CartCountMinus
                                    onClick={
                                        productCountHandler &&
                                        productCountHandler(
                                            -1,
                                            isLogin
                                                ? cartData.cartNo
                                                : cartData.optionNo,
                                        )
                                    }
                                >
                                    <Minus />
                                </CartCountMinus>
                            )}
                            {!isMobile(width) && (
                                <CartCount>{cartData.orderCnt}</CartCount>
                            )}
                            {isModifiable && (
                                <CartCountPlus
                                    onClick={
                                        productCountHandler &&
                                        productCountHandler(
                                            +1,
                                            isLogin
                                                ? cartData.cartNo
                                                : cartData.optionNo,
                                        )
                                    }
                                >
                                    <Plus />
                                </CartCountPlus>
                            )}
                        </div>
                    </CartCountBox>
                    <CartPrice>
                        <p>
                            <span className='standard_amount'>
                                {currency(cartData.price.standardAmt, {
                                    symbol: '',
                                    precision: 0,
                                }).format()}
                            </span>
                            {currency(cartData.price.buyAmt, {
                                symbol: '',
                                precision: 0,
                            }).format()}{' '}
                            원
                        </p>
                    </CartPrice>
                    <CartDelivery>
                        {currency(cartData.deliveryAmt, {
                            symbol: '',
                            precision: 0,
                        }).format()}{' '}
                        원
                    </CartDelivery>
                    <CartAmount>
                        {currency(
                            cartData.price.buyAmt + cartData.deliveryAmt,
                            {
                                symbol: '',
                                precision: 0,
                            },
                        ).format()}
                        <span>&nbsp;원</span>
                    </CartAmount>
                    {isModifiable && (
                        <CartCloseButton
                            onClick={
                                deleteCartList &&
                                deleteCartList(
                                    isLogin
                                        ? cartData.cartNo
                                        : cartData.optionNo,
                                )
                            }
                        >
                            <CloseButtonIcon />
                        </CartCloseButton>
                    )}
                </>
            ) : (
                <MobileCartInformationBox>
                    <MobileCartBoxTop>
                        <CartName>
                            <p>{cartData.productName}</p>
                            <p>{cartData.optionName}</p>
                        </CartName>
                        {isModifiable && (
                            <CartCloseButton
                                onClick={
                                    deleteCartList &&
                                    deleteCartList(
                                        isLogin
                                            ? cartData.cartNo
                                            : cartData.optionNo,
                                    )
                                }
                            >
                                <CloseButtonIcon />
                            </CartCloseButton>
                        )}
                    </MobileCartBoxTop>
                    <MobileCartBoxBottom>
                        <CartCountBox isModifiable={isModifiable}>
                            <div>
                                {isModifiable && (
                                    <CartCountMinus
                                        onClick={
                                            productCountHandler &&
                                            productCountHandler(
                                                -1,
                                                isLogin
                                                    ? cartData.cartNo
                                                    : cartData.optionNo,
                                            )
                                        }
                                    >
                                        <Minus />
                                    </CartCountMinus>
                                )}
                                {isModifiable && isMobile(width) && (
                                    <CartCount>{cartData.orderCnt}</CartCount>
                                )}
                                {isModifiable && (
                                    <CartCountPlus
                                        onClick={
                                            productCountHandler &&
                                            productCountHandler(
                                                +1,
                                                isLogin
                                                    ? cartData.cartNo
                                                    : cartData.optionNo,
                                            )
                                        }
                                    >
                                        <Plus />
                                    </CartCountPlus>
                                )}
                            </div>
                        </CartCountBox>
                        <CartPrice>
                            <p>
                                {currency(cartData.price.buyAmt, {
                                    symbol: '',
                                    precision: 0,
                                }).format()}{' '}
                                <span className='unit'>원</span>
                            </p>
                        </CartPrice>
                    </MobileCartBoxBottom>
                </MobileCartInformationBox>
            )}
            {isMobile(width) && (
                <MobileCartPriceBox>
                    상품{' '}
                    {currency(cartData.price.buyAmt, {
                        symbol: '',
                        precision: 0,
                    }).format()}{' '}
                    + 배송비{' '}
                    {currency(cartData.deliveryAmt, {
                        symbol: '',
                        precision: 0,
                    }).format()}{' '}
                    ={' '}
                    {currency(cartData.price.buyAmt + cartData.deliveryAmt, {
                        symbol: '',
                        precision: 0,
                    }).format()}{' '}
                </MobileCartPriceBox>
            )}
        </CartListBox>
    );
};

export default CartList;
