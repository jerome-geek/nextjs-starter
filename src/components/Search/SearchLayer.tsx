import { FC, SetStateAction, useState, Dispatch } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import InputWithIcon from 'components/Input/InputWithIcon';
import { useFavoriteKeywords } from 'hooks/queries';
import PATHS from 'const/paths';

interface SearchLayerProps {
    searchToggle: boolean;
    setSearchToggle: Dispatch<SetStateAction<boolean>>;
}

const SearchContainer = styled.div`
    background: #f8f8fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    margin: 0 auto;
    position: absolute;
    width: 100%;
    z-index: 5;
`;

const FavoriteKeywordTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.8px;
    color: #191919;
    margin-bottom: 10px;
`;

const FavoriteKeywordContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FavoriteKeyword = styled(Link)`
    font-size: 16px;
    line-height: 24px;
    color: #858585;
    margin-right: 10px;
`;

const SearchLayer: FC<SearchLayerProps> = ({
    searchToggle,
    setSearchToggle,
}) => {
    const { data: favoriteKeywords } = useFavoriteKeywords({
        size: 10,
        options: {
            enabled: !!searchToggle,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
        },
    });

    const [keywords, setKeywords] = useState('');

    const onQueryChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => setKeywords(value);

    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setSearchToggle(false);
        e.preventDefault();
        router.push(`/search?keywords=${keywords}`);
    };

    return (
        <>
            {searchToggle ? (
                <SearchContainer>
                    <div
                        style={{
                            width: '533px',
                            margin: '0 auto',
                            padding: '60px 0',
                        }}
                    >
                        <form onSubmit={onSubmit}>
                            <InputWithIcon
                                placeholder='검색어를 입력해주세요.'
                                containerProps={{
                                    style: {
                                        borderLeft: 0,
                                        borderRight: 0,
                                        borderTop: 0,
                                    },
                                }}
                                onChange={onQueryChange}
                                value={keywords}
                            />
                        </form>
                        <div style={{ paddingTop: '20px' }}>
                            <FavoriteKeywordTitle>
                                인기 검색어
                            </FavoriteKeywordTitle>
                            <FavoriteKeywordContainer>
                                {favoriteKeywords &&
                                    favoriteKeywords?.length > 0 &&
                                    favoriteKeywords?.map(
                                        (favoriteKeyword: string) => (
                                            <FavoriteKeyword
                                                key={favoriteKeyword}
                                                href={{
                                                    pathname: `${PATHS.SEARCH}?keywords=${favoriteKeyword}`,
                                                }}
                                                onClick={() =>
                                                    setSearchToggle(false)
                                                }
                                            >
                                                {favoriteKeyword}
                                            </FavoriteKeyword>
                                        ),
                                    )}
                            </FavoriteKeywordContainer>
                        </div>
                    </div>
                </SearchContainer>
            ) : null}
        </>
    );
};

export default SearchLayer;
