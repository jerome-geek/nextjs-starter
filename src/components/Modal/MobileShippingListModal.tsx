import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
import { useQuery } from 'react-query';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import MobileModal, {
    MobileModalDefaultType,
} from 'components/Modal/MobileModal';
import { shippingAddress } from 'api/order';
import { PaymentReserve } from 'models/order';
import { useTypedSelector } from 'state/store';
import Checked from 'assets/icons/checkbox_circle_checked.svg';
import UnChecked from 'assets/icons/checkbox_circle_uhchecked.svg';

const ShippingListContainer = styled.div`
    width: 100%;
    padding: 0 24px;
`;

const Title = styled.h2`
    margin: 24px 0 20px;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -0.9px;
    line-height: 27px;
    color: ${(props) => props.theme.text1};
`;

const ShippingListWrapper = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
`;

const ShippingListBox = styled.li`
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    display: flex;
    justify-content: flex-start;
    height: 102px;
    align-items: center;
    &:first-child {
        border-top: none;
    }
`;

const CheckBox = styled.div`
    padding: 0 30px;
    text-align: center;
`;

const ShippingListInfo = styled.div`
    margin-left: 3.15%;
    padding-right: 7.89%;
`;

const ShippingListInfoTop = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 14px;
`;

const Receiver = styled.div`
    text-align: left;
    position: relative;
    color: ${(props) => props.theme.text1};
    font-size: 1.333rem;
    line-height: 24px;
`;

const Address = styled(Receiver)`
    color: ${(props) => props.theme.text2};
`;

const Contact = styled(Receiver)`
    color: ${(props) => props.theme.text2};
    margin-left: 50px;
`;

const DefaultAddress = styled.div`
    width: 22px;
    font-size: 1rem;
    color: #fff;
    background: ${(props) => props.theme.bg1};
    text-align: center;
    line-height: 18px;
    letter-spacing: -0.48px;
    position: absolute;
    left: calc(100% + 9px);
    top: 50%;
    transform: translateY(-50%);
`;

const NoShippingData = styled.div`
    text-align: center;
    font-size: 16px;
    letter-spacing: -0.64px;
    color: ${(props) => props.theme.text3};
    padding: 50px 0;
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
`;

const ApplyButton = styled.div`
    background: ${(props) => props.theme.secondary};
    color: #fff;
    width: 100%;
    cursor: pointer;
    text-align: center;
    padding: 15px 0;
    font-size: 1.333rem;
    margin-top: 50px;
`;

