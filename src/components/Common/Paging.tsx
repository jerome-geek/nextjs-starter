import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import Button from 'components/Button/Button';

interface PagingProps extends HTMLAttributes<HTMLDivElement> {
    currentPage: number;
    totalPage?: number;
    onFirstClick: () => void;
    onBeforeClick: () => void;
    onNextClick: () => void;
    onEndClick: () => void;
}

const PagingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
`;

const PagingNumber = styled.p`
    font-size: 16px;
    color: #191919;
    width: 90px;
    padding: 0 20px;
    text-align: center;
`;

const Paging: FC<PagingProps> = ({
    currentPage = 1,
    totalPage = 1,
    onFirstClick,
    onBeforeClick,
    onNextClick,
    onEndClick,
    ...props
}) => {
    const padNumber = (rowNumber: number) =>
        rowNumber >= 10 ? rowNumber : '0' + rowNumber;

    return (
        <PagingWrapper {...props}>
            <Button onClick={onFirstClick}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Button>

            <Button onClick={onBeforeClick}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>

            <PagingNumber>
                {`${padNumber(currentPage)} / ${padNumber(totalPage)}`}
            </PagingNumber>

            <Button onClick={onNextClick}>
                <FontAwesomeIcon icon={faAngleRight} />
            </Button>

            <Button onClick={onEndClick}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Button>
        </PagingWrapper>
    );
};

export default Paging;
