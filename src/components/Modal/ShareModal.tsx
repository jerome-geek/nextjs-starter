import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useScript } from 'usehooks-ts';
import Image from 'next/image';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import Kakao from 'assets/icons/sns_kakao.svg';
import Facebook from 'assets/icons/sns_facebook.svg';
import Google from 'assets/icons/sns_google.svg';
import CopyUrl from 'assets/icons/copy_url.png';
import media from 'utils/styles/media';
import {
    kakaoShare,
    KakaoShareParams,
    copyLink,
    CopyLinkParams,
} from 'utils/share';

const ModalContainer = styled.div`
    width: 100%;
    padding: 50px 52px;
    ${media.medium} {
        padding: 38px 20px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
    width: 100%;
    margin-bottom: 40px;
    ${media.medium} {
        margin-bottom: 20px;
    }
`;

const ShareButtonContainer = styled.ul`
    display: flex;
    justify-content: center;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    padding: 70px 0;
`;

const ShareButton = styled.li`
    margin-right: 35px;
    > svg,
    img {
        width: 43.3px;
        height: 43.4px;
    }
    &:last-child {
        margin-right: 0;
    }
`;

const ShareModal = ({
    onClickToggleModal,
    width,
    title,
    height,
    imageUrl,
    description,
    itemContent,
    mobileWebUrl,
    webUrl,
    copiedLink,
    copySuccessMessage,
}: ModalDefaultType & KakaoShareParams & CopyLinkParams) => {
    const { t: serviceCenter } = useTranslation('serviceCenter');

    useScript('https://developers.kakao.com/sdk/js/kakao.js');

    return (
        <Modal
            onClickToggleModal={onClickToggleModal}
            width={width}
            height={height}
        >
            <ModalContainer>
                <Title>{serviceCenter('share')}</Title>
                <ShareButtonContainer>
                    <ShareButton
                        onClick={() =>
                            kakaoShare({
                                title,
                                imageUrl,
                                description,
                                itemContent,
                                mobileWebUrl,
                                webUrl,
                            })
                        }
                    >
                        <Kakao />
                    </ShareButton>
                    <ShareButton>
                        <Facebook />
                    </ShareButton>
                    <ShareButton>
                        <Google />
                    </ShareButton>
                    <ShareButton
                        onClick={() =>
                            copyLink({
                                copiedLink,
                                copySuccessMessage,
                            })
                        }
                    >
                        <Image src={CopyUrl} alt={serviceCenter('copy')} />
                    </ShareButton>
                </ShareButtonContainer>
            </ModalContainer>
        </Modal>
    );
};

export default ShareModal;
