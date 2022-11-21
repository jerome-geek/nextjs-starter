import {
    FC,
    HTMLAttributes,
    ReactNode,
    HTMLAttributeAnchorTarget,
} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import media from 'utils/styles/media';

interface SocialMediaProps extends HTMLAttributes<HTMLUListElement> {
    socialMedia: {
        name: string;
        url: string;
        target: HTMLAttributeAnchorTarget;
        icon: ReactNode;
    }[];
}

const SocialMediaList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;

    ${media.small} {
        margin-bottom: 12px;
    }
`;

const SocialMediaListItem = styled.li`
    padding: 0 5px;
`;

const SocialMedia: FC<SocialMediaProps> = ({ socialMedia }) => (
    <SocialMediaList>
        {socialMedia.map(({ name, url, target, icon }) => {
            return (
                <SocialMediaListItem key={name}>
                    <Link href={{ pathname: url }} target={target}>
                        {icon}
                    </Link>
                </SocialMediaListItem>
            );
        })}
    </SocialMediaList>
);

export default SocialMedia;
