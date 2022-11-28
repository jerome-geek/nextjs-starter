import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'oval';
}

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
`;

const Loader: FC<LoaderProps> = ({ type = 'oval' }) => (
    <LoaderContainer>
        {type === 'oval' && (
            <Oval
                color='#222943'
                ariaLabel='oval-loading'
                secondaryColor='#222943'
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        )}

        <p>Loading...</p>
    </LoaderContainer>
);

export default Loader;
