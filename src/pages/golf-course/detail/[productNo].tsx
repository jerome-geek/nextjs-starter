import { useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { SingleValue, StylesConfig } from 'react-select';
import { QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { head, map, pipe, toArray } from '@fxts/core';

import SelectBox, { customStyle } from 'components/Common/SelectBox';
import InputWithIcon from 'components/Input/InputWithIcon';
import useProductDetail from 'hooks/queries/useProductDetail';
import media from 'utils/styles/media';
import golfCourse, { GolfCourseParams } from 'api/etc/golfCourse';
import PATHS from 'const/paths';
import { countries } from 'const/country';
import AltitudeIcon from 'assets/icons/golf_course_altitude.svg';
import CourseView from 'assets/icons/golf_course_course_view.svg';
import ShapeIcon from 'assets/icons/golf_course_shape.svg';
import ContourIcon from 'assets/icons/golf_course_contour.svg';
import FinleyRoadIcon from 'assets/icons/golf_course_finley_load.svg';
import APLIcon from 'assets/icons/golf_course_APL.svg';

const CourseContainer = styled.main`
    width: 1280px;
    margin: 118px auto 155px;
    color: ${(props) => props.theme.text1};
    ${media.custom(1280)} {
        width: 100%;
        margin: 50px 0 88px;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 36px;
    ${media.custom(1280)} {
        font-size: 1.428rem;
        letter-spacing: -1px;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const CourseTop = styled.section`
    display: flex;
    ${media.medium} {
        flex-direction: column;
        margin: 0 auto;
    }
`;

const CourseProductImageBox = styled.div`
    width: 55.625%;
    div {
        width: 50%;
        margin: 0 auto;
    }
    img {
        width: 100%;
    }
    ${media.medium} {
        margin: 0 auto;
    }
`;

const CourseProductInformation = styled.div`
    width: 44.375%;
    ${media.medium} {
        width: 100%;
    }
`;

const CourseProductName = styled.p`
    font-size: 2rem;
    letter-spacing: 0;
    color: ${(props) => props.theme.text1};
    margin-bottom: 15px;
    ${media.xlarge} {
        font-weight: 500;
        font-size: 1.859rem;
    }
    ${media.medium} {
        font-size: 2.1666rem;
    }
`;

const CourseProductDescription = styled.p`
    color: ${(props) => props.theme.text2};
    margin-bottom: 19px;
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const CourseDetailConditionForm = styled.form``;

const CourseAddressBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    > div {
        width: 31.161%;
        white-space: nowrap;
    }
    ${media.xlarge} {
        > div {
            font-size: 1.141rem;
        }
    }
    ${media.medium} {
        margin-bottom: 24px;
        > div {
            width: 32.5%;

            font-size: 1.333rem;
        }
    }
`;

const InputDetailMessage = styled.p`
    color: #8f8f8f;
    margin-bottom: 12px;
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        display: none;
    }
`;

const DetailAddressSearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 44px;
    > div {
        width: 78.697%;
        input {
            &::placeholder {
                font-weight: 400;
            }
        }
    }
    margin-bottom: 21px;
    ${media.medium} {
        height: 54px;
        margin-bottom: 30px;
    }
`;

const DetailAddressSearchButton = styled.button`
    width: 19.01%;
    background: ${(props) => props.theme.secondary};
    color: #fff;
    display: block;
    cursor: pointer;
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const CourseRequestMessage = styled.p`
    color: ${(props) => props.theme.secondary};
    font-weight: 500;
    margin-bottom: 13px;
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        margin-bottom: 11px;
        font-size: 1.1666rem;
        font-weight: bold;
        letter-spacing: -0.56px;
    }
`;

const CourseRequestButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    color: #fff;
    width: 100%;
    background: ${(props) => props.theme.secondary};
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        font-weight: bold;
    }
`;

const CourseBottom = styled.section`
    width: 100%;
    overflow-x: scroll;
`;

