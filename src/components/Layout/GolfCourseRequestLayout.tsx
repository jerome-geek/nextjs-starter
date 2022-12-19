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
import { GolfCourseRequestList } from 'api/etc/golfCourse';
import { map, pipe, reduce, take, toArray } from '@fxts/core';
import { COURSE_REQUEST_STATUS } from 'models';
import { useTranslation } from 'react-i18next';

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

interface GolfCourseRequestLayoutProps extends PropsWithChildren {
    courseRequestList?: GolfCourseRequestList[];
}

interface RequestStatusCount {
    [COURSE_REQUEST_STATUS: string]: number;
}

const Layout = ({
    children,
    courseRequestList,
}: GolfCourseRequestLayoutProps) => {
    const { width } = useWindowSize();
    const router = useRouter();

    const { t: vc } = useTranslation('vc');

    const isDetailLinkVisible = useMemo(
        () =>
            !isMobile(width) &&
            router.pathname !== '/golf-course/request/result',
        [width, router.pathname],
    );

    const requestStatusCount: RequestStatusCount = useMemo(
        () =>
            courseRequestList
                ? courseRequestList.reduce(
                      (acc: RequestStatusCount, cur) => {
                          acc[cur.status] += 1;
                          return acc;
                      },
                      {
                          W: 0,
                          C: 0,
                          D: 0,
                          P: 0,
                      },
                  )
                : {
                      W: 0,
                      C: 0,
                      D: 0,
                      P: 0,
                  },
        [courseRequestList],
    );

    return (
        <StyledLayout>
            <TitleContainer>
                <Title>{vc('golfCourse.result.title')}</Title>

                {/* TODO: 신청내역으로 이동 */}

                {isDetailLinkVisible && (
                    <div style={{ textAlign: 'right' }}>
                        <StyledLink href='/golf-course/request/result'>
                            {vc('golfCourse.result.detail')} <ArrowRight />
                        </StyledLink>
                    </div>
                )}
            </TitleContainer>

            <ProcessList>
                <ProcessListItem>
                    <Status>{vc('golfCourse.result.status.wait')}</Status>
                    <Count>
                        {requestStatusCount.W} <sub>{vc('golfCourse.result.cases')}</sub>
                    </Count>
                </ProcessListItem>
                <ProcessListItem>
                    <Status>{vc('golfCourse.result.status.cancel')}</Status>
                    <Count>
                        {requestStatusCount.P + requestStatusCount.C}{' '}
                        <sub>{vc('golfCourse.result.cases')}</sub>
                    </Count>
                </ProcessListItem>
                <ProcessListItem>
                    <Status>{vc('golfCourse.result.status.done')}</Status>
                    <Count>
                        {requestStatusCount.D} <sub>{vc('golfCourse.result.cases')}</sub>
                    </Count>
                </ProcessListItem>
            </ProcessList>

            <div>{children}</div>
        </StyledLayout>
    );
};

export default Layout;
