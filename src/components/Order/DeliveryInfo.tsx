import { FC } from 'react';
import styled from 'styled-components';

import OrderInformationLayout from 'components/Layout/OrderInformationLayout';

interface DeliveryInfoProps {
    receiverName?: string;
    receiverAddress?: string;
    receiverContact?: string;
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

const DeliveryInfo: FC<DeliveryInfoProps> = ({
    receiverName,
    receiverAddress,
    receiverContact,
}) => {
    return (
        <OrderInformationLayout title='배송정보'>
            <OrderInformationList>
                {receiverName && (
                    <OrderInformationListItem>
                        <p>받는사람</p>
                        <p>{receiverName}</p>
                    </OrderInformationListItem>
                )}

                {receiverAddress && (
                    <OrderInformationListItem>
                        {/* TODO: 상세주소 표시 */}
                        <p>주소</p>
                        <p>{receiverAddress}</p>
                    </OrderInformationListItem>
                )}

                {receiverContact && (
                    <OrderInformationListItem>
                        <p>전화번호</p>
                        <p>{receiverContact}</p>
                    </OrderInformationListItem>
                )}
            </OrderInformationList>
        </OrderInformationLayout>
    );
};

export default DeliveryInfo;
