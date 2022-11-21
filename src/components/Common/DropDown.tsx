import { FC, HTMLAttributes, useState } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface DropDownProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    menuList: { title: string; url: string }[];
    isBorder?: boolean;
}

const DropDownContainer = styled.div`
    cursor: pointer;
    display: inline-block;
    margin: 0 auto;
    position: relative;
`;

const DropDownHeader = styled.div<{ isBorder?: boolean }>`
    color: #fff;
    ${(props) =>
        props.isBorder &&
        css`
            border: 1px solid #dbdbdb;
            padding: 8px;
        `};

    & > svg {
        margin-left: 5px;
    }
`;

const DropDownListContainer = styled.div`
    position: absolute;
    margin-top: 10px;
    width: inherit;
    z-index: 100;
`;

const DropDownList = styled.ul`
    background-color: #fff;
    color: #191919;
`;

const ListItem = styled.li`
    font-size: 12px;
    line-height: 18px;
    list-style: none;
    letter-spacing: -0.48px;
    padding: 8px 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0eff4;
    }
`;

const DropDown: FC<DropDownProps> = ({
    title,
    menuList,
    isBorder = false,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropDownContainer {...props}>
            <DropDownHeader
                onClick={() => setIsOpen((prev) => !prev)}
                isBorder={isBorder}
            >
                {title}&nbsp;
                <FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleUp} />
            </DropDownHeader>

            {isOpen && (
                <DropDownListContainer>
                    <DropDownList>
                        {menuList.map(({ url, title }, index) => (
                            <ListItem key={index}>
                                <Link href={{ pathname: url }}>{title}</Link>
                            </ListItem>
                        ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>
    );
};

export default DropDown;
