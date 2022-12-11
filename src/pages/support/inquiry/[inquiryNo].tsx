import { ChangeEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useMutation, useQuery } from 'react-query';
import { GroupBase, StylesConfig } from 'react-select';
import { map, pipe, pluck, toArray, uniqBy, concat, every } from '@fxts/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SelectBox, { customStyle } from 'components/Common/SelectBox';
import ImageUploadButton from 'components/Input/ImageUploadButton';
import CloseButtonIcon from 'assets/icons/gray_close_icon.svg';
import { useMember } from 'hooks';
import { useMall } from 'hooks/queries';
import { inquiry } from 'api/manage';
import { WriteInquiry } from 'models/manage';
import media from 'utils/styles/media';
import upload from 'api/etc/upload';
import PATHS from 'const/paths';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const InquiryContainer = styled.div`
    width: 1060px;
    margin: 118px auto 155px;
    color: ${(props) => props.theme.text1};
    ${media.xlarge} {
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
    ${media.xlarge} {
        font-size: 1.428rem;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const InquiryTypeContainer = styled.div`
    width: 100%;
    background: ${(props) => props.theme.bg2};
    padding: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > p {
        margin-right: 30px;
    }
    > div {
        width: 407px;
    }
    ${media.xlarge} {
        width: 100vw;
        margin-left: -24px;
        > div {
            font-size: 1.142rem;
            font-weight: bold;
            > div {
                font-weight: lighter;
            }
        }
        > p {
            font-size: 1.142rem;
        }
    }
    ${media.medium} {
        padding: 15px 24px;
        > div {
            width: 100%;
            font-size: 1.333rem;
        }
        > p {
            display: none;
        }
    }
`;

const InquiryContentContainer = styled.ul`
    margin-top: 40px;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
`;

const InquiryContentList = styled.li`
    display: flex;
    align-items: center;
    padding: 30px 0;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    &:last-child {
        border-bottom: none;
    }
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        flex-direction: column;
        align-items: flex-start;
        font-size: 1.333rem;
        border-bottom: none;
        padding: 22px 0 0;
    }
`;

const InquiryContentTitle = styled.div`
    padding-left: 35px;
    font-weight: 500;
    width: 26.6%;
    ${media.medium} {
        width: 100%;
        padding: 0 10px 12px;
    }
`;

const InquiryContentInputBox = styled.div`
    width: 73.3%;
    display: flex;
    flex-wrap: wrap;
    ${media.medium} {
        width: 100%;
    }
    > label {
        margin-right: 20px;
    }
`;

const InquiryContentInput = styled.input<{ paddingBottom?: string }>`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 88.56%;
    padding: 12px 18px;
    &:focus {
        border: ${(props) => `1px solid ${props.theme.line1}`};
    }
    ${media.medium} {
        width: 100%;
    }
`;

const InquiryContentText = styled.textarea`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 88.56%;
    padding: 21px 0 106px 18px;
    letter-spacing: -0.64px;
    &:focus {
        border: ${(props) => `1px solid ${props.theme.line1}`};
    }
    ${media.medium} {
        width: 100%;
    }
`;

const UploadImageBox = styled.div`
    width: 96px;
    height: 96px;
    margin: 10px 20px 10px 0;
    position: relative;
    &:nth-child(3) {
        margin-left: 20px;
    }
`;

const UploadImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;

const ImageDeleteButton = styled.button`
    opacity: 0.8;
    position: absolute;
    padding: 0;
    top: 0;
    right: 0;
    cursor: pointer;
`;

const SendInquiryButton = styled.button`
    width: 440px;
    height: 44px;
    background: ${(props) => props.theme.secondary};
    color: #fff;
    margin: 50px auto;
    display: block;
    cursor: pointer;
    ${media.medium} {
        width: 100%;
    }
