import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import dayjs from 'dayjs';

import PAY_TYPES from 'const/payTypes';
import { PAY_TYPE } from 'models';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';

interface OrderCompleteTopContentProps {
    result?: 'SUCCESS' | 'FAIL';
    payType?: PAY_TYPE;
    orderNo?: string;
    paymentExpirationYmdt?: string;
    message?: string;
}

const Container = styled.div`
    width: 100%;
    height: 310px;
    background-color: ${(props) => props.theme.bg2};
    margin: 0 0 70px;
    padding: 101px 0 0;

    ${media.xlarge} {
        padding: 80px 0;
        height: auto;
        min-height: 340px;
    }
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 1.875rem;
    color: ${(props) => props.theme.text1};
    margin-bottom: 30px;

    ${media.xlarge} {
        font-size: 1.71rem;
    }

    ${media.medium} {
        font-size: 2.5rem;
    }
`;

const PayType = styled.div`
    display: inline-block;
    padding: 6px 11px;
    border: 1px solid #8c909d;
    color: #767676;
    font-size: 0.75rem;
    margin-bottom: 12px;

    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.166rem;
    }
`;

const OrderFailMessage = styled.p`
    font-size: 1.25rem;
    color: ${(props) => props.theme.text2};
    line-height: 1.4;
`;

const DepositDeadline = styled.p`
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #8f8f8f;

    & > b {
        font-weight: bold;
        color: #191919;
    }
`;

const OrderNoDescription = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #767676;

    ${media.medium} {
        font-size: 14px;
        line-height: 20px;
    }
`;

const OrderCompleteTopContent: FC<OrderCompleteTopContentProps> = ({
    result,
    payType,
    orderNo,
    paymentExpirationYmdt,
    message,
}) => {
    const { t: orderComplete } = useTranslation('orderComplete');

    const { width } = useWindowSize();

    return (
        <Container>
            {result === 'SUCCESS' && (
                <>
                    <Title>{orderComplete('orderComplete')}</Title>
                    {payType && <PayType>{PAY_TYPES[payType]}</PayType>}
                    {payType === PAY_TYPE.VIRTUAL_ACCOUNT && (
                        <>
                            {isMobile(width) ? (
                                <DepositDeadline>
                                    <b>
                                        {`${dayjs(paymentExpirationYmdt).format(
                                            'YY.MM.DD',
                                        )} ${orderComplete('etc.until')}`}
                                        <br />
                                    </b>
                                    <b>{orderComplete('etc.intoAccount')}</b>
                                    {orderComplete('etc.productShipment')}
                                </DepositDeadline>
                            ) : (
                                <DepositDeadline>
                                    <b>
                                        {dayjs(paymentExpirationYmdt).format(
                                            'YY.MM.DD',
                                        )}{' '}
                                        {orderComplete('etc.until')}{' '}
                                        {orderComplete('etc.intoAccount')}
                                    </b>
                                    {orderComplete('etc.productShipment')}
                                </DepositDeadline>
                            )}
                        </>
                    )}
                    <OrderNoDescription>
                        {`${orderComplete('etc.orderNo')} ${orderNo}`}
                    </OrderNoDescription>
                </>
            )}
            {result === 'FAIL' && (
                <>
                    <Title>{orderComplete('orderFail')}</Title>
                    <OrderFailMessage
                        dangerouslySetInnerHTML={{
                            __html:
                                message ?? orderComplete('orderFailMessage'),
                        }}
                    />
                </>
            )}
        </Container>
    );
};

export default OrderCompleteTopContent;
