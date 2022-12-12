import { ChangeEvent, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { StylesConfig } from 'react-select';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWindowSize } from 'usehooks-ts';
import { every, head, pipe } from '@fxts/core';

import SelectBox, { customStyle } from 'components/Common/SelectBox';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import Loader from 'components/shared/Loader';
// import PersonalInformationModal from 'components/Modal/PersonalInformationModal';
import GolfCourseRequestLayout from 'components/Layout/GolfCourseRequestLayout';
import Checked from 'assets/icons/checkbox_square_checked.svg';
import UnChecked from 'assets/icons/checkbox_square_unchecked.svg';
import { courseRequestCountries } from 'const/country';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import upload from 'api/etc/upload';
import { useMember } from 'hooks';
import golfCourse, { AdminCourseRequestBody } from 'api/etc/golfCourse';

const CourseRequestContainer = styled.section`
    width: 100%;
    max-width: 440px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;

    ${media.medium} {
        width: calc(100% - 2rem);
        max-width: 380px;
    }
`;

const CourseRequestTitle = styled.h2`
    color: ${(props) => props.theme.text1};
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 22px;
`;

const CourseRequestDescription = styled.p`
    color: #767676;
    margin-bottom: 30px;
    line-height: 1.3;
    ${media.medium} {
        font-size: 1.166rem;
        margin-bottom: 20px;
    }
`;

const CourseRequestForm = styled.form`
    padding-top: 10px;
    margin-bottom: 32px;
    width: 100%;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
`;

const RequestInformationContainer = styled.div`
    color: ${(props) => props.theme.text1};
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    padding: 20px 0 20px;
    &:last-child {
        border-bottom: none;
    }
`;

const CourseRequestSubTitle = styled.p`
    text-align: left;
    font-weight: 500;
    letter-spacing: 0px;
    margin-bottom: 30px;
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        letter-spacing: 0.8px;
        font-weight: bold;
        font-size: 1.333rem;
        margin-bottom: 22px;
    }
`;

const CourseRequestInputContainer = styled.div`
    margin-bottom: 21px;
    > &:last-child {
        margin-bottom: 0;
    }
    div {
        text-align: left;
        font-size: 1rem;
        ${media.xlarge} {
            font-size: 1.142rem;
        }
        ${media.medium} {
            font-size: 1.333rem;
        }
    }
`;

const CourseRequestInputTitle = styled.p`
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    margin-bottom: 14px;
    text-align: left;
    font-weight: 500;
    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        margin-bottom: 11px;
    }
`;

const RequireIcon = styled.span`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${(props) => props.theme.primary};
    margin-left: 10px;
`;

const CourseRequestInput = styled.input`
    width: 100%;
    padding: 9px 21px;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    font-size: 1rem;
    &::placeholder {
        color: ${(props) => props.theme.text3};
    }
    &:focus {
        border: ${(props) => `1px solid ${props.theme.primary}`};
    }
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        padding: 14px 21px;
    }
`;

const CourseRequestTextArea = styled(CourseRequestInput)`
    min-height: 132px;
`;

const CourseRequestImageFileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 44px;
    > label {
        color: #fff;
        background: ${(props) => props.theme.secondary};
        text-align: center;
        line-height: 44px;
        width: 23.18%;
        cursor: pointer;
        > input {
            display: none;
        }
    }
    ${media.medium} {
        height: 54px;
        > label {
            line-height: 54px;
        }
    }
`;

const CourseRequestImageTitle = styled(CourseRequestInput)`
    color: ${(props) => props.theme.text1};
    width: 75%;
    background: ${(props) => props.theme.bg2};
    border: none;
`;

const AgreeTermContainer = styled.div`
    margin-bottom: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
        > label {
            display: flex;
            align-items: center;
            > p {
                margin-left: 10px;
            }
        }
        > input {
            display: none;
        }
    }
    > button {
        margin: 0;
        padding: 0;
        cursor: pointer;
        font-size: 10px;
        letter-spacing: 0;
        color: #bcbcbc;
        text-decoration: underline;
    }
    ${media.medium} {
        > button {
            display: none;
        }
    }
`;

const CourseRequestButton = styled.button`
    color: #fff;
    background: ${(props) => props.theme.secondary};
    text-align: center;
    line-height: 44px;
    width: 100%;
    font-size: 1rem;
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

interface AddNameBlob extends Blob {
    name?: string;
    lastModified?: number;
    lastModifiedDate?: string;
}

interface imagesType {
    scoreCard?: AddNameBlob;
    courseLayout?: AddNameBlob;
}

