import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import media from 'utils/styles/media';
import { flex } from 'utils/styles/mixin';

interface OriginalRegisterButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

const ButtonPlus = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 4px solid #dbdbdb;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        border-top: 4px solid #dbdbdb;
    }

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 70%;
        border-left: 4px solid #dbdbdb;
    }
    ${media.medium} {
        width: 29px;
        height: 29px;
        border: 2px solid #dbdbdb;
        &::before {
            border-top: 2px solid #dbdbdb;
        }

        &::after {
            border-left: 2px solid #dbdbdb;
        }
    }
`;

const StyledButton = styled.button`
    width: 170px;
    height: 212px;
    border: 4px solid #f8f8fa;
    background: #f8f8fa 0% 0% no-repeat padding-box;
    box-shadow: 2px 2px 6px #0000001a;
    opacity: 1;
    ${flex}
    flex-direction: column;
    cursor: pointer;
`;

const Title = styled.p`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0px;
    color: #191919;
    padding-top: 20px;
`;

const OriginalRegisterButton: React.FC<OriginalRegisterButtonProps> = ({
    title,
    ...args
}) => {
    return (
        <StyledButton {...args}>
            <ButtonPlus />
            <Title dangerouslySetInnerHTML={{ __html: title }} />
        </StyledButton>
    );
};

export default OriginalRegisterButton;
