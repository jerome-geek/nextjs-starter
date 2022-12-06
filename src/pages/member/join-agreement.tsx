import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { pipe, map, toArray, filter, every } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';
import { NextSeo } from 'next-seo';

import JoinLayout from 'components/Layout/JoinLayout';
import Checkbox from 'components/Input/Checkbox';
import PrimaryButton from 'components/Button/PrimaryButton';
import { SHOPBY_TERMS_TYPES, VC_TERMS_TYPES } from 'models';
import media from 'utils/styles/media';
import { isDesktop } from 'utils/styles/responsive';
import PATHS from 'const/paths';
import ArrowRightIcon from 'assets/icons/arrow_right.svg';

interface Agreement {
    id: SHOPBY_TERMS_TYPES | VC_TERMS_TYPES;
    name: string;
    isChecked: boolean;
}

const NextButton = styled(PrimaryButton)`
    width: 100%;
    letter-spacing: -0.64px;

    ${media.medium} {
        padding-top: 15px;
        padding-bottom: 15px;
        letter-spacing: -0.8px;
    }
`;

const JoinAgreementTermList = styled.ul`
    padding-top: 34px;
    padding-bottom: 18px;
    border-bottom: 1px solid #dbdbdb;
    margin-bottom: 24px;
`;

const JoinAgreementTermListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 24px;
    margin-bottom: 10px;
`;

const JoinAgreementTermTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    color: #191919;
    letter-spacing: 0;
    text-decoration: underline;
    margin-left: 8px;
`;

const JoinAgreementDetail = styled.span`
    font-size: 10px;
    color: #8c8c8c;
    letter-spacing: 0;
    text-decoration: underline;
`;

const AllAgreeTitle = styled(JoinAgreementTermTitle)`
    text-decoration: none;
`;

const JoinAgreement = () => {
    const [agreements, setAgreements] = useState<Agreement[]>([
        {
            id: SHOPBY_TERMS_TYPES.USE,
            name: '서비스 이용약관',
            isChecked: false,
        },
        {
            id: SHOPBY_TERMS_TYPES.PI_PROCESS,
            name: '개인정보 처리방침',
            isChecked: false,
        },
        {
            id: VC_TERMS_TYPES.LOCATION_INFO,
            name: '위치정보사업 이용약관',
            isChecked: false,
        },
        {
            id: VC_TERMS_TYPES.LOCATION_SERVICE,
            name: '위치기반 서비스 이용약관',
            isChecked: false,
        },
        {
            id: VC_TERMS_TYPES.VSE,
            name: 'VSE 서비스 이용약관',
            isChecked: false,
        },
    ]);

    const router = useRouter();

    const agreeAllButton = (checked: boolean) =>
        setAgreements((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isChecked: checked })),
                toArray,
            ),
        );

    const agreeButton = (id: string) =>
        setAgreements((prev) =>
            pipe(
                prev,
                map((a) =>
                    a.id === id ? { ...a, isChecked: !a.isChecked } : a,
                ),
                toArray,
            ),
        );

    const checkIsAllChecked = () => {
        if (isAllChecked) {
            // 약관 key값만 넘길 수 있도록!
            router.push(PATHS.JOIN, {
                query: {
                    joinTermsAgreements: pipe(
                        agreements,
                        filter((a) => a.isChecked),
                        map((b) => b.id),
                        toArray,
                    ),
                },
            });
        } else {
            alert('모든 약관에 동의해주세요');
        }
    };

    const isAllChecked = useMemo(
        () => every((a) => a.isChecked, agreements),
        [agreements],
    );

    const { width } = useWindowSize();

    // TODO: 약관 자세히보기 클릭시 약관 모달 띄우기
    const onDetailClick = () => {
        console.log('onDetailClick');
    };

    return (
        <>
            <NextSeo
                title='보이스캐디 회원가입 완료'
                description='보이스캐디 회원가입 완료'
                canonical={window.location.href}
                openGraph={{
                    title: '보이스캐디 회원가입 완료',
                    locale: 'ko',
                    url: window.location.href,
                }}
            />
            <NextSeo
                title='보이스캐디 회원가입 약관 동의'
                description='보이스캐디 회원가입 약관 동의'
                canonical={window.location.href}
                openGraph={{
                    title: '보이스캐디 회원가입 약관 동의',
                    locale: 'ko',
                    url: window.location.href,
                }}
            />
            <JoinLayout
                isDesktop={isDesktop(width)}
                title={'회원가입'}
                description={
                    width > 768
                        ? '서비스 이용을 위해 약관에 동의해 주세요.'
                        : '서비스 이용을 위해 <br/>약관에 <b>동의</b>해 주세요.'
                }
            >
                <JoinAgreementTermList>
                    {agreements.map(({ id, name, isChecked }) => (
                        <JoinAgreementTermListItem key={id}>
                            <Checkbox
                                shape='square'
                                id={id}
                                onChange={() => agreeButton(id)}
                                checked={isChecked}
                            >
                                <JoinAgreementTermTitle>
                                    {name}
                                </JoinAgreementTermTitle>
                            </Checkbox>

                            {width > 768 ? (
                                <JoinAgreementDetail onClick={onDetailClick}>
                                    자세히보기
                                </JoinAgreementDetail>
                            ) : (
                                <ArrowRightIcon onClick={onDetailClick} />
                            )}
                        </JoinAgreementTermListItem>
                    ))}
                </JoinAgreementTermList>

                <div style={{ paddingBottom: '28px' }}>
                    <Checkbox
                        shape='square'
                        id='agreeAll'
                        onChange={(e) => agreeAllButton(e.target.checked)}
                        checked={isAllChecked}
                    >
                        <AllAgreeTitle>전체 동의</AllAgreeTitle>
                    </Checkbox>
                </div>

                <NextButton onClick={checkIsAllChecked}>다음</NextButton>
            </JoinLayout>
        </>
    );
};

export default JoinAgreement;