const CourseTable = styled.table`
    width: 1280px;
    margin-top: 106px;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    border-collapse: unset;
    border-spacing: 0;
    text-align: center;
    > thead {
        color: #767676;
        background: ${(props) => props.theme.bg2};
        tr:first-child {
            th:first-child,
            td:first-child {
                border-left: none;
            }
        }
        > tr:nth-child(1),
        tr:nth-child(2) {
            > th {
                height: 40px;
            }
        }
        /* > p {
            
        } */
    }
    th,
    td {
        height: 60px;
        border-top: ${(props) => `1px solid ${props.theme.line2}`};
        border-left: ${(props) => `1px solid ${props.theme.line2}`};
        vertical-align: middle;
    }
    tbody {
        color: ${(props) => props.theme.text2};
        th:first-child,
        td:first-child {
            border-left: none;
        }
    }
    ${media.medium} {
        margin-top: 24px;
        > thead {
            > tr:nth-child(1),
            tr:nth-child(2) {
                > th {
                    height: 30px;
                }
            }
        }
        th,
        td {
            height: 46px;
        }
    }
`;

const NoSearchResultMessage = styled.p`
    text-align: center;
    margin-top: 20px;
    color: ${(props) => props.theme.text2};
`;

const selectStyle = {
    container: (provided: any) => ({
        ...provided,
        margin: '0',
    }),
    control: (provided: any, { menuIsOpen }: { menuIsOpen: boolean }) => ({
        boxSizing: 'border-box',
        width: '100%',
        border: '1px solid #DBDBDB',
        borderBottom: menuIsOpen ? 'none' : '',
        display: 'flex',
        height: '44px',
        background: '#fff',
    }),
    menuList: () => ({
        borderLeft: '1px solid #DBDBDB',
        borderRight: '1px solid #DBDBDB',
        borderBottom: '1px solid #DBDBDB',
        borderTop: 'none',
        width: '100%',
        boxSizing: 'border-box',
        maxHeight: '220px',
        overflowY: 'scroll',
    }),
    option: () => ({
        height: '44px',
        lineHeight: '4px',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid #DBDBDB',
        background: '#fff',
        padding: '20px',
        paddingLeft: '20px',
        color: '#191919',
        cursor: 'pointer',
        fontWeight: 'normal',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '&:hover': {
            borderLeft: '2px solid #c00020',
            background: '#F0EFF4',
            fontWeight: 'bold',
        },
    }),
};

const dummyCourseData = [
    {
        product: 't8',
        country: '대한민국',
        state: '경기도',
        city: '',
        golfCourse: '1.2.3 GC',
        courseOfStudy: 'Course(6H)',
        green: 1,
        altitude: 2,
        courseView: 3,
        shape: 4,
        contour: 123,
        finleyLoad: 123,
        bunkerHazard: 12412424,
        APL: 0,
    },
    {
        product: 't8',
        country: '대한민국',
        state: '경기도',
        city: '',
        golfCourse: '1.2.3 GD',
        courseOfStudy: 'Course(8H)',
        green: 123,
        altitude: 4,
        courseView: 9,
        shape: 0,
        contour: 0,
        finleyLoad: 56,
        bunkerHazard: 6,
        APL: 7,
    },
    {
        product: 't8',
        country: '대한민국',
        state: '경기도',
        city: '',
        golfCourse: '1.2.3 GE',
        courseOfStudy: 'Course(10H)',
        green: 3,
        altitude: 41245325,
        courseView: 123,
        shape: 1,
        contour: 3,
        finleyLoad: 142,
        bunkerHazard: 123123,
        APL: 0,
    },
];

interface SelectTypes {
    label: string;
    value: string;
}

