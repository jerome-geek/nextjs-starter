import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useMall } from 'hooks/queries';
import { KRW } from 'utils/currency';
import media from 'utils/styles/media';

interface AccumulationInfoProps {
    accumulationAmtWhenBuyConfirm?: number;
}

const AccumulationInfoContainer = styled.div`
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

const AccumulationInfoTitle = styled.p`
    font-size: 16px;
    letter-spacing: 0;
    color: #191919;
    margin-right: 20px;
    font-weight: normal;
`;

const AccumulationInfoContent = styled.div`
    display: flex;
    flex-direction: column;

    ${media.medium} {
        align-items: flex-end;
    }
`;

const AccumulationBenefits = styled.span`
    > b {
        color: ${(props) => props.theme.main};
    }

    &:not(:last-of-type) {
        margin-bottom: 8px;
    }
`;

const AccumulationInfo: FC<AccumulationInfoProps> = ({
    accumulationAmtWhenBuyConfirm = 0,
}) => {
    const { t: productDetail } = useTranslation('productDetail');

    const { data: mallInfo } = useMall();
    const accumulationAmtWhenBuyConfirmInfo = useMemo(
        () =>
            accumulationAmtWhenBuyConfirm === 0
                ? ''
                : `구매확정시 ${KRW(accumulationAmtWhenBuyConfirm, {
                      symbol:
                          mallInfo?.accumulationConfig.accumulationUnit || '',
                      precision: 0,
                      pattern: `<b># !</b>`,
                  }).format()} 즉시 지급`,
        [
            accumulationAmtWhenBuyConfirm,
            mallInfo?.accumulationConfig.accumulationUnit,
        ],
    );

    const reviewsAccumulation = useMemo(
        () =>
            mallInfo?.accumulationConfig.reviewsAccumulationDetail
                .reviewsAccumulation === 0
                ? ''
                : `
    리뷰작성시 ${KRW(
        mallInfo?.accumulationConfig.reviewsAccumulationDetail
            .reviewsAccumulation || 0,
        {
            symbol: mallInfo?.accumulationConfig?.accumulationUnit || '',
            precision: 0,
            pattern: `<b># !</b>`,
        },
    ).format()} 즉시 지급`,
        [
            mallInfo?.accumulationConfig?.accumulationUnit,
            mallInfo?.accumulationConfig?.reviewsAccumulationDetail
                ?.reviewsAccumulation,
        ],
    );

    const photoReviewsAccumulation = useMemo(
        () =>
            mallInfo?.accumulationConfig?.reviewsAccumulationDetail
                ?.photoReviewsAccumulation === 0
                ? ''
                : `
        포토리뷰작성시 ${KRW(
            mallInfo?.accumulationConfig.reviewsAccumulationDetail
                ?.photoReviewsAccumulation || 0,
            {
                symbol: mallInfo?.accumulationConfig?.accumulationUnit || '',
                precision: 0,
                pattern: `<b># !</b>`,
            },
        ).format()} 즉시 지급`,
        [
            mallInfo?.accumulationConfig?.accumulationUnit,
            mallInfo?.accumulationConfig?.reviewsAccumulationDetail
                ?.photoReviewsAccumulation,
        ],
    );

    const isAccumulationInfoVisible = useMemo(
        () =>
            accumulationAmtWhenBuyConfirm !== 0 ||
            mallInfo?.accumulationConfig?.reviewsAccumulationDetail
                ?.reviewsAccumulation !== 0 ||
            mallInfo?.accumulationConfig?.reviewsAccumulationDetail
                ?.photoReviewsAccumulation !== 0,
        [
            accumulationAmtWhenBuyConfirm,
            mallInfo?.accumulationConfig?.reviewsAccumulationDetail
                ?.reviewsAccumulation,
            mallInfo?.accumulationConfig?.reviewsAccumulationDetail
                ?.photoReviewsAccumulation,
        ],
    );

    return (
        <>
            {isAccumulationInfoVisible && (
                <AccumulationInfoContainer>
                    <AccumulationInfoTitle>
                        {productDetail('accumulateBenefits')}
                    </AccumulationInfoTitle>

                    <AccumulationInfoContent>
                        {accumulationAmtWhenBuyConfirmInfo && (
                            <AccumulationBenefits
                                dangerouslySetInnerHTML={{
                                    __html: accumulationAmtWhenBuyConfirmInfo,
                                }}
                            />
                        )}

                        {reviewsAccumulation && (
                            <AccumulationBenefits
                                dangerouslySetInnerHTML={{
                                    __html: reviewsAccumulation,
                                }}
                            />
                        )}

                        {photoReviewsAccumulation && (
                            <AccumulationBenefits
                                dangerouslySetInnerHTML={{
                                    __html: photoReviewsAccumulation,
                                }}
                            />
                        )}
                    </AccumulationInfoContent>
                </AccumulationInfoContainer>
            )}
        </>
    );
};

export default AccumulationInfo;
