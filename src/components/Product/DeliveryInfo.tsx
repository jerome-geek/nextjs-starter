import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { KRW } from 'utils/currency';
import media from 'utils/styles/media';

interface DeliveryInfoProps {
    deliveryFee: number;
    remoteDeliveryFee: any;
}

const DeliveryInfoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding-bottom: 26px;
    border-bottom: 2px solid #ededed;
    margin-bottom: 26px;

    ${media.medium} {
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
`;

const DeliveryInfoTitle = styled.p`
    font-size: 16px;
    letter-spacing: 0;
    color: #191919;
    margin-right: 20px;
    font-weight: normal;
`;

const DeliveryFee = styled.span`
    font-size: 16px;
    letter-spacing: 0;
    margin-right: 10px;

    & sub {
        font-size: 12px;
    }

    ${media.medium} {
        margin-right: 0;
        margin-bottom: 4px;
        display: block;

        & sub {
            font-size: 14px;
        }
    }
`;

const ContentContainer = styled.div`
    display: flex;
    ${media.medium} {
        flex-direction: column;
        align-items: flex-end;
    }
`;

const DeliveryDesc = styled.div`
    font-size: 16px;
    color: #999;

    > sub {
        font-size: 12px;
    }
`;

const DeliveryInfo: FC<DeliveryInfoProps> = ({
    deliveryFee,
    remoteDeliveryFee,
}) => {
    const { t: productDetail } = useTranslation('productDetail');

    return (
        <DeliveryInfoContainer>
            <DeliveryInfoTitle>
                {productDetail('shippingInformation')}
            </DeliveryInfoTitle>

            <ContentContainer>
                <DeliveryFee
                    dangerouslySetInnerHTML={{
                        __html: KRW(deliveryFee, {
                            symbol: '<sub>원</sub>',
                            precision: 0,
                            pattern: `<sub>${productDetail(
                                'shippingCost',
                            )}</sub> # !`,
                            negativePattern: `- # !`,
                        }).format(),
                    }}
                />
                <DeliveryDesc>
                    <sub>도서산간지역 / 제주도</sub>{' '}
                    {remoteDeliveryFee
                        ? KRW(remoteDeliveryFee.extraDeliveryAmt, {
                              precision: 0,
                              symbol: '',
                          }).format()
                        : 0}{' '}
                    <sub>원</sub>
                </DeliveryDesc>
            </ContentContainer>
        </DeliveryInfoContainer>
    );
};

export default DeliveryInfo;
