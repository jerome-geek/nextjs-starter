import { FormEvent, PropsWithChildren, useRef, useState } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Pagination from 'rc-pagination';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import { useAddress } from 'hooks/queries';
import { PaymentReserve } from 'models/order';
import SearchIcon from 'assets/icons/search.svg';
import 'rc-pagination/assets/index.css';

const Title = styled.h2`
    margin: 50px 0 40px;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
    width: 100%;
    padding-left: 40px;
`;

const SearchInputForm = styled.form`
    width: 100%;
    border-bottom: ${(props) => `2px solid ${props.theme.line2}`};
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 23px;
    font-size: 14px;
`;

const DescriptionContainer = styled.div`
    width: 90%;
    margin: 50px auto;
    background: ${(props) => props.theme.bg2};
    padding: 30px 20px;
`;

const DescriptionTip = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => props.theme.text1};
    margin-bottom: 25px;
`;

const DescriptionTipBox = styled.div`
    font-size: 14px;
    width: 100%;
    color: ${(props) => props.theme.text1};
    > div {
        width: 100%;
        margin-bottom: 16px;
        &:last-child {
            margin-bottom: 0;
        }
        > .desc_example {
            color: ${(props) => props.theme.text2};
            font-size: 12px;
            margin-top: 8px;
        }
    }
`;

const SearchListContainer = styled.div`
    width: 100%;
    height: 520px;
    overflow-y: auto;
    background: ${(props) => props.theme.bg2};
`;

const SearchListBox = styled.div`
    padding: 10px 20px;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    span.address_box {
        color: ${(props) => props.theme.text1};
        font-weight: bold;
        display: inline-block;
        padding: 3px 0;
        text-align: center;
        width: 48px;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        margin-right: 10px;
    }
`;

const ZipCode = styled.div`
    color: ${(props) => props.theme.text1};
    font-size: 14px;
    margin-bottom: 5px;
`;

const RoadAddress = styled.div`
    font-size: 12px;
    margin-top: 10px;
    color: ${(props) => props.theme.text2};
    &:hover {
        color: ${(props) => props.theme.text3};
        text-decoration: underline;
    }
    cursor: pointer;
`;

const JibunAddress = styled.div`
    font-size: 12px;
    margin-top: 10px;
    color: ${(props) => props.theme.text2};
    &:hover {
        color: ${(props) => props.theme.text3};
        text-decoration: underline;
    }
    cursor: pointer;
`;

const PaginationContainer = styled.div``;

const NoResultContainer = styled.div`
    width: 100%;
    padding: 50px 40px;
    div:first-child {
        color: ${(props) => props.theme.text1};
    }
    div:last-child {
        margin-top: 12px;
        font-size: 14px;
        color: ${(props) => props.theme.text2};
        line-height: 18px;
    }
`;

const SearchAddressModal = ({
    onClickToggleModal,
    width,
    height,
    setValue,
}: PropsWithChildren<ModalDefaultType> & {
    register: UseFormRegister<PaymentReserve>;
    setValue: UseFormSetValue<PaymentReserve>;
}) => {
    const searchKeyword = useRef<HTMLInputElement>(null);

    const [searchCondition, setSearchCondition] = useState({
        pageNumber: 1,
        keyword: '',
    });

    const addressData = useAddress(searchCondition);

    const onSubmitClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const keyword = searchKeyword?.current?.value;

        if (keyword && keyword.length >= 2) {
            setSearchCondition((prev) => ({
                ...prev,
                keyword,
            }));
        }
    };

    return (
        <Modal
            onClickToggleModal={onClickToggleModal}
            width={width}
            height={height}
        >
            <Title>우편번호 검색</Title>

            <SearchInputForm onSubmit={onSubmitClick}>
                <SearchInput
                    placeholder='예) 서울특별시 구로구'
                    type='search'
                    name='keyword'
                    ref={searchKeyword}
                />
                <button type='submit'>
                    <SearchIcon />
                </button>
            </SearchInputForm>

            {!addressData?.data ? (
                <DescriptionContainer>
                    <DescriptionTip>이렇게 검색해 보세요!</DescriptionTip>
                    <DescriptionTipBox>
                        <div>
                            <div>도로명 + 건물번호</div>
                            <div className='desc_example'>
                                서울특별시 강남구 테헤란로 108길 23
                            </div>
                        </div>
                        <div>
                            <div>건물명</div>
                            <div className='desc_example'>풍국빌딩</div>
                        </div>
                        <div>
                            <div>지역명(동/리) + 번지</div>
                            <div className='desc_example'>
                                서울특별시 강남구 대치동 999-4
                            </div>
                        </div>
                        <div>
                            <div>지역명(동/리) + 건물명</div>
                            <div className='desc_example'>
                                서울특별시 서초구 풍국빌딩
                            </div>
                        </div>
                    </DescriptionTipBox>
                </DescriptionContainer>
            ) : addressData.data?.totalCount > 0 ? (
                <>
                    <SearchListContainer>
                        {addressData.data?.items.map(
                            ({ zipCode, roadAddress, jibunAddress }) => {
                                return (
                                    <SearchListBox key={roadAddress}>
                                        <ZipCode>{zipCode}</ZipCode>
                                        <RoadAddress
                                            onClick={() => {
                                                setValue(
                                                    'shippingAddress.receiverZipCd',
                                                    zipCode,
                                                );
                                                setValue(
                                                    'shippingAddress.receiverAddress',
                                                    roadAddress,
                                                    {
                                                        shouldValidate: true,
                                                    },
                                                );
                                                setValue(
                                                    'shippingAddress.receiverJibunAddress',
                                                    jibunAddress,
                                                );
                                                onClickToggleModal();
                                            }}
                                        >
                                            <span className='address_box'>
                                                도로명
                                            </span>
                                            {roadAddress}
                                        </RoadAddress>
                                        <JibunAddress
                                            onClick={() => {
                                                setValue(
                                                    'shippingAddress.receiverZipCd',
                                                    zipCode,
                                                );
                                                setValue(
                                                    'shippingAddress.receiverAddress',
                                                    roadAddress,
                                                    {
                                                        shouldValidate: true,
                                                    },
                                                );
                                                setValue(
                                                    'shippingAddress.receiverJibunAddress',
                                                    jibunAddress,
                                                );
                                                onClickToggleModal();
                                            }}
                                        >
                                            <span className='address_box'>
                                                지번
                                            </span>
                                            {jibunAddress}
                                        </JibunAddress>
                                    </SearchListBox>
                                );
                            },
                        )}
                    </SearchListContainer>
                    <PaginationContainer>
                        <Pagination
                            total={addressData?.data?.totalCount}
                            defaultCurrent={searchCondition.pageNumber}
                            onChange={(current) => {
                                setSearchCondition((prev) => ({
                                    ...prev,
                                    pageNumber: current,
                                }));
                            }}
                            style={{ margin: '40px 0' }}
                        />
                    </PaginationContainer>
                </>
            ) : (
                <NoResultContainer>
                    <div>검색 결과가 없습니다.</div>
                    <div>
                        검색어에 잘못된 철자가 없는지,
                        <br />
                        정확한 주소인지 다시 한번 확인해주세요.
                    </div>
                </NoResultContainer>
            )}
        </Modal>
    );
};

export default SearchAddressModal;
