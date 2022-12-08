import { FC, HTMLAttributes, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { map, pipe, toArray } from '@fxts/core';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import InputWithCalendarIcon from 'components/Input/InputWithCalendarIcon';
import PrimaryButton from 'components/Button/PrimaryButton';
import { flex } from 'utils/styles/mixin';
import 'react-datepicker/dist/react-datepicker.css';

interface SearchPeriodProps extends HTMLAttributes<HTMLDivElement> {
    startYmd: string;
    endYmd: string;
    searchCondition: Paging & SearchDate;
    setSearchCondition: Dispatch<SetStateAction<Paging & SearchDate>>;
}

interface PeriodTab {
    period: number;
    name: string;
    isSelected: boolean;
}

const SearchPeriodContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 40px;
`;

const PeriodButton = styled.button<{ selected: boolean }>`
    background-color: ${(props) => (props.selected ? '#A8A8A8' : '#f0eff4')};
    color: ${(props) => (props.selected ? '#FFFFFF' : '#191919')};
    padding: 6px 18px;
    width: 64px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.48px;
    margin-right: 8px;
`;

const PeriodTabContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const PeriodContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const DatePickerContainer = styled.div`
    ${flex}
    padding: 0 20px;
`;

const SearchButton = styled(PrimaryButton)`
    max-height: 30px;
    line-height: 30px;
    padding: 0;
`;

const SearchPeriod: FC<SearchPeriodProps> = ({
    searchCondition,
    setSearchCondition,
}) => {
    const [periodTab, setPeriodTab] = useState<PeriodTab[]>([
        { period: 0, name: '오늘', isSelected: false },
        { period: 7, name: '7일', isSelected: false },
        { period: 15, name: '15일', isSelected: false },
        { period: 30, name: '1개월', isSelected: false },
        { period: 90, name: '3개월', isSelected: true },
        { period: 365, name: '1년', isSelected: false },
    ]);
    const [startYmd, setStartYmd] = useState(
        new Date(searchCondition.startYmd),
    );
    const [endYmd, setEndYmd] = useState(new Date(searchCondition.endYmd));

    const onPeriodTabClick = (period: number) => {
        setPeriodTab((prev) =>
            pipe(
                prev,
                map((a) => ({
                    ...a,
                    isSelected: a.period === period,
                })),
                toArray,
            ),
        );

        setStartYmd(
            new Date(
                dayjs(endYmd).subtract(period, 'days').format('YYYY-MM-DD'),
            ),
        );
    };

    const onSearchButtonClick = () => {
        setSearchCondition((prev) => ({
            ...prev,
            startYmd: dayjs(startYmd).format('YYYY-MM-DD'),
            endYmd: dayjs(endYmd).format('YYYY-MM-DD'),
        }));
    };

    return (
        <SearchPeriodContainer>
            <PeriodTabContainer>
                {periodTab.map(({ period, name, isSelected }) => (
                    <PeriodButton
                        key={period}
                        selected={isSelected}
                        onClick={() => onPeriodTabClick(period)}
                    >
                        {name}
                    </PeriodButton>
                ))}
            </PeriodTabContainer>

            <PeriodContainer>
                <DatePickerContainer>
                    {/* TODO: Exclude dates (오늘날짜 이전) */}
                    <ReactDatePicker
                        locale={ko}
                        dateFormat='yyyy.MM.dd'
                        closeOnScroll={true}
                        selected={startYmd}
                        onChange={(date) => {
                            if (date) {
                                setStartYmd(date);
                            }
                        }}
                        customInput={<InputWithCalendarIcon type='before' />}
                        renderCustomHeader={({
                            monthDate,
                            customHeaderCount,
                            decreaseMonth,
                            increaseMonth,
                        }) => {
                            return (
                                <div>
                                    <button
                                        aria-label='Previous Month'
                                        className={
                                            'react-datepicker__navigation react-datepicker__navigation--previous'
                                        }
                                        style={
                                            customHeaderCount === 1
                                                ? { visibility: 'hidden' }
                                                : { visibility: 'visible' }
                                        }
                                        onClick={decreaseMonth}
                                    >
                                        <span
                                            className={
                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                                            }
                                        >
                                            {'<'}
                                        </span>
                                    </button>
                                    <span className='react-datepicker__current-month'>
                                        {monthDate.toLocaleString('ko-KR', {
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    <button
                                        aria-label='Next Month'
                                        className={
                                            'react-datepicker__navigation react-datepicker__navigation--next'
                                        }
                                        style={
                                            customHeaderCount === 0
                                                ? { visibility: 'hidden' }
                                                : { visibility: 'visible' }
                                        }
                                        onClick={increaseMonth}
                                    >
                                        <span
                                            className={
                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                                            }
                                        >
                                            {'>'}
                                        </span>
                                    </button>
                                </div>
                            );
                        }}
                    />
                    <span style={{ padding: '0 10px' }}>~</span>
                    {/* TODO: Exclude dates (startDt이전) */}
                    <ReactDatePicker
                        locale={ko}
                        dateFormat='yyyy.MM.dd'
                        closeOnScroll={true}
                        selected={endYmd}
                        onChange={(date) => {
                            if (date) {
                                setEndYmd(date);
                            }
                        }}
                        customInput={<InputWithCalendarIcon type='after' />}
                        renderCustomHeader={({
                            monthDate,
                            customHeaderCount,
                            decreaseMonth,
                            increaseMonth,
                        }) => {
                            return (
                                <div>
                                    <button
                                        aria-label='Previous Month'
                                        className={
                                            'react-datepicker__navigation react-datepicker__navigation--previous'
                                        }
                                        style={
                                            customHeaderCount === 1
                                                ? { visibility: 'hidden' }
                                                : { visibility: 'visible' }
                                        }
                                        onClick={decreaseMonth}
                                    >
                                        <span
                                            className={
                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                                            }
                                        >
                                            {'<'}
                                        </span>
                                    </button>
                                    <span className='react-datepicker__current-month'>
                                        {monthDate.toLocaleString('ko-KR', {
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    <button
                                        aria-label='Next Month'
                                        className={
                                            'react-datepicker__navigation react-datepicker__navigation--next'
                                        }
                                        style={
                                            customHeaderCount === 0
                                                ? { visibility: 'hidden' }
                                                : { visibility: 'visible' }
                                        }
                                        onClick={increaseMonth}
                                    >
                                        <span
                                            className={
                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                                            }
                                        >
                                            {'>'}
                                        </span>
                                    </button>
                                </div>
                            );
                        }}
                    />
                </DatePickerContainer>
                <SearchButton onClick={onSearchButtonClick}>조회</SearchButton>
            </PeriodContainer>
        </SearchPeriodContainer>
    );
};

export default SearchPeriod;
