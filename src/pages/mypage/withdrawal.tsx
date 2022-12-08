import { useMemo, useState } from 'react';
import { StylesConfig } from 'react-select';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';

import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import SelectBox, { customStyle } from 'components/Common/SelectBox';
import NaverIcon from 'assets/icons/sns_naver.svg';
import KakaoIcon from 'assets/icons/sns_kakao.svg';
import FacebookIcon from 'assets/icons/sns_facebook.svg';
import GoogleIcon from 'assets/icons/sns_google.svg';
import AppleIcon from 'assets/icons/sns_apple.svg';
import Checked from 'assets/icons/checkbox_square_checked.svg';
import UnChecked from 'assets/icons/checkbox_square_unchecked.svg';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { profile } from 'api/member';
import { useMember } from 'hooks';
import PATHS from 'const/paths';

const WithDrawalContainer = styled.main`
    width: 630px;
    margin: 131px auto 155px;
    color: ${(props) => props.theme.text1};
    ${media.medium} {
        margin: 16px auto 88px;
        width: 100%;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    text-align: center;
    letter-spacing: 0;
    font-size: 1.5rem;
    line-height: 36px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const Description = styled.p`
    color: ${(props) => props.theme.text2};
    line-height: 24px;
    letter-spacing: -0.64px;
    text-align: center;
    margin-bottom: 30px;
`;

const MobileDescription = styled.div`
    color: #000;
    line-height: 20px;
    letter-spacing: -0.48px;
    > p:first-child {
        margin-bottom: 12px;
    }
    margin-bottom: 60px;
`;

const WithDrawalForm = styled.form`
    width: 440px;
    margin: 0 auto;
`;

const InputContainer = styled.div`
    margin-bottom: 24px;
`;

const InputTitle = styled.p`
    font-size: 1.333rem;
    line-height: 24px;
    padding-left: 10px;
    margin-bottom: 10px;
    font-weight: 500;
`;

const WithDrawalReasonBox = styled.div`
    margin-top: -12px;
`;

const ReasonInput = styled.input`
    line-height: 24px;
    padding: 11px 17px;
    font-size: 1rem;
    line-height: 24px;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    display: block;
    width: 100%;
    margin-bottom: 10px;
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

const PasswordInput = styled(ReasonInput)`
    line-height: 24px;
    padding: 11px 17px;
    font-size: 1rem;
    line-height: 24px;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    display: block;
    width: 100%;
    margin-bottom: 10px;
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

const SocialMemberContainer = styled.section`
    margin: 75px 0 20px;
    padding-bottom: 40px;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
`;

const SocialDescription = styled.p`
    text-align: center;
    font-weight: 500;
    letter-spacing: -0.48px;
    line-height: 18px;
    margin-bottom: 12px;
`;

const SocialListContainer = styled.ul`
    display: flex;
    justify-content: center;
`;

const SocialList = styled.li`
    margin-right: 5.5px;
`;

const WithDrawalAgree = styled.label`
    margin-bottom: 28px;
    display: block;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        > p {
            margin-left: 7px;
            letter-spacing: 0;
            line-height: 18px;
        }
        > input {
            display: none;
        }
    }
    > p {
        text-align: center;
    }
`;

const WithDrawalButton = styled.button.attrs({ type: 'submit' })`
    width: 100%;
    padding: 10px 0;
    text-align: center;
    font-size: 1rem;
    line-height: 24px;
    background: ${(props) => props.theme.bg2};
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.small} {
        font-size: 1.333rem;
        letter-spacing: 0;
        padding: 15px 0;
        width: 100%;
    }
