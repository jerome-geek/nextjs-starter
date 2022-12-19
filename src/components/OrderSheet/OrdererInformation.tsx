import { FC } from 'react';
import styled from 'styled-components';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';

import { PaymentReserve } from 'models/order';
import { sheetInputStyle } from 'styles/componentStyle';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { onlyNumberFormatter } from 'utils/validation';
import media from 'utils/styles/media';

interface OrdererInformationProps {
    register: UseFormRegister<PaymentReserve>;
    errors: FieldErrors<PaymentReserve>;
    setValue: UseFormSetValue<PaymentReserve>;
}

const OrdererInputContainer = styled.div`
    ${sheetInputStyle.sheetInputWrapper}
`;

const SheetInputTitleBox = styled.div`
    ${sheetInputStyle.sheetInputTitleBox}
`;

const SheetInputBox = styled.div<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetInputBox}
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetTextInput}
    width: ${(props: { inputWidth?: string }) =>
        props.inputWidth ? props.inputWidth : '100%'};
    ${media.medium} {
        font-size: 1.333rem;
        &::placeholder {
            font-size: 1.333rem;
        }
    }
`;

const OrdererInformationContainer = styled.div`
    ${sheetInputStyle.informationContainer}
`;

const OrdererInformation: FC<OrdererInformationProps> = ({
    register,
    errors,
    setValue,
}) => {
    const { t: sheet } = useTranslation('orderSheet');

    return (
        <OrdererInformationContainer>
            <OrdererInputContainer>
                <SheetInputTitleBox>
                    {sheet('ordererInformation.category.name')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={
                            sheet(
                                'ordererInformation.category.placeholder.name',
                            )!
                        }
                        type='text'
                        {...register('orderer.ordererName', {
                            required: {
                                value: true,
                                message: sheet('alert.inputName'),
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='orderer.ordererName'
                        render={({ message }) => (
                            <StyledErrorMessage>{message}</StyledErrorMessage>
                        )}
                    />
                </SheetInputBox>
            </OrdererInputContainer>

            <OrdererInputContainer>
                <SheetInputTitleBox>
                    {sheet('ordererInformation.category.phoneNumber')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={
                            sheet(
                                'ordererInformation.category.placeholder.phoneNumber',
                            )!
                        }
                        type='text'
                        {...register('orderer.ordererContact1', {
                            required: {
                                value: true,
                                message: sheet('alert.inputPhoneNumber'),
                            },
                        })}
                        onInput={(e) => {
                            setValue(
                                'orderer.ordererContact1',
                                onlyNumberFormatter(e.currentTarget.value),
                            );
                        }}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='orderer.ordererContact1'
                        render={({ message }) => (
                            <StyledErrorMessage>{message}</StyledErrorMessage>
                        )}
                    />
                </SheetInputBox>
            </OrdererInputContainer>

            <OrdererInputContainer>
                <SheetInputTitleBox>
                    {sheet('ordererInformation.category.eMail')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={
                            sheet(
                                'ordererInformation.category.placeholder.email',
                            )!
                        }
                        type='text'
                        {...register('orderer.ordererEmail', {
                            required: {
                                value: true,
                                message: sheet('alert.inputEmail'),
                            },
                        })}
                    />
                </SheetInputBox>
            </OrdererInputContainer>
        </OrdererInformationContainer>
    );
};

export default OrdererInformation;
