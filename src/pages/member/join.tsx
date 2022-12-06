import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { every, pipe, map, toArray, some } from '@fxts/core';
import styled from 'styled-components';
import { DevTool } from '@hookform/devtools';
import { ErrorMessage } from '@hookform/error-message';
import { useDebounce, useWindowSize } from 'usehooks-ts';
import { useMutation } from 'react-query';
import { Oval } from 'react-loader-spinner';
import { AxiosError } from 'axios';
import { NextSeo } from 'next-seo';

import { useAppDispatch } from 'state/store';
import JoinLayout from 'components/Layout/JoinLayout';
import FlexContainer from 'components/shared/FlexContainer';
import { fetchProfile } from 'state/slices/memberSlice';
import StyledInput from 'components/Input/StyledInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import Checkbox from 'components/Input/Checkbox';
import Radiobox from 'components/Input/Radiobox';
import { profile } from 'api/member/index';
import { authentication } from 'api/auth';
import { tokenStorage } from 'utils/storage';
import media from 'utils/styles/media';
import { SEX, SHOPBY_TERMS_TYPES, VC_TERMS_TYPES } from 'models';
import { isDesktop } from 'utils/styles/responsive';
import PATHS from 'const/paths';

interface LocationState {
    joinTermsAgreements: SHOPBY_TERMS_TYPES | VC_TERMS_TYPES[];
}

interface SignUp {
    email: string;
    memberName: string;
    password: string;
    birthday: number;
    // smsAgreed: boolean;
    // directMailAgreed: boolean;
    sex: SEX;
}

interface Id {
    [id: string]: boolean | string;
}

const JoinInputContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    margin-bottom: 20px;

    & > label {
        font-size: 12px;
        line-height: 18px;
        color: #191919;
        letter-spacing: 0;
        margin-bottom: 8px;

        ${media.small} {
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -0.64px;
        }
    }
`;

const JoinInput = styled(StyledInput)`
    padding: 10px 20px;
    border: 1px solid #dbdbdb;
    letter-spacing: -0.64px;
    color: #191919;
    font-size: 16px;
    line-height: 24px;
    width: 100%;

    &::placeholder {
        font-size: 1rem;
        color: #a8a8a8;
        font-weight: normal;
    }
`;

const RadioboxContainer = styled(FlexContainer)`
    flex-wrap: nowrap;
    white-space: nowrap;
`;

const CheckBoxContainer = styled.div`
    border-top: 1px solid #dbdbdb;
    padding: 20px 0;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
        font-size: 10px;
        color: #858585;
        letter-spacing: -0.4px;
    }
`;

const CheckboxTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #191919;
    margin-left: 16px;

    ${media.medium} {
        font-size: 1rem;
    }

    ${media.small} {
        /* font-size: 14px;
        line-height: 20px; */
        letter-spacing: -0.56px;
        margin-left: 8px;
    }
`;

const MarketingList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MarketingListItem = styled.li`
    margin-right: 14px;
`;

const SignUpButton = styled(PrimaryButton)`
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    letter-spacing: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    ${media.medium} {
        padding-top: 15px;
        padding-bottom: 15px;
        letter-spacing: -0.64px;
    }
`;

