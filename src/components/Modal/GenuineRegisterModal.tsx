import { useQuery } from 'react-query';
import { GroupBase, StylesConfig } from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';
import { head } from '@fxts/core';
import Image from 'next/image';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import MobileModal from 'components/Modal/MobileModal';
import StyledInput from 'components/Input/StyledInput';
import SelectBox, { customStyle } from 'components/Common/SelectBox';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import LogoBlack from 'assets/logo/headerLogo.svg';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { board } from 'api/manage';
import BOARD from 'const/board';

const ModalContainer = styled.div`
    width: 100%;
    padding: 60px 78px;
    text-align: center;
    ${media.medium} {
        padding: 38px 24px;
        overflow-y: auto;
    }
`;

const LogoContainer = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 18px;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
    width: 100%;
    margin-bottom: 40px;
    ${media.medium} {
        margin-bottom: 20px;
    }
`;

const Description = styled.p`
    font-size: 1rem;
    color: #8f8f8f;
    margin-bottom: 30px;
    line-height: 24px;
    ${media.medium} {
        margin-bottom: 11px;
        text-align: left;
        font-size: 1.666rem;
        line-height: 29px;
        letter-spacing: -1px;
        color: ${(props) => props.theme.text1};
    }
`;

const RegisterForm = styled.form`
    text-align: left;
    > div {
        display: flex;
        justify-content: space-between;
    }
    ${media.medium} {
        > div {
            flex-direction: column;
            align-items: center;
        }
    }
`;

const RegisterFormInputContainer = styled.div`
    width: 330px;
    ${media.medium} {
        width: 100%;
    }
`;

const RegisterFormImageContainer = styled.div`
    width: 240px;
    text-align: center;
`;

const SerialNoDescription = styled.p`
    font-size: 10px;
    line-height: 14px;
    letter-spacing: -0.36px;
    color: ${(props) => props.theme.text3};
    font-weight: 300;
`;

const RegisterInputContainer = styled.div`
    margin-bottom: 15px;
    width: 100%;
    ${media.medium} {
        margin-bottom: 20px;
        > label {
            font-size: 1.333rem;
            letter-spacing: -0.64px;
            line-height: 24px;
            display: block;
        }
    }
`;

const RegisterInput = styled(StyledInput)`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    display: block;
    width: 100%;
    min-height: 44px;
    padding: 0 15px;
    &::placeholder {
        font-weight: 400;
        color: ${(props) => props.theme.text2};
        font-size: 1rem;
        line-height: 24px;
        letter-spacing: -0.64px;
    }
    ${media.medium} {
        &::placeholder {
            font-size: 1.333rem;
        }
    }
`;

const MobileRegisterContainer = styled.div``;

const RegisterInputLabel = styled.label`
    font-size: 0.75rem;
    letter-spacing: -0.48px;
    line-height: 18px;
    margin-bottom: 10px;
    display: block;
    ${media.medium} {
        font-size: 1.333rem;
        letter-spacing: -0.64px;
        line-height: 24px;
        display: block;
    }
`;

const MobileRegisterInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    > img {
        width: 36%;
    }
    > div {
        width: 62%;
    }
`;

const RegisterButton = styled.button`
    color: #fff;
    background: ${(props) => props.theme.secondary};
    width: 436px;
    padding: 10px 0;
    line-height: 24px;
    font-size: 1rem;
    margin-top: 30px;
    ${media.medium} {
        width: 100%;
    }
`;

interface GenuineRegisterType {
    categoryNo: string;
    productNo: string;
    serialNo: string;
}