const GolfCourseDetail = () => {
    const [courseCondition, setCourseCondition] = useState<GolfCourseParams>({
        q: '',
        country: '',
        realm: 'state',
    });
    const [courseState, setCourseState] = useState<string[]>([]);
    const [courseCity, setCourseCity] = useState<string[]>([]);

    const { t: courseDetail } = useTranslation('courseDetail');

    const router = useRouter();

    const productNo = router.query['productNo'] as unknown as string;

    const productDetailData = useProductDetail({
        productNo,
    });

    useQuery(
        ['golfCourse', { courseCondition }],
        () => golfCourse.getRegion(courseCondition),
        {
            select: (res) => {
                return res.data;
            },
            onSuccess: (data) => {
                if (data.length > 0) {
                    switch (courseCondition.realm) {
                        case 'state':
                            setCourseState(data);
                            break;
                        case 'city':
                            setCourseCity(data);
                            break;
                    }
                }
            },
        },
    );

    const courseConditionHandler = (
        e: SingleValue<Partial<SelectTypes>>,
        realm?: string,
    ) => {
        switch (realm) {
            case 'state':
                setCourseCondition({
                    q: e?.value!,
                    country: e?.value!,
                    realm: 'state',
                });
                break;
            case 'city':
                setCourseCondition((prev) => {
                    return {
                        ...prev,
                        q: e?.value!,
                        realm: 'city',
                    };
                });
                break;

            default:
                break;
        }
    };

    const selectValues = useMemo<
        Array<{ realm?: string; placeholder: string; options: string[] }>
    >(
        () => [
            {
                realm: 'state',
                placeholder: courseDetail('courseAddress.country'),
                options: countries,
            },
            {
                realm: 'city',
                placeholder: courseDetail('courseAddress.state'),
                options: courseState,
            },
            {
                placeholder: courseDetail('courseAddress.city'),
                options: courseCity,
            },
        ],
        [courseDetail, courseState, courseCity],
    );

    return (
        <>
            <NextSeo
                title={`${
                    productDetailData.data?.baseInfo?.productName
                } ${courseDetail('title')}`}
                description={`${
                    productDetailData.data?.baseInfo?.productName
                } ${courseDetail('description')}`}
                canonical={`${
                    productDetailData.data?.baseInfo?.productName
                } ${courseDetail('title')}`}
                openGraph={{
                    url: `${
                        productDetailData.data?.baseInfo?.productName
                    } ${courseDetail('title')}`,
                }}
            />
            {productDetailData.data?.baseInfo && (
                <CourseContainer>
                    <Title>{courseDetail('title')}</Title>
                    <CourseTop>
                        <CourseProductImageBox>
                            <div>
                                <img
                                    src={head(
                                        productDetailData.data?.baseInfo
                                            ?.imageUrls!,
                                    )}
                                    alt={
                                        productDetailData.data?.baseInfo
                                            ?.productName
                                    }
                                />
                            </div>
                        </CourseProductImageBox>
                        <CourseProductInformation>
                            <CourseProductName>
                                {productDetailData.data?.baseInfo?.productName}
                            </CourseProductName>
                            <CourseProductDescription>
                                {
                                    productDetailData.data?.baseInfo
                                        ?.promotionText
                                }
                            </CourseProductDescription>
                            <CourseDetailConditionForm>
                                <CourseAddressBox>
                                    {selectValues.map(
                                        (
                                            { realm, placeholder, options },
                                            index,
                                        ) => {
                                            return (
                                                <SelectBox
                                                    key={realm! + index}
                                                    styles={{
                                                        ...(customStyle as StylesConfig<
                                                            Partial<SelectTypes>,
                                                            false
                                                        >),
                                                        ...(selectStyle as StylesConfig<
                                                            Partial<SelectTypes>,
                                                            false
                                                        >),
                                                    }}
                                                    options={pipe(
                                                        options,
                                                        map((a) => {
                                                            return {
                                                                label: a,
                                                                value: a,
                                                            };
                                                        }),
                                                        toArray,
                                                    )}
                                                    placeholder={placeholder}
                                                    onChange={(e) =>
                                                        courseConditionHandler(
                                                            e,
                                                            realm,
                                                        )
                                                    }
                                                />
                                            );
                                        },
                                    )}
                                </CourseAddressBox>
                                <InputDetailMessage>
                                    {courseDetail('inputDetailAddress')}
                                </InputDetailMessage>
                                <DetailAddressSearchContainer>
                                    <InputWithIcon
                                        style={{
                                            fontWeight: '400',
                                            fontSize: '16px',
                                        }}
                                        placeholder={
                                            courseDetail(
                                                'searchPlaceholder',
                                            ) as string
                                        }
                                    />
                                    <DetailAddressSearchButton>
                                        검색
                                    </DetailAddressSearchButton>
                                </DetailAddressSearchContainer>
                                <CourseRequestMessage>
                                    {courseDetail('courseRequestMessage')}
                                </CourseRequestMessage>
                                <CourseRequestButton
                                    href={`${PATHS.GOLF_COURSE_REQUEST}/main`}
                                >
                                    {courseDetail('courseRequest')}
                                </CourseRequestButton>
                            </CourseDetailConditionForm>
                        </CourseProductInformation>
                    </CourseTop>
                    <CourseBottom>
                        <CourseTable>
                            <colgroup>
                                <col width='83px' />
                                <col width='83px' />
                                <col width='83px' />
                                <col width='83px' />
                                <col width='244px' />
                                <col width='144px' />
                                <col width='70px' />
                                <col width='70px' />
                                <col width='70px' />
                                <col width='70px' />
                                <col width='70px' />
                                <col width='70px' />
                                <col width='70px' />
                                <col width='70px' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowSpan={3}>
                                        {courseDetail('courseCategory.product')}
                                    </th>
                                    <th rowSpan={3}>
                                        {courseDetail('courseCategory.country')}
                                    </th>
                                    <th rowSpan={3}>
                                        {courseDetail('courseCategory.state')}
                                    </th>
                                    <th rowSpan={3}>
                                        {courseDetail('courseCategory.city')}
                                    </th>
                                    <th rowSpan={3}>
                                        {courseDetail(
                                            'courseCategory.golfCourse',
                                        )}
                                    </th>
                                    <th rowSpan={3}>
                                        {courseDetail('courseCategory.course')}
                                    </th>
                                    <th
                                        rowSpan={2}
                                        dangerouslySetInnerHTML={{
                                            __html: courseDetail(
                                                'courseCategory.green',
                                            ),
                                        }}
                                    ></th>
                                    <th rowSpan={2}>
                                        {courseDetail(
                                            'courseCategory.altitude',
                                        )}
                                    </th>
                                    <th rowSpan={2}>
                                        {courseDetail(
                                            'courseCategory.courseView',
                                        )}
                                    </th>
                                    <th rowSpan={1} colSpan={2}>
                                        {courseDetail(
                                            'courseCategory.greenView',
                                        )}
                                    </th>
                                    <th
                                        rowSpan={2}
                                        dangerouslySetInnerHTML={{
                                            __html: courseDetail(
                                                'courseCategory.finleyLoad',
                                            ),
                                        }}
                                    ></th>
                                    <th
                                        rowSpan={2}
                                        dangerouslySetInnerHTML={{
                                            __html: courseDetail(
                                                'courseCategory.hazard',
                                            ),
                                        }}
                                    ></th>
                                    <th rowSpan={2}>APL</th>
                                </tr>
                                <tr>
                                    <th>형태</th>
                                    <th>등고</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>
                                        <AltitudeIcon />
                                    </th>
                                    <th>
                                        <CourseView />
                                    </th>
                                    <th>
                                        <ShapeIcon />
                                    </th>
                                    <th>
                                        <ContourIcon />
                                    </th>
                                    <th>
                                        <FinleyRoadIcon />
                                    </th>
                                    <th>
                                        <Image
                                            src={
                                                '/images/golf_course_hazard.svg'
                                            }
                                            width='30'
                                            height='30'
                                            alt='hazard'
                                            style={{
                                                width: 'auto',
                                                objectFit: 'scale-down',
                                                objectPosition: '0px 2px',
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <APLIcon />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyCourseData.length > 0 &&
                                    dummyCourseData.map(
                                        (
                                            {
                                                product,
                                                country,
                                                state,
                                                city,
                                                golfCourse,
                                                courseOfStudy,
                                                green,
                                                altitude,
                                                courseView,
                                                shape,
                                                contour,
                                                finleyLoad,
                                                bunkerHazard,
                                                APL,
                                            },
                                            index,
                                        ) => {
                                            return (
                                                <tr key={golfCourse + index}>
                                                    <td>{product}</td>
                                                    <td>{country}</td>
                                                    <td>{state}</td>
                                                    <td>{city}</td>
                                                    <td>{golfCourse}</td>
                                                    <td>{courseOfStudy}</td>
                                                    <td>{green}</td>
                                                    <td>{altitude}</td>
                                                    <td>{courseView}</td>
                                                    <td>{shape}</td>
                                                    <td>{contour}</td>
                                                    <td>{finleyLoad}</td>
                                                    <td>{bunkerHazard}</td>
                                                    <td>{APL}</td>
                                                </tr>
                                            );
                                        },
                                    )}
                            </tbody>
                        </CourseTable>
                    </CourseBottom>
                    {dummyCourseData.length === 0 && (
                        <NoSearchResultMessage>
                            {courseDetail('noSearchMessage')}
                        </NoSearchResultMessage>
                    )}
                </CourseContainer>
            )}
        </>
    );
};

export default GolfCourseDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    return {
        props: {
            //TODO dehydratedState: dehydrate(queryClient), 에러 수정
            ...(await serverSideTranslations(context.locale!, [
                'courseDetail',
            ])),
        },
    };
};
