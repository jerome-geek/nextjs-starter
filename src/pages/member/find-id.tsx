import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { isDesktop } from 'utils/styles/responsive';
import JoinLayout from 'components/Layout/JoinLayout';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledInput from 'components/Input/StyledInput';
import media from 'utils/styles/media';

const FindIdInputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const FindIdInput = styled(StyledInput).attrs({ type: 'text' })`
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

const FindId = () => {
    const { width } = useWindowSize();

    return (
        <>
            <JoinLayout
                isDesktop={isDesktop(width)}
                title={'아이디 찾기'}
                description='가입하신 이름과 전화번호를 통해<br/>아이디를 찾으실 수 있습니다.'
            >
                <FindIdInputContainer>
                    <FindIdInput placeholder='이름을 입력해 주세요.' />
                </FindIdInputContainer>
                <SubmitButton>휴대폰 인증</SubmitButton>
            </JoinLayout>
        </>
    );
};

export default FindId;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
