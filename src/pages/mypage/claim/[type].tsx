import { useMemo } from 'react';
import styled from 'styled-components';
import { pipe, filter, head, isEmpty } from '@fxts/core';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { DevTool } from '@hookform/devtools';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledInput from 'components/Input/StyledInput';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { flex } from 'utils/styles/mixin';
import { useMall } from 'hooks/queries';
import useClaimOrderOptionDetail from 'hooks/queries/useClaimOrderOptionDetail';
import DropDownIcon from 'assets/icons/arrow_drop_down.svg';
import { memberClaim } from 'api/claim';
import { CLAIM_TYPE, CLAIM_REASON_TYPE } from 'models';
import { HTTP_RESPONSE } from 'const/http';
import PATHS from 'const/paths';

interface ClaimLocation {
    orderNo: string;
    orderOptionNo: string;
    type: string;
}

const ClaimContainer = styled(LayoutResponsive)`
    max-width: 840px;
    text-align: left;
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -1.2px;
    margin-bottom: 18px;
`;

const ProductContainer = styled.div`
    ${flex}
    margin-bottom: 30px;
`;

const ImageContainer = styled.div`
    padding: 0 28px;
    margin: 30px 0;
`;

const ProductInfoContainer = styled.div`
    border-left: 1px solid #dbdbdb;
    max-height: 80px;
    padding: 28px;
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.h3`
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
    color: #191919;
`;

const Option = styled.p`
    font-size: 10px;
    letter-spacing: 0;
    color: #a8a8a8;