`;

const Withdrawal = () => {
    const [isDirectInput, setIsDirectInput] = useState(false);

    const { onLogOutClick } = useMember();

    const router = useRouter();

    const { t: myPageInfo } = useTranslation('myPageInfo');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<{
        reason?: string;
        password?: string;
        checkAgree: boolean;
    }>();

    const watchCheckAgree = watch('checkAgree');

    const { width } = useWindowSize();

    const withdrawalMutation = useMutation(
        async ({ reason }: { reason?: string; password?: string }) =>
            await profile.deleteProfile({ reason }),
        {
            onSuccess: (res) => {
                console.log(res);
                alert(myPageInfo('alert.successUpdateInfo'));
                onLogOutClick();
                router.push(PATHS.MAIN);
            },
            onError: () => {
                alert(myPageInfo('alert.failWithdrawal'));
            },
        },
    );

    const onSubmit = handleSubmit(async ({ reason }) => {
        withdrawalMutation.mutate({ reason });
    });

    const selectStyle = useMemo(() => {
        return {
            control: (
                provided: any,
                { menuIsOpen }: { menuIsOpen: boolean },
            ) => ({
                boxSizing: 'border-box',
                width: '100%',
                border: '1px solid #DBDBDB',
                borderBottom: menuIsOpen ? 'none' : '',
                display: 'flex',
                height: isMobile(width) ? '54px' : '44px',
                background: '#fff',
                paddingLeft: '12px',
                fontSize: isMobile(width) ? '1.333rem' : '1rem',
            }),
            option: () => ({
                height: isMobile(width) ? '54px' : '44px',
                lineHeight: isMobile(width) ? '12px' : '4px',
                width: '100%',
                boxSizing: 'border-box',
                borderBottom: 'none',
                background: '#fff',
                padding: '20px',
                paddingLeft: '21px',
                color: '#191919',
                cursor: 'pointer',
                fontWeight: 'normal',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontSize: isMobile(width) ? '1.333rem' : '1rem',
                '&:hover': {
                    borderLeft: '2px solid #c00020',
                    background: '#F0EFF4',
                    fontWeight: 'bold',
                },
            }),
        };
    }, [width]);

    const withdrawalReasonList = useMemo(
        () =>
            myPageInfo('withdrawalReasonList', {
                returnObjects: true,
            }) as string[],
        [myPageInfo],
    );

    return (
        <>
            <WithDrawalContainer>
                <Title>{myPageInfo('withdrawalTitle')}</Title>
                {isMobile(width) ? (
                    <MobileDescription
                        dangerouslySetInnerHTML={{
                            __html: myPageInfo('withdrawalMobileDescription'),
                        }}
                    />
                ) : (
                    <Description
                        dangerouslySetInnerHTML={{
                            __html: myPageInfo('withdrawalDescription'),
                        }}
                    />
                )}
                <WithDrawalForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <InputContainer>
                        {isMobile(width) && (
                            <InputTitle>
                                {myPageInfo('withdrawalReason')}
                            </InputTitle>
                        )}
                        <WithDrawalReasonBox>
                            <SelectBox
                                placeholder={myPageInfo(
                                    'placeholder.withdrawal',
                                )}
                                options={[
                                    {
                                        label: myPageInfo('changeId'),
                                        directInput: true,
                                    },
                                    {
                                        label: myPageInfo('lackOfContent'),
                                        directInput: true,
                                    },
                                    {
                                        label: myPageInfo('noProduct'),
                                        directInput: true,
                                    },
                                    {
                                        label: myPageInfo(
                                            'personalInformation',
                                        ),
                                        directInput: true,
                                    },
                                    {
                                        label: myPageInfo(
                                            'dissatisfactionService',
                                        ),
                                        directInput: true,
                                    },
                                    {
                                        label: myPageInfo('etc'),
                                        directInput: true,
                                    },
                                ]}
                                styles={{
                                    ...(customStyle as StylesConfig<
                                        any,
                                        false
                                    >),
                                    ...(selectStyle as StylesConfig<
                                        any,
                                        false
                                    >),
                                }}
                                onChange={(e) => {
                                    if (e.directInput) {
                                        setIsDirectInput(true);
                                        setValue('reason', undefined);
                                        return;
                                    } else {
                                        setIsDirectInput(false);
                                    }
                                    setValue('reason', e.label);
                                }}
                            />
                            {isDirectInput && (
                                <ReasonInput
                                    type='text'
                                    placeholder={
                                        myPageInfo(
                                            'placeholder.withdrawalReason',
                                        )!
                                    }
                                    {...register('reason', {})}
                                />
                            )}
                        </WithDrawalReasonBox>
                    </InputContainer>
                    <InputContainer>
                        {isMobile(width) && (
                            <InputTitle>{myPageInfo('password')}</InputTitle>
                        )}
                        <PasswordInput
                            type='password'
                            placeholder={
                                myPageInfo('placeholder.enterPassword')!
                            }
                            {...register('password')}
                        />
                    </InputContainer>
                    <SocialMemberContainer>
                        <SocialDescription>
                            {myPageInfo('snsDescription')}
                        </SocialDescription>
                        <SocialListContainer>
                            <SocialList>
                                <NaverIcon />
                            </SocialList>
                            <SocialList>
                                <KakaoIcon />
                            </SocialList>
                            <SocialList>
                                <FacebookIcon />
                            </SocialList>
                            <SocialList>
                                <GoogleIcon />
                            </SocialList>
                            <SocialList>
                                <AppleIcon />
                            </SocialList>
                        </SocialListContainer>
                    </SocialMemberContainer>
                    <WithDrawalAgree htmlFor='withdrawal'>
                        <div>
                            <input
                                type='checkbox'
                                id='withdrawal'
                                {...register('checkAgree', {
                                    required: {
                                        value: true,
                                        message: myPageInfo('error.notice'),
                                    },
                                })}
                            />
                            {watchCheckAgree ? <Checked /> : <UnChecked />}
                            <p>{myPageInfo('withdrawalAgree')}</p>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name='checkAgree'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </WithDrawalAgree>
                    <WithDrawalButton>
                        {myPageInfo('withdrawalButton')}
                    </WithDrawalButton>
                </WithDrawalForm>
            </WithDrawalContainer>
        </>
    );
};

export default Withdrawal;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['myPageInfo'])),
        },
    };
};
