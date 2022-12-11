import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { head } from '@fxts/core';
import dayjs from 'dayjs';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import SearchPeriod from 'components/MyPage/SearchPeriod';
import OrderSummarySection from 'components/Order/OrderSummarySection';
import OrderOptionListItem from 'components/MyPage/OrderOptionListItem';
import SecondaryButton from 'components/Button/SecondaryButton';
import AngleRightGray from 'assets/icons/angle_right_gray.svg';
import { useMember } from 'hooks';
import { myOrder } from 'api/order';
import { MY_ORDER_LIST, PROFILE_ORDER_SUMMARY } from 'const/queryKeys';
import PATHS from 'const/paths';
import { NEXT_ACTION_TYPE } from 'models';
import { isLogin } from 'utils/users';

const OrderListContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const OrderOptionList = styled.ul``;

const OrderDetailLink = styled(Link)`
    font-size: 12px;
    vertical-align: top;
    color: #999999;
    margin-left: 10px;
    font-weight: normal;
`;

const ClaimButton = styled(SecondaryButton)`
    border: 1px solid #dbdbdb;
    font-size: 12px;
    letter-spacing: -0.48px;
    color: #191919;
    width: 100%;

    &:not(:last-of-type) {
        margin-right: 10px;
    }
`;

const OrderList = () => {
    const [searchCondition, setSearchCondition] = useState({
        hasTotalCount: true,
        pageNumber: 1,
        pageSize: 30,
        startYmd: dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
    });

    const { member } = useMember();

    const { data: orderSummary } = useQuery(
        [
            PROFILE_ORDER_SUMMARY,
            member?.memberId,
            {
                startYmd: searchCondition.startYmd,
                endYmd: searchCondition.endYmd,
            },
        ],
        async () =>
            await myOrder.getOrderOptionStatus({
                startYmd: searchCondition.startYmd,
                endYmd: searchCondition.endYmd,
            }),
        {
            enabled: isLogin(),
            keepPreviousData: true,
            select: ({ data }) => data,
        },
    );

    const { data: orderList } = useQuery(
        [MY_ORDER_LIST, member?.memberId, { ...searchCondition }],
        async () =>
            await myOrder.getOrderList({
                ...searchCondition,
            }),
        {
            enabled: isLogin(),
            keepPreviousData: true,
            select: ({ data }) => data,
        },
    );

    const router = useRouter();

    return (
        <>
            <OrderListContainer>
                <SearchPeriod
                    startYmd={searchCondition.startYmd}
                    endYmd={searchCondition.endYmd}
                    searchCondition={searchCondition}
                    setSearchCondition={setSearchCondition}
                />

                {orderSummary && (
                    <OrderSummarySection orderSummary={orderSummary} />
                )}

                <div style={{ marginTop: '40px' }}>
                    {orderList && orderList?.items.length > 0 ? (
                        orderList?.items.map((order, index) => {
                            {
                                index === 0 &&
                                    console.log(
                                        '🚀 ~ file: OrderList.tsx ~ line 212 ~ orderList?.items.map ~ order',
                                        order?.nextActions,
                                    );
                            }
                            return (
                                <div
                                    key={order.orderNo}
                                    style={{ borderTop: '2px solid #222943' }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '10px',
                                            lineHeight: '24px',
                                            borderBottom: '1px solid #222943',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                                letterSpacing: 0,
                                                color: '#191919',
                                                marginRight: '10px',
                                            }}
                                        >
                                            {order.orderNo}&nbsp;
                                            <OrderDetailLink
                                                href={`${PATHS.MY_ORDER_DETAIL}/${order.orderNo}`}
                                            >
                                                주문상세&nbsp;
                                                <AngleRightGray />
                                            </OrderDetailLink>
                                        </p>

                                        <div>
                                            {head(order?.nextActions)
                                                ?.nextActionType ===
                                                NEXT_ACTION_TYPE.CANCEL_ALL && (
                                                <ClaimButton
                                                    onClick={() =>
                                                        router.push({
                                                            pathname:
                                                                '/mypage/claim/cancel-all',
                                                            query: {
                                                                orderNo:
                                                                    order.orderNo,
                                                            },
                                                        })
                                                    }
                                                >
                                                    전체취소
                                                </ClaimButton>
                                            )}

                                            <p
                                                style={{
                                                    fontSize: '10px',
                                                    letterSpacing: 0,
                                                    color: '#000000',
                                                }}
                                            >
                                                {`${dayjs(
                                                    order.orderYmdt,
                                                ).format(
                                                    'YY-MM-DD HH:mm',
                                                )} 주문`}
                                            </p>
                                        </div>
                                    </div>

                                    <OrderOptionList>
                                        {order.orderOptions?.map((option) => {
                                            return (
                                                <OrderOptionListItem
                                                    key={option.orderOptionNo}
                                                    orderOptionNo={
                                                        option.orderOptionNo
                                                    }
                                                    productNo={option.productNo}
                                                    imageUrl={option.imageUrl}
                                                    orderStatusTypeLabel={
                                                        option.orderStatusTypeLabel ||
                                                        ''
                                                    }
                                                    orderStatusType={
                                                        option.orderStatusType
                                                    }
                                                    productName={
                                                        option.productName
                                                    }
                                                    optionName={
                                                        option.optionName
                                                    }
                                                    orderCnt={option.orderCnt}
                                                    price={option.price}
                                                    invoiceNo={
                                                        option.delivery
                                                            .invoiceNo
                                                    }
                                                    deliveryCompanyTypeLabel={
                                                        option.delivery
                                                            .deliveryCompanyTypeLabel ||
                                                        ''
                                                    }
                                                    nextActions={
                                                        option.nextActions
                                                    }
                                                    claimStatusType={
                                                        option.claimStatusType
                                                    }
                                                />
                                            );
                                        })}
                                    </OrderOptionList>
                                </div>
                            );
                        })
                    ) : (
                        <div>주문 내역이 없습니다.</div>
                    )}
                </div>
            </OrderListContainer>
        </>
    );
};

export default OrderList;
