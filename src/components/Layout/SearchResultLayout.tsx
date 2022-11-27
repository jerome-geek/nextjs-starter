import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

import Paging from 'components/Common/Paging';

interface SearchResultLayoutProps extends HTMLAttributes<HTMLDivElement> {
    currentPage: number;
    totalPage: number;
    onFirstClick: () => void;
    onBeforeClick: () => void;
    onNextClick: () => void;
    onEndClick: () => void;
}

const StyledSection = styled.section``;

const StyledContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
    margin: 40px 0;
`;

const SearchResultLayout: FC<SearchResultLayoutProps> = ({
    currentPage,
    totalPage,
    onFirstClick,
    onBeforeClick,
    onNextClick,
    onEndClick,
    children,
}) => {
    return (
        <StyledSection>
            <StyledContainer>{children}</StyledContainer>
            {totalPage !== 0 ? (
                <Paging
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onFirstClick={onFirstClick}
                    onBeforeClick={onBeforeClick}
                    onNextClick={onNextClick}
                    onEndClick={onEndClick}
                />
            ) : null}
        </StyledSection>
    );
};

export default SearchResultLayout;
