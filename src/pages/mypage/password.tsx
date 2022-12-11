import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { useWindowSize, useDebounce } from 'usehooks-ts';
import { AxiosError } from 'axios';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { profile } from 'api/member';
import { ProfileBody } from 'models/member';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import PATHS from 'const/paths';
import { HTTP_RESPONSE } from 'const/http';

const PasswordContainer = styled.form`
    width: 440px;
    margin: 131px auto 154px;
    color: ${(props) => props.theme.text1};
    ${media.medium} {
        margin: 49px auto 88px;
        width: 100%;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    text-align: center;
    letter-spacing: -1.2px;
    font-size: 1.5rem;
    line-height: 36px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const PasswordInputContainer = styled.div`
    margin-bottom: 17px;
`;

const PasswordTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    ${media.medium} {
        justify-content: flex-start;
    }
`;

const PasswordTitle = styled.p`
    letter-spacing: 0;
    font-size: 0.75rem;
    line-height: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.text2};
    ${media.medium} {
        font-size: 1.333rem;
        color: ${(props) => props.theme.text1};
        padding-left: 10px;
        line-height: 24px;
        letter-spacing: -0.64px;
    }
`;

const PasswordTitleDescription = styled.p`
    color: ${(props) => props.theme.text2};
    line-height: 15px;
    letter-spacing: -0.4px;
    font-size: 0.375rem;
    ${media.medium} {
        font-size: 1.333rem;
        font-weight: 500;
        color: #747474;
        margin-left: 3px;
        letter-spacing: -0.64px;
    }
    ${media.custom(400)} {
        font-size: 1rem;
    }
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
    line-height: 24px;
    padding: 11px 17px;
    font-size: 1rem;
    line-height: 24px;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    display: block;
    width: 100%;
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
    &:focus {
        border: ${(props) => `1px solid ${props.theme.line2}`};
    }
    &::placeholder {
        line-height: 24px;
        color: ${(props) => props.theme.text3};
        font-size: 1rem;
        letter-spacing: -0.64px;
    }
    ${media.medium} {
        padding: 15px 20px;
        font-size: 1.333rem;
        line-height: 24px;
        &::placeholder {
            font-size: 1.333rem;
            line-height: 24px;
            letter-spacing: -0.64px;
        }
    }
`;

const PasswordUpdateButton = styled.button`
    margin-top: 30px;
    width: 100%;
    font-size: 1rem;
    color: #fff;
    background: ${(props) => props.theme.secondary};
    padding: 12px 0;
    display: block;
    line-height: 24px;
    cursor: pointer;
    ${media.medium} {
        font-size: 1.333rem;
        font-weight: 500;
        margin-top: 15vh;
    }
`;

const DeleteProfile = styled.p`
    text-align: center;
    letter-spacing: 0;
    font-size: 0.75rem;
    color: ${(props) => props.theme.text3};
    line-height: 18px;
    margin-top: 18px;
    > a {
        color: ${(props) => props.theme.text1};
        text-decoration: underline;
        font-weight: bold;
    }
    ${media.medium} {
        font-size: 1.1666rem;
        line-height: 20px;
    }
`;

const Password = () => {
    const { width } = useWindowSize();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm<
        Omit<
            ProfileBody,
            | 'firstName'
            | 'lastName'
            | 'openIdAccessToken'
            | 'ci'
            | 'recommenderId'
            | 'countryCd'
            | 'groupNo'
            | 'memberId'
        > & {
            checkNewPassword: string;
        }
    >();

    const inputPassword = watch('password');
    const inputCheckPassword = watch('checkNewPassword');

    const { t: myPageInfo } = useTranslation('myPageInfo');

    const passwordMutation = useMutation(
        async (
            updateInfoData: Omit<
                ProfileBody,
                | 'firstName'
                | 'lastName'
                | 'openIdAccessToken'
                | 'ci'
                | 'recommenderId'
                | 'countryCd'
                | 'groupNo'
                | 'memberId'
            >,
        ) => await profile.updateProfile(updateInfoData),
        {
            onSuccess: () => {
                alert(myPageInfo('alert.successUpdateInfo'));
                router.push(PATHS.MY_INFO);
            },
            onError: (error: AxiosError<{ message: string }>) => {
                alert(error.response?.data.message);
            },
        },
    );

    const onSubmit = handleSubmit(
        async ({ password: newPassword, currentPassword }) => {
            try {
                const checkPasswordResponse = await profile.checkPassword({
                    password: currentPassword,
                });

                if (
                    checkPasswordResponse.status ===
                    HTTP_RESPONSE.HTTP_NO_CONTENT
                ) {
                    await passwordMutation.mutateAsync({
                        password: newPassword,
                    });
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                } else {
                    alert(myPageInfo('alert.error'));
                }
            }
        },
    );

    const checkEmailIsSame = useDebounce(() => {
        if (inputPassword?.length === 0 || inputCheckPassword?.length === 0) {
            return;
        }
        if (inputPassword === inputCheckPassword) {
            clearErrors('checkNewPassword');
            return;
        }
        setError('checkNewPassword', {
            message: myPageInfo('error.passwordUnMatch')!,
        });
    }, 700);

    return (
        <>
            <PasswordContainer
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <Title>{myPageInfo('passwordTitle')}</Title>
                <PasswordInputContainer>
                    <PasswordTitleContainer>
                        <PasswordTitle>
                            {myPageInfo('currentPassword')}
                        </PasswordTitle>
                        <PasswordTitleDescription></PasswordTitleDescription>
                    </PasswordTitleContainer>
                    <PasswordInput
                        placeholder={myPageInfo('placeholder.currentPassword')!}
                        {...register('currentPassword')}
                    />
                </PasswordInputContainer>
                <PasswordInputContainer>
                    <PasswordTitleContainer>
                        <PasswordTitle>
                            {myPageInfo('newPassword')}
                        </PasswordTitle>
                        <PasswordTitleDescription>
                            ({myPageInfo('passwordValidation')})
                        </PasswordTitleDescription>
                    </PasswordTitleContainer>
                    <PasswordInput
                        placeholder={myPageInfo('placeholder.currentPassword')!}
                        onKeyUp={() => checkEmailIsSame()}
                        {...register('password')}
                    />
                    <PasswordInput
                        placeholder={myPageInfo('placeholder.reEnterPassword')!}
                        onKeyUp={() => checkEmailIsSame()}
                        {...register('checkNewPassword')}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='checkNewPassword'
                        render={({ message }) => (
                            <StyledErrorMessage>{message}</StyledErrorMessage>
                        )}
                    />
                </PasswordInputContainer>
                <PasswordUpdateButton>
                    {myPageInfo('updatePasswordButton')}
                </PasswordUpdateButton>
                {isMobile(width) && (
                    <DeleteProfile>
                        {myPageInfo('wantWithdrawal')},{' '}
                        <Link href={PATHS.WITHDRAWAL}>
                            {myPageInfo('here')}
                        </Link>
                        {myPageInfo('click')}
                    </DeleteProfile>
                )}
            </PasswordContainer>
        </>
    );
};

export default Password;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['myPageInfo'])),
        },
    };
};
