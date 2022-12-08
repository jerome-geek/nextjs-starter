import { FC } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import OrderInformationLayout from 'components/Layout/OrderInformationLayout';
import { KRW } from 'utils/currency';

interface DepositInfoProps {
    paymentAmt?: number;
    bankName?: string;
    account?: string;
    remitterName?: string;
    paymentExpirationYmdt?: string;
}

const OrderInformationList = styled.ul`
    border-top: 2px solid #222943;
    padding: 40px 10px;
`;

const OrderInformationListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    font-size: 16px;
    line-height: 24px;
    color: #191919;

    & > p:first-child {
        letter-spacing: -0.64px;
        text-align: left;
    }

    & > p:last-child {
        letter-spacing: 0;
        text-align: right;
    }
`;

const DepositInfo: FC<DepositInfoProps> = ({
    paymentAmt,
    bankName,
    account,
    remitterName,
    paymentExpirationYmdt,
}) => {
    return (
        <OrderInformationLayout title='이체정보'>
            <OrderInformationList>
                {paymentAmt && (
                    <OrderInformationListItem>
                        <p style={{ fontWeight: 'bold' }}>이체금액</p>
                        <p
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#C00020',
                            }}
                        >
                            {KRW(paymentAmt).format()}
                        </p>
                    </OrderInformationListItem>
                )}

                {bankName && account && remitterName && (
                    <OrderInformationListItem>
                        <p>계좌정보</p>
                        <p>
                            <span>{`${bankName} ${account}`}</span>
                            <br />
                            <span
                                style={{
                                    marginTop: '12px',
                                    color: '#858585',
                                }}
                            >
                                {`${remitterName}`}
                            </span>
                        </p>
                    </OrderInformationListItem>
                )}

                {paymentExpirationYmdt && (
                    <OrderInformationListItem>
                        <p>입금기한</p>
                        <p>
                            {`${dayjs(paymentExpirationYmdt).format(
                                'YYYY.MM.DD HH:mm:ss',
                            )} 까지`}
                        </p>
                    </OrderInformationListItem>
                )}
            </OrderInformationList>
        </OrderInformationLayout>
    );
};

export default DepositInfo;
