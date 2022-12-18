import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWindowSize } from 'usehooks-ts';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';

import JoinLayout from 'components/Layout/JoinLayout';
import StyledInput from 'components/Input/StyledInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { isDesktop } from 'utils/styles/responsive';
import { guestOrder } from 'api/order';
import { ORDER_REQUEST_TYPE } from 'models';
import { shopbyTokenStorage } from 'utils/storage';
import PATHS from 'const/paths';
import { HTTP_RESPONSE } from 'const/http';

interface GuestLoginFormData {
    guestOrderNo: string;
    guestPassword: string;
}

const FlexFormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const GuestLoginInputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const GuestLoginInput = styled(StyledInput)`
    width: 100%;
    padding: 10px 20px;
    border: 1px solid #dbdbdb;
`;

const SubmitButton = styled(PrimaryButton).attrs({ type: 'submit' })`
    width: 100%;
`;

const GuestLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GuestLoginFormData>();

    const { width } = useWindowSize();

    const router = useRouter();

    const onSubmit = handleSubmit(async ({ guestOrderNo, guestPassword }) => {
        try {
            const response = await guestOrder.issueOrderToken(guestOrderNo, {
                password: guestPassword,
                orderRequestType: ORDER_REQUEST_TYPE.ALL,
            });

            if (response.status === HTTP_RESPONSE.HTTP_OK) {
                shopbyTokenStorage.setGuestToken(
                    JSON.stringify({
                        accessToken: response.data.guestToken,
                    }),
                );
                router.push(`${PATHS.GUEST_ORDER_DETAIL}/${guestOrderNo}`);
            }
        } catch (error) {
            console.log(
                '🚀 ~ file: GuestLogin.tsx ~ line 76 ~ onSubmit ~ error',
                error,
            );
        }
    });

    return (
        <>
            <JoinLayout
                title='비회원 주문 조회'
                isDesktop={isDesktop(width)}
                description={
                    '메일로 발송된 주문서의 주문번호와<br />주문시 입력한 비밀번호를 입력해주세요.'
                }
            >
                <FlexFormContainer onSubmit={onSubmit}>
                    <GuestLoginInputContainer>
                        <GuestLoginInput
                            type='text'
                            placeholder='주문번호를 입력해주세요.'
                            {...register('guestOrderNo', {
                                required: {
                                    value: true,
                                    message: '주문번호를 입력해주세요.',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='guestOrderNo'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </GuestLoginInputContainer>
                    <GuestLoginInputContainer>
                        <GuestLoginInput
                            type='password'
                            placeholder='비밀번호를 입력해주세요.'
                            {...register('guestPassword', {
                                required: {
                                    value: true,
                                    message: '비밀번호를 입력해주세요.',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='guestPassword'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </GuestLoginInputContainer>

                    <SubmitButton>조회하기</SubmitButton>
                </FlexFormContainer>
            </JoinLayout>
        </>
    );
};

export default GuestLogin;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
