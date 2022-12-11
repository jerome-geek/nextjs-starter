import { useMemo, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import ArrowRight from 'assets/icons/arrow_right_small.svg';
import media from 'utils/styles/media';
import { flex } from 'utils/styles/mixin';
import { isMobile } from 'utils/styles/responsive';

const StyledLayout = styled(LayoutResponsive)`
    text-align: left;
    max-width: 840px;
`;

const TitleContainer = styled.div`
    margin-bottom: 10px;
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -1.2px;
    color: #191919;

    ${media.medium} {
        font-size: 20px;
        line-height: 30px;
        letter-spacing: -1px;
    }
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: #999999;
`;

const ProcessList = styled.ul`
    width: 100%;
    background: ${(props) => props.theme.bg2};
    padding: 20px 0;
    ${flex}
    margin-bottom: 40px;
`;

const ProcessListItem = styled.li`
    border-right: ${(props) => `1px dashed ${props.theme.line2}`};
    flex: 1 33%;
    width: 33.333%;

    ${flex}
    flex-direction: column;

    &:last-child {
        border-right: none;
    }
`;

const Status = styled.p`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    margin-bottom: 10px;
    color: #999999;
`;

const Count = styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    ${media.medium} {
        font-size: 1.666rem;
    }

    sub {
        font-weight: 400;
        margin: 0 0 3px 8px;
        color: ${(props) => props.theme.text3};
        font-size: 0.75rem;
        ${media.xlarge} {
            font-size: 0.857rem;
        }
        ${media.medium} {
            font-size: 1rem;
        }
    }
`;

const Layout = ({ children }: PropsWithChildren) => {
    const { width } = useWindowSize();
    const router = useRouter();

    const isDetailLinkVisible = useMemo(
        () =>
            !isMobile(width) &&
            router.pathname !== '/golf-course/request/result',
        [width, router.pathname],
    );

    return (
        <StyledLayout>
            <TitleContainer>
                <Title>나의 요청 결과</Title>
                {/* TODO: 신청내역으로 이동 */}

                {isDetailLinkVisible && (
                    <div style={{ textAlign: 'right' }}>
                        <StyledLink href='/golf-course/request/result'>
                            자세히 <ArrowRight />
                        </StyledLink>
                    </div>
                )}
            </TitleContainer>

            <ProcessList>
                <ProcessListItem>
                    <Status>대기</Status>
                    <Count>
                        2 <sub>건</sub>
                    </Count>
                </ProcessListItem>
                <ProcessListItem>
                    <Status>취소</Status>
                    <Count>
                        1 <sub>건</sub>
                    </Count>
                </ProcessListItem>
                <ProcessListItem>
                    <Status>완료</Status>
                    <Count>
                        1 <sub>건</sub>
                    </Count>
                </ProcessListItem>
            </ProcessList>

            <div>{children}</div>
        </StyledLayout>
    );
};

export default Layout;