const Request = () => {
    const [isAgreeTerm, setIsAgreeTerm] = useState(false);
    const [uploadFile, setUploadFile] = useState<imagesType>();
    const [isPersonalInformationModal, setIsPersonalInformationModal] =
        useState(false);

    const { member } = useMember();

    const { t: vc } = useTranslation('vc');
    const { t: courseRequest } = useTranslation('courseRequest');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AdminCourseRequestBody & { productName: string }>({
        defaultValues: {
            memberEmail: member?.email,
            memberName: member?.memberName,
        },
    });

    const { width } = useWindowSize();

    const requestSelectStyle = useMemo(() => {
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
                '&:hover': {
                    borderLeft: '2px solid #c00020',
                    background: '#F0EFF4',
                    fontWeight: 'bold',
                },
            }),
        };
    }, [width]);

    const uploadFileHandler = (
        e: ChangeEvent<HTMLInputElement>,
        uploadFor: string,
    ) => {
        const MAX_FILE_SIZE = 10 * 1024 * 1024;

        const fileList = e.target.files;

        if (fileList) {
            const isSmallerThanMaxSize = pipe(
                fileList,
                every((a) => a.size < MAX_FILE_SIZE),
            );

            if (!isSmallerThanMaxSize) {
                alert('10MB가 넘는 파일은 등록할 수 없습니다.');
                return;
            }
            if (uploadFor === 'courseLayout') {
                setUploadFile((prev) => ({
                    ...prev,
                    courseLayout: fileList[0],
                }));
            }
            if (uploadFor === 'scoreCard') {
                setUploadFile((prev) => ({
                    ...prev,
                    scoreCard: fileList[0],
                }));
            }
        }
    };

    const courseRequestMutate = useMutation(
        async ({
            shopbyMemberNo,
            memberEmail,
            memberName,
            countryCode,
            region,
            fieldName,
            requestTitle,
            requestDetail,
            shopbyProductNo,
            scoreCardImgUrl,
            courseLayoutImgUrl,
            consentFl,
        }: AdminCourseRequestBody) =>
            await golfCourse.courseRequest({
                shopbyMemberNo,
                memberEmail,
                memberName,
                countryCode,
                region,
                fieldName,
                requestTitle,
                requestDetail,
                shopbyProductNo: 10101,
                scoreCardImgUrl,
                courseLayoutImgUrl,
                consentFl,
            }),
        {
            onSuccess: () => alert('코스 요청이 완료됐습니다.'),
            onError: () =>
                alert('코스 요청에 실패하였습니다! 다시 시도해주세요!'),
        },
    );

    const onSubmit = handleSubmit(
        async ({
            memberEmail,
            memberName,
            countryCode,
            region,
            fieldName,
            requestTitle,
            requestDetail,
            shopbyProductNo,
        }) => {
            if (!isAgreeTerm) {
                alert(courseRequest('etc.allowTermAlert'));
                return;
            }

            try {
                if (uploadFile?.scoreCard && uploadFile?.courseLayout) {
                    const scoreCardData = () => {
                        const data = new FormData();
                        data.append('file', uploadFile.scoreCard as Blob);
                        return data;
                    };
                    const courseLayoutData = () => {
                        const data = new FormData();
                        data.append('file', uploadFile.courseLayout as Blob);
                        return data;
                    };
                    await Promise.all([
                        upload.uploadImageForAdmin(scoreCardData()),
                        upload.uploadImageForAdmin(courseLayoutData()),
                    ]).then((res) => {
                        courseRequestMutate.mutate({
                            shopbyMemberNo: member?.memberNo!,
                            memberEmail,
                            memberName,
                            countryCode,
                            region,
                            fieldName,
                            requestTitle,
                            requestDetail,
                            shopbyProductNo: 10101,
                            consentFl: 'Y',
                            scoreCardImgUrl: res[0].data.filePath,
                            courseLayoutImgUrl: res[1].data.filePath,
                        });
                    });
                } else if (uploadFile?.scoreCard && !uploadFile?.courseLayout) {
                    const scoreCardData = () => {
                        const data = new FormData();
                        data.append('file', uploadFile.scoreCard as Blob);
                        return data;
                    };
                    await upload
                        .uploadImageForAdmin(scoreCardData())
                        .then((res) => {
                            courseRequestMutate.mutate({
                                shopbyMemberNo: member?.memberNo!,
                                memberEmail,
                                memberName,
                                countryCode,
                                region,
                                fieldName,
                                requestTitle,
                                requestDetail,
                                shopbyProductNo: 10101,
                                consentFl: 'Y',
                                scoreCardImgUrl: res.data.filePath,
                            });
                        });
                } else if (!uploadFile?.scoreCard && uploadFile?.courseLayout) {
                    const courseLayoutData = () => {
                        const data = new FormData();
                        data.append('file', uploadFile?.courseLayout as Blob);
                        return data;
                    };
                    await upload
                        .uploadImageForAdmin(courseLayoutData())
                        .then((res) => {
                            courseRequestMutate.mutate({
                                shopbyMemberNo: member?.memberNo!,
                                memberEmail,
                                memberName,
                                countryCode,
                                region,
                                fieldName,
                                requestTitle,
                                requestDetail,
                                shopbyProductNo: 10101,
                                consentFl: 'Y',
                                scoreCardImgUrl: res.data.filePath,
                            });
                        });
                } else {
                    courseRequestMutate.mutate({
                        shopbyMemberNo: member?.memberNo!,
                        memberEmail,
                        memberName,
                        countryCode,
                        region,
                        fieldName,
                        requestTitle,
                        requestDetail,
                        shopbyProductNo: 10101,
                        consentFl: 'Y',
                    });
                }
            } catch {
                alert('코스요청에 실패했습니다!');
            }

            // TODO 요청완료시 alert “골프장코스요청이완료되었습니다.신속하게반영될수있도록노력하겠습니다."
        },
    );

    const requestCategoryTranslation = courseRequest(
        'requestCourseInformation.requestCategory.value',
        {
            returnObjects: true,
        },
    ) as unknown as Array<string>;
    console.log(uploadFile);
    return (
        <>
            {/* {isPersonalInformationModal && (
                <PersonalInformationModal
                    onClickToggleModal={() =>
                        setIsPersonalInformationModal(false)
                    }
                    width={isDesktop(width) ? '1080px' : '82%'}
                />
            )} */}

            {/* <NextSeo
                title={vc('golfCourse.request.title')}
                description={courseRequest('description')}
                canonical={courseRequest('title')}
                openGraph={{
                    url: courseRequest('title'),
                }}
            /> */}
            <GolfCourseRequestLayout>
                <CourseRequestContainer>
                    <CourseRequestTitle>
                        {courseRequest('title')}
                    </CourseRequestTitle>
                    <CourseRequestDescription
                        dangerouslySetInnerHTML={{
                            __html: courseRequest('guideMessage'),
                        }}
                    />
                    <CourseRequestForm>
                        <RequestInformationContainer>
                            <CourseRequestSubTitle>
                                {courseRequest('requesterInformation.title')}
                            </CourseRequestSubTitle>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requesterInformation.email.title',
                                    )}
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'email'}
                                    placeholder={
                                        courseRequest(
                                            'requesterInformation.email.placeholder',
                                        )!
                                    }
                                    {...register('memberEmail', {
                                        required: {
                                            value: true,
                                            message: courseRequest(
                                                'requesterInformation.email.alert',
                                            ),
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='memberEmail'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requesterInformation.name.title',
                                    )}
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    placeholder={
                                        courseRequest(
                                            'requesterInformation.name.placeholder',
                                        )!
                                    }
                                    {...register('memberName', {
                                        required: {
                                            value: true,
                                            message: courseRequest(
                                                'requesterInformation.name.alert',
                                            ),
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='memberName'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                        </RequestInformationContainer>

                        <RequestInformationContainer>
                            <CourseRequestSubTitle>
                                {courseRequest(
                                    'requestCourseInformation.title',
                                )}
                            </CourseRequestSubTitle>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.country.title',
                                    )}
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <SelectBox<any>
                                    styles={{
                                        ...(customStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                        ...(requestSelectStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                    }}
                                    options={courseRequestCountries}
                                    {...register('countryCode', {
                                        required: {
                                            value: true,
                                            message: courseRequest(
                                                'requestCourseInformation.country.alert',
                                            ),
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('countryCode', e?.value);
                                    }}
                                    placeholder={courseRequest(
                                        'requestCourseInformation.country.placeholder',
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='countryCode'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.region.title',
                                    )}
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    {...register('region')}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.courseName.title',
                                    )}
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    {...register('fieldName')}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.requestCategory.title',
                                    )}
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <SelectBox<any>
                                    styles={{
                                        ...(customStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                        ...(requestSelectStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                    }}
                                    options={requestCategoryTranslation.map(
                                        (category) => {
                                            return {
                                                label: category,
                                                value: category,
                                            };
                                        },
                                    )}
                                    {...register('requestTitle', {
                                        required: {
                                            value: true,
                                            message: courseRequest(
                                                'requestCourseInformation.requestCategory.alert',
                                            ),
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('requestTitle', e?.value);
                                    }}
                                    placeholder={courseRequest(
                                        'requestCourseInformation.requestCategory.placeholder',
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='requestTitle'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.requestDetail.title',
                                    )}
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestTextArea
                                    as={'textarea'}
                                    {...register('requestDetail', {
                                        required: {
                                            value: true,
                                            message: courseRequest(
                                                'requestCourseInformation.requestDetail.alert',
                                            ),
                                        },
                                    })}
                                    placeholder={
                                        courseRequest(
                                            'requestCourseInformation.requestDetail.placeholder',
                                        )!
                                    }
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='requestDetail'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.product.title',
                                    )}
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    {...register('productName', {
                                        required: {
                                            value: true,
                                            message: courseRequest(
                                                'requestCourseInformation.product.alert',
                                            ),
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='productName'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.imageFile.scoreCardTitle',
                                    )}
                                </CourseRequestInputTitle>
                                <CourseRequestImageFileContainer>
                                    <CourseRequestImageTitle
                                        placeholder={
                                            courseRequest(
                                                'requestCourseInformation.imageFile.placeholder',
                                            )!
                                        }
                                        type='text'
                                        disabled
                                        value={
                                            uploadFile?.scoreCard?.name || ''
                                        }
                                    />
                                    <label htmlFor='scoreCard'>
                                        <input
                                            type='file'
                                            id='scoreCard'
                                            accept='.bmp, .tif, .tiff, .miff, .jpe, .jpeg, .jpg, .jps, .pjpeg, .jng, .mng, .png'
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    uploadFileHandler(
                                                        e,
                                                        'scoreCard',
                                                    );
                                                }
                                            }}
                                        />
                                        {courseRequest(
                                            'requestCourseInformation.imageFile.selectFile',
                                        )}
                                    </label>
                                </CourseRequestImageFileContainer>
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    {courseRequest(
                                        'requestCourseInformation.imageFile.courseLayoutTitle',
                                    )}
                                </CourseRequestInputTitle>
                                <CourseRequestImageFileContainer>
                                    <CourseRequestImageTitle
                                        placeholder={
                                            courseRequest(
                                                'requestCourseInformation.imageFile.placeholder',
                                            )!
                                        }
                                        type='text'
                                        disabled
                                        value={
                                            uploadFile?.courseLayout?.name || ''
                                        }
                                    />
                                    <label htmlFor='courseLayout'>
                                        <input
                                            type='file'
                                            id='courseLayout'
                                            accept='.bmp, .tif, .tiff, .miff, .gif, .jpe, .jpeg, .jpg, .jps, .pjpeg, .jng, .mng, .png'
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    uploadFileHandler(
                                                        e,
                                                        'courseLayout',
                                                    );
                                                }
                                            }}
                                        />
                                        {courseRequest(
                                            'requestCourseInformation.imageFile.selectFile',
                                        )}
                                    </label>
                                </CourseRequestImageFileContainer>
                            </CourseRequestInputContainer>
                        </RequestInformationContainer>
                    </CourseRequestForm>
                    <AgreeTermContainer>
                        <div>
                            <input
                                type='checkbox'
                                id='agreeRequestTerm'
                                onChange={() => setIsAgreeTerm((prev) => !prev)}
                                checked={isAgreeTerm}
                            />
                            <label htmlFor='agreeRequestTerm'>
                                {isAgreeTerm ? <Checked /> : <UnChecked />}
                                <p>{courseRequest('etc.agreePrivacyTerm')}</p>
                            </label>
                        </div>
                        <button
                            onClick={() => setIsPersonalInformationModal(true)}
                        >
                            {courseRequest('etc.detailTerm')}
                        </button>
                    </AgreeTermContainer>
                    {courseRequestMutate.isLoading ? (
                        <Loader />
                    ) : (
                        <CourseRequestButton onClick={() => onSubmit()}>
                            {courseRequest('etc.requestGolfCourse')}
                        </CourseRequestButton>
                    )}
                </CourseRequestContainer>
            </GolfCourseRequestLayout>
        </>
    );
};

export default Request;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            //TODO dehydratedState: dehydrate(queryClient), 에러 수정
            ...(await serverSideTranslations(context.locale!, [
                'vc',
                'courseRequest',
            ])),
        },
    };
};
