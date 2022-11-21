import { css } from 'styled-components';

const ellipsis = (line: number) =>
    line === 1
        ? css`
              width: 100%;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              white-space: nowrap;
          `
        : css`
              width: 100%;
              overflow: hidden;
              position: relative;
              display: -webkit-box;
              -webkit-line-clamp: ${line};
              -webkit-box-orient: vertical;
              word-wrap: break-word;
          `;

const flex = () => {
    return css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
    `;
};

const hideScrollbar = () => {
    return css`
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
    `;
};

const backgroundImage = (imageUrl: string) => {
    return css`
        background-image: url('${imageUrl}');
        background-size: cover;
    `;
};

export { ellipsis, flex, hideScrollbar, backgroundImage };
