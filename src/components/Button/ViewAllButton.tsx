import { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import AngleRightGrayBig from 'assets/icons/angle_right_gray_big.svg';

interface ViewAllButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ViewAllButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${(props) => props.theme.bg2};
    box-shadow: 2px 2px 4px #0000001a;
    border-radius: 8px;
    width: 120px;
    height: 143px;
    cursor: pointer;

    & > svg {
        font-size: 50px;
        color: ${(props) => props.theme.line2};
    }

    & > p {
        margin-top: 10px;
        font-size: 12px;
    }
`;

const ViewAllButton: FC<ViewAllButtonProps> = ({ ...args }) => {
    return (
        <ViewAllButtonWrapper {...args}>
            <AngleRightGrayBig />
            <p>전체보기</p>
        </ViewAllButtonWrapper>
    );
};

export default ViewAllButton;