`;

interface InquiryType {
    inquiryTypeDescription?: string;
    inquiryTypeName?: string;
    inquiryTypeNo?: number;
    label?: string;
}

interface AddNameBlob extends Blob {
    name?: string;
    lastModified?: number;
    lastModifiedDate?: string;
}

const Inquiry = () => {
    const [uploadFile, setUploadFile] = useState<AddNameBlob[]>([]);
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);
    const [defaultValue, setDefaultValue] = useState<{
        label: string;
        inquiryTypeNo: number;
    }>();

    //TODO 주문 내에서 문의하기를 누른 경우 orderNo를 받아와서 inquiryMutate 에 orderNo 추가해야 함
    const router = useRouter();

    const { inquiryNo, orderNo } = router.query as {
        inquiryNo: string;
        orderNo: string;
    };

    const isModifiable = useMemo(() => !!inquiryNo, [inquiryNo]);
    const isDefaultValue = (isModifiable && defaultValue) || !isModifiable;

    const { data: mallInfo } = useMall();

    const { member } = useMember();

    const { register, handleSubmit, setValue, getValues } =
        useForm<WriteInquiry>();

    const { t: inquiryTranslation } = useTranslation('inquiry');

    const { mutate: inquiryMutate } = useMutation(
        async (inquiryContent: WriteInquiry & { image?: File }) =>
            await inquiry.writeInquiry(inquiryContent),
        {
            onSuccess: () => {
                alert('문의가 완료됐습니다.');
                router.push(PATHS.MY_INQUIRY);
            },
            onError: () => {
                alert('문의 등록에 실패하였습니다.');
            },
        },
    );

    useQuery(
        ['inquiry', { member: member?.memberId, inquiryNo }],
        async () => await inquiry.getDetailInquiry(inquiryNo!),
        {
            select: (res) => res.data,
            onSuccess: (data) => {
                setValue('inquiryTitle', data.inquiryTitle);
                setValue('inquiryContent', data.inquiryContent);
                setDefaultValue({
                    label: data.inquiryType.inquiryTypeName,
                    inquiryTypeNo: data.inquiryType.inquiryTypeNo,
                });
                setUploadedFileUrl(data.imageUrls);
            },
            enabled: isModifiable,
        },
    );

    const { mutate: updateMutate } = useMutation(
        async (inquiryContent: WriteInquiry & { image?: File }) =>
            await inquiry.updateInquiry(inquiryNo!, inquiryContent),
        {
            onSuccess: () => {
                alert('문의가 완료됐습니다.');
                router.push(PATHS.MY_INQUIRY);
            },
            onError: () => {
                alert('문의 등록에 실패하였습니다.');
            },
        },
    );

    const uploadFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const MAX_FILE_SIZE = 12 * 1024 * 1024;

        const fileList = e.target.files;

        if (fileList) {
            const isSmallerThanMaxSize = pipe(
                fileList,
                every((a) => a.size < MAX_FILE_SIZE),
            );

            if (!isSmallerThanMaxSize) {
                alert('12MB가 넘는 파일은 등록할 수 없습니다.');
                return;
            }

            if (uploadFile.length + fileList.length > 10) {
                alert('이미지는 최대 10장까지 등록이 가능합니다.');
                return;
            }

            if (fileList.length > 0) {
                setUploadFile((prev) => {
                    return pipe(
                        prev,
                        concat(fileList),
                        uniqBy((a) => a.name),
                        toArray,
                    );
                });
            }
        }
        return;
    };

    const deleteUploadFileImage = (imageFileName: string) => {
        setUploadFile((prev) => {
            return prev.filter((file) => {
                return file.name !== imageFileName;
            });
        });
    };

    const deleteUploadImage = (imageUrl: string) => {
        setUploadedFileUrl((prev) => {
            return prev.filter((uploadedFileUrl) => {
                return uploadedFileUrl !== imageUrl;
            });
        });
    };

    const onSubmit = handleSubmit(() => {
        if (!getValues('inquiryTypeNo')) {
            alert(inquiryTranslation('etc.inquiryTypeAlert'));
            return;
        }
        if (uploadFile) {
            Promise.all(
                uploadFile.map((image) => {
                    const data = new FormData();
                    data.append('file', image as Blob);
                    return upload.uploadImage(data);
                }),
            ).then((res) => {
                inquiryMutate({
                    inquiryTypeNo: getValues('inquiryTypeNo'),
                    inquiryTitle: getValues('inquiryTitle'),
                    inquiryContent: getValues('inquiryContent'),
                    originalFileName: pipe(
                        res,
                        pluck('data'),
                        pluck('imageUrl'),
                        toArray,
                    ),
                    uploadedFileName: pipe(
                        res,
                        pluck('data'),
                        pluck('imageUrl'),
                        toArray,
                    ),
                });
            });
        } else {
            inquiryMutate({
                inquiryTypeNo: getValues('inquiryTypeNo'),
                inquiryTitle: getValues('inquiryTitle'),
                inquiryContent: getValues('inquiryContent'),
            });
        }
    });

    const onUpdateSubmit = handleSubmit(() => {
        if (uploadFile) {
            Promise.all(
                uploadFile.map((image) => {
                    const data = new FormData();
                    data.append('file', image as Blob);
                    return upload.uploadImage(data);
                }),
            ).then((res) => {
                updateMutate({
                    inquiryTypeNo: getValues('inquiryTypeNo'),
                    inquiryTitle: getValues('inquiryTitle'),
                    inquiryContent: getValues('inquiryContent'),
                    originalFileName: pipe(
                        res,
                        pluck('data'),
                        pluck('imageUrl'),
                        concat(uploadedFileUrl),
                        toArray,
                    ),
                    uploadedFileName: pipe(
                        res,
                        pluck('data'),
                        pluck('imageUrl'),
                        concat(uploadedFileUrl),
                        toArray,
                    ),
                    answerSmsSendYn: true,
                    answerEmailSendYn: true,
                });
            });
        } else {
            updateMutate({
                inquiryTitle: getValues('inquiryTitle'),
                inquiryContent: getValues('inquiryContent'),
                originalFileName: uploadedFileUrl,
                uploadedFileName: uploadedFileUrl,
                answerSmsSendYn: false,
                answerEmailSendYn: false,
            });
        }
    });

    return (
        <>
            <NextSeo
                title={inquiryTranslation('title')!}
                description={inquiryTranslation('description')!}
                openGraph={{
                    title: inquiryTranslation('title')!,
                    description: inquiryTranslation('description')!,
                }}
            />
            <InquiryContainer>
                <Title>{inquiryTranslation('title')}</Title>
                <InquiryTypeContainer>
                    <p>{inquiryTranslation('inquiryType.title')}</p>
                    {isDefaultValue && (
                        <SelectBox<InquiryType, false, GroupBase<InquiryType>>
                            options={pipe(
                                mallInfo?.inquiryType as InquiryType[],
                                map((a) => {
                                    return {
                                        label: a.inquiryTypeName,
                                        inquiryTypeNo: a.inquiryTypeNo,
                                    };
                                }),
                                toArray,
                            )}
                            defaultValue={defaultValue}
                            onChange={(e) => {
                                setValue('inquiryTypeNo', e?.inquiryTypeNo);
                            }}
                            isDisabled={isModifiable}
                            styles={{
                                ...(customStyle as StylesConfig<
                                    Partial<InquiryType>,
                                    false
                                >),
                                container: (provided) => ({
                                    ...provided,
                                    margin: '0',
                                }),
                                control: (
                                    provided,

                                    { menuIsOpen }: { menuIsOpen: boolean },
                                ) => ({
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    border: '1px solid #DBDBDB',
                                    borderBottom: menuIsOpen
                                        ? 'none'
                                        : '1px solid #DBDBDB',
                                    display: 'flex',
                                    height: '44px',
                                    background: '#fff',
                                }),
                                menuList: (provided: any) => ({
                                    ...customStyle.menuList,
                                    borderRight: '1px solid #DBDBDB',
                                    borderBottom: '1px solid #DBDBDB',
                                }),
                                option: () => ({
                                    height: '44px',
                                    lineHeight: '4px',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    borderLeft: '1px solid #DBDBDB',
                                    background: '#fff',
                                    padding: '20px',
                                    paddingLeft: '20px',
                                    color: '#191919',
                                    cursor: 'pointer',
                                    fontWeight: 'normal',
                                    '&:hover': {
                                        borderLeft: '2px solid #c00020',
                                        background: '#F0EFF4',
                                        fontWeight: 'bold',
                                    },
                                }),
                            }}
                            placeholder={inquiryTranslation(
                                'inquiryType.placeholder',
                            )}
                        />
                    )}
                </InquiryTypeContainer>
                <InquiryContentContainer>
                    <InquiryContentList>
                        <InquiryContentTitle>
                            {inquiryTranslation('inquiryTitle.title')}
                        </InquiryContentTitle>
                        <InquiryContentInputBox>
                            <InquiryContentInput
                                type='text'
                                placeholder={
                                    inquiryTranslation(
                                        'inquiryTitle.placeholder',
                                    )!
                                }
                                {...register('inquiryTitle', {
                                    required: true,
                                })}
                            />
                        </InquiryContentInputBox>
                    </InquiryContentList>
                    <InquiryContentList>
                        <InquiryContentTitle>
                            {inquiryTranslation('inquiryContent.title')}
                        </InquiryContentTitle>
                        <InquiryContentInputBox>
                            <InquiryContentText
                                placeholder={
                                    inquiryTranslation(
                                        'inquiryContent.placeholder',
                                    )!
                                }
                                {...register('inquiryContent', {
                                    required: true,
                                })}
                            />
                        </InquiryContentInputBox>
                    </InquiryContentList>
                    <InquiryContentList>
                        <InquiryContentTitle>
                            {inquiryTranslation('file.title')}
                        </InquiryContentTitle>
                        <InquiryContentInputBox>
                            <ImageUploadButton onChange={uploadFileHandler} />

                            {uploadedFileUrl.map((imageUrl) => {
                                return (
                                    <UploadImageBox key={imageUrl}>
                                        <UploadImage
                                            src={imageUrl}
                                            alt={imageUrl}
                                        />
                                        <ImageDeleteButton
                                            onClick={() => {
                                                deleteUploadImage(imageUrl);
                                            }}
                                        >
                                            <CloseButtonIcon />
                                        </ImageDeleteButton>
                                    </UploadImageBox>
                                );
                            })}
                            {uploadFile.map((fileData) => {
                                return (
                                    <UploadImageBox key={fileData.name}>
                                        <UploadImage
                                            src={URL.createObjectURL(fileData!)}
                                            alt={fileData.name}
                                        />
                                        <ImageDeleteButton
                                            onClick={() => {
                                                deleteUploadFileImage(
                                                    fileData.name!,
                                                );
                                            }}
                                        >
                                            <CloseButtonIcon />
                                        </ImageDeleteButton>
                                    </UploadImageBox>
                                );
                            })}
                        </InquiryContentInputBox>
                    </InquiryContentList>
                </InquiryContentContainer>
                <SendInquiryButton
                    onClick={() => {
                        isModifiable ? onUpdateSubmit() : onSubmit();
                    }}
                >
                    {inquiryTranslation('etc.sendButton')}
                </SendInquiryButton>
            </InquiryContainer>
        </>
    );
};

export default Inquiry;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['inquiry'])),
        },
    };
};
