import { ChangeEvent, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAppDispatch } from 'state/store';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import CheckedSquare from 'assets/icons/checkbox_square_checked.svg';
import UnCheckedSquare from 'assets/icons/checkbox_square_unchecked.svg';
import CheckedCircle from 'assets/icons/checkbox_circle_checked.svg';
import UnCheckedCircle from 'assets/icons/checkbox_circle_uhchecked.svg';
import { SEX } from 'models';
import { useMember } from 'hooks';
import { ProfileBody } from 'models/member';
import { profile } from 'api/member';
import { fetchProfile } from 'state/slices/memberSlice';
import PATHS from 'const/paths';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { onlyNumberFormatter } from 'utils/validation';

const InfoContainer = styled.main`
    width: 440px;
    margin: 131px auto 238px;
    color: ${(props) => props.theme.text1};
    ${media.medium} {
        margin: 25px auto 88px;
        width: 100%;
        padding: 0 24px;
    }
`;

const InfoTitle = styled.h2`
    text-align: center;
    letter-spacing: -1.2px;
    font-size: 1.5rem;
    line-height: 36px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const InfoInputContainer = styled.form``;

const InfoInputItem = styled.div`
    margin-bottom: 15px;
`;

const InfoInputTitle = styled.p`
    letter-spacing: 0;
    font-size: 0.75rem;
    line-height: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.text2};
    margin-bottom: 8px;
    ${media.medium} {
        font-size: 1.333rem;
        color: ${(props) => props.theme.text1};
        padding-left: 10px;
        line-height: 24px;
        letter-spacing: -0.64px;
    }
`;

const InfoInputStyle = styled.div`
    line-height: 24px;
    padding: 11px 17px;
    font-size: 1rem;
    line-height: 24px;
    &:focus {
        border: ${(props) => `1px solid ${props.theme.line2}`};
    }
    &::placeholder {
        line-height: 24px;
        color: ${(props) => props.theme.text3};
        font-size: 1rem;
        letter-spacing: -0.64px;
    }
    ${media.medium} {
        padding: 15px 20px;
        font-size: 1.333rem;
        line-height: 24px;
        &::placeholder {
            font-size: 1.333rem;
            line-height: 24px;
            letter-spacing: -0.64px;
        }
    }
`;

const InfoEmail = styled(InfoInputStyle)`
    background: #eee;
    cursor: not-allowed;
`;

const InfoNameSexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    > div:first-child {
        width: 56.136%;
    }
    > div:last-child {
        width: 41.818%;
    }
`;

const InfoName = styled(InfoInputStyle)`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 100%;
`;

const InfoSexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const MainButton = styled(Link)`
    color: #fff;
    background: ${(props) => props.theme.secondary};
    padding: 12px 0;
    text-align: center;
    display: block;
    line-height: 24px;
    cursor: pointer;
    ${media.medium} {
        font-size: 1.333rem;
        font-weight: 500;
    }
`;

const InfoSex = styled.label<{ isChecked: boolean }>`
    line-height: 24px;
    padding: 11px 0;
    text-align: center;
    width: 48%;
    cursor: pointer;
    border: ${(props) =>
        props.isChecked ? 'none' : `1px solid ${props.theme.line2}`};
    background: ${(props) =>
        props.isChecked ? props.theme.secondary : 'none'};
    color: ${(props) => (props.isChecked ? '#fff' : props.theme.text3)};
    > input {
        display: none;
    }
    ${media.medium} {
        padding: 15px 0;
        font-weight: 500;
        font-size: 1.333rem;
    }
`;

const PasswordButton = styled(MainButton)`
    ${media.medium} {
        padding: 15px 0;
    }
`;

const InfoPhoneNumberContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InfoPhoneNumber = styled(InfoInputStyle).attrs({ as: 'input' })`
    width: 78.2%;
    border: 1px solid #ddd;
`;

