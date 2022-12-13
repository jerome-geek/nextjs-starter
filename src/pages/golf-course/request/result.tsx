import React from 'react';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dayjs from 'dayjs';

import GolfCourseRequestLayout from 'components/Layout/GolfCourseRequestLayout';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { useQuery } from 'react-query';
import golfCourse from 'api/etc/golfCourse';
import { useTypedSelector } from 'state/store';
import { COURSE_REQUEST_STATUS } from 'models';

const NoticeContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
`;

const RequestList = styled.ul`
    text-align: center;
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
    margin-bottom: 40px;
`;

const RequestListHeaderItem = styled.li`
    padding: 20px 0;
    display: flex;
    align-items: center;
    background-color: #f8f8fa;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #191919;

    p {
        flex: 1;
    }
`;

const RequestListItem = styled(RequestListHeaderItem)`
    background-color: #fff;
    color: #858585;
    letter-spacing: -0.64px;
    font-weight: 300;

    &:not(:last-of-type) {
        border-bottom: 1px solid #dbdbdb;
    }

    ${media.medium} {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const RequestStatus = styled.p<{ status: string }>`
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;

    color: ${(props) => {
        switch (props.status) {
            case 'W':
                return '#999';
            case 'C':
                return `${props.theme.primary}`;
            case 'D':
                return '#508CFE';
            case 'P':
                return '#191919';
        }
    }};
`;

const RequestDt = styled.p`
    font-weight: 200;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0;
    color: #191919;
`;

const NoticeTitle = styled.h3`
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    padding: 15px 24px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;

    ${media.medium} {
        padding: 10px 10px;
    }
`;

const NoticeList = styled.ul`
    padding: 15px 24px;

    font-size: 12px;
    line-height: 18px;

    ${media.xlarge} {
        font-size: 0.858rem;
    }
    ${media.medium} {
        padding: 10px 10px;
        font-size: 0.8333rem;
    }
`;

const NoticeListItem = styled.li`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: #191919;

    ${media.medium} {
        font-size: 10px;
        line-height: 16px;
    }
`;

const statusText = (status: COURSE_REQUEST_STATUS) => {
    switch (status) {
        case COURSE_REQUEST_STATUS.W:
            return '대기';
        case COURSE_REQUEST_STATUS.C:
            return `취소`;
        case COURSE_REQUEST_STATUS.D:
            return '완료';
        case COURSE_REQUEST_STATUS.P:
            return '중복 취소';
    }
};

const Result = () => {
    const { width } = useWindowSize();
    const { t: courseList } = useTranslation('courseList');

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const requestListQuery = useQuery(
        ['golfCourseList', { memberNo: member?.memberNo }],
        () => golfCourse.getCourseRequestList(member?.memberNo!),
        { enabled: !!member?.memberNo, select: (res) => res.data },
    );

    const noticeContentList = courseList('notice.content', {
        returnObjects: true,
    }) as Array<string>;

    return (
        <GolfCourseRequestLayout courseRequestList={requestListQuery.data}>
            <section>
                <RequestList>
                    {!isMobile(width) && (
                        <RequestListHeaderItem>
                            <p>상태</p>
                            <p>제목</p>
                            <p>등록일</p>
                        </RequestListHeaderItem>
                    )}

                    {requestListQuery.data &&
                    requestListQuery.data.length > 0 ? (
                        requestListQuery.data.map((request) => {
                            return (
                                <React.Fragment key={request.sno}>
                                    {!isMobile(width) ? (
                                        <RequestListItem>
                                            <RequestStatus
                                                status={request.status}
                                            >
                                                {statusText(request.status)}
                                            </RequestStatus>
                                            <p>{request.requestTitle}</p>
                                            <RequestDt>
                                                {dayjs(request.regDt).format(
                                                    'YY-MM-DD',
                                                )}
                                            </RequestDt>
                                        </RequestListItem>
                                    ) : (
                                        <RequestListItem>
                                            <RequestStatus
                                                status={request.status}
                                            >
                                                {statusText(request.status)}
                                            </RequestStatus>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    color: '#191919',
                                                }}
                                            >
                                                <span>
                                                    {request.requestTitle}
                                                </span>
                                                <span
                                                    style={{ fontSize: '10px' }}
                                                >
                                                    {dayjs(
                                                        request.regDt,
                                                    ).format('YY-MM-DD')}
                                                </span>
                                            </div>
                                        </RequestListItem>
                                    )}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <li>요청하신 골프 리스트가 없습니다.</li>
                    )}
                </RequestList>

                {/* <ul>
                {!isMobile(width) ? (
                    <>
                        <CourseList>
                            <CourseListStatus status='OPEN'>
                                <p>대기</p>
                            </CourseListStatus>
                            <CourseListTitle>
                                <p>강원도 골프장</p>
                            </CourseListTitle>
                            <CourseListDate>
                                <p>22-10-11</p>
                            </CourseListDate>
                        </CourseList>
                        <CourseList>
                            <CourseListStatus status='DROP'>
                                <p>취소</p>
                            </CourseListStatus>
                            <CourseListTitle>
                                <p>강원도 골프장</p>
                            </CourseListTitle>
                            <CourseListDate>
                                <p>22-10-11</p>
                            </CourseListDate>
                        </CourseList>
                        <CourseList>
                            <CourseListStatus status='SKIP'>
                                <p>취소</p>
                            </CourseListStatus>
                            <CourseListTitle>
                                <p>강원도 골프장</p>
                            </CourseListTitle>
                            <CourseListDate>
                                <p>22-10-21</p>
                            </CourseListDate>
                        </CourseList>
                        <CourseList>
                            <CourseListStatus status='DONE'>
                                <p>완료</p>
                            </CourseListStatus>
                            <CourseListTitle>
                                <p>강원도 골프장</p>
                            </CourseListTitle>
                            <CourseListDate>
                                <p>22-10-01</p>
                            </CourseListDate>
                        </CourseList>
                    </>
                ) : (
                    <>
                        <MobileCourseList>
                            <div>
                                <CourseListStatus status='OPEN'>
                                    <p>대기</p>
                                </CourseListStatus>
                                <CourseListTitle>
                                    <p>강원도 골프장</p>
                                </CourseListTitle>
                            </div>
                            <div>
                                <CourseListDate>
                                    <p>22-10-11</p>
                                </CourseListDate>
                            </div>
                        </MobileCourseList>
                        <MobileCourseList>
                            <div>
                                <CourseListStatus status='DROP'>
                                    <p>취소</p>
                                </CourseListStatus>
                                <CourseListTitle>
                                    <p>강원도 골프장</p>
                                </CourseListTitle>
                            </div>
                            <div>
                                <CourseListDate>
                                    <p>22-10-11</p>
                                </CourseListDate>
                            </div>
                        </MobileCourseList>
                        <MobileCourseList>
                            <div>
                                <CourseListStatus status='SKIP'>
                                    <p>취소</p>
                                </CourseListStatus>
                                <CourseListTitle>
                                    <p>강원도 골프장</p>
                                </CourseListTitle>
                            </div>
                            <div>
                                <CourseListDate>
                                    <p>22-10-21</p>
                                </CourseListDate>
                            </div>
                        </MobileCourseList>
                        <MobileCourseList>
                            <div>
                                <CourseListStatus status='DONE'>
                                    <p>완료</p>
                                </CourseListStatus>
                                <CourseListTitle>
                                    <p>강원도 골프장</p>
                                </CourseListTitle>
                            </div>
                            <div>
                                <CourseListDate>
                                    <p>22-10-01</p>
                                </CourseListDate>
                            </div>
                        </MobileCourseList>
                    </>
                )}
            </ul> */}

                <NoticeContainer>
                    <NoticeTitle>{courseList('notice.title')}</NoticeTitle>
                    <NoticeList>
                        {noticeContentList.map((text) => {
                            return (
                                <NoticeListItem key={text}>
                                    {text}
                                </NoticeListItem>
                            );
                        })}
                    </NoticeList>
                </NoticeContainer>
            </section>
        </GolfCourseRequestLayout>
    );
};

export default Result;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            //TODO dehydratedState: dehydrate(queryClient), 에러 수정
            ...(await serverSideTranslations(context.locale!, ['courseList'])),
        },
    };
};