const GenuineRegisterModal = ({
    width,
    height,
    onClickToggleModal,
}: ModalDefaultType) => {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<GenuineRegisterType>();

    const categoryWatch = watch('categoryNo');
    const productWatch = watch('productNo');

    const registerCategoryQuery = useQuery(
        ['genuineRegisterCategories'],
        async () => await board.getCategories(BOARD.GENUINE_REGISTER),
        { select: (res) => res.data },
    );

    const registerProductQuery = useQuery(
        [
            'genuineRegisterProducts',
            {
                category: categoryWatch,
            },
        ],
        async () =>
            await board.getArticlesByBoardNo(categoryWatch, {
                categoryNo: parseInt(categoryWatch) ?? 0,
                hasTotalCount: false,
                pageSize: null as unknown as number,
                pageNumber: 1,
            }),
        {
            select: (res) => res.data.items,
            enabled: !!categoryWatch,
        },
    );

    const productDetailQuery = useQuery(
        [
            'genuineRegisterProductDetail',
            {
                product: productWatch,
            },
        ],
        async () =>
            await board.getArticleDetail(BOARD.GENUINE_REGISTER, productWatch),
        { select: (res) => res.data, enabled: !!productWatch },
    );

    const { width: screenWidth } = useWindowSize();

    const selectBoxStyle: StylesConfig<any, false, GroupBase<any>> = {
        ...(customStyle as StylesConfig<any, false>),
        container: (provided: any) => ({
            ...provided,
            marginBottom: `${isMobile(screenWidth) ? '0' : '10px'}`,
            boxSizing: 'border-box',
            width: '100%',
        }),
        control: (provided: any, { menuIsOpen }: { menuIsOpen: boolean }) => ({
            boxSizing: 'border-box',
            width: '100%',
            border: '1px solid #DBDBDB',
            borderBottom: menuIsOpen ? 'none' : '',
            display: 'flex',
            height: `${isMobile(screenWidth) ? '54px' : '44px'}`,
            paddingLeft: '5px',
            cursor: 'pointer',
            fontSize: '16px',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            fontWeight: 'normal',
            fontSize: '16px',
        }),
        option: () => ({
            width: '100%',
            boxSizing: 'border-box',
            background: '#fff',
            padding: '15px 20px',
            paddingLeft: '20px',
            color: '#191919',
            cursor: 'pointer',
            height: `${isMobile(screenWidth) ? '54px' : '44px'}`,
            lineHeight: isMobile(screenWidth) ? '24px' : '14px',
            fontSize: '16px',
            '&:hover': {
                borderLeft: '2px solid #c00020',
                background: '#F0EFF4',
                fontWeight: 'bold',
            },
        }),
    };

    const onSubmit = handleSubmit(async () => {
        try {
            alert('등록이 완료됐습니다.');
            onClickToggleModal();
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            {isMobile(screenWidth) ? (
                <MobileModal
                    onClickToggleModal={onClickToggleModal}
                    title={'정품 등록하기'}
                >
                    <ModalContainer>
                        <LogoContainer>
                            <LogoBlack />
                        </LogoContainer>
                        <Description>
                            보이스 캐디 제품을 등록하고
                            <br />
                            다양한 혜택을 받아보세요!
                        </Description>
                        <RegisterForm>
                            <div>
                                <RegisterFormInputContainer>
                                    <RegisterInputContainer>
                                        <RegisterInputLabel>
                                            카테고리
                                        </RegisterInputLabel>
                                        <Controller
                                            control={control}
                                            name='categoryNo'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        '카테고리를 선택해주세요.',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <SelectBox<any>
                                                    isSearchable={false}
                                                    options={
                                                        registerCategoryQuery?.data &&
                                                        registerCategoryQuery.data.map(
                                                            ({
                                                                categoryNo,
                                                                label,
                                                            }) => {
                                                                return {
                                                                    value: categoryNo,
                                                                    label,
                                                                };
                                                            },
                                                        )
                                                    }
                                                    placeholder={
                                                        '카테고리를 선택해주세요'
                                                    }
                                                    styles={{
                                                        ...selectBoxStyle,
                                                    }}
                                                    onChange={(e) =>
                                                        field.onChange(e?.value)
                                                    }
                                                />
                                            )}
                                        />
                                    </RegisterInputContainer>
                                    <ErrorMessage
                                        errors={errors}
                                        name='categoryNo'
                                        render={({ message }) => (
                                            <StyledErrorMessage>
                                                {message}
                                            </StyledErrorMessage>
                                        )}
                                    />
                                    <RegisterInputContainer>
                                        <RegisterInputLabel>
                                            제품
                                        </RegisterInputLabel>
                                        <Controller
                                            control={control}
                                            name='productNo'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        '제품명을 선택해주세요.',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <SelectBox
                                                    isSearchable={false}
                                                    options={
                                                        registerProductQuery.data &&
                                                        registerProductQuery.data.map(
                                                            ({
                                                                title,
                                                                articleNo,
                                                            }) => {
                                                                return {
                                                                    label: title,
                                                                    value: articleNo,
                                                                };
                                                            },
                                                        )
                                                    }
                                                    placeholder={
                                                        '제품명을 선택해주세요'
                                                    }
                                                    styles={{
                                                        ...selectBoxStyle,
                                                    }}
                                                    onChange={(e) =>
                                                        field.onChange(e.value)
                                                    }
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name='productNo'
                                            render={({ message }) => (
                                                <StyledErrorMessage>
                                                    {message}
                                                </StyledErrorMessage>
                                            )}
                                        />
                                    </RegisterInputContainer>
                                    <MobileRegisterContainer>
                                        <RegisterInputLabel>
                                            시리얼번호
                                        </RegisterInputLabel>
                                        <MobileRegisterInputContainer>
                                            <img
                                                src={
                                                    productDetailQuery.data
                                                        ?.attachments.length
                                                        ? head(
                                                              productDetailQuery
                                                                  .data
                                                                  .attachments,
                                                          )!.uploadedFileName
                                                        : ''
                                                }
                                                alt=''
                                            />
                                            <RegisterInputContainer>
                                                <RegisterInput
                                                    {...register('serialNo', {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                '시리얼 번호를 입력해주세요',
                                                        },
                                                    })}
                                                    placeholder='시리얼 번호를 입력해주세요.'
                                                />
                                                <SerialNoDescription>
                                                    이미지의 표시된 영역에서
                                                    <br />
                                                    시리얼번호를 확인할 수
                                                    있습니다.
                                                </SerialNoDescription>
                                            </RegisterInputContainer>
                                        </MobileRegisterInputContainer>
                                    </MobileRegisterContainer>
                                    <ErrorMessage
                                        errors={errors}
                                        name='serialNo'
                                        render={({ message }) => (
                                            <StyledErrorMessage>
                                                {message}
                                            </StyledErrorMessage>
                                        )}
                                    />
                                </RegisterFormInputContainer>
                            </div>
                        </RegisterForm>
                        <RegisterButton onClick={() => onSubmit()}>
                            정품 등록
                        </RegisterButton>
                    </ModalContainer>
                </MobileModal>
            ) : (
                <Modal
                    onClickToggleModal={onClickToggleModal}
                    width={width}
                    height={height}
                >
                    <ModalContainer>
                        <Title>정품 등록하기</Title>
                        <Description>
                            보이스 캐디 제품을 등록하고
                            <br />
                            다양한 혜택을 받아보세요!
                        </Description>
                        <RegisterForm>
                            <div>
                                <RegisterFormInputContainer>
                                    <RegisterInputContainer>
                                        <RegisterInputLabel>
                                            카테고리
                                        </RegisterInputLabel>
                                        <Controller
                                            control={control}
                                            name='categoryNo'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        '카테고리를 선택해주세요.',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <SelectBox<any>
                                                    isSearchable={false}
                                                    options={
                                                        registerCategoryQuery?.data &&
                                                        registerCategoryQuery.data.map(
                                                            ({
                                                                categoryNo,
                                                                label,
                                                            }) => {
                                                                return {
                                                                    value: categoryNo,
                                                                    label,
                                                                };
                                                            },
                                                        )
                                                    }
                                                    placeholder={
                                                        '카테고리를 선택해주세요'
                                                    }
                                                    styles={{
                                                        ...selectBoxStyle,
                                                    }}
                                                    onChange={(e) =>
                                                        field.onChange(e?.value)
                                                    }
                                                />
                                            )}
                                        />
                                    </RegisterInputContainer>
                                    <ErrorMessage
                                        errors={errors}
                                        name='categoryNo'
                                        render={({ message }) => (
                                            <StyledErrorMessage>
                                                {message}
                                            </StyledErrorMessage>
                                        )}
                                    />
                                    <RegisterInputContainer>
                                        <RegisterInputLabel>
                                            제품
                                        </RegisterInputLabel>
                                        <Controller
                                            control={control}
                                            name='productNo'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        '제품명을 선택해주세요.',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <SelectBox
                                                    isSearchable={false}
                                                    options={
                                                        registerProductQuery.data &&
                                                        registerProductQuery.data.map(
                                                            ({
                                                                title,
                                                                articleNo,
                                                            }) => {
                                                                return {
                                                                    label: title,
                                                                    value: articleNo,
                                                                };
                                                            },
                                                        )
                                                    }
                                                    placeholder={
                                                        '제품명을 선택해주세요'
                                                    }
                                                    styles={{
                                                        ...selectBoxStyle,
                                                    }}
                                                    onChange={(e) =>
                                                        field.onChange(e.value)
                                                    }
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name='productNo'
                                            render={({ message }) => (
                                                <StyledErrorMessage>
                                                    {message}
                                                </StyledErrorMessage>
                                            )}
                                        />
                                    </RegisterInputContainer>
                                    <RegisterInputContainer>
                                        <RegisterInputLabel>
                                            시리얼번호
                                        </RegisterInputLabel>
                                        <RegisterInput
                                            {...register('serialNo', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        '시리얼 번호를 입력해주세요',
                                                },
                                            })}
                                            placeholder='시리얼 번호를 입력해주세요.'
                                        />
                                    </RegisterInputContainer>
                                    <ErrorMessage
                                        errors={errors}
                                        name='serialNo'
                                        render={({ message }) => (
                                            <StyledErrorMessage>
                                                {message}
                                            </StyledErrorMessage>
                                        )}
                                    />
                                </RegisterFormInputContainer>
                                <RegisterFormImageContainer>
                                    {/* <img
                                        src={
                                            productDetailQuery.data?.attachments
                                                .length
                                                ? head(
                                                      productDetailQuery.data
                                                          .attachments,
                                                  )!.uploadedFileName
                                                : ''
                                        }
                                        alt=''
                                    /> */}
                                    <Image
                                        src={
                                            '//rlyfaazj0.toastcdn.net/20220623/164839.485302000/thumb-1583508427_3492_vc4_298x436.png'
                                        }
                                        width={222}
                                        height={222}
                                        loader={({ src }) => src}
                                        alt='example'
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <SerialNoDescription>
                                        이미지의 표시된 영역에서 시리얼번호를
                                        확인할 수 있습니다.
                                    </SerialNoDescription>
                                </RegisterFormImageContainer>
                            </div>
                        </RegisterForm>
                        <RegisterButton onClick={() => onSubmit()}>
                            정품 등록
                        </RegisterButton>
                    </ModalContainer>
                </Modal>
            )}
        </>
    );
};

export default GenuineRegisterModal;