const Join = () => {
    const [marketingAgreement, setMarketingAgreement] = useState([
        {
            // SMS 알림 수신 동의 여부 (nullable)
            id: 'smsAgreed',
            name: 'SMS',
            isChecked: false,
            optional: true,
        },
        {
            // 이메일 알림 수신 동의 여부 (nullable)
            id: 'directMailAgreed',
            name: '이메일',
            isChecked: false,
            optional: true,
        },
    ]);

    const isAllMarketingAgreementChecked = useMemo(
        () => every((a) => a.isChecked, marketingAgreement),
        [marketingAgreement],
    );

    const agreeMarketingAgreement = (id: string) =>
        setMarketingAgreement((prev) =>
            pipe(
                prev,
                map((a) =>
                    a.id === id ? { ...a, isChecked: !a.isChecked } : a,
                ),
                toArray,
            ),
        );

    const agreeAllMarketingAgreement = (checked: boolean) =>
        setMarketingAgreement((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isChecked: checked })),
                toArray,
            ),
        );

    const router = useRouter();
    const { joinTermsAgreements } = router.query as unknown as LocationState;

    const { width } = useWindowSize();
    const dispatch = useAppDispatch();

    const {
        register,
        watch,
        getValues,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
        control,
    } = useForm<SignUp & Id>();

    // TODO: 핸드폰 인증 로직
    // const certificatePhone = () => {
    // };

    const checkExistEmail = useDebounce(() => {
        profile
            .checkDuplicateEmail({ email: getValues('email') })
            .then((res) => {
                if (res.data?.exist) {
                    setError('email', {
                        message: '이미 존재하는 이메일 입니다.',
                    });
                } else {
                    clearErrors('email');
                }
            });
    }, 1000);

    const checkedMarketingAgreement = (id: string) =>
        pipe(
            marketingAgreement,
            some((b) => b.isChecked && b.id === id),
        );

    const { isLoading, mutateAsync: signUpMutate } = useMutation(
        async ({ email, memberName, password, birthday, sex }: SignUp) =>
            await profile.createProfile({
                email,
                memberId: email,
                memberName,
                password,
                birthday: birthday.toString(),
                smsAgreed: checkedMarketingAgreement('smsmAgreed'),
                directMailAgreed: checkedMarketingAgreement('smsAgreed'),
                joinTermsAgreements,
                sex,
            }),
    );

    const onSubmit = handleSubmit(
        async ({ email, memberName, password, birthday, sex }) => {
            try {
                await signUpMutate({
                    email,
                    memberName,
                    password,
                    birthday,
                    sex,
                });

                const { data } = await authentication.issueAccessToken({
                    memberId: email,
                    password,
                    keepLogin: false,
                });

                if (data) {
                    tokenStorage.setAccessToken(
                        JSON.stringify({
                            ...data,
                            expiry: new Date().getTime() + data.expireIn * 1000,
                        }),
                    );

                    dispatch(fetchProfile());
                    router.push(PATHS.JOIN_COMPLETED, {
                        query: {
                            memberId: email,
                        },
                    });
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                } else {
                    alert('알 수 없는 에러 발생!');
                    router.push('/');
                }
            }
        },
    );

    return (
        <>
            <NextSeo
                title='보이스캐디 회원가입'
                description='보이스캐디 회원가입'
                canonical={window.location.href}
                openGraph={{
                    title: '보이스캐디 회원가입',
                    locale: 'ko',
                    url: window.location.href,
                }}
            />
            <JoinLayout
                isDesktop={isDesktop(width)}
                title={'회원가입'}
                description={
                    isDesktop(width)
                        ? '보이스캐디의 멤버가 되어<br/>새로운 골프 라이프를 경험해 보세요.'
                        : '<b>개인정보</b>를<br /> 입력해주세요.'
                }
            >
                <form onSubmit={onSubmit}>
                    <JoinInputContainer>
                        <label htmlFor='email'>이메일</label>
                        <JoinInput
                            type='email'
                            placeholder='이메일 주소를 입력해주세요. (수신 가능 E-mail)'
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: '이메일을 입력해주세요',
                                },
                                // pattern: {
                                //     value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                                //     message:
                                //         '올바른 이메일 형식을 입력해주세요',
                                // },
                                // onChange: checkExistEmail,
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='email'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </JoinInputContainer>

                    <JoinInputContainer>
                        <label htmlFor='phone'>전화번호</label>
                        <JoinInput
                            type='phone'
                            placeholder="휴대폰 번호 '-' 제외하고 입력해 주세요."
                            {...register('phone', {
                                required: {
                                    value: true,
                                    message: '전화번호를 입력해주세요',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='phone'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </JoinInputContainer>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <JoinInputContainer style={{ marginBottom: 0 }}>
                                <label htmlFor='memberName'>이름</label>
                                <JoinInput
                                    type='text'
                                    placeholder='이름을 입력해주세요.'
                                    {...register('memberName', {
                                        required: {
                                            value: true,
                                            message: '이름을 입력해주세요',
                                        },
                                    })}
                                />
                            </JoinInputContainer>
                            <JoinInputContainer style={{ marginBottom: 0 }}>
                                <label htmlFor='sex'>성별</label>

                                <RadioboxContainer>
                                    <Radiobox
                                        id='male'
                                        value={SEX.MALE}
                                        checked={SEX.MALE === watch('sex')}
                                        {...register('sex', {
                                            required: {
                                                value: true,
                                                message: '성별을 선택해주세요.',
                                            },
                                        })}
                                    >
                                        <p>남성</p>
                                    </Radiobox>

                                    <Radiobox
                                        id='female'
                                        value={SEX.FEMALE}
                                        checked={SEX.FEMALE === watch('sex')}
                                        {...register('sex', {
                                            required: {
                                                value: true,
                                                message: '성별을 선택해주세요.',
                                            },
                                        })}
                                    >
                                        <p>여성</p>
                                    </Radiobox>
                                </RadioboxContainer>
                            </JoinInputContainer>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name='memberName'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='sex'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </div>

                    <JoinInputContainer>
                        <label htmlFor='password'>비밀번호</label>
                        <div style={{ marginBottom: '8px', width: '100%' }}>
                            <JoinInput
                                type='password'
                                id='password'
                                placeholder='비밀번호를 입력해주세요. (영문 + 숫자 + 특수문자 8~16자리)'
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: '비밀번호를 입력해주세요',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                        message:
                                            '비밀번호 형식에 맞게 입력해주세요',
                                    },
                                })}
                            />
                        </div>
                        <div>
                            <JoinInput
                                type='password'
                                placeholder='비밀번호를 다시 입력해 주세요.'
                                {...register('checkPassword', {
                                    validate: {
                                        positive: (val) =>
                                            val === getValues('password') ||
                                            '비밀번호가 일치하지 않습니다.',
                                    },
                                })}
                            />
                        </div>

                        <ErrorMessage
                            errors={errors}
                            name='password'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='checkPassword'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </JoinInputContainer>

                    <JoinInputContainer>
                        <label htmlFor='birthday'>생년월일</label>
                        <JoinInput
                            type='number'
                            placeholder='생년월일을 입력해주세요.'
                            {...register('birthday', {
                                required: {
                                    value: true,
                                    message: '생년월일을 입력해주세요',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='birthday'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </JoinInputContainer>

                    <CheckBoxContainer>
                        <Checkbox
                            shape='square'
                            checked={isAllMarketingAgreementChecked}
                            id='agreeAllMarketing'
                            onChange={(e) =>
                                agreeAllMarketingAgreement(e.target.checked)
                            }
                        >
                            <CheckboxTitle>마케팅 수신 전체 동의</CheckboxTitle>
                        </Checkbox>

                        <MarketingList>
                            {marketingAgreement.map(
                                ({ id, name, isChecked }) => (
                                    <MarketingListItem key={id}>
                                        <Checkbox
                                            shape='circle'
                                            onChange={() =>
                                                agreeMarketingAgreement(id)
                                            }
                                            checked={isChecked}
                                        >
                                            <CheckboxTitle>
                                                {name}&nbsp;
                                                <span>(선택)</span>
                                            </CheckboxTitle>
                                        </Checkbox>
                                    </MarketingListItem>
                                ),
                            )}
                        </MarketingList>
                    </CheckBoxContainer>

                    <SignUpButton type='submit' disabled={isLoading}>
                        <Oval
                            height={16}
                            width={16}
                            color='#fff'
                            visible={isLoading}
                            ariaLabel='oval-loading'
                            secondaryColor='#fff'
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                        {!isLoading && <span>회원가입</span>}
                    </SignUpButton>
                </form>
            </JoinLayout>

            <DevTool control={control} placement='top-right' />
        </>
    );
};

export default Join;
