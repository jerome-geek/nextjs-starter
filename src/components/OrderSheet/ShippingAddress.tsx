import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GroupBase, SingleValue, StylesConfig } from 'react-select';
import { useTranslation } from 'react-i18next';
import {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { useWindowSize } from 'usehooks-ts';
import { ErrorMessage } from '@hookform/error-message';

import SelectBox, { customStyle } from 'components/Common/SelectBox';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { PaymentReserve } from 'models/order';
import Checked from 'assets/icons/checkbox_square_checked.svg';
import UnChecked from 'assets/icons/checkbox_square_unchecked.svg';
import { sheetInputStyle } from 'styles/componentStyle';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { onlyNumberFormatter } from 'utils/validation';
import { useMember } from 'hooks';

interface ShippingAddressProps {
    register: UseFormRegister<PaymentReserve>;
    setValue: UseFormSetValue<PaymentReserve>;
    getValues: UseFormGetValues<PaymentReserve>;
    ordererInformation?: {
        receiverName: string;
        receiverContact1: string;
    };
    isSame: boolean;
    setIsSearchAddressModal: Dispatch<SetStateAction<boolean>>;
    errors: FieldErrors<PaymentReserve>;
}

interface SelectRequestOption {
    label: string;
    directInput?: boolean;
}

const OrdererInformationContainer = styled.div`
    ${sheetInputStyle.informationContainer}
    margin-bottom: 60px;
`;

const SheetInputWrapper = styled.div`
    ${sheetInputStyle.sheetInputWrapper}
`;

const SheetInputTitleBox = styled.div`
    ${sheetInputStyle.sheetInputTitleBox}
`;

const SheetInputBox = styled.div`
    ${sheetInputStyle.sheetInputBox};
`;

const CheckBox = styled.label`
    display: flex;
    align-items: center;
    > input {
        display: none;
    }
    ${media.medium} {
        margin-top: 12px;
        > p {
            margin-left: 7px;
            color: ${(props) => props.theme.text2};
        }
    }
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetTextInput}
    width: ${(props: { inputWidth?: string }) =>
        props.inputWidth ? props.inputWidth : '100%'};
    &:first-child {
        margin-bottom: 12px;
    }
    &:disabled {
        color: ${(props) => props.theme.text1};
        background: ${(props) => props.theme.bg3};
        text-overflow: ellipsis;
    }
    ${media.medium} {
        min-height: 54px;
        font-size: 1.333rem;
        &:first-child {
            width: ${(props: { inputWidth?: string }) =>
                props.inputWidth ? props.inputWidth : '100%'};
        }
        &::placeholder {
            font-size: 1.333rem;
        }
    }
`;

const SheetButton = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #222943;
    margin-bottom: 10px;
    cursor: pointer;
    ${media.medium} {
        width: 27.1%;
        min-height: 54px;
        line-height: 54px;
    }
`;

const ShippingAddress: FC<ShippingAddressProps> = ({
    register,
    setValue,
    ordererInformation,
    setIsSearchAddressModal,
    errors,
    isSame,
}) => {
    const [directInput, setDirectInput] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(false);

    const { width } = useWindowSize();

    const { member } = useMember();

    const { t: sheet } = useTranslation('orderSheet');

    const deliveryMemo = [
        { label: sheet('shippingAddress.requestList.beforeDelivery') },
        { label: sheet('shippingAddress.requestList.putHouse') },
        { label: sheet('shippingAddress.requestList.securityOffice') },
        { label: sheet('shippingAddress.requestList.absenceHouse') },
        { label: sheet('shippingAddress.requestList.absenceOffice') },
        {
            label: sheet('shippingAddress.requestList.directInput'),
            directInput: true,
        },
    ];

    useEffect(() => {
        if (isSame && ordererInformation) {
            setValue(
                'shippingAddress.receiverName',
                ordererInformation?.receiverName,
                {
                    shouldValidate: true,
                },
            );
            setValue(
                'shippingAddress.receiverContact1',
                ordererInformation?.receiverContact1,
                {
                    shouldValidate: true,
                },
            );
        } else {
            setValue('shippingAddress.receiverName', '');
            setValue('shippingAddress.receiverContact1', '');
        }
    }, [isSame, setValue]);

    useEffect(() => {
        setValue('useDefaultAddress', defaultAddress);
    }, [defaultAddress, setValue]);

    return (
        <OrdererInformationContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>{sheet('shippingAddress.category.name')}</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={
                            sheet('shippingAddress.category.placeholder.name')!
                        }
                        type='text'
                        {...register('shippingAddress.receiverName', {
                            required: {
                                value: true,
                                message: sheet('alert.inputName'),
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='shippingAddress.receiverName'
                        render={({ message }) => (
                            <StyledErrorMessage>{message}</StyledErrorMessage>
                        )}
                    />
                </SheetInputBox>
            </SheetInputWrapper>

            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>{sheet('shippingAddress.category.phoneNumber')}</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={
                            sheet(
                                'shippingAddress.category.placeholder.phoneNumber',
                            )!
                        }
                        type={'text'}
                        onInput={(e) => {
                            setValue(
                                'shippingAddress.receiverContact1',
                                onlyNumberFormatter(e.currentTarget.value),
                            );
                        }}
                        {...register('shippingAddress.receiverContact1', {
                            required: {
                                value: true,
                                message: sheet('alert.inputPhoneNumber'),
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='shippingAddress.receiverContact1'
                        render={({ message }) => (
                            <StyledErrorMessage>{message}</StyledErrorMessage>
                        )}
                    />
                </SheetInputBox>
            </SheetInputWrapper>

            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>{sheet('shippingAddress.category.searchAddress')}</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        inputWidth='71%'
                        placeholder={
                            sheet(
                                'shippingAddress.category.placeholder.address',
                            )!
                        }
                        type={'text'}
                        disabled={true}
                        {...register('shippingAddress.receiverAddress', {
                            required: {
                                value: true,
                                message: sheet('alert.inputAddress'),
                            },
                        })}
                    />
                    <SheetButton
                        width='20.4%'
                        onClick={() => {
                            setIsSearchAddressModal((prev) => !prev);
                        }}
                    >
                        {sheet('etc.search')}
                    </SheetButton>
                    <SheetTextInput
                        placeholder={
                            sheet(
                                'shippingAddress.category.placeholder.detailAddress',
                            )!
                        }
                        type='text'
                        {...register('shippingAddress.receiverDetailAddress', {
                            required: {
                                value: true,
                                message: sheet('alert.inputDetailAddress'),
                            },
                        })}
                    />
                    {member && (
                        <CheckBox
                            htmlFor='defaultAddress'
                            style={{ width: '100%' }}
                        >
                            <input
                                type='checkbox'
                                id='defaultAddress'
                                onChange={() => {
                                    setDefaultAddress((prev) => !prev);
                                }}
                                checked={defaultAddress}
                            />
                            {defaultAddress ? <Checked /> : <UnChecked />}
                            <p>{sheet('shippingAddress.setDefaultAddress')}</p>
                        </CheckBox>
                    )}
                    <ErrorMessage
                        errors={errors}
                        name='shippingAddress.receiverAddress'
                        render={({ message }) => (
                            <StyledErrorMessage style={{ width: '100%' }}>
                                {message}
                            </StyledErrorMessage>
                        )}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='shippingAddress.receiverDetailAddress'
                        render={({ message }) => (
                            <StyledErrorMessage style={{ width: '100%' }}>
                                {message}
                            </StyledErrorMessage>
                        )}
                    />
                </SheetInputBox>
            </SheetInputWrapper>

            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>{sheet('shippingAddress.category.request')}</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    {directInput ? (
                        <SheetTextInput
                            placeholder={
                                sheet(
                                    'shippingAddress.requestList.directInput',
                                )!
                            }
                            type='text'
                            {...register('deliveryMemo')}
                        />
                    ) : (
                        <SelectBox<
                            SelectRequestOption,
                            false,
                            GroupBase<SelectRequestOption>
                        >
                            placeholder={sheet(
                                'shippingAddress.category.placeholder.request',
                            )}
                            options={deliveryMemo}
                            styles={{
                                ...(customStyle as StylesConfig<
                                    SelectRequestOption,
                                    false,
                                    GroupBase<SelectRequestOption>
                                >),
                                container: (provided: any) => ({
                                    ...provided,
                                    marginBottom: `${
                                        isMobile(width) ? '54' : '44px'
                                    }`,
                                    boxSizing: 'border-box',
                                    width: '100%',
                                }),
                                control: (
                                    provided: any,
                                    { menuIsOpen }: { menuIsOpen: boolean },
                                ) => ({
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    border: '1px solid #DBDBDB',
                                    borderBottom: menuIsOpen ? 'none' : '',
                                    display: 'flex',
                                    height: `${
                                        isMobile(width) ? '54px' : '44px'
                                    }`,
                                    paddingLeft: '5px',
                                    cursor: 'pointer',
                                }),
                                placeholder: (provided: any) => ({
                                    ...provided,
                                    fontWeight: 'normal',
                                }),
                                option: () => ({
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    background: '#fff',
                                    padding: '15px 20px',
                                    paddingLeft: '20px',
                                    color: '#191919',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderLeft: '2px solid #c00020',
                                        background: '#F0EFF4',
                                        fontWeight: 'bold',
                                    },
                                }),
                            }}
                            onChange={(
                                selectedOption: SingleValue<
                                    Partial<SelectRequestOption>
                                >,
                            ) => {
                                if (selectedOption?.directInput) {
                                    setDirectInput(true);
                                } else {
                                    setDirectInput(false);
                                    setValue(
                                        'deliveryMemo',
                                        selectedOption?.label,
                                    );
                                }
                            }}
                        />
                    )}
                </SheetInputBox>
            </SheetInputWrapper>
        </OrdererInformationContainer>
    );
};

export default ShippingAddress;
