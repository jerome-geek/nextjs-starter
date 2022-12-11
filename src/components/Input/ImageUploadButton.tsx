import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import Cross from 'assets/icons/cross_gray.svg';

interface ImageUploadButtonProps
    extends InputHTMLAttributes<HTMLInputElement> {}

const ImageUploadButtonContainer = styled.label`
    display: block;
    width: 96px;
    height: 96px;
    background: ${(props) => props.theme.bg2};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px 0;
`;

const ImageUploadButton: FC<ImageUploadButtonProps> = ({
    multiple = true,
    accept = '.bmp, .tif, .tiff, .miff, .gif, .jpe, .jpeg, .jpg, .jps, .pjpeg, .jng, .mng, .png',
    ...props
}) => {
    return (
        <ImageUploadButtonContainer>
            <input
                type='file'
                style={{ display: 'none' }}
                accept={accept}
                multiple={multiple}
                {...props}
            />
            <Cross />
        </ImageUploadButtonContainer>
    );
};

export default ImageUploadButton;
