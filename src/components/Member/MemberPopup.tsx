import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import PATHS from 'const/paths';

interface MemberPopupProps extends HTMLAttributes<HTMLDivElement> {
    isLogin: boolean;
    onLoginClick: () => void;
    onLogOutClick: () => void;
}

const MemberPopupContainer = styled.div`
    width: 128px;
    height: auto;
    letter-spacing: -0.25px;
    margin-top: 10px;
    position: absolute;
    left: -60px;
    border: 1px solid #dbdbdb;
    background-color: #fff;

    &::after {
        border-color: #dbdbdb transparent;
        border-style: solid;
        border-width: 0 6px 8px 6.5px;
        content: '';
        display: block;
        position: absolute;
        top: -8px;
        left: 60px;
        width: 0;
        z-index: 1;
    }
`;

const MemberPopupList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 10px 0;
`;

const MemberPopupListItem = styled.li`
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    line-height: 14px;
    letter-spacing: 0;
    color: #191919;
    padding: 10px 30px;
    width: 100%;

    :first-child {
        border-bottom: 1px solid #dbdbdb;
    }
`;

const MemberPopup: FC<MemberPopupProps> = ({
    isLogin = false,
    onLoginClick,
    onLogOutClick,
}: MemberPopupProps) => {
    const router = useRouter();

    return (
        <MemberPopupContainer>
            <MemberPopupList>
                <MemberPopupListItem
                    // onClick={isLogin ? onLogOutClick : onLoginClick}
                    onClick={() => router.push(PATHS.LOGIN)}
                >
                    {isLogin ? '로그아웃' : '로그인'}
                </MemberPopupListItem>
                <MemberPopupListItem onClick={() => router.push(PATHS.MY_PAGE)}>
                    마이페이지
                </MemberPopupListItem>
                <MemberPopupListItem
                    onClick={() => router.push(PATHS.MY_ROUND_ANALYSIS_MAIN)}
                >
                    라운드 분석
                </MemberPopupListItem>
            </MemberPopupList>
        </MemberPopupContainer>
    );
};

export default MemberPopup;