const PhoneNumberCertificationButton = styled(MainButton).attrs({
    type: 'button',
})`
    width: 20.072%;
    font-size: 1rem;
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const BirthDayContainer = styled(InfoInputStyle)`
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 24px;
`;

const BirthDayInput = styled.input`
    text-align: center;
    font-size: 1rem;
    width: 40px;
    margin: 0 17px;
    width: 20%;
    cursor: not-allowed;
    color: ${(props) => props.theme.text1};
    letter-spacing: -0.64px;
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const SlashIcon = styled.div`
    background: ${(props) => props.theme.line2};
    width: 1.5px;
    height: 23px;
    transform: rotate(17.7deg);
`;

const InfoTermContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-top: -15px;
    input {
        display: none;
    }
    &:last-child {
        margin-top: 0;
        border-top: ${(props) => `1px solid ${props.theme.line3}`};
    }
    > div:first-child {
        display: flex;
        justify-content: space-between;
    }
`;

const InfoTermCheckBox = styled.label`
    cursor: pointer;
`;

const InfoTermTitle = styled.p`
    line-height: 24px;
    margin-left: 16px;
    ${media.medium} {
        font-size: 1.1666rem;
        font-weight: bold;
        letter-spacing: -0.56px;
        line-height: 20px;
    }
`;

const InfoTermDisclosureDescription = styled.p`
    font-size: 0.625rem;
    letter-spacing: -0.4px;
    line-height: 15px;
    color: ${(props) => props.theme.text2};
    ${media.medium} {
        font-size: 1rem;
        letter-spacing: -0.48px;
        line-height: 18px;
    }
`;

const MarketingMethodContainer = styled.div`
    display: flex;
    align-items: center;
`;

const MarketingMethod = styled.label`
    display: flex;
    align-items: center;
    margin-left: 17px;
    cursor: pointer;
    > p {
        margin-left: 13.5px;
        line-height: 1px;
    }
    ${media.medium} {
        margin-left: 14px;
        font-size: 1.1666rem;
        > p {
            letter-spacing: -0.56px;
            font-weight: 500;
            margin-left: 6.7px;
            line-height: 1px;
            > span {
                font-weight: 400;
                color: #767676;
            }
        }
    }
`;

const UpdateButton = styled(MainButton).attrs({
    type: 'submit',
})`
    width: 100%;
    margin-bottom: 20px;
    font-size: 1rem;
    ${media.medium} {
        padding: 15px 0;
        font-size: 1.333rem;
    }
`;

const DeleteProfile = styled.p`
    text-align: center;
    letter-spacing: 0;
    font-size: 0.75rem;
    color: ${(props) => props.theme.text3};
    line-height: 18px;
    > a {
        color: ${(props) => props.theme.text1};
        text-decoration: underline;
        font-weight: bold;
    }
    ${media.medium} {
        font-size: 1.1666rem;
        line-height: 20px;
    }
