import { FC } from 'react';
import styled from 'styled-components';

import FlexContainer from 'components/Common/FlexContainer';
import Button from 'components/Button/Button';
import { KRW } from 'utils/currency';
import media from 'utils/styles/media';
import Plus from 'assets/icons/plus_button.svg';
import Minus from 'assets/icons/minus_button.svg';
import CloseButton from 'assets/icons/close_gray.svg';

interface SelectedOptionListItemProps {
    title?: string;
    price: number;
    count: number;
    onMinusButtonClick?: () => void;
    onPlusButtonClick?: () => void;
    onDeleteButtonClick?: () => void;
}

const StyledContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fafafa;
    padding: 20px;
    margin-bottom: 4px;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;

    ${media.medium} {
        padding: 12px 20px;
    }
    ${media.small} {
        padding: 12px 14px;
    }
`;

const OptionName = styled.p`
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
    color: #191919;
    font-weight: normal;
    width: 40%;
    margin-right: 20px;

    ${media.medium} {
        width: 30%;
        margin-right: 0;
    }
`;

const CountContainer = styled(FlexContainer)`
    border: 1px solid #dbdbdb;
    background-color: #fff;
    min-height: 30px;
    min-width: 80px;
    margin-right: 30px;
    flex-wrap: nowrap;
    ${media.medium} {
        margin-right: 20px;
    }
    ${media.small} {
        margin-right: 8px;
    }
`;

const Count = styled.span`
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #191919;
`;

const Price = styled.span`
    margin-right: 30px;
    ${media.medium} {
        margin-right: 20px;
    }
    ${media.small} {
        margin-right: 0px;
    }
`;

const StyledButton = styled(Button)`
    flex: 1 1 33%;
`;

const SelectedOptionListItem: FC<SelectedOptionListItemProps> = ({
    title = '',
    price,
    count,
    onMinusButtonClick,
    onPlusButtonClick,
    onDeleteButtonClick,
}) => {
    return (
        <StyledContainer>
            <OptionName>{title}</OptionName>

            <FlexContainer>
                <CountContainer>
                    <StyledButton onClick={onMinusButtonClick}>
                        <Minus width={12} height={12} />
                    </StyledButton>

                    <div style={{ flex: '1 1 33%', textAlign: 'center' }}>
                        <Count>{count}</Count>
                    </div>

                    <StyledButton onClick={onPlusButtonClick}>
                        <Plus width={12} height={12} />
                    </StyledButton>
                </CountContainer>

                <Price
                    dangerouslySetInnerHTML={{
                        __html: KRW(price).format({
                            symbol: '원',
                            precision: 0,
                            pattern: `# <sub>!</sub>`,
                        }),
                    }}
                />

                <CloseButton onClick={onDeleteButtonClick} />
            </FlexContainer>
        </StyledContainer>
    );
};

export default SelectedOptionListItem;
