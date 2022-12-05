import { FC } from 'react';
import styled from 'styled-components';

import { flex } from 'utils/styles/mixin';

interface CategoryListProps {
    list: CategoryListItem[];
    onListClick: (categoryNo: number) => void;
}

export interface CategoryListItem {
    categoryNo: number;
    label: string;
    isSelected: boolean;
}

const StyledList = styled.ul`
    ${flex}
`;

const StyledListItem = styled.li<{ isSelected?: boolean }>`
    margin: 0 5px;
    padding: 10px;
    color: ${(props) => (props.isSelected ? '#fff' : '#000')};
    font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
    text-decoration: ${(props) => (props.isSelected ? 'underline' : 'none')};
    color: ${(props) => (props.isSelected ? '#191919' : '#767676')};
`;

const CategoryList: FC<CategoryListProps> = ({ list, onListClick }) => {
    if (list.length === 0) {
        return null;
    }

    return (
        <StyledList>
            {list.map(({ categoryNo, label, isSelected }) => (
                <StyledListItem
                    key={categoryNo}
                    isSelected={isSelected}
                    onClick={() => onListClick(categoryNo)}
                >
                    {label}
                </StyledListItem>
            ))}
        </StyledList>
    );
};

export default CategoryList;