const MobileShippingListModal = ({
    onClickToggleModal,
    setValue,
    setIsShippingListModal,
    title,
}: PropsWithChildren<MobileModalDefaultType> & {
    register: UseFormRegister<PaymentReserve>;
    setValue: UseFormSetValue<PaymentReserve>;
    setIsShippingListModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [selectedAddress, setSelectedAddress] = useState<{
        receiverName: string;
        receiverContact1: string;
        receiverAddress: string;
        receiverDetailAddress: string;
        addressNo: number;
        receiverZipCd: string;
    }>();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { data: shippingData } = useQuery(
        ['shippingList', { member: member?.memberName }],
        async () => await shippingAddress.getShippingAddressList(),
        {
            select: (res) => res.data,
        },
    );

    return (
        <MobileModal title={title} onClickToggleModal={onClickToggleModal}>
            <ShippingListContainer>
                <Title>최근 배송지 목록</Title>
                <ShippingListWrapper>
                    {shippingData?.defaultAddress ||
                    shippingData?.recentAddresses ? (
                        <>
                            {shippingData?.defaultAddress && (
                                <ShippingListBox>
                                    <CheckBox
                                        onClick={() =>
                                            setSelectedAddress({
                                                receiverName:
                                                    shippingData.defaultAddress
                                                        .receiverName,
                                                receiverContact1:
                                                    shippingData.defaultAddress
                                                        .receiverContact1,
                                                receiverAddress:
                                                    shippingData.defaultAddress
                                                        .receiverAddress,
                                                receiverDetailAddress:
                                                    shippingData.defaultAddress
                                                        .receiverDetailAddress,
                                                addressNo: shippingData
                                                    .defaultAddress.addressNo
                                                    ? shippingData
                                                          .defaultAddress
                                                          .addressNo
                                                    : 0,
                                                receiverZipCd:
                                                    shippingData.defaultAddress
                                                        .receiverZipCd,
                                            })
                                        }
                                    >
                                        {selectedAddress?.addressNo ===
                                        shippingData.defaultAddress
                                            .addressNo ? (
                                            <Checked />
                                        ) : (
                                            <UnChecked />
                                        )}
                                    </CheckBox>
                                    <ShippingListInfo>
                                        <Receiver>
                                            <DefaultAddress>
                                                기본
                                            </DefaultAddress>
                                            {
                                                shippingData.defaultAddress
                                                    .receiverName
                                            }
                                        </Receiver>
                                        <Address>
                                            {
                                                shippingData.defaultAddress
                                                    .receiverAddress
                                            }{' '}
                                            {
                                                shippingData.defaultAddress
                                                    .receiverDetailAddress
                                            }
                                        </Address>
                                        <Contact>
                                            {
                                                shippingData.defaultAddress
                                                    .receiverContact1
                                            }
                                        </Contact>
                                    </ShippingListInfo>
                                </ShippingListBox>
                            )}
                            {shippingData?.recentAddresses
                                .filter(({ addressNo }) => {
                                    return (
                                        addressNo !==
                                        shippingData?.defaultAddress?.addressNo
                                    );
                                })
                                .map(
                                    (
                                        {
                                            receiverName,
                                            receiverContact1,
                                            receiverAddress,
                                            receiverDetailAddress,
                                            addressNo,
                                            receiverZipCd,
                                        },
                                        index,
                                    ) =>
                                        index < 4 && (
                                            <ShippingListBox key={addressNo}>
                                                <CheckBox
                                                    onClick={() =>
                                                        setSelectedAddress({
                                                            receiverName,
                                                            receiverContact1,
                                                            receiverAddress,
                                                            receiverDetailAddress,
                                                            addressNo,
                                                            receiverZipCd,
                                                        })
                                                    }
                                                >
                                                    {selectedAddress?.addressNo ===
                                                    addressNo ? (
                                                        <Checked />
                                                    ) : (
                                                        <UnChecked />
                                                    )}
                                                </CheckBox>
                                                <ShippingListInfo>
                                                    <ShippingListInfoTop>
                                                        <Receiver>
                                                            {receiverName}
                                                        </Receiver>
                                                        <Contact>
                                                            {receiverContact1}
                                                        </Contact>
                                                    </ShippingListInfoTop>
                                                    <Address>
                                                        {receiverAddress}{' '}
                                                        {receiverDetailAddress}
                                                    </Address>
                                                </ShippingListInfo>
                                            </ShippingListBox>
                                        ),
                                )}
                        </>
                    ) : (
                        <NoShippingData>
                            최근 배송지 목록이 없습니다.
                        </NoShippingData>
                    )}
                </ShippingListWrapper>

                {shippingData && (
                    <>
                        <ApplyButton
                            onClick={() => {
                                if (selectedAddress) {
                                    setValue(
                                        'shippingAddress.receiverName',
                                        selectedAddress.receiverName,
                                    );
                                    setValue(
                                        'shippingAddress.receiverAddress',
                                        selectedAddress.receiverAddress,
                                    );
                                    setValue(
                                        'shippingAddress.receiverDetailAddress',
                                        selectedAddress.receiverDetailAddress,
                                    );
                                    setValue(
                                        'shippingAddress.receiverContact1',
                                        selectedAddress.receiverContact1,
                                    );
                                    setValue(
                                        'shippingAddress.receiverZipCd',
                                        selectedAddress.receiverZipCd,
                                    );
                                    setIsShippingListModal((prev) => !prev);
                                }
                            }}
                        >
                            적용하기
                        </ApplyButton>
                    </>
                )}
            </ShippingListContainer>
        </MobileModal>
    );
};

export default MobileShippingListModal;
