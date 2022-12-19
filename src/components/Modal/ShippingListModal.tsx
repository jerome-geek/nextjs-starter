import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
import { useQuery } from 'react-query';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useWindowSize } from 'usehooks-ts';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import Checked from 'assets/icons/checkbox_circle_checked.svg';
import UnChecked from 'assets/icons/checkbox_circle_uhchecked.svg';
import { shippingAddress } from 'api/order';
import { PaymentReserve } from 'models/order';
import { useTypedSelector } from 'state/store';
import { isDesktop } from 'utils/styles/responsive';

const widthRatio = 2.17;

const ShippingListContainer = styled.div`
    width: 100%;
    padding: 0 66px;
`;

const Title = styled.h2`
    margin: 50px 0 40px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
`;

const ShippingListWrapper = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
`;

const CategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.text1};
    padding: 20px 0;
`;

const ShippingListBox = styled.div`
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    display: flex;
    justify-content: space-between;
    height: 110px;
    align-items: center;
`;

const CheckBox = styled.div`
    width: ${widthRatio}%;
`;

const Receiver = styled.div`
    width: ${widthRatio * 9}%;
    text-align: center;
    position: relative;
`;

const Address = styled.div`
    width: ${widthRatio * 22}%;
    text-align: center;
`;

const Contact = styled.div`
    width: ${widthRatio * 9}%;
    text-align: center;
`;

const Blank = styled.div`
    width: ${widthRatio}%;
`;

const DefaultAddress = styled.div`
    width: 24px;
    height: 14px;
    font-size: 10px;
    color: #fff;
    background: ${(props) => props.theme.bg1};
    text-align: center;
    line-height: 14px;
    position: absolute;
    left: 40px;
`;

const NoShippingData = styled.div`
    text-align: center;
    font-size: 16px;
    letter-spacing: -0.64px;
    color: ${(props) => props.theme.text3};
    padding: 50px 0;
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin: 40px;
    justify-content: center;
    text-align: center;
    > div {
        width: 210px;
        padding: 13px 0;
        font-size: 16px;
    }
`;

const CancelButton = styled.div`
    margin-right: 20px;
    border: 1px solid #dbdbdb;
    cursor: pointer;
`;

const ApplyButton = styled.div`
    background: #222943;
    color: #fff;
    cursor: pointer;
`;

const ShippingListModal = ({
    onClickToggleModal,
    width,
    setValue,
    setIsShippingListModal,
}: PropsWithChildren<ModalDefaultType> & {
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
            refetchOnWindowFocus: false,
        },
    );

    const { width: windowWidth } = useWindowSize();

    return (
        <Modal
            onClickToggleModal={onClickToggleModal}
            width={isDesktop(windowWidth) ? width : '90%'}
        >
            <ShippingListContainer>
                <Title>배송지</Title>
                <ShippingListWrapper>
                    <CategoryBox>
                        <CheckBox></CheckBox>
                        <Receiver>
                            <p>받으시는 분</p>
                        </Receiver>
                        <Address>
                            <p>주소</p>
                        </Address>
                        <Contact>
                            <p>연락처</p>
                        </Contact>
                        <Blank></Blank>
                    </CategoryBox>
                    {shippingData ? (
                        <>
                            {shippingData.defaultAddress && (
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
                                    <Receiver>
                                        <DefaultAddress>기본</DefaultAddress>
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
                                    <Blank></Blank>
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
                                                <Receiver>
                                                    {receiverName}
                                                </Receiver>
                                                <Address>
                                                    {receiverAddress}{' '}
                                                    {receiverDetailAddress}
                                                </Address>
                                                <Contact>
                                                    {receiverContact1}
                                                </Contact>
                                                <Blank></Blank>
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

                <ButtonWrapper>
                    {shippingData && (
                        <>
                            <CancelButton
                                onClick={() => {
                                    setIsShippingListModal((prev) => !prev);
                                }}
                            >
                                취소
                            </CancelButton>
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
                </ButtonWrapper>
            </ShippingListContainer>
        </Modal>
    );
};

export default ShippingListModal;
