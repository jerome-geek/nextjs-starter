import { FC } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import PrimaryButton from 'components/Button/PrimaryButton';
import { isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import { PAY_TYPE } from 'models';
import { PaymentReserve } from 'models/order';
import PAY_TYPES from 'const/payTypes';

interface CommomPaymentProps {
    setValue: UseFormSetValue<PaymentReserve>;
    payType: PAY_TYPE;
    availablePayTypes: {
        payType: string;
        pgTypes: string[];
    }[];
}

const CommonPaymentContainer = styled.div`
    margin-bottom: 60px;
`;

const PaymentTitle = styled.h3`
    font-size: 24px;
    letter-spacing: -1.2px;
    line-height: 36px;
    font-weight: bold;
    color: #191919;
    margin-bottom: 20px;

    ${media.medium} {
        font-size: 18px;
        letter-spacing: -0.72px;
    }
`;

const PaymentContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
`;

const PaymentContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    text-align: left;
    min-height: 104px;

    &:last-child {
        border-bottom: none;
    }
`;

const DefaultPaymentTitle = styled.p`
    font-size: 1rem;
    letter-spacing: 0;
    line-height: 24px;
    color: #191919;
    width: 100%;
    max-width: 200px;
`;

const PaymentList = styled.div`
    padding-top: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    color: ${(props) => props.theme.text1};

    ${media.medium} {
        justify-content: space-between;
        width: 100%;
    }
`;

const PaymentListItem = styled(PrimaryButton).attrs({ type: 'button' })<{
    isClicked: boolean;
}>`
    width: 31%;
    padding: 10px 26px;
    box-sizing: border-box;
    margin-right: 10px;
    margin-bottom: 10px;

    ${(props) =>
        !props.isClicked &&
        css`
            color: ${(props) => props.theme.text3};
            background-color: ${(props) => props.theme.bg2};
            border: 1px solid ${(props) => props.theme.bg2};
        `};

    ${media.medium} {
        margin-bottom: 8px;
        flex: 0 0 48%;

        &:nth-child(2n + 1) {
            margin-right: 8px;
        }
        &:nth-child(2n) {
            margin-right: 0;
        }
    }
`;

const CommonPayment: FC<CommomPaymentProps> = ({
    setValue,
    payType,
    availablePayTypes,
}) => {
    const { t: orderSheet } = useTranslation('orderSheet');

    const { width } = useWindowSize();

    return (
        <CommonPaymentContainer>
            <PaymentTitle>{orderSheet('paymentMethod.title')}</PaymentTitle>

            <PaymentContainer>
                <PaymentContentContainer>
                    {!isMobile(width) && (
                        <DefaultPaymentTitle>일반 결제</DefaultPaymentTitle>
                    )}
                    <PaymentList>
                        {availablePayTypes.map((availablePayType) => (
                            <PaymentListItem
                                key={availablePayType.payType}
                                isClicked={payType === availablePayType.payType}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setValue(
                                        'payType',
                                        availablePayType.payType as PAY_TYPE,
                                    );
                                }}
                            >
                                {
                                    PAY_TYPES[
                                        availablePayType.payType as PAY_TYPE
                                    ]
                                }
                            </PaymentListItem>
                        ))}
                    </PaymentList>
                </PaymentContentContainer>
            </PaymentContainer>
        </CommonPaymentContainer>
    );
};

export default CommonPayment;
