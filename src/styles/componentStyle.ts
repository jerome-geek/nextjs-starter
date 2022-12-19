import { DefaultTheme, ThemeProps } from 'styled-components';
import media from 'utils/styles/media';

export const sheetInputStyle = {
    sheetInputWrapper: (props: ThemeProps<DefaultTheme>) => `
    display: flex;
    border-bottom: 1px solid ${props.theme.line2};
    border-bottom: 1px solid ${props.theme.line2};
    text-align: left;
    min-height: 104px;
    &:last-child {
        border-bottom: none;
    }
    ${media.medium} {
        flex-direction: column;
        border-bottom: none;
        min-height: auto;
        font-size: 1rem;
    }
    ${media.small} {
        font-size: 1.6rem;
    }
    `,

    sheetInputTitleBox: (props: ThemeProps<DefaultTheme>) => `
        width: 200px;
        padding: 40px 0 40px 41px;
        color: ${props.theme.text1};
        line-height: 28px;
        ${media.medium} {
            padding: 25px 0 12px 10px;
        }
    `,

    sheetInputBox: (props: ThemeProps<DefaultTheme>) => `
        width: 440px;
        padding-top: 30px;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        color: ${props.theme.text1};
        ${media.medium} {
            width: 100%;
            padding: 0;
        }
    `,

    sheetTextInput: (props: ThemeProps<DefaultTheme>) => `
        letter-spacing: -0.64px;
        font-weight: 400;
        height: 44px;
        padding: 0 20px;
        min-height: 44px;
        margin-bottom: 10px;
        border: 1px solid ${props.theme.line2};
        color: ${props.theme.text3};
        &::placeholder {
            font-weight: normal;
            color: ${props.theme.text3};
        }
        &:focus {
            border: 1px solid red;
        }
        &:disabled {
            cursor: not-allowed;
            pointer-events: all !important;
        }
        ${media.medium} {
            margin-bottom: 0;
            padding: 15px 20px;
            min-height: 54px;
            &::placeholder {
                font-size: 1rem;
            }
        }
        ${media.small} {
            &::placeholder {
                font-size: 1.6rem;
            }
        }
    `,

    informationContainer: (props: ThemeProps<DefaultTheme>) => `
        border-top: 2px solid ${props.theme.secondary};
        border-bottom: 2px solid ${props.theme.secondary};
        display: flex;
        flex-direction: column;
        ${media.medium} {
            padding-bottom: 20px;
        }
    `,
};
