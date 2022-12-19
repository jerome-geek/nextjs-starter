import { FC } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import StyledInput from 'components/Input/StyledInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import { useMall } from 'hooks/queries';
import { PaymentInfo, PaymentReserve } from 'models/order';
import media from 'utils/styles/media';
import { KRW } from 'utils/currency';

interface DiscounApplyProps {
    paymentInfo?: PaymentInfo;
    subPayAmt: number;
    setValue?: UseFormSetValue<PaymentReserve>;
    onCouponModalClick: () => void;
    onAccumulationButtonClick: () => void;
}

const DiscountApplyContainer = styled.div`
    margin-bottom: 60px;
`;

const Title = styled.h3`
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

const ContentList = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    padding: 30px 0;
`;

const ContentListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;

    ${media.medium} {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ListItemTitle = styled.p`
    width: 100%;
    max-width: 200px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #191919;

    ${media.medium} {
        margin-bottom: 10px;
        margin-left: 10px;
        letter-spacing: -0.64px;
    }
`;

const InputContainer = styled.div`
    display: flex;
    color: ${(props) => props.theme.text1};
    margin-right: 20px;

    ${media.medium} {
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        margin-right: 4px;
    }
`;

const DiscountInput = styled(StyledInput)`
    border: none;
    background: ${(props) => props.theme.bg2};
    padding: 15px 20px;
    margin-right: 20px;
    width: 100%;
    max-width: 330px;

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;
        color: #a8a8a8;
        letter-spacing: -0.64px;
        max-width: none;
    }
`;

const ApplyButton = styled(PrimaryButton).attrs({ type: 'button' })`
    width: auto;
    max-width: 100px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
`;

const AccumulationDescription = styled.p`
    letter-spacing: 0px;
    color: #8f8f8f;
    font-size: 12px;
    margin-left: 200px;

    ${media.medium} {
        margin-left: 0;
    }
`;

const DiscountApply: FC<DiscounApplyProps> = ({
    paymentInfo,
    subPayAmt = 0,
    setValue,
    onCouponModalClick,
    onAccumulationButtonClick,
}) => {
    const { t: orderSheet } = useTranslation('orderSheet');

    const { data: mallInfo } = useMall();

    const onDiscountChange = (value: string | number) => {
        if (setValue) {
            setValue('subPayAmt', Number(value));
        }
    };

    return (
        <DiscountApplyContainer>
            <Title>{orderSheet('applyDiscount.title')}</Title>

            <ContentList>
                <ContentListItem>
                    <ListItemTitle>
                        {orderSheet('applyDiscount.category.coupon')}
                    </ListItemTitle>

                    <InputContainer>
                        <DiscountInput
                            readOnly
                            value={paymentInfo?.cartCouponAmt || ''}
                        />
                        <ApplyButton onClick={() => onCouponModalClick()}>
                            {orderSheet('applyDiscount.applyCoupon')}
                        </ApplyButton>
                    </InputContainer>
                </ContentListItem>

                <ContentListItem>
                    <ListItemTitle>
                        {orderSheet('applyDiscount.category.accumulation')}
                    </ListItemTitle>
                    <InputContainer>
                        <DiscountInput
                            onChange={(e) =>
                                onDiscountChange(e.currentTarget.value)
                            }
                            value={subPayAmt}
                        />
                        <ApplyButton
                            onClick={() => onAccumulationButtonClick()}
                        >
                            {orderSheet('applyDiscount.useAccumulation')}
                        </ApplyButton>
                    </InputContainer>
                </ContentListItem>
                {paymentInfo && mallInfo && (
                    <AccumulationDescription
                        dangerouslySetInnerHTML={{
                            __html: `${orderSheet(
                                'applyDiscount.availableAccumulation',
                            )} : ${KRW(
                                paymentInfo.availableMaxAccumulationAmt,
                                {
                                    symbol:
                                        mallInfo?.accumulationConfig
                                            .accumulationUnit || '',
                                    precision: 0,
                                    pattern: `<b># !</b>`,
                                },
                            )
                                .subtract(paymentInfo.usedAccumulationAmt)
                                .format()} `,
                        }}
                    />
                )}
            </ContentList>
        </DiscountApplyContainer>
    );
};

export default DiscountApply;