`;

const SelectboxContainer = styled.div`
    ${flex};

    width: 100%;
    background-color: #f8f8fa;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    padding: 20px 0;

    p {
        font-size: 16px;
        letter-spacing: -0.64px;
        color: #191919;
        margin-right: 20px;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 20px;

    h3 {
        margin-bottom: 10px;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0;
        color: #191919;
    }
`;

const TitleInput = styled(StyledInput)`
    width: 100%;
    max-height: 44px;
    padding: 10px;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    resize: none;
    min-height: 156px;
    padding: 10px;

    &:focus {
        border: ${(props) => `1px solid ${props.theme.line1}`};
    }
`;

const SubmitButton = styled(PrimaryButton).attrs({ type: 'submit' })`
    ${flex};

    padding: 10px 0;
    margin: 0 auto;
`;

const Claim = () => {
    const router = useRouter();
    const { type, orderOptionNo, orderNo } =
        router.query as unknown as ClaimLocation;
    // ??????????????? ????????? ?????????????????????
    const claimList = useMemo<
        {
            type: string;
            title: string;
            selectBoxTitle: string;
            placeholder: string;
            claimType: CLAIM_TYPE;
        }[]
    >(
        () => [
            {
                type: 'inquiry',
                title: '????????????',
                selectBoxTitle: '?????? ??????',
                placeholder: '?????? ????????? ??????????????????.',
                claimType: CLAIM_TYPE.NONE,
            },
            {
                type: 'exchange',
                title: '?????? ??????',
                selectBoxTitle: '?????? ??????',
                placeholder: '?????? ?????? ????????? ??????????????????.',
                claimType: CLAIM_TYPE.EXCHANGE,
            },
            {
                type: 'return',
                title: '?????? ??????',
                selectBoxTitle: '?????? ??????',
                placeholder: '?????? ?????? ????????? ??????????????????.',
                claimType: CLAIM_TYPE.RETURN,
            },
            {
                type: 'refund',
                title: '??????/??????',
                selectBoxTitle: '?????? ??????',
                placeholder: '?????? ?????? ????????? ??????????????????.',
                claimType: CLAIM_TYPE.CANCEL,
            },
            {
                type: 'cancel-all',
                title: '????????????',
                selectBoxTitle: '?????? ??????',
                placeholder: '?????? ?????? ????????? ??????????????????.',
                claimType: CLAIM_TYPE.CANCEL,
            },
        ],
        [],
    );

    const currentClaim = useMemo(
        () =>
            pipe(
                claimList,
                filter((a) => a.type === type),
                head,
            ),
        [claimList, type],
    );

    const { data: mallInfo } = useMall();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(
        async ({ claimReasonType, title, content }) => {
            if (type === 'cancel-all') {
                await cancelAllMutation.mutateAsync({
                    orderNo: orderNo ?? null,
                    content,
                    claimReasonType: claimReasonType.value,
                });
            }

            if (type === 'return') {
                await returnMutation.mutateAsync({
                    orderOptionNo: orderOptionNo,
                    content,
                    // claimReasonType: claimReasonType.value,
                    claimReasonType,
                });
            }

            if (type === 'exchange') {
                await exchangeMutation.mutateAsync({
                    orderOptionNo: orderOptionNo,
                    content,
                    claimReasonType: claimReasonType.value,
                });
            }
        },
    );

    const detailData = useClaimOrderOptionDetail({
        orderOptionNo: orderOptionNo,
        params: {
            claimType: currentClaim?.claimType as CLAIM_TYPE,
        },
        options: {
            onError: (error) => {
                alert(error?.response?.data?.message || '????????? ??????????????????.');
                router.replace('/mypage/order/list');
            },
        },
    });
    if (isEmpty(detailData)) {
        router.replace('/mypage/order/list');
    }

    // 1. ????????????

    // 2. ?????? ?????? (type === cancel-all)
    // 3. ???????????? - ????????? ?????? ?????? API??? ??????, ??????/????????? ?????? API ??????
    const cancelAllMutation = useMutation(
        async ({
            orderNo,
            content,
            claimReasonType,
        }: {
            orderNo: string;
            content: string;
            claimReasonType: CLAIM_REASON_TYPE;
        }) =>
            await memberClaim.requestCancel(orderNo, {
                claimReasonDetail: content,
                responsibleObjectType: null,
                claimType: CLAIM_TYPE.CANCEL,
                saveBankAccountInfo: false,
                claimReasonType: claimReasonType,
                // ??????????????????(?????? ???: true)(????????? ????????? ??????????????????, ??????????????? ??????????????? ????????? ?????? ???????????? ??????)
                refundsImmediately: true,
            }),
        {
            onSuccess: (response) => {
                if (response.status === HTTP_RESPONSE.HTTP_NO_CONTENT) {
                    // TODO: alert -> modal ??????
                    alert('?????? ????????? ?????????????????????');
                    router.replace(PATHS.MY_ORDER_LIST);
                }
            },
        },
    );
    // TODO: 4. ????????????
    // TODO: 5. ????????????
    const exchangeMutation = useMutation<
        AxiosResponse<{}>,
        AxiosError<ShopByErrorResponse>,
        {
            orderOptionNo: string;
            content: string;
            claimReasonType: CLAIM_REASON_TYPE;
        }
    >(
        async ({
            orderOptionNo,
            content,
            claimReasonType,
        }: {
            orderOptionNo: string;
            content: string;
            claimReasonType: CLAIM_REASON_TYPE;
        }) =>
            await memberClaim.requestExchange(orderOptionNo, {
                claimReasonDetail: content,
                productCnt: detailData.data?.originalOption.orderCnt!,
                claimReasonType,
                exchangeOption: {
                    inputTexts: [{}],
                    orderCnt: detailData.data?.originalOption.orderCnt!,
                    optionNo: detailData.data?.originalOption.optionNo!,
                    productNo: detailData.data?.originalOption.productNo!,
                    additionalProductNo:
                        detailData.data?.originalOption.additionalProductNo!,
                },
            }),
        {
            onSuccess: (response) => {
                if (response.status === HTTP_RESPONSE.HTTP_NO_CONTENT) {
                    // TODO: alert -> modal ??????
                    alert('?????? ????????? ?????????????????????');
                    router.replace(PATHS.MY_ORDER_LIST);
                }
            },
            onError: (error) => {
                alert(error?.response?.data?.message || '????????? ??????????????????.');
            },
        },
    );

    // TODO: 6. ????????????(???????????? ?????? ?????? X)
    const returnMutation = useMutation<
        AxiosResponse<{}>,
        AxiosError<ShopByErrorResponse>,
        {
            orderOptionNo: string;
            content: string;
            claimReasonType: CLAIM_REASON_TYPE;
        }
    >(
        async ({ orderOptionNo, content, claimReasonType }) =>
            await memberClaim.requestReturnOfSingleOption(orderOptionNo, {
                claimReasonDetail: content,
                claimType: CLAIM_TYPE.RETURN,
                saveBankAccountInfo: false,
                productCnt: 1, // TODO: ?????? ?????? ???????????? ??????
                claimReasonType,
            }),
        {
            onSuccess: (response) => {
                if (response.status === HTTP_RESPONSE.HTTP_NO_CONTENT) {
                    // TODO: alert -> modal ??????
                    alert('?????? ????????? ?????????????????????');
                    router.replace(PATHS.MY_ORDER_LIST);
                }
            },
            onError: (error) => {
                alert(error?.response?.data?.message || '????????? ??????????????????.');
            },
        },
    );

    return (
        <ClaimContainer>
            <DevTool control={control} placement='top-right' />

            {currentClaim && (
                <>
                    <Title>{currentClaim.title}</Title>

                    {type !== 'cancel-all' && detailData.data && (
                        <ProductContainer>
                            <ImageContainer>
                                <img
                                    src={
                                        detailData.data?.originalOption.imageUrl
                                    }
                                    alt={
                                        detailData.data?.originalOption
                                            .productName
                                    }
                                    width='150'
                                    height='150'
                                />
                            </ImageContainer>
                            <ProductInfoContainer>
                                <ProductName>
                                    {
                                        detailData.data?.originalOption
                                            .productName
                                    }
                                </ProductName>
                                <Option>{`${detailData.data?.originalOption.optionName} ${detailData.data?.originalOption.orderCnt}???`}</Option>
                            </ProductInfoContainer>
                        </ProductContainer>
                    )}

                    <form onSubmit={onSubmit}>
                        <SelectboxContainer>
                            <p>{currentClaim.selectBoxTitle}</p>
                            <div>
                                <Controller
                                    control={control}
                                    name='claimReasonType'
                                    rules={{
                                        required: {
                                            value: true,
                                            message: '????????? ??????????????????.',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isSearchable={false}
                                            options={mallInfo?.claimReasonType}
                                            placeholder={
                                                currentClaim.placeholder
                                            }
                                            components={{
                                                DropdownIndicator: (
                                                    props: DropdownIndicatorProps,
                                                ) => (
                                                    <components.DropdownIndicator
                                                        {...props}
                                                    >
                                                        <DropDownIcon />
                                                    </components.DropdownIndicator>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </SelectboxContainer>
                        <ErrorMessage
                            errors={errors}
                            name='type'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />

                        {type === 'inquiry' && (
                            <InputContainer>
                                <h3>??????</h3>
                                <TitleInput
                                    {...register('title', {
                                        required: {
                                            value: type === 'inquiry',
                                            message: '????????? ??????????????????.',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='title'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </InputContainer>
                        )}

                        <InputContainer>
                            <h3>??????</h3>
                            <StyledTextArea
                                {...register('content', {
                                    required: {
                                        value: true,
                                        message: '????????? ??????????????????.',
                                    },
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name='content'
                                render={({ message }) => (
                                    <StyledErrorMessage>
                                        {message}
                                    </StyledErrorMessage>
                                )}
                            />
                        </InputContainer>

                        <SubmitButton>?????? ??????</SubmitButton>
                    </form>
                </>
            )}
        </ClaimContainer>
    );
};

export default Claim;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['inquiry'])),
        },
    };
};
