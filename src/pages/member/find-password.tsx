import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import JoinLayout from 'components/Layout/JoinLayout';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledInput from 'components/Input/StyledInput';
import { isDesktop } from 'utils/styles/responsive';
import media from 'utils/styles/media';

const FindPasswordInputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const FindPasswordInput = styled(StyledInput).attrs({ type: 'email' })`
    font-size: 16px;
    width: 100%;
    padding: 10px 20px;
    border: 1px solid #dbdbdb;

    ${media.medium} {
        padding: 15px 20px;
    }
`;

const SubmitButton = styled(PrimaryButton).attrs({ type: 'submit' })`
    width: 100%;
    letter-spacing: -0.64px;

    ${media.medium} {
        padding-top: 15px;
        padding-bottom: 15px;
        letter-spacing: -0.8px;
    }
`;

const FindPassword = () => {
    const { width } = useWindowSize();

    return (
        <>
            <JoinLayout
                isDesktop={isDesktop(width)}
                title={'비밀번호 찾기'}
                description='가입하신 이메일 주소를 입력하시면 해당 주소로 비밀번호 변경 메일을 보내드립니다.'
            >
                <FindPasswordInputContainer>
                    <FindPasswordInput placeholder='이메일을 입력해주세요.' />
                </FindPasswordInputContainer>
                <SubmitButton>비밀번호 재설정 메일 받기</SubmitButton>
            </JoinLayout>
        </>
    );
};

export default FindPassword;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
