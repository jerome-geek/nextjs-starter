import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import InputWithIcon from 'components/Input/InputWithIcon';
import CloseButtonIcon from 'assets/icons/gray_close_icon.svg';
import ArrowRightIcon from 'assets/icons/arrow_right.svg';
import { fadeIn, fadeOut } from 'utils/styles/transitions';

interface SideNavigationProps {
    sideNavigationToggle: boolean;
    onCloseButtonClick: () => void;
}

const DimmedContainer = styled.div<{ sideNavigationToggle: boolean }>`
    position: fixed; /* Sit on top of the page content */
    width: 100vw; /* Full width (cover the whole page) */
    min-height: 100vh;
    min-height: -webkit-fill-available;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    /* Specify a stack order in case you're using a different order for other elements */
    z-index: ${(props) => (props.sideNavigationToggle ? 100 : 2)};
    cursor: pointer; /* Add a pointer on hover */
    visibility: ${(props) =>
        props.sideNavigationToggle ? 'visible' : 'hidden'};
    animation: ${(props) => (props.sideNavigationToggle ? fadeIn : fadeOut)}
        0.5s forwards;
    transition: visibility 0.25s ease-out;
`;

const SideNavigationcontainer = styled.div`
    background-color: #f8f8fa;
    width: 75%;
    height: 100%;
    padding: 24px;
    position: relative;
    overflow-y: scroll;
`;

const CloseButton = styled(CloseButtonIcon)`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
`;

const StyledForm = styled.form`
    margin-top: 36px;
`;

const StyledInputWithIcon = styled(InputWithIcon).attrs({
    containerProps: {
        style: {
            border: 0,
            backgroundColor: '#fff',
            padding: '5px',
        },
    },
})`
    padding: 0.8rem;
`;

const NavigationList = styled.ul`
    margin-top: 60px;
    width: 100%;
`;

const NavigationListItem = styled.li<{ isChildren?: boolean }>`
    font-size: 20px;
    letter-spacing: 0.2px;
    font-weight: ${(props) => (props.isChildren ? 'normal' : 'bold')};
    padding: ${(props) => (props.isChildren ? '6px 0' : '12px 0')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    &:hover {
        background-color: #f0eff4;
    }
`;

const NavigationListTitle = styled.p`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLink = styled(Link)`
    font-weight: normal;
    padding: 6px 0;
    display: block;
    width: 100%;
`;

const SideNavigation: FC<SideNavigationProps> = ({
    sideNavigationToggle,
    onCloseButtonClick,
}) => {
    const [keywords, setKeywords] = useState('');

    const onKeywordsChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => setKeywords(value);

    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push({
            pathname: '/search',
            search: `?keywords=${keywords}`,
        });
    };

    return (
        <DimmedContainer sideNavigationToggle={sideNavigationToggle}>
            <SideNavigationcontainer>
                <CloseButton onClick={onCloseButtonClick} />

                <StyledForm onSubmit={onSubmit}>
                    <StyledInputWithIcon
                        iconPosition='left'
                        placeholder='검색어를 입력해주세요.'
                        value={keywords}
                        onChange={onKeywordsChange}
                    />
                </StyledForm>

                <NavigationList>
                    <NavigationListItem>
                        <NavigationListTitle>
                            거리측정기
                            <ArrowRightIcon color='#191919' />
                        </NavigationListTitle>
                    </NavigationListItem>
                    {true && (
                        <NavigationList style={{ marginTop: '24px' }}>
                            <NavigationListItem isChildren>
                                <StyledLink href='/'>시계형</StyledLink>
                            </NavigationListItem>
                            <NavigationListItem isChildren>
                                <StyledLink href='/'>레이저형</StyledLink>
                            </NavigationListItem>
                            <NavigationListItem isChildren>
                                <StyledLink href='/'>음성형</StyledLink>
                            </NavigationListItem>
                            <NavigationListItem isChildren>
                                <StyledLink href='/'>야디지북</StyledLink>
                            </NavigationListItem>
                        </NavigationList>
                    )}
                    <NavigationListItem>
                        <NavigationListTitle>
                            론치모니터
                            <ArrowRightIcon />
                        </NavigationListTitle>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationListTitle>액세서리</NavigationListTitle>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationListTitle>VSE</NavigationListTitle>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationListTitle>고객서비스</NavigationListTitle>
                    </NavigationListItem>
                </NavigationList>
            </SideNavigationcontainer>
        </DimmedContainer>
    );
};

export default SideNavigation;
