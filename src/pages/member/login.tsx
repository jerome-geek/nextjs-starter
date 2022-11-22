import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { AxiosError } from 'axios';

import { fetchProfile } from 'state/slices/memberSlice';
import { useAppDispatch } from 'state/reducers';
import FlexContainer from 'components/Common/FlexContainer';
import StyledInput from 'components/Input/StyledInput';
import Checkbox from 'components/Input/Checkbox';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import NaverIcon from 'assets/icons/sns_naver.svg';
import KakaoIcon from 'assets/icons/sns_kakao.svg';
import FacebookIcon from 'assets/icons/sns_facebook.svg';
import GoogleIcon from 'assets/icons/sns_google.svg';
import AppleIcon from 'assets/icons/sns_apple.svg';
import LoginLogo from 'assets/logo/loginLogo.png';
import { authentication } from 'api/auth';
import { shopbyTokenStorage } from 'utils/storage';
import { isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import PATHS from 'const/paths';

interface LoginFormData {
    memberId: string;
    password: string;
    keepLogin: boolean;
}

const Contiainer = styled.div`
    width: 440px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 10rem 0;

    ${media.medium} {
        width: calc(100% - 4rem);
        padding: 44px 0 160px 0;
    }
`;

const LoginInputContainer = styled.div`
    margin-bottom: 20px;
    width: 100%;
`;

const LoginInput = styled(StyledInput)`
    border: 1px solid #dbdbdb;
    width: 100%;
    padding: 10px 20px;
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    color: #191919;
    text-decoration: underline;
`;

const StyledForm = styled(FlexContainer)``;

const SocialLoginList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SocialLoginListItem = styled.li`
    margin-right: 5px;

    & > svg {
        width: 34px;
        height: 34px;

        ${media.medium} {
            width: 48px;
            height: 48px;
        }
    }
`;

const KeepLoginTitle = styled.p<{ checked: boolean }>`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: ${(props) => (props.checked ? '#222943' : '#8f8f8f')};
    margin-left: 4px;
`;

const LoginButton = styled(PrimaryButton)`
    width: 100%;
    margin-bottom: 50px;
    padding: 10px;

    ${media.medium} {
        padding: 1.25rem 0;
    }
`;

const Login = () => {
    const router = useRouter();
    const returnUrl = router.query['returnUrl'];

    const { width } = useWindowSize();

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            keepLogin: false,
        },
    });

    const onKeepLoginClick = () => setValue('keepLogin', !watch('keepLogin'));

    const dispatch = useAppDispatch();

    const onSubmit = handleSubmit(async ({ memberId, password, keepLogin }) => {
        try {
            const { data } = await authentication.issueAccessToken({
                memberId,
                password,
                keepLogin,
            });

            if (data) {
                if (
                    data.dormantMemberResponse !== null ||
                    data.dormantMemberResponse === 'M0020'
                ) {
                    // TODO: 휴면회원인 경우 로직
                } else {
                    // 휴면회원이 아닌 경우
                    if (data.daysFromLastPasswordChange > 90) {
                        // TODO: 비밀번호 90일 초과시 로직 비밀번호 변경 성공 => 로그아웃 / 비밀번호 변경 안함 => 로그인
                    } else {
                        // TODO: 비밀번호 90일 초과하지 않은 경우 로그인 처리
                        shopbyTokenStorage.setAccessToken(
                            JSON.stringify({
                                accessToken: data.accessToken,
                                expiry:
                                    new Date().getTime() + data.expireIn * 1000,
                            }),
                        );

                        dispatch(fetchProfile());

                        const pathname = (returnUrl ?? PATHS.MAIN) as string;
                        router.push({ pathname });
                    }
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setError('memberId', { message: error.response?.data.message });
                return;
            }
            alert('알수 없는 에러가 발생했습니다.');
        }
    });

    return (
        <>
            <DevTool control={control} placement='top-right' />

            <Contiainer>
                <Image
                    src={LoginLogo}
                    alt='Voice Caddie'
                    style={{ marginBottom: '50px' }}
                />
                <StyledForm as='form' onSubmit={onSubmit}>
                    <LoginInputContainer>
                        <LoginInput
                            type='text'
                            placeholder='아이디'
                            {...register('memberId', {
                                required: {
                                    value: true,
                                    message: '이메일을 입력해주세요',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='memberId'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </LoginInputContainer>

                    <LoginInputContainer>
                        <LoginInput
                            type='password'
                            placeholder='비밀번호'
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: '비밀번호를 입력해주세요',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='password'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </LoginInputContainer>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '30px',
                        }}
                    >
                        <Checkbox
                            shape='circle'
                            id='keepLogin'
                            checked={watch('keepLogin')}
                            onClick={onKeepLoginClick}
                            {...register('keepLogin')}
                        >
                            <KeepLoginTitle checked={watch('keepLogin')}>
                                로그인 상태 유지하기
                            </KeepLoginTitle>
                        </Checkbox>

                        <ul
                            style={{
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#8F8F8F',
                            }}
                        >
                            <li
                                style={{
                                    paddingRight: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => router.push(PATHS.FIND_ID)}
                            >
                                아이디 찾기
                            </li>
                            <li
                                style={{ cursor: 'pointer' }}
                                onClick={() => router.push(PATHS.FIND_PASSWORD)}
                            >
                                비밀번호 찾기
                            </li>
                        </ul>
                    </div>

                    <LoginButton>로그인</LoginButton>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: '40px',
                        }}
                    >
                        {!isMobile(width) && (
                            <p style={{ marginRight: '32px' }}>SNS 로그인</p>
                        )}
                        <SocialLoginList>
                            <SocialLoginListItem>
                                <NaverIcon />
                            </SocialLoginListItem>
                            <SocialLoginListItem>
                                <KakaoIcon />
                            </SocialLoginListItem>
                            <SocialLoginListItem>
                                <FacebookIcon />
                            </SocialLoginListItem>
                            <SocialLoginListItem>
                                <GoogleIcon />
                            </SocialLoginListItem>
                            <SocialLoginListItem>
                                <AppleIcon />
                            </SocialLoginListItem>
                        </SocialLoginList>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: '24px',
                        }}
                    >
                        <span
                            style={{
                                color: '#C3C3C3',
                                fontSize: '12px',
                                marginRight: '10px',
                            }}
                        >
                            회원이 아니신가요?
                        </span>{' '}
                        <StyledLink href={{ pathname: PATHS.JOIN_AGREEMENT }}>
                            회원가입
                        </StyledLink>
                    </div>

                    <StyledLink
                        href={{ pathname: PATHS.GUEST_LOGIN }}
                        style={{ display: 'block' }}
                    >
                        비회원 주문조회
                    </StyledLink>
                </StyledForm>
            </Contiainer>
        </>
    );
};

export default Login;
