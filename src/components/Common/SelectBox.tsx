import { forwardRef, Ref } from 'react';
import Select, {
    SingleValue,
    ActionMeta,
    StylesConfig,
    Props,
    GroupBase,
} from 'react-select';

import DropDownIcon from 'assets/icons/arrow_drop_down.svg';

export interface SelectBoxProps<T> {
    options?: Partial<T>[];
    placeHolder?: string;
    onChange?: (
        selectedOption: SingleValue<Partial<T>>,
        actionMeta: ActionMeta<Partial<T>>,
    ) => void;
    styles?: StylesConfig<Partial<T>, false>;
    defaultValue?: any;
    isDisabled?: boolean;
}

export const customStyle = {
    container: (provided: any) => ({
        ...provided,
        margin: '22px 0 10px',
        boxSizing: 'border-box',
        width: '100%',
    }),
    control: (provided: any, { menuIsOpen }: { menuIsOpen: boolean }) => ({
        boxSizing: 'border-box',
        width: '100%',
        border: '2px solid #DBDBDB',
        borderBottom: menuIsOpen ? 'none' : '',
        display: 'flex',
        height: '67px',
        paddingLeft: '5px',
        cursor: 'pointer',
    }),
    menu: () => ({
        top: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        background: '#fff',
        bottom: '0',
    }),
    menuList: (provided: any) => ({
        ...provided,
        padding: '0',
        borderLeft: '1px solid #DBDBDB',
        borderRight: '1px solid #DBDBDB',
        borderBottom: '1px solid #DBDBDB',
        borderTop: 'none',
        width: '100%',
        boxSizing: 'border-box',
    }),
    option: () => ({
        width: '100%',
        boxSizing: 'border-box',
        borderLeft: '1px solid #DBDBDB',
        borderRight: '1px solid #DBDBDB',
        borderBottom: '1px solid #DBDBDB',
        background: '#fff',
        padding: '20px',
        paddingLeft: '20px',
        color: '#191919',
        cursor: 'pointer',
        '&:hover': {
            borderLeft: '2px solid #c00020',
            background: '#F0EFF4',
            fontWeight: 'bold',
        },
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#a8a8a8',
        fontSize: '16px',
        fontFamily: 'Noto Sans CJK KR',
        marginTop: '4px',
    }),
    indicatorsContainer: (provided: any) => ({
        ...provided,
        marginRight: '13px',
    }),
    indicatorSeparator: () => ({}),
};

const SelectBox = forwardRef(
    <
        Option,
        IsMulti extends boolean = false,
        Group extends GroupBase<Option> = GroupBase<Option>,
    >(
        { ...props }: Props<Option, IsMulti, Group>,
        ref?: Ref<any>,
    ) => {
        const DropdownIndicator = () => {
            return <DropDownIcon />;
        };

        return (
            <Select
                ref={ref}
                styles={{
                    ...(customStyle as StylesConfig<Option, IsMulti, Group>),
                    ...props.styles,
                }}
                {...props}
                components={{ DropdownIndicator }}
            />
        );
    },
);

export default SelectBox as <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    props: Props<Option, IsMulti, Group>,
) => JSX.Element;

SelectBox.displayName = 'SelectBox';