`;

const Info = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const { member } = useMember();

    const { register, handleSubmit, setValue, watch } = useForm<
        Omit<
            ProfileBody,
            | 'firstName'
            | 'lastName'
            | 'openIdAccessToken'
            | 'ci'
            | 'recommenderId'
            | 'countryCd'
            | 'groupNo'
            | 'memberId'
            | 'currentPassword'
        > & {
            year?: string;
            month?: string;
            day?: string;
            disclosure: boolean;
        }
    >({
        defaultValues: {
            email: member?.email,
            memberName: member?.memberName,
            sex: member?.sex as SEX,
            mobileNo: member?.mobileNo,
            birthday: member?.birthday,
            smsAgreed: member?.smsAgreed,
            directMailAgreed: member?.directMailAgreed,
        },
    });

    const mobileNumber = watch('mobileNo');
    const selectedSex = watch('sex');
    const disclosureChecked = watch('disclosure');
    const smsAgreement = watch('smsAgreed');
    const emailAgreement = watch('directMailAgreed');

    const { width } = useWindowSize();

    const { t: myPageInfo } = useTranslation('myPageInfo');

    const agreeAll = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setValue('smsAgreed', true);
            setValue('directMailAgreed', true);
        } else {
            setValue('smsAgreed', false);
            setValue('directMailAgreed', false);
        }
    };

    const { mutate: updateInfo } = useMutation(
        async (
            updateInfoData: Omit<
                ProfileBody,
                | 'firstName'
                | 'lastName'
                | 'openIdAccessToken'
                | 'ci'
                | 'recommenderId'
                | 'countryCd'
                | 'groupNo'
                | 'memberId'
            >,
        ) => await profile.updateProfile(updateInfoData),
        {
            onSuccess: () => {
                alert(myPageInfo('alert.successUpdateInfo'));
                dispatch(fetchProfile());
                router.push(PATHS.MY_PAGE);
            },
        },
    );

    const onSubmit = handleSubmit(
        async ({
            memberName,
            birthday,
            sex,
            mobileNo,
            smsAgreed,
            directMailAgreed,
        }) => {
            try {
                updateInfo({
                    memberName,
                    birthday,
                    sex,
                    mobileNo,
                    smsAgreed,
                    directMailAgreed,
                });
            } catch (error) {
                alert(myPageInfo('alert.failUpdateInfo'));
            }
        },
    );
    return (
        <>
            <InfoContainer>
                {!isMobile(width) && (
                    <InfoTitle>{myPageInfo('infoTitle')}</InfoTitle>
                )}
                <InfoInputContainer
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <InfoInputItem>
                        <InfoInputTitle>{myPageInfo('email')}</InfoInputTitle>
                        <InfoEmail>{member?.email}</InfoEmail>
                    </InfoInputItem>
                    <InfoNameSexContainer>
                        <InfoInputItem>
                            <InfoInputTitle>
                                {myPageInfo('name')}
                            </InfoInputTitle>
                            <InfoName
                                as={'input'}
                                // placeholder={myPageInfo('placeholder.name')}
                                {...register('memberName')}
                            />
                        </InfoInputItem>
                        <InfoInputItem>
                            {isMobile(width) && (
                                <InfoInputTitle>
                                    {myPageInfo('name')}
                                </InfoInputTitle>
                            )}
                            <InfoSexContainer>
                                <InfoSex
                                    htmlFor='male'
                                    isChecked={
                                        selectedSex === 'X'
                                            ? true
                                            : selectedSex === SEX.MALE
                                    }
                                >
                                    {myPageInfo('male')}
                                    <input
                                        type={'radio'}
                                        id='male'
                                        value={SEX.MALE}
                                        checked={
                                            selectedSex === 'X'
                                                ? true
                                                : selectedSex === SEX.MALE
                                        }
                                        onChange={(e) =>
                                            setValue(
                                                'sex',
                                                e.target.value as SEX,
                                            )
                                        }
                                    />
                                </InfoSex>
                                <InfoSex
                                    htmlFor='female'
                                    isChecked={selectedSex === SEX.FEMALE}
                                >
                                    {myPageInfo('female')}
                                    <input
                                        type={'radio'}
                                        id='female'
                                        value={SEX.FEMALE}
                                        checked={selectedSex === SEX.FEMALE}
                                        onChange={(e) => {
                                            setValue(
                                                'sex',
                                                e.target.value as SEX,
                                            );
                                        }}
                                    />
                                </InfoSex>
                            </InfoSexContainer>
                        </InfoInputItem>
                    </InfoNameSexContainer>
                    <InfoInputItem>
                        <InfoInputTitle>
                            {myPageInfo('password')}
                        </InfoInputTitle>
                        <PasswordButton href={{ pathname: PATHS.MY_PASSWORD }}>
                            {myPageInfo('updatePassword')}
                        </PasswordButton>
                    </InfoInputItem>
                    <InfoInputItem>
                        <InfoInputTitle>
                            {myPageInfo('phoneNumber')}
                        </InfoInputTitle>
                        <InfoPhoneNumberContainer>
                            <InfoPhoneNumber
                                as={'input'}
                                type='tel'
                                // placeholder={myPageInfo(
                                //     'placeholder.phoneNumber',
                                // )}
                                onKeyDown={(
                                    e: KeyboardEvent<HTMLInputElement>,
                                ) => {
                                    setValue(
                                        'mobileNo',
                                        onlyNumberFormatter(
                                            e.currentTarget.value,
                                        ),
                                    );
                                }}
                                {...register('mobileNo', {
                                    valueAsNumber: true,
                                })}
                            />
                            <PhoneNumberCertificationButton as={'button'}>
                                {myPageInfo('certification')}
                            </PhoneNumberCertificationButton>
                        </InfoPhoneNumberContainer>
                    </InfoInputItem>
                    <InfoInputItem>
                        <InfoInputTitle>
                            {myPageInfo('birthday')}
                        </InfoInputTitle>
                        <BirthDayContainer>
                            <BirthDayInput
                                disabled
                                value={member?.birthday.slice(0, 4)}
                            />
                            <SlashIcon />
                            <BirthDayInput
                                disabled
                                value={member?.birthday.slice(4, 6)}
                            />
                            <SlashIcon />
                            <BirthDayInput
                                disabled
                                value={member?.birthday.slice(6, 8)}
                            />
                        </BirthDayContainer>
                    </InfoInputItem>

                    <div>
                        <InfoTermContainer>
                            <div>
                                <InfoTermCheckBox htmlFor='disclosure'>
                                    {disclosureChecked ? (
                                        <CheckedSquare />
                                    ) : (
                                        <UnCheckedSquare />
                                    )}
                                    <input
                                        type='checkbox'
                                        id='disclosure'
                                        {...register('disclosure')}
                                    />
                                </InfoTermCheckBox>
                                <InfoTermTitle>
                                    {myPageInfo('disclosure')}
                                </InfoTermTitle>
                            </div>
                            <InfoTermDisclosureDescription>
                                {myPageInfo('disclosureDescription')}
                            </InfoTermDisclosureDescription>
                        </InfoTermContainer>
                        <InfoTermContainer>
                            <div>
                                <InfoTermCheckBox htmlFor='marketing'>
                                    {smsAgreement && emailAgreement ? (
                                        <CheckedSquare />
                                    ) : (
                                        <UnCheckedSquare />
                                    )}
                                    <input
                                        type='checkbox'
                                        id='marketing'
                                        onChange={(e) => {
                                            agreeAll(e);
                                        }}
                                    />
                                </InfoTermCheckBox>
                                <InfoTermTitle>
                                    {myPageInfo('marketing')}
                                </InfoTermTitle>
                            </div>
                            <MarketingMethodContainer>
                                <MarketingMethod htmlFor='marketingSMS'>
                                    {smsAgreement ? (
                                        <CheckedCircle />
                                    ) : (
                                        <UnCheckedCircle />
                                    )}
                                    <p>
                                        SMS{' '}
                                        {isMobile(width) && (
                                            <span>
                                                ({myPageInfo('select')})
                                            </span>
                                        )}
                                    </p>
                                    <input
                                        type='checkbox'
                                        id='marketingSMS'
                                        {...register('smsAgreed')}
                                    />
                                </MarketingMethod>
                                <MarketingMethod htmlFor='marketingEmail'>
                                    {emailAgreement ? (
                                        <CheckedCircle />
                                    ) : (
                                        <UnCheckedCircle />
                                    )}
                                    <p>
                                        {myPageInfo('email')}{' '}
                                        {isMobile(width) && (
                                            <span>
                                                ({myPageInfo('select')})
                                            </span>
                                        )}
                                    </p>
                                    <input
                                        type='checkbox'
                                        id='marketingEmail'
                                        {...register('directMailAgreed')}
                                    />
                                </MarketingMethod>
                            </MarketingMethodContainer>
                        </InfoTermContainer>
                    </div>
                    <UpdateButton as={'button'}>
                        {myPageInfo('infoUpdate')}
                    </UpdateButton>
                </InfoInputContainer>
                <DeleteProfile>
                    {myPageInfo('wantWithdrawal')},{' '}
                    <Link href={{ pathname: PATHS.WITHDRAWAL }}>
                        {myPageInfo('here')}
                    </Link>
                    {myPageInfo('click')}
                </DeleteProfile>
            </InfoContainer>
        </>
    );
};

export default Info;
