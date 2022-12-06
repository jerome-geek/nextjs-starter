import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';
import { head } from '@fxts/core';
import { AxiosResponse, AxiosError } from 'axios';

import FlexContainer from 'components/shared/FlexContainer';
import PrimaryButton from 'components/Button/PrimaryButton';
import media from 'utils/styles/media';
import { isDesktop } from 'utils/styles/responsive';
import { useMember } from 'hooks';
import { coupon } from 'api/promotion';
import { Coupon } from 'models/promotion';
import PATHS from 'const/paths';
import { MY_COUPON_LIST } from 'const/queryKeys';
import { ReactComponent as JoinLogo } from 'assets/logo/joinLogo.svg';
import { ReactComponent as HeaderLogo } from 'assets/logo/headerLogo.svg';
import BREAKPOINTS from 'const/breakpoints';
import { isLogin } from 'utils/users';

const JoinCompletedContainer = styled(FlexContainer)`
    flex-direction: column;
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

const MoveButton = styled(PrimaryButton)`
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    letter-spacing: 0;
    padding-top: 10px;
    padding-bottom: 10px;

    ${media.medium} {
        padding-top: 15px;
        padding-bottom: 15px;
        letter-spacing: -0.64px;
    }
`;

const JoinCompletedTitle = styled.h2`
    font-size: 1.5rem;
    line-height: 2.25rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    color: #191919;
    padding-top: 20px;
    margin-bottom: 40px;
    width: 100%;

    ${media.medium} {
        text-align: left;
        margin-bottom: 60px;
    }
`;

const JoinCompletedDescription = styled.p`
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -1px;
    text-align: center;
    margin-top: 38px;
    margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    line-height: 18px;
    color: #191919;
    text-decoration: underline;
    letter-spacing: 0;
`;

const CouponContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #dbdbdb;
    width: 90%;
    padding: 20px;
    margin-bottom: 26px;

    ${media.small} {
        width: 100%;
        margin-bottom: 24px;
    }
`;

const CouponPrice = styled.p`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const CouponTItle = styled.p`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const CouponDescription = styled.span`
    font-size: 1rem;
    color: #a8a8a8;
`;

const JoinCompleted = () => {
    const navigate = useNavigate();

    const { width } = useWindowSize();
    const { member } = useMember();

    const { data: couponData } = useQuery<
        AxiosResponse<any>,
        AxiosError,
        Coupon | undefined
    >([MY_COUPON_LIST], async () => await coupon.getUserCoupons(), {
        enabled: isLogin(),
        select: ({ data }) => head<Coupon[]>(data.items),
    });

    // react-router-dom v6부터는 generic 지원X
    const location = useLocation() as { state: { memberId: string } };

    if (!isLogin() || !location?.state?.memberId) {
        return <Navigate to={PATHS.LOGIN} replace />;
    }

    return (
        <>
            <JoinCompletedContainer>
                <JoinLogo />
                <JoinCompletedTitle
                    dangerouslySetInnerHTML={{
                        __html: isDesktop(width)
                            ? `<b>${member?.memberName}님<br />
                                보이스캐디를 이용해 주셔서
                                <br />
                                감사합니다.</b>`
                            : `<b>${member?.memberName}</b>님<br />
                                보이스캐디를 이용해 주셔서
                                <br />
                                감사합니다.`,
                    }}
                />
                {/* TODO: 신규회원 쿠폰 세팅 */}
                <CouponContainer>
                    <div>
                        <HeaderLogo />
                    </div>
                    <div>
                        <CouponPrice>30,000</CouponPrice>
                        <CouponTItle>신규회원 쿠폰</CouponTItle>
                        <CouponDescription>{`${dayjs(
                            new Date('2022-06-01'),
                        ).format(
                            'YY-MM-DD',
                        )} 까지 사용가능`}</CouponDescription>
                    </div>
                </CouponContainer>
                {couponData && (
                    <div style={{ display: 'flex' }}>
                        <div></div>
                        <div>
                            <p>{couponData.discountAmt}</p>
                            <p>{couponData.couponName}</p>
                            <p>{`${dayjs(couponData.useEndYmdt).format(
                                'YY-MM-DD',
                            )} 까지 사용가능`}</p>
                        </div>
                    </div>
                )}

                <MoveButton onClick={() => navigate(PATHS.MAIN)}>
                    쇼핑하러 가기
                </MoveButton>

                <div style={{ width: '100%' }}>
                    <JoinCompletedDescription
                        dangerouslySetInnerHTML={{
                            __html: '<b>정품 등록 시,</b><br />추가 쿠폰을 받으실 수 있습니다.',
                        }}
                    />
                    <MoveButton style={{ marginBottom: '20px' }}>
                        정품 등록하러 가기
                    </MoveButton>
                    {width > BREAKPOINTS.MEDIUM && (
                        <StyledLink to={PATHS.MAIN}>
                            메인페이지 바로가기
                        </StyledLink>
                    )}
                </div>
            </JoinCompletedContainer>
        </>
    );
};

export default JoinCompleted;
