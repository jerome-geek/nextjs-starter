import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StylesConfig } from 'react-select';
import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';

import SectionDropdown from 'components/SectionDropdown';
// import MapModal from 'components/Modal/MapModal';
// import SelectBox, { customStyle } from 'components/Common/SelectBox';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const AgencyContainer = styled.main`
    width: 840px;
    margin: 118px auto 156px;
    color: ${(props) => props.theme.text1};
    ${media.custom(888)} {
        width: 100%;
        margin: 24px 0 88px;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 36px;
    ${media.xlarge} {
        font-size: 1.428rem;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const DropdownContainer = styled.section`
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    > div {
        > div:first-child {
            display: flex;
            align-items: center;
            padding: 15px 24px;
        }
    }
    p {
        letter-spacing: 0;
    }
    ${media.xlarge} {
        p {
            font-size: 1.141rem;
        }
    }
    ${media.medium} {
        border-top: ${(props) => `2px solid ${props.theme.line1}`};
        border-bottom: ${(props) => `2px solid ${props.theme.line1}`};
        p {
            font-size: 1.333rem;
        }
        > div {
            > div:first-child {
                padding: 15px 12px;
            }
        }
    }
`;

const NoticeContentTop = styled.p`
    margin-top: -24px;
    padding: 15px 24px 15px 24px;
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    font-size: 0.75rem;
    line-height: 18px;
    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        line-height: 29px;
        letter-spacing: -0.64px;
        padding: 20px 12px 32px;
        font-size: 1.333rem;
    }
`;

const NoticeContentBottom = styled(NoticeContentTop)`
    padding: 0 24px 15px;
    margin-top: 0;
    border-top: none;
    color: ${(props) => props.theme.text1};
    > span {
        text-decoration: underline;
    }
    ${media.medium} {
        padding: 0 12px 20px;
    }
`;

const SearchAgencyContainer = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 13px;
    margin-bottom: 28px;
    ${media.medium} {
        margin-top: 28px;
        flex-direction: column;
        margin-bottom: 10px;
    }
`;

const SearchAgencyLeft = styled.div`
    display: flex;
    justify-content: space-between;
    width: 44.8%;
    ${media.medium} {
        width: 100%;
    }
`;

const SelectBoxContainer = styled.div`
    width: 48%;
    ${media.medium} {
        width: 49%;
    }
`;

const SearchAgencyRight = styled.div`
    width: 51.786%;
    margin-top: 22px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    ${media.medium} {
        margin-top: 0;
        width: 100%;
    }
`;

const SearchAgencyInput = styled.input`
    width: 76.322%;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    padding-left: 21px;
    &::placeholder {
        font-size: 16px;
        color: ${(props) => props.theme.text3};
    }
    &:focus {
        border: ${(props) => `1px solid ${props.theme.main}`};
    }
    ${media.medium} {
        padding-left: 23px;
    }
`;

const SearchAgencyButton = styled.button`
    width: 21.45%;
    background: ${(props) => props.theme.secondary};
    color: #fff;
`;

const AgencyListContainer = styled.section`
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
`;

const AgencyListCategory = styled.ul`
    background: ${(props) => props.theme.bg2};
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 15px 0;
    line-height: 24px;
    font-weight: bold;
    letter-spacing: 0;
`;

const CategoryName = styled.li`
    width: 29%;
`;

const CategoryAddress = styled.li`
    width: 41%;
`;

const CategoryNumber = styled.li`
    width: 30%;
`;

const AgencyList = styled.li`
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 18px 0;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    &:last-child {
        border-bottom: none;
    }
    ${media.medium} {
        padding: 15px 10px;
        align-items: flex-start;
    }
`;

const AgencyName = styled.div`
    width: 29%;
    ${media.medium} {
        font-size: 1.333rem;
        font-weight: 500;
        line-height: 24px;
        margin-bottom: 5px;
    }
`;

const AgencyAddress = styled.div`
    width: 41%;
    display: flex;
    justify-content: center;
    > button {
        margin-left: 11px;
    }
    ${media.medium} {
        color: ${(props) => props.theme.text3};
        font-weight: 500;
        margin-bottom: 5px;
        line-height: 18px;
    }
`;

const MapButton = styled.button`
    margin: 0;
    padding: 0;
    font-size: 0.75rem;
    color: #999999;
    letter-spacing: 0;
    text-decoration: underline;
    cursor: pointer;
    ${media.medium} {
        font-size: 0.8333rem;
    }
`;

const AgencyNumber = styled.div`
    width: 30%;
    line-height: 18px;
    ${media.medium} {
        font-weight: 500;
        line-height: 18px;
        color: ${(props) => props.theme.text2};
    }
`;

const MobileAgencyListContent = styled.div`
    > div {
        width: 100%;
        text-align: left;
    }
`;

const Agency = () => {
    const [isMapModal, setIsMapModal] = useState(false);
    const [agencyAddress, setAgencyAddress] = useState('');

    const { t: agency } = useTranslation('agency');

    const { width } = useWindowSize();

    const selectStyle = useMemo(() => {
        return {
            control: (
                provided: any,
                { menuIsOpen }: { menuIsOpen: boolean },
            ) => ({
                boxSizing: 'border-box',
                width: '100%',
                border: '1px solid #DBDBDB',
                borderBottom: menuIsOpen ? 'none' : '',
                display: 'flex',
                height: isMobile(width) ? '54px' : '44px',
                background: '#fff',
                paddingLeft: '12px',
            }),
            option: () => ({
                height: isMobile(width) ? '54px' : '44px',
                lineHeight: isMobile(width) ? '12px' : '4px',
                width: '100%',
                boxSizing: 'border-box',
                borderBottom: 'none',
                background: '#fff',
                padding: '20px',
                paddingLeft: '21px',
                color: '#191919',
                cursor: 'pointer',
                fontWeight: 'normal',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                '&:hover': {
                    borderLeft: '2px solid #c00020',
                    background: '#F0EFF4',
                    fontWeight: 'bold',
                },
            }),
        };
    }, [width]);

    return (
        <>
            {/* TODO 모달적용// {isMapModal && (
                <MapModal
                    width={isMobile(width) ? '88.785%' : '750px'}
                    height={isMobile(width) ? '400px' : '608px'}
                    onClickToggleModal={() => setIsMapModal(false)}
                    address={'경상남도 창원시 마산합포구 신포동 1가'}
                    agencyName={'(주) 가야골프'}
                />
            )} */}
            <AgencyContainer>
                <Title>{agency('title')}</Title>
                <DropdownContainer>
                    <SectionDropdown title={agency('notice')}>
                        <NoticeContentTop
                            dangerouslySetInnerHTML={{
                                __html: agency('notice1'),
                            }}
                        />

                        <NoticeContentBottom
                            dangerouslySetInnerHTML={{
                                __html: agency('notice2'),
                            }}
                        />
                    </SectionDropdown>
                </DropdownContainer>
                <SearchAgencyContainer>
                    <SearchAgencyLeft>
                        <SelectBoxContainer>
                            {/* <SelectBox
                                placeholder={agency('state')}
                                styles={{
                                    ...(customStyle as StylesConfig<
                                        any,
                                        false
                                    >),
                                    ...(selectStyle as StylesConfig<
                                        any,
                                        false
                                    >),
                                }}
                            /> */}
                        </SelectBoxContainer>
                        <SelectBoxContainer>
                            {/* <SelectBox
                                placeholder={agency('city')}
                                styles={{
                                    ...(customStyle as StylesConfig<
                                        any,
                                        false
                                    >),
                                    ...(selectStyle as StylesConfig<
                                        any,
                                        false
                                    >),
                                }}
                            /> */}
                        </SelectBoxContainer>
                    </SearchAgencyLeft>
                    <SearchAgencyRight>
                        <SearchAgencyInput
                            placeholder={agency('inputSearch')!}
                        />
                        <SearchAgencyButton>
                            {agency('search')}
                        </SearchAgencyButton>
                    </SearchAgencyRight>
                </SearchAgencyContainer>
                <AgencyListContainer>
                    {!isMobile(width) && (
                        <AgencyListCategory>
                            <CategoryName>
                                <p>{agency('name')}</p>
                            </CategoryName>
                            <CategoryAddress>
                                <p>{agency('address')}</p>
                            </CategoryAddress>
                            <CategoryNumber>
                                <p>{agency('number')}</p>
                            </CategoryNumber>
                        </AgencyListCategory>
                    )}
                    <ul>
                        {isMobile(width) ? (
                            <>
                                <AgencyList>
                                    <MobileAgencyListContent>
                                        <AgencyName>(주)가야골프</AgencyName>
                                        <AgencyAddress>
                                            <p>
                                                경상남도 창원시 마산합포구
                                                신포동 1가
                                            </p>
                                        </AgencyAddress>
                                        <AgencyNumber>
                                            055-246-0433
                                        </AgencyNumber>
                                    </MobileAgencyListContent>
                                    {/* TODO setAgencyAddress()에 해당 에이전시의 주소 값 넣기 */}
                                    <MapButton
                                        onClick={() => {
                                            setAgencyAddress(
                                                '경상남도 창원시 마산합포구 신포동 1가',
                                            );
                                            setIsMapModal(true);
                                        }}
                                    >
                                        {agency('mapView')}
                                    </MapButton>
                                </AgencyList>
                                <AgencyList>
                                    <MobileAgencyListContent>
                                        <AgencyName>(주)가야골프</AgencyName>
                                        <AgencyAddress>
                                            <p>
                                                경상남도 창원시 마산합포구
                                                신포동 1가
                                            </p>
                                        </AgencyAddress>
                                        <AgencyNumber>
                                            055-246-0433
                                        </AgencyNumber>
                                    </MobileAgencyListContent>
                                    <MapButton>{agency('mapView')}</MapButton>
                                </AgencyList>
                            </>
                        ) : (
                            <>
                                <AgencyList>
                                    <AgencyName>(주)가야골프</AgencyName>
                                    <AgencyAddress>
                                        <p>
                                            경상남도 창원시 마산합포구 신포동
                                            1가
                                        </p>
                                        <MapButton>
                                            {agency('mapView')}
                                        </MapButton>
                                    </AgencyAddress>
                                    <AgencyNumber>055-246-0433</AgencyNumber>
                                </AgencyList>
                                <AgencyList>
                                    <AgencyName>(주)가야골프</AgencyName>
                                    <AgencyAddress>
                                        <p>
                                            경상남도 창원시 마산합포구 신포동
                                            1가
                                        </p>
                                        <MapButton>
                                            {agency('mapView')}
                                        </MapButton>
                                    </AgencyAddress>
                                    <AgencyNumber>055-246-0433</AgencyNumber>
                                </AgencyList>
                            </>
                        )}
                    </ul>
                </AgencyListContainer>
            </AgencyContainer>
        </>
    );
};

export default Agency;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
